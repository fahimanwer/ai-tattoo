/**
 * Gemini API helper utilities for Convex actions.
 *
 * Ported from server-utils/generation-utils.ts and server-utils/constants.ts.
 * These are plain helper functions imported by Convex actions — they are NOT
 * Convex functions themselves.
 */

// ============================================================================
// Constants (from server-utils/constants.ts)
// ============================================================================

export const NANOBANANA = "gemini-2.5-flash-image";
export const NANOBANANA_PRO = "gemini-3-pro-image-preview";

export const GEMINI_IMAGE_BASE_URL_NANOBANANA = `https://generativelanguage.googleapis.com/v1beta/models/${NANOBANANA}:generateContent`;
export const GEMINI_IMAGE_BASE_URL_NANOBANANA_PRO = `https://generativelanguage.googleapis.com/v1beta/models/${NANOBANANA_PRO}:generateContent`;

export function getGeminiApiKey(): string {
  return process.env.GEMINI_API_KEY || "";
}

export function getOpenAIApiKey(): string {
  return process.env.OPENAI_API_KEY || "";
}

// ============================================================================
// Types
// ============================================================================

export type UsageRecord = {
  userId: string;
  entitlement: string;
  count: number;
  limit: number;
  periodStart: number;
  periodEnd: number;
  revenuecatUserId: string | null;
};

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

export type GeminiFinishReason =
  | "STOP"
  | "SAFETY"
  | "IMAGE_SAFETY"
  | "RECITATION"
  | "OTHER"
  | "MAX_TOKENS"
  | "BLOCKLIST";

export interface GeminiError {
  httpStatus: number;
  status: GeminiErrorStatus;
  message: string;
  reason?: string;
  isRetryable: boolean;
  retryAfterMs?: number;
}

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
// Gemini Error Parsing
// ============================================================================

const RETRYABLE_HTTP_CODES = new Set([429, 500, 503, 504]);

const RETRYABLE_ERROR_STATUSES = new Set<GeminiErrorStatus>([
  "RESOURCE_EXHAUSTED",
  "INTERNAL",
  "UNKNOWN",
  "UNAVAILABLE",
  "DEADLINE_EXCEEDED",
]);

function parseGeminiError(
  httpStatus: number,
  data: any,
  attempt: number = 0
): GeminiError {
  const error = data?.error;
  const status: GeminiErrorStatus = error?.status || "UNKNOWN";
  const message = error?.message || "Unknown error occurred";

  const errorInfo = error?.details?.find(
    (d: any) => d["@type"] === "type.googleapis.com/google.rpc.ErrorInfo"
  );
  const reason = errorInfo?.reason;

  const isRetryable =
    RETRYABLE_HTTP_CODES.has(httpStatus) ||
    RETRYABLE_ERROR_STATUSES.has(status);

  const retryAfterMs = isRetryable ? Math.pow(2, attempt) * 1000 : undefined;

  return { httpStatus, status, message, reason, isRetryable, retryAfterMs };
}

// ============================================================================
// Gemini Response Handling
// ============================================================================

/**
 * Handles a Gemini API response and returns a structured result.
 */
