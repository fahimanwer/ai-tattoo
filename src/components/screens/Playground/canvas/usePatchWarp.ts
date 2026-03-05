/**
 * usePatchWarp -- Manages Coons Patch state with 4 draggable corner points.
 *
 * When warp mode is active, the tattoo is rendered via Skia's <Patch>
 * component. Users can drag individual corners to deform the tattoo
 * for perspective-correct placement on curved body surfaces.
 *
 * All gesture callbacks run on the UI thread via shared values.
 * State updates are dispatched to JS via runOnJS.
 */

import { useState } from "react";
import { Gesture } from "react-native-gesture-handler";
import { runOnJS, useSharedValue } from "react-native-reanimated";
import type { CubicBezierHandle } from "@shopify/react-native-skia";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HIT_RADIUS = 30; // px -- how close a touch must be to grab a corner

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CornerTuple = [CubicBezierHandle, CubicBezierHandle, CubicBezierHandle, CubicBezierHandle];

export interface PatchWarpState {
  corners: CornerTuple;
  gesture: ReturnType<typeof Gesture.Pan>;
}

// ---------------------------------------------------------------------------
// Helper: create a straight-line CubicBezierHandle (no curve, just position)
// ---------------------------------------------------------------------------

function straightHandle(x: number, y: number): CubicBezierHandle {
  return {
    pos: { x, y },
    c1: { x, y },
    c2: { x, y },
  };
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * @param x - Left edge of the tattoo bounding rect
 * @param y - Top edge of the tattoo bounding rect
 * @param w - Width of the tattoo bounding rect
 * @param h - Height of the tattoo bounding rect
 */
export function usePatchWarp(
  x: number,
  y: number,
  w: number,
  h: number,
): PatchWarpState {
  // React state for rendering (read on JS thread)
  const [corners, setCorners] = useState<CornerTuple>(() => [
    straightHandle(x, y),
    straightHandle(x + w, y),
    straightHandle(x + w, y + h),
    straightHandle(x, y + h),
  ]);

  // Shared values for gesture callbacks (read/write on UI thread)
  // Store corner positions as flat array: [x0,y0, x1,y1, x2,y2, x3,y3]
  const cornerPositions = useSharedValue([
    x, y,
    x + w, y,
    x + w, y + h,
    x, y + h,
  ]);
  const activeCornerIdx = useSharedValue(-1);

  // Bridge: sync shared values -> React state (called via runOnJS)
  function syncCorners(positions: number[]) {
    setCorners([
      straightHandle(positions[0], positions[1]),
      straightHandle(positions[2], positions[3]),
      straightHandle(positions[4], positions[5]),
      straightHandle(positions[6], positions[7]),
    ]);
  }

  // Pan gesture for dragging individual corners
  const gesture = Gesture.Pan()
    .onStart((e) => {
      "worklet";
      // Find nearest corner within hit radius
      let bestIdx = -1;
      let bestDist = HIT_RADIUS;
      const p = cornerPositions.value;

      for (let i = 0; i < 4; i++) {
        const cx = p[i * 2];
        const cy = p[i * 2 + 1];
        const dx = e.x - cx;
        const dy = e.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }

      activeCornerIdx.value = bestIdx;
    })
    .onUpdate((e) => {
      "worklet";
      const idx = activeCornerIdx.value;
      if (idx < 0) return;

      // Update the corner position in shared value
      const next = [...cornerPositions.value];
      next[idx * 2] = e.x;
      next[idx * 2 + 1] = e.y;
      cornerPositions.value = next;

      // Sync to JS state for Skia rendering
      runOnJS(syncCorners)(next);
    })
    .onEnd(() => {
      "worklet";
      activeCornerIdx.value = -1;
    });

  return { corners, gesture };
}
