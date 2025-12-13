import { getCurrentUserEntitlement } from "@/lib/entitlement-utils";
import { PrismaClient } from "@/prisma/generated/client/edge";
import { withAuth } from "@/server-utils/auth-middleware";
import { constants } from "@/server-utils/constants";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";

const {
  GEMINI_IMAGE_BASE_URL_NANOBANANA,
  GEMINI_IMAGE_BASE_URL_NANOBANANA_PRO,
  GEMINI_API_KEY,
  PROMPT_IMPROVE_API_URL,
} = constants;

// Zod schema for request validation
const textToImageSchema = z.object({
  prompt: z.string().min(1, "Prompt is required and cannot be empty"),
  images_base64: z
    .array(z.string())
    .min(1, "Images base64 are required and cannot be empty"),
});

export const POST = withAuth(async (request: Request, session: any) => {
  console.log("🌐 server", "authenticated user:", session.user.email);
  console.log("🌐 server", "user id:", session.user.id);

  const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const now = new Date();

  // Get current user entitlement dynamically
  const entitlement = await getCurrentUserEntitlement(session.user.id);
  console.log("🔍 server", "current user entitlement:", entitlement);

  const isFreeTier = entitlement === "free";

  try {
    const body = await request.json();
    const { prompt, images_base64 } = textToImageSchema.parse(body);
    console.log("server", "received prompt", prompt);

    // Find usage record based on entitlement type
    let usage;

    if (entitlement === "free") {
      // For free tier, ignore period dates (one-time credits)
      usage = await prisma.usage.findFirst({
        where: {
          userId: session.user.id,
          entitlement: "free",
        },
        orderBy: {
          periodStart: "desc",
        },
      });
    } else {
      // For paid tiers, check active period
      usage = await prisma.usage.findFirst({
        where: {
          userId: session.user.id,
          periodStart: { lte: now },
          periodEnd: { gte: now },
        },
        orderBy: {
          periodStart: "desc",
        },
      });
    }

    console.log("🔍 server", "usage record found:", usage ? "YES" : "NO");

    if (usage) {
      console.log("🔍 server", "usage record details:", {
        entitlement: usage.entitlement,
        count: usage.count,
        limit: usage.limit,
        periodStart: usage.periodStart.toISOString(),
        periodEnd: usage.periodEnd.toISOString(),
        revenuecatUserId: usage.revenuecatUserId,
      });
    }

    // If no usage record found, return error (should be created at signup)
    if (!usage) {
      console.error("❌ server", "No usage record found for user:", {
        userId: session.user.id,
        email: session.user.email,
        entitlement,
      });
      return Response.json(
        {
          success: false,
          message: "Usage record not found. Please contact support.",
          error: "NO_USAGE_RECORD",
        },
        { status: 500 }
      );
    }

    // Check if user has reached their generation limit
    console.log("🔍 server", "checking limit:", {
      currentCount: usage.count,
      limit: usage.limit,
      isLimitReached: usage.count >= usage.limit,
    });

    if (usage.count >= usage.limit) {
      console.log("⚠️ server", "LIMIT REACHED - rejecting request:", {
        userId: session.user.id,
        email: session.user.email,
        entitlement: usage.entitlement,
        count: usage.count,
        limit: usage.limit,
      });
      return Response.json(
        {
          success: false,
          message:
            "Generation limit reached for current period. Please upgrade your plan or wait for the next period.",
          error: "LIMIT_REACHED",
        },
        { status: 429 }
      );
    }

    // Improve prompt using OpenAI before sending to Gemini
    let finalPrompt = prompt;
    try {
      const improveResponse = await fetch(
        new URL(PROMPT_IMPROVE_API_URL, request.url).toString(),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, hasExistingImage: false }),
        }
      );

      if (improveResponse.ok) {
        const improveData = await improveResponse.json();
        finalPrompt = improveData.improvedPrompt || prompt;
        console.log("✨ server", "Prompt improved:", {
          original: prompt,
          improved: finalPrompt,
        });
      } else {
        console.warn("⚠️ server", "Failed to improve prompt, using original");
      }
    } catch (error) {
      console.warn(
        "⚠️ server",
        "Error improving prompt, using original:",
        error
      );
    }

    // Helper: parse data URL or infer MIME from raw base64
    const extractMimeAndData = (
      input: string
    ): { mime_type: string; data: string } => {
      const trimmed = input.trim();
      if (trimmed.startsWith("data:")) {
        // data:[<mediatype>][;base64],<data>
        const match = /^data:([^;]+);base64,(.*)$/i.exec(trimmed);
        if (match && match[1] && match[2]) {
          return { mime_type: match[1], data: match[2] };
        }
      }
      // Infer from base64 magic numbers
      // PNG: iVBORw0KGgo
      if (trimmed.startsWith("iVBORw0KGgo")) {
        return { mime_type: "image/png", data: trimmed };
      }
      // JPEG: /9j/
      if (trimmed.startsWith("/9j/")) {
        return { mime_type: "image/jpeg", data: trimmed };
      }
      // WEBP (RIFF): UklG ("RIFF" -> base64 "UklG")
      if (trimmed.startsWith("UklG")) {
        return { mime_type: "image/webp", data: trimmed };
      }
      // HEIC/HEIF are hard to detect via base64 prefix reliably without decoding.
      // Default to JPEG if unknown.
      return { mime_type: "image/jpeg", data: trimmed };
    };

    const images_base64_parts = images_base64.map((img) => {
      const { mime_type, data } = extractMimeAndData(img);
      console.log("server", "mime_type", mime_type);
      return {
        inline_data: {
          mime_type,
          data,
        },
      };
    });

    const GEMINI_IMAGE_BASE_URL = isFreeTier
      ? GEMINI_IMAGE_BASE_URL_NANOBANANA
      : GEMINI_IMAGE_BASE_URL_NANOBANANA_PRO;

    // Add safety and quality instructions to the prompt
    // Detect if this is a substitution/replacement request
    const isSubstitutionRequest =
      /change\s+(?:for|to|with)\s+|replace\s+(?:with|for)\s+|substitute/i.test(
        finalPrompt
      );

    const contextInstructions = isSubstitutionRequest
      ? `IMPORTANT: The user wants to replace/change a subject or element. Apply the requested change while maintaining the same style, placement, size, composition, and artistic approach of the original tattoo. Keep the overall structure and design flow identical, only change the specific subject/element requested.`
      : `IMPORTANT: Maintain the exact context, design, style, placement, and visual elements of the original image. Preserve all existing tattoo details, shapes, lines, and composition. Only apply the requested modifications while keeping everything else identical.`;

    const enhancedPrompt = `${finalPrompt}. ${contextInstructions} Always avoid intimate areas of men and women. Make it as realistic as possible, but without exaggerating. Never generate two or more images in a single output - always generate only one image.`;

    const response = await fetch(GEMINI_IMAGE_BASE_URL, {
      method: "POST",
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: enhancedPrompt }, ...images_base64_parts],
          },
        ],
        // https://ai.google.dev/api/generate-content#generationconfig
        generationConfig: {
          imageConfig: {
            aspectRatio: "1:1",
            image_size: "1K",
          },
        },
      }),
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
      },
    });

    const data = await response.json();

    // Extract the base64 image data from the response
    // The response has multiple parts: [text, inlineData], so we need to find the inlineData part
    const parts = data?.candidates?.[0]?.content?.parts;
    const imagePart = parts?.find((part: any) => part.inlineData);
    const imageData = imagePart?.inlineData?.data;

    if (!imageData) {
      console.log("server", "No image data found in response");
      return new Response(JSON.stringify({ error: "No image data received" }), {
        status: 500,
      });
    }

    // Return the base64 image data
    console.log(
      "server",
      "Successfully generated image, size:",
      imageData?.length,
      "characters"
    );
    // Use transaction to ensure atomicity
    await prisma.$transaction(async (tx: any) => {
      // Update the existing record we found earlier
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

    console.log("✅ server", "Usage incremented successfully:", {
      userId: session.user.id,
      email: session.user.email,
      entitlement: usage.entitlement,
      previousCount: usage.count,
      newCount: usage.count + 1,
      limit: usage.limit,
      remaining: usage.limit - (usage.count + 1),
    });

    return Response.json({ imageData }, { status: 200 });
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: "Invalid request",
          details: error.issues,
        }),
        { status: 400 }
      );
    }

    // Handle API errors
    console.error("server", "text-to-image api error", error);
    return Response.json(
      { success: false, message: "Failed to generate text to image" },
      { status: 500 }
    );
  }
});
