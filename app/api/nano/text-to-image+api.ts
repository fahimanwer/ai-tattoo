import { getCurrentUserEntitlement, hasReachedGenerationLimit } from "@/lib/entitlement-utils";
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
  // Use same logic as database trigger: first day of current month at midnight UTC
  const periodStart = new Date(now.getUTCFullYear(), now.getUTCMonth(), 1);
  const periodEnd = new Date(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999);
  
  // Get current user entitlement dynamically
  const entitlement = await getCurrentUserEntitlement(session.user.id);
  
  // Check if user has reached their generation limit
  const limitReached = await hasReachedGenerationLimit(session.user.id, entitlement);
  if (limitReached) {
    return Response.json(
      { 
        success: false, 
        message: "Generation limit reached for current period. Please upgrade your plan or wait for the next period.",
        error: "LIMIT_REACHED"
      },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { prompt } = textToImageSchema.parse(body);
    console.log("server", "received prompt", prompt);

    // Ensure usage row exists for this period (defensive)
    await prisma.usage.upsert({
      where: {
        userId_entitlement_periodStart: {
          userId: session.user.id,
          entitlement,
          periodStart,
        },
      },
      update: {},
      create: {
        userId: session.user.id,
        entitlement,
        periodStart,
        periodEnd,
        count: 0,
        limit: 5,
        revenuecatUserId: session.user.id,
      },
    });

    const usage = await prisma.usage.findUnique({
      where: {
        userId_entitlement_periodStart: {
          userId: session.user.id,
          entitlement,
          periodStart,
        },
      },
      select: { count: true, limit: true },
    });

    const remaining = usage?.limit ?? 0;
    if (remaining <= 0) {
      return Response.json(
        { success: false, message: "Monthly free generation limit reached" },
        { status: 402 }
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
      // Find the existing usage record by userId and revenuecatUserId
      const existingUsage = await tx.usage.findFirst({
        where: {
          userId: session.user.id,
          revenuecatUserId: session.user.id, // Initially they are the same
        },
        orderBy: {
          periodStart: 'desc', // Get the most recent record
        },
      });

      if (!existingUsage) {
        throw new Error("No usage record found for user");
      }

      // Update the existing record
      await tx.usage.update({
        where: {
          userId_entitlement_periodStart: {
            userId: existingUsage.userId,
            entitlement: existingUsage.entitlement,
            periodStart: existingUsage.periodStart,
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
