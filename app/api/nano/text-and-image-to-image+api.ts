import { getCurrentUserEntitlement } from "@/lib/entitlement-utils";
import { PrismaClient } from "@/prisma/generated/client/edge";
import { withAuth } from "@/server-utils/auth-middleware";
import { constants } from "@/server-utils/constants";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";

const { GENIMI_IMAGE_BASE_URL, GEMINI_API_KEY } = constants;

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
  // Use same logic as database trigger: first day of current month at midnight UTC
  const periodStart = new Date(now.getUTCFullYear(), now.getUTCMonth(), 1);
  const periodEnd = new Date(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999);
  
  // Get current user entitlement dynamically
  const entitlement = await getCurrentUserEntitlement(session.user.id);
  
  try {
    const body = await request.json();
    const { prompt, images_base64 } = textToImageSchema.parse(body);
    console.log("server", "received prompt", prompt);

    // First, find or create the usage record for this period
    let usage = await prisma.usage.findFirst({
      where: {
        userId: session.user.id,
        revenuecatUserId: session.user.id, // Initially they are the same
      },
      orderBy: {
        periodStart: 'desc', // Get the most recent record
      },
    });

    // If no usage record exists, create one
    if (!usage) {
      usage = await prisma.usage.create({
        data: {
          userId: session.user.id,
          entitlement,
          periodStart,
          periodEnd,
          count: 0,
          limit: 5, // Default free limit
          revenuecatUserId: session.user.id,
        },
      });
    }

    // Check if user has reached their generation limit
    if (usage.count >= usage.limit) {
      return Response.json(
        { 
          success: false, 
          message: "Generation limit reached for current period. Please upgrade your plan or wait for the next period.",
          error: "LIMIT_REACHED"
        },
        { status: 429 }
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

    const response = await fetch(GENIMI_IMAGE_BASE_URL, {
      method: "POST",
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }, ...images_base64_parts],
          },
        ],
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
    await prisma.$transaction(async (tx) => {
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

    // Invalidate usage cache
    // Note: In a real app, you'd use a cache invalidation system
    console.log("🌐 server", "Usage updated successfully");

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
