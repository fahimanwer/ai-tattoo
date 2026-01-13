import { getCurrentUserEntitlement } from "@/lib/entitlement-utils";
import { slog } from "@/lib/log";
import { PrismaClient } from "@/prisma/generated/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { constants } from "./constants";

const { PROMPT_IMPROVE_API_URL } = constants;

// ============================================================================
// Types
// ============================================================================

export type UsageRecord = {
  userId: string;
  entitlement: string;
  count: number;
  limit: number;
  periodStart: Date;
  periodEnd: Date;
  revenuecatUserId: string | null;
};

export type UsageCheckResult =
  | { success: true; usage: UsageRecord; isFreeTier: boolean }
  | { success: false; error: Response };

export type Session = {
  user: {
    id: string;
    email: string;
  };
};

// ============================================================================
// Gemini API Types
// ============================================================================

/**
 * Gemini API error status codes (canonical error codes)
 */
export type GeminiErrorStatus =
  | "INVALID_ARGUMENT"
  | "FAILED_PRECONDITION"
  | "UNAUTHENTICATED"
  | "PERMISSION_DENIED"
  | "NOT_FOUND"
  | "RESOURCE_EXHAUSTED"
  | "INTERNAL"
  | "UNKNOWN"
  | "UNAVAILABLE"
  | "DEADLINE_EXCEEDED";

/**
 * Gemini image generation finish reasons
 */
export type GeminiFinishReason =
  | "STOP"
  | "SAFETY"
  | "IMAGE_SAFETY"
  | "RECITATION"
  | "OTHER"
  | "MAX_TOKENS"
  | "BLOCKLIST";

/**
 * Structured error from Gemini API
 */
export interface GeminiError {
  httpStatus: number;
  status: GeminiErrorStatus;
  message: string;
  reason?: string;
  isRetryable: boolean;
  retryAfterMs?: number;
}

/**
 * Result type for Gemini API operations
 */
export type GeminiImageResult =
  | { success: true; imageData: string }
  | { success: false; error: GeminiError };

/**
 * User-friendly error messages for different error types
 */
export const GEMINI_USER_ERROR_MESSAGES: Record<string, string> = {
  SAFETY:
    "This request can't be processed due to safety restrictions. Try rephrasing your prompt.",

  IMAGE_SAFETY:
    "This image can't be processed due to safety restrictions. Try using a different image.",

  RESOURCE_EXHAUSTED:
    "The service is currently busy. Please try again in a moment.",

  INVALID_ARGUMENT:
    "We couldn't process this request. Try adjusting your prompt and try again.",

  UNAUTHENTICATED:
    "You're not signed in. Please refresh the page or sign in again.",

  PERMISSION_DENIED:
    "You don't have access to this feature right now. Please try again later.",

  NOT_FOUND:
    "Something is misconfigured on our side. Please contact support if this keeps happening.",

  UNAVAILABLE:
    "The service is temporarily unavailable. Please try again shortly.",

  DEADLINE_EXCEEDED:
    "This request took too long to complete. Please try again.",

  DEFAULT: "Something went wrong. Please try again.",
};

// ============================================================================
// Prisma Client
// ============================================================================

export function createPrismaClient() {
  return new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  }).$extends(withAccelerate());
}

// ============================================================================
// Usage Management
// ============================================================================

/**
 * Checks user's usage/entitlement and returns the usage record if valid,
 * or an error Response if the user has no usage record or has reached their limit.
 *
 * @param session - User session from auth middleware
 * @param revenuecatUserId - Optional RevenueCat user ID (new clients pass this for accurate lookup)
 *                          If not provided, falls back to session.user.id (backwards compatibility)
 */
