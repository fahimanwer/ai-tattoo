/**
 * useGestureTransform -- simultaneous Pan + Pinch + Rotation gestures
 * with double-tap reset, scale bounds, and rotation snapping.
 * Returns a composed gesture and transform state usable by Skia.
 */

import { useMemo, useState } from "react";
import { Gesture } from "react-native-gesture-handler";
import {
  runOnJS,
  useSharedValue,
  withSpring,
  type SharedValue,
} from "react-native-reanimated";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MIN_SCALE = 0.15;
const MAX_SCALE = 4.0;
const ROTATION_SNAP_DEG = 15;
const ROTATION_SNAP_THRESHOLD_DEG = 5;
const DEG_TO_RAD = Math.PI / 180;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GestureTransformValues {
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  scale: SharedValue<number>;
  rotation: SharedValue<number>;
}

export interface SkiaTransformState {
  translateX: number;
  translateY: number;
  scale: number;
  rotation: number;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useGestureTransform() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  // Saved state from previous gesture
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);
  const savedScale = useSharedValue(1);
  const savedRotation = useSharedValue(0);

  const [skiaTransform, setSkiaTransform] = useState<SkiaTransformState>({
    translateX: 0,
    translateY: 0,
    scale: 1,
    rotation: 0,
  });

  function syncSkiaTransform(next: SkiaTransformState) {
    setSkiaTransform(next);
  }

  // -----------------------------------------------------------------------
  // Pan gesture
  // -----------------------------------------------------------------------

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onStart(() => {
          savedTranslateX.value = translateX.value;
          savedTranslateY.value = translateY.value;
        })
        .onUpdate((e) => {
          translateX.value = savedTranslateX.value + e.translationX;
          translateY.value = savedTranslateY.value + e.translationY;
          runOnJS(syncSkiaTransform)({
            translateX: translateX.value,
            translateY: translateY.value,
            scale: scale.value,
            rotation: rotation.value,
          });
        })
        .onEnd(() => {
          runOnJS(syncSkiaTransform)({
            translateX: translateX.value,
            translateY: translateY.value,
            scale: scale.value,
            rotation: rotation.value,
          });
        }),
    [rotation, savedTranslateX, savedTranslateY, scale, syncSkiaTransform, translateX, translateY]
  );

  // -----------------------------------------------------------------------
  // Pinch gesture with scale bounds
  // -----------------------------------------------------------------------

  const pinchGesture = useMemo(
    () =>
      Gesture.Pinch()
        .onStart(() => {
          savedScale.value = scale.value;
        })
        .onUpdate((e) => {
          const raw = savedScale.value * e.scale;
          scale.value = Math.min(Math.max(raw, MIN_SCALE), MAX_SCALE);
          runOnJS(syncSkiaTransform)({
            translateX: translateX.value,
            translateY: translateY.value,
            scale: scale.value,
            rotation: rotation.value,
          });
        })
        .onEnd(() => {
          runOnJS(syncSkiaTransform)({
            translateX: translateX.value,
            translateY: translateY.value,
            scale: scale.value,
            rotation: rotation.value,
          });
        }),
    [rotation, savedScale, scale, syncSkiaTransform, translateX, translateY]
  );

  // -----------------------------------------------------------------------
  // Rotation gesture with snap-to-15-degrees on release
  // -----------------------------------------------------------------------

  const rotationGesture = useMemo(
    () =>
      Gesture.Rotation()
        .onStart(() => {
          savedRotation.value = rotation.value;
        })
        .onUpdate((e) => {
          rotation.value = savedRotation.value + e.rotation;
          runOnJS(syncSkiaTransform)({
            translateX: translateX.value,
            translateY: translateY.value,
            scale: scale.value,
            rotation: rotation.value,
          });
        })
        .onEnd(() => {
          // Snap to nearest 15-degree increment if within threshold
          const snapRad = ROTATION_SNAP_DEG * DEG_TO_RAD;
          const threshRad = ROTATION_SNAP_THRESHOLD_DEG * DEG_TO_RAD;
          const nearest = Math.round(rotation.value / snapRad) * snapRad;
          const diff = Math.abs(rotation.value - nearest);

          if (diff <= threshRad && diff > 0.001) {
            rotation.value = withSpring(nearest, { damping: 15, stiffness: 200 });
          }

          runOnJS(syncSkiaTransform)({
            translateX: translateX.value,
            translateY: translateY.value,
            scale: scale.value,
            rotation: rotation.value,
          });
        }),
    [rotation, savedRotation, scale, syncSkiaTransform, translateX, translateY]
  );

  // -----------------------------------------------------------------------
  // Double-tap to reset all transforms
  // -----------------------------------------------------------------------

  const doubleTapGesture = useMemo(
    () =>
      Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => {
          translateX.value = withSpring(0, { damping: 15, stiffness: 200 });
          translateY.value = withSpring(0, { damping: 15, stiffness: 200 });
          scale.value = withSpring(1, { damping: 15, stiffness: 200 });
          rotation.value = withSpring(0, { damping: 15, stiffness: 200 });

          // Reset saved values too
          savedTranslateX.value = 0;
          savedTranslateY.value = 0;
          savedScale.value = 1;
          savedRotation.value = 0;

          runOnJS(syncSkiaTransform)({
            translateX: 0,
            translateY: 0,
            scale: 1,
            rotation: 0,
          });
        }),
    [
      rotation, savedRotation, savedScale, savedTranslateX, savedTranslateY,
      scale, syncSkiaTransform, translateX, translateY,
    ]
  );

  // -----------------------------------------------------------------------
  // Compose: double-tap takes priority over simultaneous pan/pinch/rotate
  // -----------------------------------------------------------------------

  const simultaneousGesture = useMemo(
    () => Gesture.Simultaneous(panGesture, pinchGesture, rotationGesture),
    [panGesture, pinchGesture, rotationGesture]
  );

  const gesture = useMemo(
    () => Gesture.Exclusive(doubleTapGesture, simultaneousGesture),
    [doubleTapGesture, simultaneousGesture]
  );

  const values: GestureTransformValues = {
    translateX,
    translateY,
    scale,
    rotation,
  };

  return { gesture, values, skiaTransform };
}