export function handleGeminiResponse(
  response: Response,
  data: any,
  attempt: number = 0
): GeminiImageResult {
  if (!response.ok) {
    const error = parseGeminiError(response.status, data, attempt);
    console.log("geminiUtils: Gemini API error", {
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
    console.log("geminiUtils: Gemini prompt blocked", { blockReason });
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
    console.log("geminiUtils: Gemini returned empty candidates");
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
    console.log("geminiUtils: Gemini generation stopped", { finishReason });

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
    console.log("geminiUtils: No image data in Gemini response");
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

  console.log(
    `geminiUtils: Successfully extracted image data (${imageData.length} chars)`
  );
  return { success: true, imageData };
}

// ============================================================================
// Fetch with Retry
// ============================================================================

const DEFAULT_MAX_RETRIES = 1;

/**
 * Fetches from Gemini API with automatic retry for retryable errors.
 * Uses exponential backoff: 1s, 2s, 4s delays between retries.
 */
export async function fetchGeminiWithRetry(
  url: string,
  options: RequestInit,
  maxRetries: number = DEFAULT_MAX_RETRIES
): Promise<GeminiImageResult> {
  let lastError: GeminiError | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`geminiUtils: Gemini API request (attempt ${attempt + 1})`, {
        url: url.replace(/key=[^&]+/, "key=***"),
        attempt,
        maxRetries,
      });

      const response = await fetch(url, options);

      let data: any;
      try {
        data = await response.json();
      } catch {
        console.log(
          "geminiUtils: Failed to parse Gemini response as JSON",
          { status: response.status, statusText: response.statusText }
        );
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

      const result = handleGeminiResponse(response, data, attempt);

      if (result.success) {
        return result;
      }

      if (!result.error.isRetryable) {
        console.log("geminiUtils: Non-retryable error, failing fast", {
          status: result.error.status,
          reason: result.error.reason,
        });
        return result;
      }

      lastError = result.error;

      if (attempt < maxRetries) {
        const delayMs =
          result.error.retryAfterMs || Math.pow(2, attempt) * 1000;
        console.log(`geminiUtils: Retrying after ${delayMs}ms`, {
          attempt: attempt + 1,
          maxRetries,
          status: result.error.status,
        });
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    } catch (networkError) {
      console.log("geminiUtils: Network error during Gemini API call", {
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

      if (attempt < maxRetries) {
        const delayMs = Math.pow(2, attempt) * 1000;
        console.log(
          `geminiUtils: Retrying after network error in ${delayMs}ms`
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  console.log("geminiUtils: All retries exhausted", { maxRetries, lastError });

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

// ============================================================================
// Error Object Creation
// ============================================================================

/**
 * Creates a user-friendly error object from a GeminiError.
 * Returns a plain object instead of a Response (for use in Convex actions).
 */
export function createGeminiErrorObject(error: GeminiError): {
  success: false;
  error: string;
  errorCode: string;
  retryable: boolean;
} {
  const userMessage =
    GEMINI_USER_ERROR_MESSAGES[error.reason || ""] ||
    GEMINI_USER_ERROR_MESSAGES[error.status] ||
    GEMINI_USER_ERROR_MESSAGES.DEFAULT;

  return {
    success: false,
    error: userMessage,
    errorCode: error.reason || error.status,
    retryable: error.isRetryable,
  };
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

  if (trimmed.startsWith("iVBORw0KGgo")) {
    return { mime_type: "image/png", data: trimmed };
  }
  if (trimmed.startsWith("/9j/")) {
    return { mime_type: "image/jpeg", data: trimmed };
  }
  if (trimmed.startsWith("UklG")) {
    return { mime_type: "image/webp", data: trimmed };
  }

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
    console.log("geminiUtils: image mime_type", mime_type);
    return { inline_data: { mime_type, data } };
  });
}

// ============================================================================
// Image Validation
// ============================================================================

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

/**
 * Validates that images don't contain animals using GPT-4o-mini Vision API
 */
export async function validateNoAnimals(
  images_base64: string[]
): Promise<{ valid: true } | { valid: false; error: string }> {
  const OPENAI_API_KEY = getOpenAIApiKey();

  if (!OPENAI_API_KEY) {
    console.log("geminiUtils: OPENAI_API_KEY not set, skipping animal validation");
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
                  image_url: { url: `data:${mime_type};base64,${data}` },
                },
              ],
            },
          ],
          max_tokens: 10,
        }),
      });

      if (!response.ok) {
        console.log("geminiUtils: OpenAI API error during animal validation", {
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
      console.log("geminiUtils: Error validating animal detection", { error });
      continue;
    }
  }

  return { valid: true };
}

/**
 * Validates that images contain human body parts using GPT-4o-mini Vision API
 */
export async function validateHumanBodyParts(
  images_base64: string[]
): Promise<{ valid: true } | { valid: false; error: string }> {
  const OPENAI_API_KEY = getOpenAIApiKey();

  if (!OPENAI_API_KEY) {
    console.log(
      "geminiUtils: OPENAI_API_KEY not set, skipping human body validation"
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
                  image_url: { url: `data:${mime_type};base64,${data}` },
                },
              ],
            },
          ],
          max_tokens: 10,
        }),
      });

      if (!response.ok) {
        console.log(
          "geminiUtils: OpenAI API error during human body validation",
          { status: response.status }
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
      console.log("geminiUtils: Error validating human body parts", { error });
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