export async function checkUserUsage(
  session: Session,
  revenuecatUserId?: string
): Promise<UsageCheckResult> {
  const prisma = createPrismaClient();
  const now = new Date();
  // Allow for slight timing differences (webhook might create record with future periodStart)
  const searchWindow = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes ahead

  // New clients: query by revenuecatUserId
  // Old clients: fallback to userId from session
  const useRevenuecatId = !!revenuecatUserId;

  // Build the OR condition to search by BOTH revenuecatUserId AND userId
  // This handles the case where the webhook created a record with a different ID
  const idConditions = useRevenuecatId
    ? {
        OR: [{ revenuecatUserId }, { userId: session.user.id }],
      }
    : { userId: session.user.id };

  const entitlement = await getCurrentUserEntitlement(
    session.user.id,
    revenuecatUserId
  );
  slog("generation-utils", `current user entitlement: ${entitlement}`);

  const isFreeTier = entitlement === "free";

  // Find usage record based on entitlement type
  let usage;
  if (isFreeTier) {
    // For free tier, ignore period dates (one-time credits)
    usage = await prisma.usage.findFirst({
      where: {
        ...idConditions,
        entitlement: "free",
      },
      orderBy: { periodStart: "desc" },
    });
  } else {
    // For paid tiers, check active period (allow future periodStart for webhook timing)
    usage = await prisma.usage.findFirst({
      where: {
        ...idConditions,
        periodStart: { lte: searchWindow },
        periodEnd: { gte: now },
      },
      orderBy: { periodStart: "desc" },
    });
  }

  if (usage) {
    slog("generation-utils", "usage record details", {
      entitlement: usage.entitlement,
      count: usage.count,
      limit: usage.limit,
      revenuecatUserId: usage.revenuecatUserId,
    });
  }

  // No usage record found
  if (!usage) {
    console.error("❌ server", "No usage record found for user:", {
      userId: session.user.id,
      email: session.user.email,
      entitlement,
    });
    return {
      success: false,
      error: Response.json(
        {
          success: false,
          message: "Usage record not found. Please contact support.",
          error: "NO_USAGE_RECORD",
        },
        { status: 500 }
      ),
    };
  }

  if (usage.count >= usage.limit) {
    slog("generation-utils", "LIMIT REACHED - rejecting request", {
      userId: session.user.id,
      email: session.user.email,
      entitlement: usage.entitlement,
      count: usage.count,
      limit: usage.limit,
    });
    return {
      success: false,
      error: Response.json(
        {
          success: false,
          message:
            "Generation limit reached for current period. Please upgrade your plan or wait for the next period.",
          error: "LIMIT_REACHED",
        },
        { status: 429 }
      ),
    };
  }

  return { success: true, usage, isFreeTier };
}

/**
 * Increments the usage count after a successful generation
 */
export async function incrementUsage(
  usage: UsageRecord,
  session: Session
): Promise<void> {
  const prisma = createPrismaClient();

  await prisma.$transaction(async (tx: any) => {
    await tx.usage.update({
      where: {
        userId_entitlement_periodStart: {
          userId: usage.userId,
          entitlement: usage.entitlement,
          periodStart: usage.periodStart,
        },
      },
      data: { count: { increment: 1 } },
    });
  });

  slog("generation-utils", "Usage incremented successfully", {
    userId: session.user.id,
    email: session.user.email,
    entitlement: usage.entitlement,
    previousCount: usage.count,
    newCount: usage.count + 1,
    limit: usage.limit,
    remaining: usage.limit - (usage.count + 1),
  });
}

// ============================================================================
// Prompt Improvement
// ============================================================================

/**
 * Improves the prompt using the prompt improvement API.
 * Falls back to original prompt on error.
 */
export async function improvePrompt(
  prompt: string,
  requestUrl: string,
  hasExistingImage: boolean = false,
  improvePrompt: boolean = true
): Promise<string> {
  if (!improvePrompt) {
    return prompt;
  }
  try {
    const response = await fetch(
      new URL(PROMPT_IMPROVE_API_URL, requestUrl).toString(),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, hasExistingImage }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      const improvedPrompt = data.improvedPrompt || prompt;
      slog("generation-utils", "Prompt improved", {
        original: prompt,
        improved: improvedPrompt,
      });
      return data.improvedPrompt;
    }

    slog("generation-utils", "Failed to improve prompt, using original", {
      original: prompt,
      response: response.statusText,
    });
    return prompt;
  } catch (error) {
    slog("generation-utils", "Error improving prompt, using original", {
      original: prompt,
      error: error,
    });
    return prompt;
  }
}

// ============================================================================
// Gemini Response Handling
// ============================================================================

/**
 * HTTP status codes that are retryable
 */
const RETRYABLE_HTTP_CODES = new Set([429, 500, 503, 504]);

/**
 * Gemini error statuses that are retryable
 */
