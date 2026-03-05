/**
 * Builds the layered prompt for text-to-image (tattoo generation from description).
 * User (or improved) prompt only in L2; presets: styleDescription → L5, bodyPartPlacement → L2.
 * L0 output type: design_only vs person_shot (mutually exclusive).
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
  L5_PATCHWORK_FORBIDDEN,
  L5_PATCHWORK_STYLE_DESCRIPTION,
} from "./constants";
import type { TextToImageOptions } from "./types";

/**
 * Returns a full layered prompt for Nano Banana Pro text-to-image.
 * Always tattoo-scoped. Order: L0 → L1 → L2 → L4 → L5.
 * Options: outputType (design_only | person_shot), aspectRatio (→ L1), styleDescription (→ L5), bodyPartPlacement (→ L2).
 */
export function buildTextToImagePrompt(
  userPrompt: string,
  options: TextToImageOptions = {}
): string {
  const trimmed = userPrompt.trim();
  const {
    outputType = "person_shot",
    aspectRatio,
    styleDescription,
    bodyPartPlacement,
  } = options;

  const mentionsPatchwork =
    /patchwork/i.test(trimmed) || /patchwork/i.test(styleDescription ?? "");

  const subjectParts = [
    L2_FORBIDDEN,
    L2_REQUIRED,
    "",
    "The tattoo to generate must match this description: " + trimmed,
  ];
  if (mentionsPatchwork) {
    subjectParts.push(
      "Patchwork means multiple separate tattoo pieces with visible bare skin between each; not quilt, fabric, stitching, or patches that touch."
    );
  }
  if (bodyPartPlacement?.trim()) {
    subjectParts.push("Placement: " + bodyPartPlacement.trim());
  }
  const subjectContent = subjectParts.join("\n");

  // L5: style rules only. Subject/description is in L2 — do not repeat user prompt here.
  const styleLines = [L5_FORBIDDEN, L5_HEADER_ONLY];
  if (mentionsPatchwork) {
    styleLines.push(L5_PATCHWORK_FORBIDDEN, L5_PATCHWORK_STYLE_DESCRIPTION);
  }
  if (styleDescription?.trim()) {
    styleLines.push(styleDescription.trim() + ".");
  }
  styleLines.push("Realistic tattoo presentation, professional quality.");
  const styleContent = styleLines.join("\n");

  let l1Content = `${L1_FORBIDDEN}\n${L1_REQUIRED}`;
  if (aspectRatio?.trim()) {
    l1Content += ` Aspect ratio must be ${aspectRatio.trim()}.`;
  }

  return buildLayeredPrompt([
    {
      id: 0,
      content: `${getL0Persona(outputType)}\n\n${L0_FORBIDDEN}\n${L0_REQUIRED}`,
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
