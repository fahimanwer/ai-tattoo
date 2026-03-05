/**
 * Prompt layer types for the Nano Banana Pro layered prompt system.
 * All prompts are tattoo-scoped (AI tattoo generator context).
 * Preset mapping: style → L5, body part/placement → L2, aspect ratio → L1.
 */

export type LayerId = 0 | 1 | 2 | 3 | 4 | 5;

export type PromptMode = "text-to-image" | "image-edit" | "combine-two-images";

/** Mutually exclusive output type for L0 (Design Only vs Person Shot). */
export type OutputType = "design_only" | "person_shot";

/** Options when building a combine-two-images (tattoo on body) prompt */
export interface CombineTwoImagesOptions {
  /** Tattoo color: black and white only, or full color */
  colorOption?: "blackwhite" | "color";
  /** Optional user instructions appended to L5 (style layer). */
  customInstructions?: string;
  /** Aspect ratio for L1 consistency (e.g. "1:1", "16:9"). When set, L1 text reflects it. */
  aspectRatio?: string;
}

/** Options when building an image-edit prompt (modify existing tattoo) */
export interface ImageEditOptions {
  /** Whether the user prompt is a substitution request (replace X with Y) */
  isSubstitutionRequest?: boolean;
  /** Output type: design only vs person shot. Default person_shot. */
  outputType?: OutputType;
}

/** Options when building a text-to-image prompt. Presets map to layers without overlap. */
export interface TextToImageOptions {
  /** Mutually exclusive: standalone design vs tattoo on body. Default person_shot. */
  outputType?: OutputType;
  /** Aspect ratio for L1 (e.g. "1:1", "16:9"). Keeps L1 consistent with API generationConfig. */
  aspectRatio?: string;
  /** Style preset → L5 only. When provided, merged with user prompt in style layer. */
  styleDescription?: string;
  /** Body part / placement preset → L2 only. When provided, merged with user prompt in subject layer. */
  bodyPartPlacement?: string;
}
