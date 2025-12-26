import { slog } from "@/lib/log";
import { withAuth } from "@/server-utils/auth-middleware";
import { constants } from "@/server-utils/constants";
import {
  checkUserUsage,
  createGeminiErrorResponse,
  enhancePromptForTextToImage,
  fetchGeminiWithRetry,
  improvePrompt as handleImprovePrompt,
  incrementUsage,
  type Session,
} from "@/server-utils/generation-utils";
import { z } from "zod";

const {
  GEMINI_IMAGE_BASE_URL_NANOBANANA,
  GEMINI_IMAGE_BASE_URL_NANOBANANA_PRO,
  GEMINI_API_KEY,
} = constants;

const textToImageSchema = z.object({
  prompt: z.string().min(1, "Prompt is required and cannot be empty"),
  improvePrompt: z.boolean().optional().default(true),
  revenuecatUserId: z.string().optional(),
});

export const POST = withAuth(async (request: Request, session: Session) => {
  slog("text-to-image+api", `authenticated request by ${session.user.email}`);

  try {
    const body = await request.json();
    const { prompt, improvePrompt, revenuecatUserId } =
      textToImageSchema.parse(body);

    // Check usage and limits (pass revenuecatUserId for accurate lookup)
    const usageCheck = await checkUserUsage(session, revenuecatUserId);
    if (!usageCheck.success) {
      return usageCheck.error;
    }
    const { usage, isFreeTier } = usageCheck;
    slog("text-to-image+api", `received prompt: ${prompt}`);

    // Improve and enhance prompt
    const improvedPrompt = await handleImprovePrompt(
      prompt,
      request.url,
      false,
      improvePrompt
    );
    const enhancedPrompt = enhancePromptForTextToImage(improvedPrompt);

    const result = await fetchGeminiWithRetry(
      GEMINI_IMAGE_BASE_URL_NANOBANANA_PRO,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        // https://ai.google.dev/api/generate-content#v1beta.GenerationConfig
        body: JSON.stringify({
          contents: [{ parts: [{ text: enhancedPrompt }] }],
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
      slog("text-to-image+api", "Image generation failed", {
        error: result.error,
      });
      return createGeminiErrorResponse(result.error);
    }

    slog(
      "text-to-image+api",
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

    slog("text-to-image+api", "text-to-image api error", { error });
    return Response.json(
      { success: false, message: "Failed to generate text to image" },
      { status: 500 }
    );
  }
});
