/**
 * Layered prompt system for Nano Banana Pro (AI tattoo generator).
 * All prompts are tattoo-scoped. Layers follow L0 (Base) → L5 (Style)
 * with FORBIDDEN before REQUIRED per layer.
 */

export { buildTextToImagePrompt } from "./build-text-to-image";
export { buildImageEditPrompt } from "./build-image-edit";
export { buildCombineTwoImagesPrompt } from "./build-combine-two-images";
export { buildLayeredPrompt } from "./build-layered-prompt";
export type { LayerSegment } from "./build-layered-prompt";

export type {
  CombineTwoImagesOptions,
  ImageEditOptions,
  LayerId,
  OutputType,
  PromptMode,
  TextToImageOptions,
} from "./types";

export { getL0Persona } from "./constants";

export { LAYER_HEADERS, LAYER_SEPARATOR } from "./constants";
