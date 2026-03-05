/**
 * Flow type definitions for the Playground creative suite.
 * Each flow represents a distinct creative workflow.
 */

export type FlowType =
  | "generate"
  | "tryOn"
  | "aiPortrait"
  | "petPortrait"
  | "combine"
  | "selectAndEdit"
  | "upscale"
  | "erase";

/** Payload for generate flow (text-to-image / image-to-image) */
export interface GenerateFlowPayload {
  type: "generate";
}

/** Payload for try-on flow (overlay tattoo on body photo) */
export interface TryOnFlowPayload {
  type: "tryOn";
  tattooUri?: string;
  bodyUri?: string;
}

/** Payload for AI portrait flow */
export interface AiPortraitFlowPayload {
  type: "aiPortrait";
  sourceUri?: string;
  style?: PortraitStyle;
}

/** Payload for pet portrait flow */
export interface PetPortraitFlowPayload {
  type: "petPortrait";
  sourceUri?: string;
  style?: PortraitStyle;
}

/** Payload for combine flow (merge multiple images) */
export interface CombineFlowPayload {
  type: "combine";
  imageUris: string[];
}

/** Payload for select & edit (inpainting) flow */
export interface SelectAndEditFlowPayload {
  type: "selectAndEdit";
  sourceUri?: string;
  maskBase64?: string;
}

/** Payload for upscale flow */
export interface UpscaleFlowPayload {
  type: "upscale";
  sourceUri?: string;
}

/** Payload for erase flow */
export interface EraseFlowPayload {
  type: "erase";
  sourceUri?: string;
  maskBase64?: string;
}

/** Discriminated union of all flow payloads */
export type FlowPayload =
  | GenerateFlowPayload
  | TryOnFlowPayload
  | AiPortraitFlowPayload
  | PetPortraitFlowPayload
  | CombineFlowPayload
  | SelectAndEditFlowPayload
  | UpscaleFlowPayload
  | EraseFlowPayload;

/** Portrait style options shared by AI Portrait and Pet Portrait */
export type PortraitStyle =
  | "tattoo"
  | "sketch"
  | "watercolor"
  | "lineArt"
  | "blackwork"
  | "dotwork";
