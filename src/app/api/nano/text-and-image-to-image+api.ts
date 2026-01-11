import { slog } from "@/lib/log";
import { withAuth } from "@/server-utils/auth-middleware";
import { constants } from "@/server-utils/constants";
import {
  checkUserUsage,
  createGeminiErrorResponse,
  enhancePromptForImageEditing,
  fetchGeminiWithRetry,
  improvePrompt as handleImprovePrompt,
  incrementUsage,
  toGeminiImageParts,
  type Session,
} from "@/server-utils/generation-utils";
import { z } from "zod";

const { GEMINI_IMAGE_BASE_URL_NANOBANANA_PRO, GEMINI_API_KEY } = constants;

const textAndImageToImageSchema = z.object({
  prompt: z.string().min(1, "Prompt is required and cannot be empty"),
  images_base64: z
    .array(z.string())
    .min(1, "Images base64 are required and cannot be empty"),
  improvePrompt: z.boolean().optional().default(true),
  revenuecatUserId: z.string().optional(),
});

export const POST = withAuth(async (request: Request, session: Session) => {
  console.log("🌐 server", "authenticated user:", session.user.email);

  try {
    const body = await request.json();
    const { prompt, images_base64, improvePrompt, revenuecatUserId } =
      textAndImageToImageSchema.parse(body);

    // Check usage and limits (pass revenuecatUserId for accurate lookup)
    const usageCheck = await checkUserUsage(session, revenuecatUserId);
    if (!usageCheck.success) {
      return usageCheck.error;
    }
    const { usage } = usageCheck;
    console.log("server", "received prompt", prompt);

    // Disable prompt improvement when combining images
    const disabledImprovePrompt =
      images_base64.length > 1 ? false : improvePrompt;

    // Improve and enhance prompt
    const improvedPrompt = await handleImprovePrompt(
      prompt,
      request.url,
      true,
      disabledImprovePrompt
    );
    const enhancedPrompt = enhancePromptForImageEditing(
      improvedPrompt,
      disabledImprovePrompt
    );

    // Convert images to Gemini format
    const imageParts = toGeminiImageParts(images_base64);

    const result = await fetchGeminiWithRetry(
      GEMINI_IMAGE_BASE_URL_NANOBANANA_PRO,
      {
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
              imageSize: "1K",
            },
          },
        }),
      }
    );

    if (!result.success) {
      slog("text-and-image-to-image+api", "Image generation failed", {
        error: result.error,
      });
      return createGeminiErrorResponse(result.error);
    }

    slog(
      "text-and-image-to-image+api",
      `Successfully generated image, size: ${result.imageData.length} characters`
    );

    // Increment usage after successful generation
    await incrementUsage(usage, session);

    return Response.json({ imageData: result.imageData }, { status: 200 });
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
