/**
 * Builds a single prompt string from layer segments.
 * Layers are joined with double newlines. Each segment must start with [LAYER N — TITLE].
 * Order is strictly L0 → L1 → L2 → L3 → L4 → L5 (omit empty layers).
 */

import { LAYER_HEADERS, LAYER_SEPARATOR } from "./constants";

export type LayerSegment = {
  id: number;
  content: string;
};

/**
 * Assembles layer segments into one prompt. Ensures each segment has the correct
 * header and separates layers with LAYER_SEPARATOR (\n\n).
 */
export function buildLayeredPrompt(segments: LayerSegment[]): string {
  const sorted = [...segments].sort((a, b) => a.id - b.id);
  const parts = sorted
    .filter((s) => s.content.trim().length > 0)
    .map((s) => {
      const header = LAYER_HEADERS[s.id];
      const body = s.content.trim();
      return header ? `${header}\n${body}` : body;
    });
  return parts.join(LAYER_SEPARATOR);
}
