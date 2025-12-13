import { withAuth } from "@/server-utils/auth-middleware";
import { constants } from "@/server-utils/constants";
import {
  checkUserUsage,
  enhancePromptForImageEditing,
  extractImageFromGeminiResponse,
  improvePrompt,
  incrementUsage,
  toGeminiImageParts,
  type Session,
} from "@/server-utils/generation-utils";
import { z } from "zod";

const {
  GEMINI_IMAGE_BASE_URL_NANOBANANA,
  GEMINI_IMAGE_BASE_URL_NANOBANANA_PRO,
  GEMINI_API_KEY,
} = constants;

const textAndImageToImageSchema = z.object({
  prompt: z.string().min(1, "Prompt is required and cannot be empty"),
  images_base64: z
    .array(z.string())
    .min(1, "Images base64 are required and cannot be empty"),
});

export const POST = withAuth(async (request: Request, session: Session) => {
  console.log("🌐 server", "authenticated user:", session.user.email);

  // Check usage and limits
  const usageCheck = await checkUserUsage(session);
  if (!usageCheck.success) {
    return usageCheck.error;
  }
  const { usage, isFreeTier } = usageCheck;

  try {
    const body = await request.json();
    const { prompt, images_base64 } = textAndImageToImageSchema.parse(body);
    console.log("server", "received prompt", prompt);

    // Improve and enhance prompt
    const improvedPrompt = await improvePrompt(prompt, request.url, true);
    const enhancedPrompt = enhancePromptForImageEditing(improvedPrompt);

    // Convert images to Gemini format
    const imageParts = toGeminiImageParts(images_base64);

    // Generate image
    const geminiUrl = isFreeTier
      ? GEMINI_IMAGE_BASE_URL_NANOBANANA
      : GEMINI_IMAGE_BASE_URL_NANOBANANA_PRO;

    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: enhancedPrompt }, ...imageParts] }],
        generationConfig: {
          imageConfig: {
            aspectRatio: "1:1",
            image_size: "1K",
          },
        },
      }),
    });

    const data = await response.json();
    const imageData = extractImageFromGeminiResponse(data);

    if (!imageData) {
      console.log("server", "No image data found in response");
      return Response.json(
        { error: "No image data received" },
        { status: 500 }
      );
    }

    console.log(
      "server",
      "Successfully generated image, size:",
      imageData.length,
      "characters"
    );

    // Increment usage after successful generation
    await incrementUsage(usage, session);

    return Response.json({ imageData }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: "Invalid request", details: error.issues },
        { status: 400 }
      );
    }

    console.error("server", "text-and-image-to-image api error", error);
    return Response.json(
      { success: false, message: "Failed to generate image" },
      { status: 500 }
    );
  }
});
