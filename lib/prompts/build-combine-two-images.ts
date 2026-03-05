/**
 * Builds the layered prompt for combine-two-images (tattoo from one image
 * applied onto body part from another). Always person shot. L5 has FORBIDDEN before REQUIRED.
 * Optional aspectRatio → L1 for consistency with API generationConfig.
 */

import { buildLayeredPrompt } from "./build-layered-prompt";
import {
  L0_FORBIDDEN,
  L0_PERSONA,
  L0_REQUIRED,
  L1_FORBIDDEN,
  L1_REQUIRED,
  L2_FORBIDDEN,
  L4_FORBIDDEN,
  L4_REQUIRED,
  L5_BLACK_WHITE_TATTOO_ONLY,
  L5_FORBIDDEN,
} from "./constants";
import type { CombineTwoImagesOptions } from "./types";

const COMBINE_L2_REQUIRED = `
You will receive two images in any order: one shows a tattoo on skin (Tattoo Source), the other shows a body part without a tattoo (Target Body). Identify each image automatically. The result must show a single body part only (e.g. one arm, one leg)—no double limbs, no crossed arms from two people, no anatomy fading or dissolving into the background or paper; the skin must have clear, defined edges and stay solid against the background. Output must be exactly one composition: the tattoo applied once on the body part; never duplicate or repeat the same design side-by-side or mirrored in one image—never two images in one. The body part must be unmistakably identifiable as that specific part (forearm, upper arm, calf, thigh, etc.): anatomy must read clearly so the viewer knows at once if it is an arm (with flow toward wrist/hand or shoulder), a leg (with flow toward knee, calf, ankle or thigh), or another region, with realistic proportions and anatomical logic.

REQUIRED: From the Tattoo Source, extract only the tattoo design; remove all skin, lighting, shadows, and body context so the tattoo is a clean, flat reference. From the Target Body, select the most visible, unobstructed, naturally exposed skin area (one body part only). Apply the tattoo onto that skin so it appears fully integrated: conform to body anatomy, muscle flow, and natural skin curvature; wrap and subtly distort with folds, tension, and stretch zones so it never looks flat. Preserve all skin details such as pores, hair, texture, wrinkles, and color variation. The body part must remain clearly defined with sharp edges; do not let the anatomy blur, fade, or merge into the background. Blend the tattoo as a fresh but healed piece with very subtle edge redness, natural ink diffusion into pores, matte low-shine ink finish, slight desaturation in stretched areas, and realistic opacity based on lighting. Match the exact lighting of the Target Body in direction, softness, shadows, color temperature, and exposure. No floating, overlay artifacts, or mismatched shadows. Preserve the original framing and camera distance of the Target Body; no zoom, crop, pan, or perspective change. Only modify the skin by integrating the tattoo; all other pixels must remain compositionally identical. Output only the tattooed skin region in ultra-high resolution with realistic depth and texture.
`.trim();

/**
 * Returns a full layered prompt for the combine-two-images flow.
 * Options: color, custom instructions, aspectRatio (→ L1).
 */
export function buildCombineTwoImagesPrompt(
  options: CombineTwoImagesOptions = {}
): string {
  const { colorOption = "color", customInstructions, aspectRatio } = options;

  const colorLine =
    colorOption === "blackwhite"
      ? L5_BLACK_WHITE_TATTOO_ONLY
      : "The tattoo design must keep its original colors and vibrancy. Preserve the natural skin tone and coloring of the target body.";

  let styleContent = `${L5_FORBIDDEN}\nREQUIRED: ${colorLine}.`;
  if (customInstructions?.trim()) {
    styleContent += ` Additional instructions: ${customInstructions.trim()}.`;
  }

  const subjectContent = `${L2_FORBIDDEN}\n${COMBINE_L2_REQUIRED}`;

  let l1Content = `${L1_FORBIDDEN}\n${L1_REQUIRED}`;
  if (aspectRatio?.trim()) {
    l1Content += ` Aspect ratio must be ${aspectRatio.trim()}.`;
  }

  return buildLayeredPrompt([
    {
      id: 0,
      content: `${L0_PERSONA}\n\n${L0_FORBIDDEN}\n${L0_REQUIRED}`,
    },
    {
      id: 1,
      content: l1Content,
    },
    {
      id: 2,
      content: subjectContent,
    },
    {
      id: 4,
      content: `${L4_FORBIDDEN}\n${L4_REQUIRED}`,
    },
    {
      id: 5,
      content: styleContent,
    },
  ]);
}
