/**
 * BrushMaskCanvas -- Skia canvas for painting inpainting selection masks.
 *
 * Draws the source image dimmed as background, lets the user paint
 * white strokes over the regions to edit. Exports the mask as
 * white-on-black base64 via the imperative `captureMask()` handle.
 *
 * Uses react-native-gesture-handler Pan gesture (Skia v2+ compatible).
 */

import {
  Canvas,
  Image as SkiaImage,
  Group,
  Path,
  Skia,
  useImage,
  type SkPath,
} from "@shopify/react-native-skia";
import React, { useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BrushMaskCanvasProps {
  ref?: React.Ref<BrushMaskCanvasHandle>;
  imageUri: string;
  brushSize: number;
  onMaskReady: (maskBase64: string) => void;
  width: number;
  height: number;
}

export interface BrushMaskCanvasHandle {
  undo: () => void;
  clear: () => void;
  captureMask: () => void;
  hasStrokes: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function BrushMaskCanvas({
  ref,
  imageUri,
  brushSize,
  onMaskReady,
  width,
  height,
}: BrushMaskCanvasProps) {
  const sourceImage = useImage(imageUri);

  // Committed stroke history (for undo)
  const [paths, setPaths] = useState<SkPath[]>([]);

  // In-progress stroke while finger is down
  const livePathRef = useRef<SkPath | null>(null);
  const [livePath, setLivePath] = useState<SkPath | null>(null);

  const hasStrokes = paths.length > 0 || livePath !== null;

  // ----------------------------------------------------------------
  // Pan gesture -- accumulates points into Skia Paths
  // ----------------------------------------------------------------

  const panGesture = Gesture.Pan()
    .minDistance(0)
    .onBegin((e) => {
      const p = Skia.Path.Make();
      p.moveTo(e.x, e.y);
      livePathRef.current = p;
      setLivePath(p.copy());
    })
    .onUpdate((e) => {
      const p = livePathRef.current;
      if (!p) return;
      p.lineTo(e.x, e.y);
      setLivePath(p.copy());
    })
    .onEnd(() => {
      commitLivePath();
    })
    .onFinalize(() => {
      commitLivePath();
    });

  function commitLivePath() {
    const p = livePathRef.current;
    if (p) {
      setPaths((prev) => [...prev, p]);
    }
    livePathRef.current = null;
    setLivePath(null);
  }

  // ----------------------------------------------------------------
  // Imperative actions
  // ----------------------------------------------------------------

  const undo = () => {
    setPaths((prev) => prev.slice(0, -1));
  };

  const clear = () => {
    setPaths([]);
    setLivePath(null);
    livePathRef.current = null;
  };

  /**
   * Render white strokes on a black background (no source image)
   * and return the result as a base64 PNG string via `onMaskReady`.
   */
  const captureMask = () => {
    const surface = Skia.Surface.Make(width, height);
    if (!surface) return;

    const c = surface.getCanvas();

    // Black background
    const bgPaint = Skia.Paint();
    bgPaint.setColor(Skia.Color("black"));
    c.drawRect(Skia.XYWHRect(0, 0, width, height), bgPaint);

    // White brush strokes
    const strokePaint = Skia.Paint();
    strokePaint.setColor(Skia.Color("white"));
    strokePaint.setStyle(1); // Stroke
    strokePaint.setStrokeWidth(brushSize);
    strokePaint.setStrokeCap(1); // Round
    strokePaint.setStrokeJoin(1); // Round
    strokePaint.setAntiAlias(true);

    for (const p of paths) {
      c.drawPath(p, strokePaint);
    }

    surface.flush();
    const snapshot = surface.makeImageSnapshot();
    if (!snapshot) return;

    onMaskReady(snapshot.encodeToBase64());
  };

  useImperativeHandle(
    ref,
    () => ({ undo, clear, captureMask, hasStrokes }),
    [undo, clear, captureMask, hasStrokes]
  );

  // ----------------------------------------------------------------
  // Render
  // ----------------------------------------------------------------

  return (
    <View style={[styles.wrapper, { width, height }]}>
      <GestureDetector gesture={panGesture}>
        <Canvas style={{ width, height }}>
          {/* Dimmed source image as reference */}
          {sourceImage && (
            <Group opacity={0.45}>
              <SkiaImage
                image={sourceImage}
                x={0}
                y={0}
                width={width}
                height={height}
                fit="cover"
              />
            </Group>
          )}

          {/* Committed strokes */}
          {paths.map((p, i) => (
            <Path
              key={`s-${i}`}
              path={p}
              color="white"
              style="stroke"
              strokeWidth={brushSize}
              strokeCap="round"
              strokeJoin="round"
            />
          ))}

          {/* Live in-progress stroke */}
          {livePath && (
            <Path
              path={livePath}
              color="white"
              style="stroke"
              strokeWidth={brushSize}
              strokeCap="round"
              strokeJoin="round"
            />
          )}
        </Canvas>
      </GestureDetector>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#000",
  },
});
