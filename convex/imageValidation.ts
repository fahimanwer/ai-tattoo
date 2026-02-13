/**
 * Image validation utilities using OpenRouter GPT-4o-mini Vision API.
 */

import { getOpenRouterApiKey, extractMimeAndData } from "./geminiUtils";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

type ValidationResult = { valid: true } | { valid: false; error: string };

/**
 * Validates that images don't contain animals using GPT-4o-mini Vision API.
 */
export async function validateNoAnimals(
  images_base64: string[]
): Promise<ValidationResult> {
  const OPENROUTER_API_KEY = getOpenRouterApiKey();

  if (!OPENROUTER_API_KEY) {
    console.log(
      "imageValidation: OPENROUTER_API_KEY not set, skipping animal validation"
    );
    return { valid: true };
  }

  for (const imageBase64 of images_base64) {
    const { mime_type, data } = extractMimeAndData(imageBase64);

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
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Does this image contain any animals, pets, or wildlife? Answer only 'yes' or 'no'.",
                },
                {
                  type: "image_url",
                  image_url: { url: `data:${mime_type};base64,${data}` },
                },
              ],
            },
          ],
          max_tokens: 10,
        }),
      });

      if (!response.ok) {
        console.log(
          "imageValidation: OpenRouter API error during animal validation",
          { status: response.status }
        );
        continue;
      }

      const result = await response.json();
      const answer =
        result.choices?.[0]?.message?.content?.toLowerCase().trim() || "";

      if (answer.includes("yes")) {
        return {
          valid: false,
          error:
            "Images containing animals are not allowed. Please use photos of human body parts only.",
        };
      }
    } catch (error) {
      console.log("imageValidation: Error validating animal detection", {
        error,
      });
      continue;
    }
  }

  return { valid: true };
}

/**
 * Validates that images contain human body parts using GPT-4o-mini Vision API.
 */
export async function validateHumanBodyParts(
  images_base64: string[]
): Promise<ValidationResult> {
  const OPENROUTER_API_KEY = getOpenRouterApiKey();

  if (!OPENROUTER_API_KEY) {
    console.log(
      "imageValidation: OPENROUTER_API_KEY not set, skipping human body validation"
    );
    return { valid: true };
  }

  for (const imageBase64 of images_base64) {
    const { mime_type, data } = extractMimeAndData(imageBase64);

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
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Does this image show a human body part (arm, leg, back, chest, shoulder, etc.) where a tattoo could be placed? Answer only 'yes' or 'no'. Do not count nature scenes, landscapes, waterfalls, animals, objects, or abstract images as body parts.",
                },
                {
                  type: "image_url",
                  image_url: { url: `data:${mime_type};base64,${data}` },
                },
              ],
            },
          ],
          max_tokens: 10,
        }),
      });

      if (!response.ok) {
        console.log(
          "imageValidation: OpenRouter API error during human body validation",
          { status: response.status }
        );
        continue;
      }

      const result = await response.json();
      const answer =
        result.choices?.[0]?.message?.content?.toLowerCase().trim() || "";

      if (!answer.includes("yes")) {
        return {
          valid: false,
          error:
            "Please use photos of human body parts only. Images of nature, landscapes, objects, or other non-body content are not allowed.",
        };
      }
    } catch (error) {
      console.log("imageValidation: Error validating human body parts", {
        error,
      });
      continue;
    }
  }

  return { valid: true };
}
