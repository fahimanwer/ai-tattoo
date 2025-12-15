import { slog } from "@/lib/log";
import { constants } from "@/server-utils/constants";
import { z } from "zod";

const { OPENAI_API_KEY } = constants;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// Zod schema for request validation
const improvePromptSchema = z.object({
  prompt: z.string().min(1, "Prompt is required and cannot be empty"),
  hasExistingImage: z.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, hasExistingImage } = improvePromptSchema.parse(body);
    slog("prompt-improve+api", "Original prompt", { prompt });
    slog("prompt-improve+api", "Has existing image", { hasExistingImage });

    if (!OPENAI_API_KEY) {
      slog(
        "prompt-improve+api",
        "OPENAI_API_KEY not set, returning original prompt"
      );
      return new Response(JSON.stringify({ improvedPrompt: prompt }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Call OpenAI to improve the prompt
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a tattoo prompt enhancer and validator. Your job is to:
1. Transform the user's input into a detailed, optimized prompt for generating realistic tattoos
2. Ensure the prompt is appropriate and safe for tattoo generation
3. Add relevant artistic details (style, linework, shading, composition) if the input is vague
4. If the prompt references applying a tattoo to a person/photo, emphasize that the person, pose, and background must remain unchanged
5. If the prompt is for a standalone tattoo design, enhance it with style and artistic details
6. Output ONLY the improved prompt - no explanations, no quotes, no markdown formatting

${
  hasExistingImage
    ? `IMPORTANT CONTEXT: The user already has a generated tattoo image. Analyze the prompt carefully:

MODIFICATIONS (preserve design/subject, only change specific aspects):
- "add color" means: add vibrant colors to the existing tattoo design while maintaining its current design, style, placement, and subject matter
- "make it bigger" means: enlarge the existing tattoo design proportionally while keeping everything else identical
- "change style" means: modify the artistic style of the existing tattoo (e.g., from realistic to watercolor, from blackwork to colored) while keeping the same subject and design
- "add to [body part]" means: apply the existing tattoo design to the specified body part, maintaining the exact same design

SUBSTITUTIONS/REPLACEMENTS (change the main subject/element):
- "change [X] for [Y]" or "replace [X] with [Y]" means: replace the subject/element X with Y, but maintain the same style, placement, size, and overall composition
- "change for a [Y]" means: replace the current subject with Y, keeping style, placement, and composition the same
- When the user explicitly wants to change/replace the subject, DO preserve the style, placement, and composition, but DO change the subject as requested

If the prompt is clearly a new design request, treat it as such`
    : `CONTEXT: This is a new tattoo generation request. The user is creating a tattoo from scratch.`
}

Rules:
- Always describe realistic tattoos (never full image changes)
- Keep the improved prompt concise but detailed (1-3 sentences max)
- Maintain the user's original intent
- Ensure content is appropriate and safe`,
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
      const errorData = await response.json();
      slog("prompt-improve+api", "OpenAI API error", { response: errorData });
      // Fallback to original prompt if OpenAI fails
      return new Response(JSON.stringify({ improvedPrompt: prompt }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const improvedPrompt =
      data.choices?.[0]?.message?.content?.trim() || prompt;

    slog("prompt-improve+api", "Improved prompt", { improvedPrompt });

    return new Response(JSON.stringify({ improvedPrompt }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: "Invalid request",
          details: error.issues,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Handle other errors - fallback to original prompt
    slog("prompt-improve+api", "Error improving prompt", { error });
    try {
      const body = await request.json();
      const originalPrompt = body.prompt || "";
      return new Response(JSON.stringify({ improvedPrompt: originalPrompt }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      return new Response(JSON.stringify({ improvedPrompt: "" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}
