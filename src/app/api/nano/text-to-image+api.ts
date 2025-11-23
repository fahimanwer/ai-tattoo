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

  try {
    const body = await request.json();
    const { prompt } = textToImageSchema.parse(body);
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

    // Generate image with validated prompt
    const response = await fetch(GENIMI_IMAGE_BASE_URL, {
      method: "POST",
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
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