const RETRYABLE_ERROR_STATUSES = new Set<GeminiErrorStatus>([
  "RESOURCE_EXHAUSTED",
  "INTERNAL",
  "UNKNOWN",
  "UNAVAILABLE",
  "DEADLINE_EXCEEDED",
]);

/**
 * Parses a Gemini API error response and returns a structured GeminiError
 */
function parseGeminiError(
  httpStatus: number,
  data: any,
  attempt: number = 0
): GeminiError {
  const error = data?.error;
  const status: GeminiErrorStatus = error?.status || "UNKNOWN";
  const message = error?.message || "Unknown error occurred";

  // Extract detailed reason from ErrorInfo if available
  const errorInfo = error?.details?.find(
    (d: any) => d["@type"] === "type.googleapis.com/google.rpc.ErrorInfo"
  );
  const reason = errorInfo?.reason;

  // Determine if this error is retryable
  const isRetryable =
    RETRYABLE_HTTP_CODES.has(httpStatus) ||
    RETRYABLE_ERROR_STATUSES.has(status);

  // Calculate retry delay with exponential backoff (1s, 2s, 4s)
  const retryAfterMs = isRetryable ? Math.pow(2, attempt) * 1000 : undefined;

  return {
    httpStatus,
    status,
    message,
    reason,
    isRetryable,
    retryAfterMs,
  };
}

/**
 * Handles a Gemini API response and returns a structured result.
 * Parses both success responses (extracting image) and error responses.
 *
 * @param response - The fetch Response object
 * @param data - The parsed JSON data from the response
 * @param attempt - Current retry attempt (for calculating backoff)
 * @returns GeminiImageResult with either success + imageData or failure + error
 */
export function handleGeminiResponse(
  response: Response,
  data: any,
  attempt: number = 0
): GeminiImageResult {
  // Handle HTTP errors
  if (!response.ok) {
    const error = parseGeminiError(response.status, data, attempt);

    slog("generation-utils", "Gemini API error", {
      httpStatus: error.httpStatus,
      status: error.status,
      message: error.message,
      reason: error.reason,
      isRetryable: error.isRetryable,
      attempt,
    });

    return { success: false, error };
  }

  // Check for prompt-level blocking (safety filters)
  if (data?.promptFeedback?.blockReason) {
    const blockReason = data.promptFeedback.blockReason;

    slog("generation-utils", "Gemini prompt blocked", {
      blockReason,
      safetyRatings: data.promptFeedback.safetyRatings,
    });

    return {
      success: false,
      error: {
        httpStatus: 200,
        status: "INVALID_ARGUMENT",
        message: `Prompt blocked: ${blockReason}`,
        reason: "SAFETY",
        isRetryable: false,
      },
    };
  }

  // Check if candidates exist
  const candidates = data?.candidates;
  if (!candidates || candidates.length === 0) {
    slog("generation-utils", "Gemini returned empty candidates", {
      promptFeedback: data?.promptFeedback,
      usageMetadata: data?.usageMetadata,
    });

    return {
      success: false,
      error: {
        httpStatus: 200,
        status: "UNKNOWN",
        message: "No candidates returned from Gemini",
        isRetryable: true,
        retryAfterMs: Math.pow(2, attempt) * 1000,
      },
    };
  }

  // Check finish reason
  const finishReason = candidates[0]?.finishReason as
    | GeminiFinishReason
    | undefined;
  if (finishReason && finishReason !== "STOP") {
    const safetyRatings = candidates[0]?.safetyRatings;

    slog("generation-utils", "Gemini generation stopped", {
      finishReason,
      safetyRatings,
    });

    // SAFETY blocks are not retryable - prompt needs to change
    if (finishReason === "SAFETY") {
      return {
        success: false,
        error: {
          httpStatus: 200,
          status: "INVALID_ARGUMENT",
          message: `Generation stopped: ${finishReason}`,
          reason: "SAFETY",
          isRetryable: false,
        },
      };
    }

    // OTHER, RECITATION might be transient
    return {
      success: false,
      error: {
        httpStatus: 200,
        status: "UNKNOWN",
        message: `Generation stopped: ${finishReason}`,
        reason: finishReason,
        isRetryable: finishReason === "OTHER",
        retryAfterMs:
          finishReason === "OTHER" ? Math.pow(2, attempt) * 1000 : undefined,
      },
    };
  }

  // Extract image data
  const parts = candidates[0]?.content?.parts;
  const imagePart = parts?.find((part: any) => part.inlineData);
  const imageData = imagePart?.inlineData?.data;

  if (!imageData) {
    // Log response structure for debugging (without base64 data)
    const candidatesLog = candidates.map((c: any, i: number) => ({
      index: i,
      finishReason: c.finishReason,
      hasParts: !!c.content?.parts,
      partsCount: c.content?.parts?.length,
      partTypes: c.content?.parts?.map((p: any) =>
        p.inlineData ? "inlineData" : p.text ? "text" : "unknown"
      ),
    }));

    slog("generation-utils", "No image data in Gemini response", {
      candidatesLog,
      usageMetadata: data?.usageMetadata,
    });

    return {
      success: false,
      error: {
        httpStatus: 200,
        status: "UNKNOWN",
        message: "No image data found in response",
        isRetryable: true,
        retryAfterMs: Math.pow(2, attempt) * 1000,
      },
    };
  }

  slog(
    "generation-utils",
    `Successfully extracted image data (${imageData.length} chars)`
  );

  return { success: true, imageData };
}

