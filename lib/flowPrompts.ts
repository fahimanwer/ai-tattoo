/**
 * Flow-specific prompt templates for the Playground creative suite.
 * Each builder produces a complete prompt string for the Gemini image generation API.
 *
 * These run on the client side to build the prompt before sending to the
 * Convex action -- they are NOT server functions.
 */

import type { PortraitStyle } from "@/src/context/playground/flow-types";

const STYLE_DESCRIPTIONS: Record<PortraitStyle, string> = {
  tattoo: "classic tattoo style with bold outlines and solid fills",
  sketch: "pencil sketch style with visible pencil strokes and cross-hatching",
  watercolor:
    "watercolor painting style with soft washes, color bleeds, and organic edges",
  lineArt: "clean line art with elegant continuous lines and no fills",
  blackwork:
    "solid blackwork style with heavy black ink, bold shapes, and high contrast",
  dotwork: "intricate dotwork style built entirely from carefully placed dots",
};

/**
 * Build a prompt for converting a human portrait into a tattoo design.
 * The source image is sent alongside this text prompt.
 */
export function buildPortraitPrompt(style: PortraitStyle): string {
  const desc = STYLE_DESCRIPTIONS[style];

  return [
    `Convert this portrait into a ${desc} tattoo design.`,
    "Maintain the person's likeness and distinctive features",
    `while transforming the image into a beautiful, tattoo-ready ${style} artwork.`,
    "The result should look like a professional tattoo artist's design sheet,",
    "suitable for direct application as a tattoo.",
    "Keep the background clean and minimal so the portrait is the focal point.",
  ].join(" ");
}

/**
 * Build a prompt for converting a pet photo into a tattoo design.
 */
export function buildPetPortraitPrompt(style: PortraitStyle): string {
  const desc = STYLE_DESCRIPTIONS[style];

  return [
    `Convert this pet photo into a ${desc} tattoo design.`,
    "Preserve the pet's unique features and personality",
    `while creating a beautiful tattoo-ready ${style} design.`,
    "Capture the animal's character, expression, and distinguishing markings.",
    "The result should look like a professional tattoo design,",
    "suitable for direct application as a tattoo.",
    "Keep the background clean and minimal so the pet is the focal point.",
  ].join(" ");
}

/**
 * Build a prompt for combining two images into a single tattoo design.
 */
export function buildCombinePrompt(description?: string): string {
  const base = [
    "Combine these images into a single cohesive tattoo design.",
    "Merge the elements harmoniously, blending styles and subjects",
    "into one unified composition that works as a tattoo.",
  ].join(" ");

  if (description && description.trim().length > 0) {
    return `${base} Additional guidance: ${description.trim()}`;
  }

  return base;
}

/**
 * Build a prompt for upscaling / enhancing an image.
 */
export function buildUpscalePrompt(): string {
  return [
    "Upscale and enhance this tattoo design image.",
    "Increase the resolution and sharpness while preserving all original details.",
    "Refine linework, improve contrast, and sharpen edges.",
    "The output should be a higher-quality version of the exact same design",
    "with no changes to the composition, style, or subject matter.",
  ].join(" ");
}

/**
 * Build a prompt for erasing a tattoo from a photo.
 */
export function buildErasePrompt(): string {
  return [
    "Remove the tattoo from this photo completely.",
    "Restore the skin underneath to look natural, clean, and unmarked.",
    "Match the surrounding skin tone, texture, and lighting precisely.",
    "Keep the person, pose, background, and all other elements exactly the same.",
    "Only the tattooed area should change to show natural, untouched skin.",
  ].join(" ");
}

/**
 * Build a prompt for inpainting (select-and-edit) within a masked region.
 */
export function buildInpaintPrompt(editDescription: string): string {
  return `Edit the selected area of this image. The white areas in the mask indicate where to make changes. ${editDescription.trim()}. Keep the rest of the image unchanged.`;
}
