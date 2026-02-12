import { action } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { ConvexError } from "convex/values";
import {
  GEMINI_IMAGE_BASE_URL_NANOBANANA_PRO,
  getGeminiApiKey,
  enhancePromptForTextToImage,
  enhancePromptForImageEditing,
  fetchGeminiWithRetry,
  toGeminiImageParts,
  createGeminiErrorObject,
} from "./geminiUtils";
import { improvePromptHelper } from "./prompt";

/**
 * Generate a tattoo image from a text prompt using Gemini.
 */
export const textToImage = action({
  args: {
    prompt: v.string(),
    improvePrompt: v.optional(v.boolean()),
    revenuecatUserId: v.optional(v.string()),
  },
  returns: v.object({ imageData: v.string() }),
  handler: async (ctx, args) => {
    const { prompt, improvePrompt = true, revenuecatUserId } = args;

    // Authenticate
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    const userId = identity.subject;
    console.log("generation: textToImage authenticated", {
      userId,
      email: identity.email,
    });

    // Check usage limits
    const usageCheck = await ctx.runQuery(internal.usage.checkUsage, {
      userId,
      revenuecatUserId,
    });

    if (!usageCheck.canGenerate) {
      throw new ConvexError(
        usageCheck.error || "Generation limit reached. Please upgrade your plan."
      );
    }

    console.log("generation: received prompt", prompt);

    // Improve prompt if requested
    const improvedPrompt = await improvePromptHelper(
      prompt,
      false, // hasExistingImage = false for text-to-image
      improvePrompt
    );

    // Enhance with safety instructions
    const enhancedPrompt = enhancePromptForTextToImage(improvedPrompt);

    const GEMINI_API_KEY = getGeminiApiKey();

    // Call Gemini API
    const result = await fetchGeminiWithRetry(
      GEMINI_IMAGE_BASE_URL_NANOBANANA_PRO,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
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
      console.log("generation: textToImage failed", {
        error: result.error,
      });
      const errorObj = createGeminiErrorObject(result.error);
      throw new ConvexError(errorObj.error);
    }

    console.log(
      `generation: textToImage success, size: ${result.imageData.length} chars`
    );

    // Increment usage after successful generation
    await ctx.runMutation(internal.usage.incrementUsage, {
      userId,
      usageId: usageCheck.usageId!,
    });

    return { imageData: result.imageData };
  },
});

/**
 * Generate a tattoo image from text + existing images using Gemini.
 */
export const textAndImageToImage = action({
  args: {
    prompt: v.string(),
    images_base64: v.array(v.string()),
    improvePrompt: v.optional(v.boolean()),
    revenuecatUserId: v.optional(v.string()),
  },
  returns: v.object({ imageData: v.string() }),
  handler: async (ctx, args) => {
    const {
      prompt,
      images_base64,
      improvePrompt = true,
      revenuecatUserId,
    } = args;

    // Authenticate
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    const userId = identity.subject;
    console.log("generation: textAndImageToImage authenticated", {
      userId,
      email: identity.email,
    });

    // Check usage limits
    const usageCheck = await ctx.runQuery(internal.usage.checkUsage, {
      userId,
      revenuecatUserId,
    });

    if (!usageCheck.canGenerate) {
      throw new ConvexError(
        usageCheck.error || "Generation limit reached. Please upgrade your plan."
      );
    }

    console.log("generation: received prompt", prompt);

    // Disable prompt improvement when combining multiple images
    const disabledImprovePrompt =
      images_base64.length > 1 ? false : improvePrompt;

    // Improve prompt if requested
    const improvedPrompt = await improvePromptHelper(
      prompt,
      true, // hasExistingImage = true for image editing
      disabledImprovePrompt
    );

    // Enhance with context-aware instructions
    const enhancedPrompt = enhancePromptForImageEditing(
      improvedPrompt,
      disabledImprovePrompt
    );

    // Convert images to Gemini format
    const imageParts = toGeminiImageParts(images_base64);

    const GEMINI_API_KEY = getGeminiApiKey();

    // Call Gemini API
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
      console.log("generation: textAndImageToImage failed", {
        error: result.error,
      });
      const errorObj = createGeminiErrorObject(result.error);
      throw new ConvexError(errorObj.error);
    }

    console.log(
      `generation: textAndImageToImage success, size: ${result.imageData.length} chars`
    );

    // Increment usage after successful generation
    await ctx.runMutation(internal.usage.incrementUsage, {
      userId,
      usageId: usageCheck.usageId!,
    });

    return { imageData: result.imageData };
  },
});