/**
 * Default maximum number of retries for Gemini API calls
 */
const DEFAULT_MAX_RETRIES = 1;

/**
 * Fetches from Gemini API with automatic retry for retryable errors.
 * Uses exponential backoff: 1s, 2s, 4s delays between retries.
 *
 * @param url - Gemini API endpoint URL
 * @param options - Fetch options (method, headers, body)
 * @param maxRetries - Maximum number of retry attempts (default: 2)
 * @returns GeminiImageResult with either success + imageData or failure + error
 */
export async function fetchGeminiWithRetry(
  url: string,
  options: RequestInit,
  maxRetries: number = DEFAULT_MAX_RETRIES
): Promise<GeminiImageResult> {
  let lastError: GeminiError | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      slog("generation-utils", `Gemini API request (attempt ${attempt + 1})`, {
        url: url.replace(/key=[^&]+/, "key=***"),
        attempt,
        maxRetries,
      });

      const response = await fetch(url, options);

      // Try to parse JSON response
      let data: any;
      try {
        data = await response.json();
      } catch {
        slog("generation-utils", "Failed to parse Gemini response as JSON", {
          status: response.status,
          statusText: response.statusText,
        });

        // Return a structured error for JSON parse failures
        return {
          success: false,
          error: {
            httpStatus: response.status,
            status: "INTERNAL",
            message: "Failed to parse API response",
            isRetryable: true,
            retryAfterMs: Math.pow(2, attempt) * 1000,
          },
        };
      }

      // Handle the response
      const result = handleGeminiResponse(response, data, attempt);

      // If successful, return immediately
      if (result.success) {
        return result;
      }

      // If not retryable, return the error immediately
      if (!result.error.isRetryable) {
        slog("generation-utils", "Non-retryable error, failing fast", {
          status: result.error.status,
          reason: result.error.reason,
        });
        return result;
      }

      // Save the error for potential final return
      lastError = result.error;

      // If we have retries left, wait and retry
      if (attempt < maxRetries) {
        const delayMs =
          result.error.retryAfterMs || Math.pow(2, attempt) * 1000;
        slog("generation-utils", `Retrying after ${delayMs}ms`, {
          attempt: attempt + 1,
          maxRetries,
          status: result.error.status,
        });
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    } catch (networkError) {
      // Handle network-level errors (connection failed, timeout, etc.)
      slog("generation-utils", "Network error during Gemini API call", {
        error:
          networkError instanceof Error
            ? networkError.message
            : String(networkError),
        attempt,
      });

      lastError = {
        httpStatus: 0,
        status: "UNAVAILABLE",
        message:
          networkError instanceof Error
            ? networkError.message
            : "Network error",
        isRetryable: true,
        retryAfterMs: Math.pow(2, attempt) * 1000,
      };

      // If we have retries left, wait and retry
      if (attempt < maxRetries) {
        const delayMs = Math.pow(2, attempt) * 1000;
        slog(
          "generation-utils",
          `Retrying after network error in ${delayMs}ms`
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  // All retries exhausted
  slog("generation-utils", "All retries exhausted", {
    maxRetries,
    lastError,
  });

  return {
    success: false,
    error: lastError || {
      httpStatus: 0,
      status: "UNKNOWN",
      message: "All retries exhausted",
      isRetryable: false,
    },
  };
}

/**
 * Helper to create a user-friendly error Response from a GeminiError
 */
export function createGeminiErrorResponse(error: GeminiError): Response {
  const userMessage =
    GEMINI_USER_ERROR_MESSAGES[error.reason || ""] ||
    GEMINI_USER_ERROR_MESSAGES[error.status] ||
    GEMINI_USER_ERROR_MESSAGES.DEFAULT;

  // Map Gemini errors to appropriate HTTP status codes for the client
  let httpStatus: number;
  switch (error.status) {
    case "INVALID_ARGUMENT":
    case "FAILED_PRECONDITION":
      httpStatus = 400;
      break;
    case "UNAUTHENTICATED":
      httpStatus = 401;
      break;
    case "PERMISSION_DENIED":
      httpStatus = 403;
      break;
    case "NOT_FOUND":
      httpStatus = 404;
      break;
    case "RESOURCE_EXHAUSTED":
      httpStatus = 429;
      break;
    case "UNAVAILABLE":
    case "DEADLINE_EXCEEDED":
      httpStatus = 503;
      break;
    default:
      httpStatus = 500;
  }

  return Response.json(
    {
      success: false,
      error: userMessage,
      errorCode: error.reason || error.status,
      retryable: error.isRetryable,
    },
    { status: httpStatus }
  );
}

/**
 * Extracts base64 image data from Gemini API response
 * @deprecated Use handleGeminiResponse instead for better error handling
 */
export function extractImageFromGeminiResponse(data: any): string | null {
  // Log Gemini response without the (very large) base64 'parts' array
  const { candidates, ...rest } = data || {};
  let candidatesLog = candidates;
  if (Array.isArray(candidates) && candidates[0]?.content) {
    // Shallow clone and remove 'parts'
    candidatesLog = [
      {
        ...candidates[0],
        content: { ...candidates[0].content },
      },
      ...candidates.slice(1),
    ];
    if (candidatesLog[0]?.content?.parts) {
      candidatesLog[0].content = {
        ...candidatesLog[0].content,
        parts: "[[omitted base64 image data]]",
      };
    }
  }
  slog("generation-utils", "extracting image from Gemini response", {
    ...rest,
    // only log the non-base64 aspects; add candidates minus large 'parts'
    candidates: candidatesLog,
  });
  const parts = data?.candidates?.[0]?.content?.parts;
  const imagePart = parts?.find((part: any) => part.inlineData);
  return imagePart?.inlineData?.data || null;
}

// ============================================================================
// Image Processing
// ============================================================================

/**
 * Parses a data URL or infers MIME type from raw base64 data
 */
export function extractMimeAndData(input: string): {
  mime_type: string;
  data: string;
} {
  const trimmed = input.trim();

  if (trimmed.startsWith("data:")) {
    const match = /^data:([^;]+);base64,(.*)$/i.exec(trimmed);
    if (match && match[1] && match[2]) {
      return { mime_type: match[1], data: match[2] };
    }
  }

  // Infer from base64 magic numbers
  if (trimmed.startsWith("iVBORw0KGgo")) {
    return { mime_type: "image/png", data: trimmed };
  }
  if (trimmed.startsWith("/9j/")) {
    return { mime_type: "image/jpeg", data: trimmed };
  }
  if (trimmed.startsWith("UklG")) {
    return { mime_type: "image/webp", data: trimmed };
  }

  // Default to JPEG if unknown
  return { mime_type: "image/jpeg", data: trimmed };
}

/**
 * Converts an array of base64 images to Gemini inline_data format
 */
export function toGeminiImageParts(
  images: string[]
): { inline_data: { mime_type: string; data: string } }[] {
  return images.map((img) => {
    const { mime_type, data } = extractMimeAndData(img);
    console.log("server", "mime_type", mime_type);
    return { inline_data: { mime_type, data } };
  });
}

// ============================================================================
// Animal Detection Validation
// ============================================================================

/**
 * Validates that images don't contain animals using GPT-4o-mini Vision API
 */
export async function validateNoAnimals(
  images_base64: string[]
): Promise<{ valid: true } | { valid: false; error: string }> {
  const { OPENAI_API_KEY } = constants;
  const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

  if (!OPENAI_API_KEY) {
    slog(
      "generation-utils",
      "OPENAI_API_KEY not set, skipping animal validation"
    );
    return { valid: true };
  }

  for (const imageBase64 of images_base64) {
    const { mime_type, data } = extractMimeAndData(imageBase64);

    try {
      const response = await fetch(OPENAI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Does this image contain any animals, pets, or wildlife? Answer only 'yes' or 'no'.",
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${mime_type};base64,${data}`,
                  },
                },
              ],
            },
          ],
          max_tokens: 10,
        }),
      });

      if (!response.ok) {
        slog("generation-utils", "OpenAI API error during animal validation", {
          status: response.status,
        });
        continue;
      }

      const result = await response.json();
      const answer =
        result.choices?.[0]?.message?.content?.toLowerCase().trim() || "";

      if (answer.includes("yes")) {
        return {
          valid: false,
          error:
            "Images containing animals are not allowed. Please use photos of human body parts only.",
        };
      }
    } catch (error) {
      slog("generation-utils", "Error validating animal detection", { error });
      continue;
    }
  }

  return { valid: true };
}

/**
 * Validates that images contain human body parts using GPT-4o-mini Vision API
 * Rejects images of nature, landscapes, objects, animals, etc.
 */
export async function validateHumanBodyParts(
  images_base64: string[]
): Promise<{ valid: true } | { valid: false; error: string }> {
  const { OPENAI_API_KEY } = constants;
  const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

  if (!OPENAI_API_KEY) {
    slog(
      "generation-utils",
      "OPENAI_API_KEY not set, skipping human body validation"
    );
    return { valid: true };
  }

  for (const imageBase64 of images_base64) {
    const { mime_type, data } = extractMimeAndData(imageBase64);

    try {
      const response = await fetch(OPENAI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Does this image show a human body part (arm, leg, back, chest, shoulder, etc.) where a tattoo could be placed? Answer only 'yes' or 'no'. Do not count nature scenes, landscapes, waterfalls, animals, objects, or abstract images as body parts.",
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${mime_type};base64,${data}`,
                  },
                },
              ],
            },
          ],
          max_tokens: 10,
        }),
      });

      if (!response.ok) {
        slog(
          "generation-utils",
          "OpenAI API error during human body validation",
          {
            status: response.status,
          }
        );
        continue;
      }

      const result = await response.json();
      const answer =
        result.choices?.[0]?.message?.content?.toLowerCase().trim() || "";

      if (!answer.includes("yes")) {
        return {
          valid: false,
          error:
            "Please use photos of human body parts only. Images of nature, landscapes, objects, or other non-body content are not allowed.",
        };
      }
    } catch (error) {
      slog("generation-utils", "Error validating human body parts", { error });
      continue;
    }
  }

  return { valid: true };
}

