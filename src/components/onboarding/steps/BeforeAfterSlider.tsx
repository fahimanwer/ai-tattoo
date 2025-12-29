import * as NativeCoreHaptics from "@/modules/native-core-haptics";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import type { BeforeAfterImagePair } from "../onboardingTypes";
import { SliderHandle } from "./SliderHandle";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const HANDLE_SIZE = 44;
const LINE_WIDTH = 2;
const AUTO_ROTATE_INTERVAL = 5000; // 5 seconds
const CROSSFADE_DURATION = 1000; // 1 second crossfade
const HAPTIC_TICK_INTERVAL = 40; // pixels between haptic ticks

type BeforeAfterSliderProps = {
  imagePairs: BeforeAfterImagePair[];
};

// Haptic feedback functions
const playDragStartHaptic = () => {
  NativeCoreHaptics.default.impact(0.3, 0.4);
};

const playDragTickHaptic = () => {
  NativeCoreHaptics.default.impact(0.15, 0.2);
};

const playDragEndHaptic = () => {
  NativeCoreHaptics.default.impact(0.25, 0.35);
};

export function BeforeAfterSlider({ imagePairs }: BeforeAfterSliderProps) {
  // Slider position (0 = left edge, SCREEN_WIDTH = right edge)
  const sliderX = useSharedValue(SCREEN_WIDTH / 2);
  const savedSliderX = useSharedValue(SCREEN_WIDTH / 2);
  const lastHapticX = useSharedValue(SCREEN_WIDTH / 2);

  // Two-layer system: layer A and layer B alternate
  // When layerAActive is 1, layer A is visible; when 0, layer B is visible
  const layerAOpacity = useSharedValue(1);

  // Random initial index
  const initialIndex = useMemo(
    () => Math.floor(Math.random() * imagePairs.length),
    [imagePairs.length]
  );

  // State for the two layers
  const [layerAIndex, setLayerAIndex] = useState(initialIndex);
  const [layerBIndex, setLayerBIndex] = useState(
    (initialIndex + 1) % imagePairs.length
  );
  const [isLayerAActive, setIsLayerAActive] = useState(true);

  // Ref to track current state for interval
  const stateRef = useRef({ layerAIndex, layerBIndex, isLayerAActive });
  stateRef.current = { layerAIndex, layerBIndex, isLayerAActive };

  // Prefetch all images on mount
  useEffect(() => {
    imagePairs.forEach((pair) => {
      Image.prefetch(pair.before);
      Image.prefetch(pair.after);
    });
  }, [imagePairs]);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      const { layerAIndex, layerBIndex, isLayerAActive } = stateRef.current;

      if (isLayerAActive) {
        // Layer A is visible, fade to layer B
        // Layer B already has the next image, just crossfade
        layerAOpacity.value = withTiming(
          0,
          {
            duration: CROSSFADE_DURATION,
            easing: Easing.inOut(Easing.ease),
          },
          (finished) => {
            if (finished) {
              // Prepare layer A with the next image for the following transition
              const nextIndex = (layerBIndex + 1) % imagePairs.length;
              runOnJS(setLayerAIndex)(nextIndex);
              runOnJS(setIsLayerAActive)(false);
            }
          }
        );
      } else {
        // Layer B is visible, fade to layer A
        layerAOpacity.value = withTiming(
          1,
          {
            duration: CROSSFADE_DURATION,
            easing: Easing.inOut(Easing.ease),
          },
          (finished) => {
            if (finished) {
              // Prepare layer B with the next image for the following transition
              const nextIndex = (layerAIndex + 1) % imagePairs.length;
              runOnJS(setLayerBIndex)(nextIndex);
              runOnJS(setIsLayerAActive)(true);
            }
          }
        );
      }
    }, AUTO_ROTATE_INTERVAL);

    return () => clearInterval(interval);
  }, [imagePairs.length, layerAOpacity]);

  // Pan gesture for the slider handle
  const panGesture = Gesture.Pan()
    .onStart(() => {
      cancelAnimation(sliderX);
      savedSliderX.value = sliderX.value;
      lastHapticX.value = sliderX.value;
      runOnJS(playDragStartHaptic)();
    })
    .onUpdate((e) => {
      const newX = savedSliderX.value + e.translationX;
      // Clamp to screen bounds
      sliderX.value = Math.min(Math.max(newX, 0), SCREEN_WIDTH);

      // Play tick haptic at regular intervals
      const distanceSinceLastHaptic = Math.abs(
        sliderX.value - lastHapticX.value
      );
      if (distanceSinceLastHaptic >= HAPTIC_TICK_INTERVAL) {
        lastHapticX.value = sliderX.value;
        runOnJS(playDragTickHaptic)();
      }
    })
    .onEnd(() => {
      savedSliderX.value = sliderX.value;
      runOnJS(playDragEndHaptic)();
    });

  // Animated style for the "after" image clip container
  const afterClipStyle = useAnimatedStyle(() => ({
    width: sliderX.value,
  }));

  // Animated style for the slider line position
  const lineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sliderX.value - LINE_WIDTH / 2 }],
  }));

  // Animated style for the handle position
  const handleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sliderX.value - HANDLE_SIZE / 2 }],
  }));

  // Animated styles for layer opacities
  const layerAStyle = useAnimatedStyle(() => ({
    opacity: layerAOpacity.value,
  }));

  const layerBStyle = useAnimatedStyle(() => ({
    opacity: 1 - layerAOpacity.value,
  }));

  // Get image pairs for both layers
  const layerAPair = imagePairs[layerAIndex];
  const layerBPair = imagePairs[layerBIndex];

  return (
    <View style={styles.container}>
      {/* ===== BEFORE IMAGES (full screen base layer) ===== */}

      {/* Layer B - Before (bottom) */}
      <Animated.View style={[styles.fullScreen, layerBStyle]}>
        <Image
          source={{ uri: layerBPair?.before }}
          style={styles.image}
          contentFit="cover"
          transition={0}
        />
      </Animated.View>

      {/* Layer A - Before (top) */}
      <Animated.View style={[styles.fullScreen, layerAStyle]}>
        <Image
          source={{ uri: layerAPair?.before }}
          style={styles.image}
          contentFit="cover"
          transition={0}
        />
      </Animated.View>

      {/* ===== AFTER IMAGES (clipped from left to slider position) ===== */}
      <Animated.View style={[styles.afterContainer, afterClipStyle]}>
        {/* Layer B - After (bottom) */}
        <Animated.View style={[styles.afterInner, layerBStyle]}>
          <Image
            source={{ uri: layerBPair?.after }}
            style={[styles.image, { width: SCREEN_WIDTH }]}
            contentFit="cover"
            transition={0}
          />
        </Animated.View>

        {/* Layer A - After (top) */}
        <Animated.View style={[styles.afterInner, layerAStyle]}>
          <Image
            source={{ uri: layerAPair?.after }}
            style={[styles.image, { width: SCREEN_WIDTH }]}
            contentFit="cover"
            transition={0}
          />
        </Animated.View>
      </Animated.View>

      {/* Vertical divider line */}
      <Animated.View style={[styles.line, lineStyle]} pointerEvents="none" />

      {/* Draggable handle */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.handleWrapper, handleStyle]}>
          <SliderHandle size={HANDLE_SIZE} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  afterContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: SCREEN_HEIGHT,
    overflow: "hidden",
  },
  afterInner: {
    position: "absolute",
    top: 0,
    left: 0,
    height: SCREEN_HEIGHT,
  },
  line: {
    position: "absolute",
    top: 0,
    left: 0,
    width: LINE_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "white",
  },
  handleWrapper: {
    position: "absolute",
    top: "40%",
    left: 0,
    marginTop: -HANDLE_SIZE / 2,
    zIndex: 2,
  },
});
