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

export const NANOBANANA = "gemini-3.1-flash-image-preview";
export const NANOBANANA_PRO = "gemini-3-pro-image-preview";

export const GEMINI_IMAGE_BASE_URL_NANOBANANA = `https://generativelanguage.googleapis.com/v1beta/models/${NANOBANANA}:generateContent`;
export const GEMINI_IMAGE_BASE_URL_NANOBANANA_PRO = `https://generativelanguage.googleapis.com/v1beta/models/${NANOBANANA_PRO}:generateContent`;

export function getGeminiApiKey(): string {
  return process.env.GEMINI_API_KEY || "";
}

export function getOpenRouterApiKey(): string {
  return process.env.OPENROUTER_API_KEY || "";
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

const DEFAULT_MAX_RETRIES = 2;
const UNAVAILABLE_RETRY_DELAY_MS = 3000;

/**
 * Swap the model segment in a Gemini URL.
 * e.g. .../models/gemini-3-pro-image-preview:generateContent
 *   → .../models/gemini-2.5-flash-image:generateContent
 */
function swapModelInUrl(url: string, newModel: string): string {
  return url.replace(/models\/[^:]+/, `models/${newModel}`);
}

/**
 * Fetches from Gemini API with automatic retry + model fallback.
 *
 * Retry strategy:
 *   1. Retry on same model up to `maxRetries` times with exponential backoff.
 *   2. If the PRIMARY model returns UNAVAILABLE / RESOURCE_EXHAUSTED after all
 *      retries, automatically fall back to the FLASH model and retry once.
 */
export async function fetchGeminiWithRetry(
  url: string,
  options: RequestInit,
  maxRetries: number = DEFAULT_MAX_RETRIES
): Promise<GeminiImageResult> {
  const result = await _fetchWithRetries(url, options, maxRetries);

  // If the primary model is unavailable, fall back to flash model
  if (!result.success) {
    const { status } = (result as { success: false; error: GeminiError }).error;
    if (status === "UNAVAILABLE" || status === "RESOURCE_EXHAUSTED") {
      const fallbackUrl = swapModelInUrl(url, NANOBANANA);
      if (fallbackUrl !== url) {
        console.log("geminiUtils: Primary model unavailable, falling back", {
          from: NANOBANANA_PRO,
          to: NANOBANANA,
        });
        return _fetchWithRetries(fallbackUrl, options, 1);
      }
    }
  }

  return result;
}

/**
 * Internal: fetch with retries on a single URL.
 */
async function _fetchWithRetries(
  url: string,
  options: RequestInit,
  maxRetries: number
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

      const err = (result as { success: false; error: GeminiError }).error;

      if (!err.isRetryable) {
        console.log("geminiUtils: Non-retryable error, failing fast", {
          status: err.status,
          reason: err.reason,
        });
        return result;
      }

      lastError = err;

      if (attempt < maxRetries) {
        // Use a longer delay for 503/429 to let the model recover
        const delayMs =
          err.status === "UNAVAILABLE" || err.status === "RESOURCE_EXHAUSTED"
            ? UNAVAILABLE_RETRY_DELAY_MS * (attempt + 1)
            : err.retryAfterMs || Math.pow(2, attempt) * 1000;
        console.log(`geminiUtils: Retrying after ${delayMs}ms`, {
          attempt: attempt + 1,
          maxRetries,
          status: err.status,
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
// Prompt Enhancement (layered Nano Banana Pro prompts, tattoo-scoped)
// ============================================================================

import {
  buildTextToImagePrompt,
  buildImageEditPrompt,
} from "../lib/prompts";

/**
 * Enhances a prompt with layered L0–L5 structure for text-to-image (tattoo generation).
 * Always tattoo-scoped. Uses [LAYER N — TITLE] and FORBIDDEN/REQUIRED blocks.
 */
export function enhancePromptForTextToImage(prompt: string): string {
  return buildTextToImagePrompt(prompt);
}

/**
 * Enhances a prompt with layered structure for image editing (modify existing tattoo).
 * When improvePrompt is false, returns the raw prompt. Otherwise uses L0–L5 and
 * sets context from substitution vs preserve based on prompt text.
 */
export function enhancePromptForImageEditing(
  prompt: string,
  improvePrompt: boolean = true
): string {
  const isSubstitutionRequest =
    /change\s+(?:for|to|with)\s+|replace\s+(?:with|for)\s+|substitute/i.test(
      prompt
    );
  return buildImageEditPrompt(prompt, {
    isSubstitutionRequest,
    improvePrompt,
  });
}