// ============================================================================
// Prompt Enhancement
// ============================================================================

const SAFETY_INSTRUCTIONS =
  "Always avoid intimate areas of men and women. Make it as realistic as possible, but without exaggerating. Never generate two or more images in a single output - always generate only one image.";

/**
 * Enhances a prompt with safety and quality instructions for text-to-image
 */
export function enhancePromptForTextToImage(prompt: string): string {
  return `${prompt}. IMPORTANT: ${SAFETY_INSTRUCTIONS}`;
}

/**
 * Enhances a prompt with context-aware instructions for image editing
 */
export function enhancePromptForImageEditing(
  prompt: string,
  improvePrompt: boolean = true
): string {
  if (!improvePrompt) {
    return prompt;
  }
  const isSubstitutionRequest =
    /change\s+(?:for|to|with)\s+|replace\s+(?:with|for)\s+|substitute/i.test(
      prompt
    );

  const contextInstructions = isSubstitutionRequest
    ? `The user wants to replace/change a subject or element. Apply the requested change while maintaining the same style, placement, size, composition, and artistic approach of the original tattoo. Keep the overall structure and design flow identical, only change the specific subject/element requested.`
    : `Maintain the exact context, design, style, placement, and visual elements of the original image. Preserve all existing tattoo details, shapes, lines, and composition. Only apply the requested modifications while keeping everything else identical.`;

  return `${prompt}. IMPORTANT: ${contextInstructions} ${SAFETY_INSTRUCTIONS}`;
}
