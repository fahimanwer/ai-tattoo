/**
 * Builds the layered prompt for image editing (modify existing tattoo).
 * User prompt is placed in L2; context (preserve vs substitute) is set by options.
 * L5 has FORBIDDEN before REQUIRED. L0 supports outputType (design_only | person_shot).
 */

import { buildLayeredPrompt } from "./build-layered-prompt";
import {
  getL0Persona,
  L0_FORBIDDEN,
  L0_REQUIRED,
  L1_FORBIDDEN,
  L1_REQUIRED,
  L2_FORBIDDEN,
  L2_REQUIRED,
  L4_FORBIDDEN,
  L4_REQUIRED,
  L5_FORBIDDEN,
  L5_HEADER_ONLY,
} from "./constants";
import type { ImageEditOptions } from "./types";

const EDIT_CONTEXT_PRESERVE =
  "Maintain the exact context, design, style, placement, and visual elements of the original image. Preserve all existing tattoo details, shapes, lines, and composition. Only apply the requested modifications while keeping everything else identical.";

const EDIT_CONTEXT_SUBSTITUTION =
  "The user wants to replace or change a subject or element. Apply the requested change while maintaining the same style, placement, size, composition, and artistic approach of the original tattoo. Keep the overall structure and design flow identical; only change the specific subject or element requested.";

/**
 * Returns a full layered prompt for Nano Banana Pro image editing (text + image).
 * If improvePrompt is false, returns the raw user prompt without layering (backward compatible).
 */
export function buildImageEditPrompt(
  userPrompt: string,
  options: ImageEditOptions & { improvePrompt?: boolean } = {}
): string {
  const {
    isSubstitutionRequest = false,
    improvePrompt = true,
    outputType = "person_shot",
  } = options;

  if (!improvePrompt) {
    return userPrompt.trim();
  }

  const contextLine = isSubstitutionRequest
    ? EDIT_CONTEXT_SUBSTITUTION
    : EDIT_CONTEXT_PRESERVE;
  const subjectContent = `${L2_FORBIDDEN}\n${L2_REQUIRED}\n\n${contextLine}\n\nUser request: ${userPrompt.trim()}`;
  const styleContent = `${L5_FORBIDDEN}\n${L5_HEADER_ONLY} Preserve or adapt the existing tattoo style according to the user request. Professional, realistic result.`;

  return buildLayeredPrompt([
    {
      id: 0,
      content: `${getL0Persona(outputType)}\n\n${L0_FORBIDDEN}\n${L0_REQUIRED}`,
    },
    {
      id: 1,
      content: `${L1_FORBIDDEN}\n${L1_REQUIRED}`,
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
