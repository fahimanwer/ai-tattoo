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
 */
export async function checkUserUsage(
  session: Session
): Promise<UsageCheckResult> {
  const prisma = createPrismaClient();
  const now = new Date();

  const entitlement = await getCurrentUserEntitlement(session.user.id);
  slog("generation-utils", `current user entitlement: ${entitlement}`);

  const isFreeTier = entitlement === "free";

  // Find usage record based on entitlement type
  let usage;
  if (isFreeTier) {
    // For free tier, ignore period dates (one-time credits)
    usage = await prisma.usage.findFirst({
      where: {
        userId: session.user.id,
        entitlement: "free",
      },
      orderBy: { periodStart: "desc" },
    });
  } else {
    // For paid tiers, check active period
    usage = await prisma.usage.findFirst({
      where: {
        userId: session.user.id,
        periodStart: { lte: now },
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
      return improvedPrompt;
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
 * Extracts base64 image data from Gemini API response
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
