import { action } from "./_generated/server";
import { v } from "convex/values";
import { getOpenRouterApiKey } from "./geminiUtils";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * Builds the system prompt for tattoo prompt enhancement.
 */
function buildSystemPrompt(hasExistingImage: boolean): string {
  const existingImageContext = hasExistingImage
    ? `IMPORTANT CONTEXT: The user already has a generated tattoo image. You must analyze the user's prompt and determine their intent. Follow these rules in order of priority:

=== PRIORITY 1: TATTOO REMOVAL ===
If the prompt contains keywords like: "remove", "no tattoo", "remove tattoo", "delete tattoo", "erase tattoo"
ACTION: Generate a prompt that instructs removing the tattoo completely and restoring the natural, unmarked skin. The skin should look clean and untouched. The person's appearance, pose, lighting, and background must remain EXACTLY the same. Only the tattoo area should change to show natural skin.
EXAMPLE OUTPUT: "Remove the tattoo from the skin, restoring the natural unmarked skin texture and appearance, keeping the person, pose, lighting, and background completely unchanged"

=== PRIORITY 2: COVER UP ===
If the prompt contains keywords like: "cover up", "cover", "coverup", "cover it", "conceal", "hide tattoo"
ACTION: Generate a prompt that describes a NEW tattoo design that will completely cover and conceal the existing tattoo. The new design must be larger and strategically designed to hide the old tattoo underneath. The person, pose, and background stay unchanged. The new tattoo replaces the old one visually.
EXAMPLE OUTPUT: "Create a new tattoo design that completely covers and conceals the existing tattoo, strategically placed and sized to fully hide the old tattoo, maintaining the person, pose, and background unchanged"

=== PRIORITY 3: ENHANCEMENTS ===
If the prompt contains keywords like: "improve", "enhance", "add ornaments", "add details", "add more elements", "add more", "expand", "decorate", "embellish"
ACTION: Generate a prompt that adds complementary decorative elements, ornaments, patterns, or design extensions to the EXISTING tattoo. These additions must match the current tattoo's style, theme, color palette, and artistic direction. The original tattoo design remains intact and recognizable, but is enhanced with harmonious additions around it or integrated into it. The person, pose, and background stay unchanged.
EXAMPLE OUTPUT: "Enhance the existing tattoo by adding complementary ornaments and decorative elements that match its style and theme, maintaining the original design's core subject and placement while expanding it with harmonious additions"

=== PRIORITY 4: MODIFICATIONS ===
If the prompt contains specific modification requests:
- "add color": Add vibrant colors to the existing tattoo while keeping the design, style, placement, and subject identical
- "make it bigger" or "enlarge" or "increase size": Enlarge the existing tattoo proportionally, keeping everything else the same
- "change style": Modify only the artistic style (realistic to watercolor, blackwork to colored, etc.) while keeping the same subject and design structure
- "add to [body part]": Apply the exact same tattoo design to the specified body part
ACTION: Generate a prompt that modifies ONLY the specified aspect while preserving everything else about the tattoo.

=== PRIORITY 5: SUBSTITUTIONS ===
If the prompt contains: "change [X] for [Y]", "replace [X] with [Y]", "swap [X] with [Y]", "change for a [Y]"
ACTION: Generate a prompt that replaces the subject/element X with Y, but preserves the style, placement, size, and overall composition of the original tattoo. The new subject should fit naturally in the same space and style.
EXAMPLE OUTPUT: "Replace [X] with [Y] in the tattoo, maintaining the same style, placement, size, and composition"

=== FALLBACK ===
If the prompt doesn't match any of the above categories and seems like a new design request, treat it as a new tattoo generation (not a modification of the existing one).`
    : `CONTEXT: This is a new tattoo generation request. The user is creating a tattoo from scratch.`;

  return `You are a tattoo prompt enhancer and validator. Your job is to:
1. Transform the user's input into a detailed, optimized prompt for generating realistic tattoos
2. Ensure the prompt is appropriate and safe for tattoo generation
3. Add relevant artistic details (style, linework, shading, composition) if the input is vague
4. If the prompt references applying a tattoo to a person/photo, emphasize that the person, pose, and background must remain unchanged
5. If the prompt is for a standalone tattoo design, enhance it with style and artistic details
6. Output ONLY the improved prompt - no explanations, no quotes, no markdown formatting

${existingImageContext}

GENERAL RULES:
1. Always describe realistic tattoos that look like actual tattoos on skin
2. Never make full image changes (changing the person, pose, or background) EXCEPT for:
   - Tattoo removal: which restores natural skin
   - Cover-ups: which replace the existing tattoo with a new design
3. Keep the improved prompt concise but detailed (1-3 sentences maximum)
4. Always maintain the user's original intent - if they want to remove, cover, enhance, or modify, respect that intent
5. Ensure all content is appropriate and safe for tattoo generation
6. Output ONLY the improved prompt text - no explanations, no quotes, no markdown, no prefixes like "Improved prompt:"`;
}

/**
 * Improves a tattoo prompt using OpenRouter GPT-4o-mini.
 * Falls back to the original prompt on any error.
 */
export const improvePrompt = action({
  args: {
    prompt: v.string(),
    hasExistingImage: v.optional(v.boolean()),
  },
  returns: v.object({ improvedPrompt: v.string() }),
  handler: async (_ctx, args) => {
    const { prompt, hasExistingImage = false } = args;

    console.log("prompt: Original prompt", prompt);
    console.log("prompt: Has existing image", hasExistingImage);

    const OPENROUTER_API_KEY = getOpenRouterApiKey();

    if (!OPENROUTER_API_KEY) {
      console.log("prompt: OPENROUTER_API_KEY not set, returning original prompt");
      return { improvedPrompt: prompt };
    }

    try {
      const response = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: buildSystemPrompt(hasExistingImage),
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 200,
        }),
      });

      if (!response.ok) {
        console.log("prompt: OpenRouter API error", { status: response.status });
        return { improvedPrompt: prompt };
      }

      const data = await response.json();
      const improvedPrompt =
        data.choices?.[0]?.message?.content?.trim() || prompt;

      console.log("prompt: Improved prompt", improvedPrompt);
      return { improvedPrompt };
    } catch (error) {
      console.log("prompt: Error improving prompt, using original", { error });
      return { improvedPrompt: prompt };
    }
  },
});

/**
 * Internal helper function to improve a prompt (callable from other actions).
 * This avoids the need to call the action via ctx.runAction for internal use.
 */
export async function improvePromptHelper(
  prompt: string,
  hasExistingImage: boolean = false,
  shouldImprove: boolean = true
): Promise<string> {
  if (!shouldImprove) {
    return prompt;
  }

  const OPENROUTER_API_KEY = getOpenRouterApiKey();

  if (!OPENROUTER_API_KEY) {
    console.log("prompt: OPENROUTER_API_KEY not set, returning original prompt");
    return prompt;
  }

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: buildSystemPrompt(hasExistingImage),
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      console.log("prompt: OpenRouter API error during internal improve", {
        status: response.status,
      });
      return prompt;
    }

    const data = await response.json();
    const improvedPrompt =
      data.choices?.[0]?.message?.content?.trim() || prompt;

    console.log("prompt: Improved prompt", {
      original: prompt,
      improved: improvedPrompt,
    });
    return improvedPrompt;
  } catch (error) {
    console.log("prompt: Error improving prompt, using original", { error });
    return prompt;
  }
}
