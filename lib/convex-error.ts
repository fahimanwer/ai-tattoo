import { ConvexError } from "convex/values";

/**
 * Extract a structured error code and human-readable message from a Convex error.
 *
 * Handles three shapes:
 * 1. ConvexError with structured data `{ code, message }` (our new format)
 * 2. ConvexError with a plain string data (legacy: the string IS the code)
 * 3. Plain Error — strips Convex prefix formatting if present
 */
export function extractConvexError(error: Error | null | undefined): {
  code: string | undefined;
  message: string;
} {
  if (!error)
    return { code: undefined, message: "An unexpected error occurred." };

  // ConvexError with structured data { code, message }
  if (error instanceof ConvexError) {
    const data = error.data as unknown;
    if (typeof data === "object" && data !== null && "code" in data) {
      const obj = data as { code: string; message?: string };
      return { code: obj.code, message: obj.message || error.message };
    }
    if (typeof data === "string") {
      return { code: data, message: data };
    }
  }

  // Plain Error — strip Convex prefix formatting if present
  const raw = error.message || "";
  const cleaned = raw.replace(
    /^\[CONVEX [A-Z]\([^\)]+\)\]\s*(\[Request ID: [^\]]+\]\s*)?/,
    ""
  );
  return {
    code: undefined,
    message: cleaned || "Something went wrong. Please try again.",
  };
}
