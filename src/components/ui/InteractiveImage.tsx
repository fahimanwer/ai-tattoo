import { BLURHASH } from "@/lib/image-cache";
import { Image, ImageProps } from "expo-image";
import React from "react";
import { Dimensions, StyleSheet, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface InteractiveImageProps {
  uri: string;
  style?: ViewStyle;
  minScale?: number;
  maxScale?: number;
  placeholder?: ImageProps["placeholder"];
}

// Spring configuration for smooth, natural animations like iPhone Photos
const SPRING_CONFIG = {
  damping: 20,
  stiffness: 300,
  mass: 0.5,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

const TIMING_CONFIG = {
  duration: 300,
};

export function InteractiveImage({
  uri,
  style,
  minScale = 1,
  maxScale = 4,
  placeholder = { blurhash: BLURHASH },
}: InteractiveImageProps) {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);
  const originX = useSharedValue(0);
  const originY = useSharedValue(0);

  const containerWidth = SCREEN_WIDTH;
  const containerHeight = SCREEN_HEIGHT;

  const clampTranslation = (
    x: number,
    y: number,
    scaleValue: number
  ): { x: number; y: number } => {
    "worklet";

    // If scale is 1 or less, no translation allowed
    if (scaleValue <= 1) {
      return { x: 0, y: 0 };
    }

    // Calculate the bounds based on current scale
    const scaledWidth = containerWidth * scaleValue;
    const scaledHeight = containerHeight * scaleValue;

    const maxTranslateX = Math.max(0, (scaledWidth - containerWidth) / 2);
    const maxTranslateY = Math.max(0, (scaledHeight - containerHeight) / 2);

    // Clamp to bounds
    const clampedX = Math.min(Math.max(x, -maxTranslateX), maxTranslateX);
    const clampedY = Math.min(Math.max(y, -maxTranslateY), maxTranslateY);

    return { x: clampedX, y: clampedY };
  };

  const reset = () => {
    "worklet";
    scale.value = withSpring(1, SPRING_CONFIG);
    translateX.value = withSpring(0, SPRING_CONFIG);
    translateY.value = withSpring(0, SPRING_CONFIG);
    savedScale.value = 1;
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
  };

  const panGesture = Gesture.Pan()
    .averageTouches(true)
    .enableTrackpadTwoFingerGesture(true)
    .maxPointers(2)
    .onStart(() => {
      cancelAnimation(translateX);
      cancelAnimation(translateY);
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate((e) => {
      // Only allow panning when zoomed in
      if (savedScale.value > 1) {
        const newX = savedTranslateX.value + e.translationX;
        const newY = savedTranslateY.value + e.translationY;

        translateX.value = newX;
        translateY.value = newY;
      }
    })
    .onEnd((e) => {
      if (scale.value > 1) {
        // Apply velocity for momentum
        const velocityFactor = 0.2;
        let targetX = translateX.value + e.velocityX * velocityFactor;
        let targetY = translateY.value + e.velocityY * velocityFactor;

        // Clamp to bounds
        const clamped = clampTranslation(targetX, targetY, scale.value);

        translateX.value = withSpring(clamped.x, SPRING_CONFIG);
        translateY.value = withSpring(clamped.y, SPRING_CONFIG);

        savedTranslateX.value = clamped.x;
        savedTranslateY.value = clamped.y;
      }
    });

  const pinchGesture = Gesture.Pinch()
    .onStart((e) => {
      cancelAnimation(scale);
      cancelAnimation(translateX);
      cancelAnimation(translateY);

      savedScale.value = scale.value;

      // Store the focal point relative to container center
      originX.value = e.focalX - containerWidth / 2;
      originY.value = e.focalY - containerHeight / 2;

      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate((e) => {
      const newScale = savedScale.value * e.scale;

      // Allow slight overscaling for better feel, but clamp reasonably
      const clampedScale = Math.max(
        minScale * 0.85,
        Math.min(newScale, maxScale * 1.1)
      );

      scale.value = clampedScale;

      // Focal point zoom: adjust translation to keep focal point stable
      // The idea is that the point under the fingers should stay under the fingers
      const scaleDiff = clampedScale - savedScale.value;

      // Adjust translation based on where the focal point is
      // This creates the effect of zooming "into" the focal point
      const newTranslateX = savedTranslateX.value - originX.value * scaleDiff;
      const newTranslateY = savedTranslateY.value - originY.value * scaleDiff;

      translateX.value = newTranslateX;
      translateY.value = newTranslateY;
    })
    .onEnd(() => {
      // Snap back if out of bounds
      if (scale.value < minScale) {
        reset();
      } else if (scale.value > maxScale) {
        // Calculate the scale difference to adjust translations proportionally
        const scaleRatio = maxScale / scale.value;

        scale.value = withSpring(maxScale, SPRING_CONFIG);
        translateX.value = withSpring(
          translateX.value * scaleRatio,
          SPRING_CONFIG
        );
        translateY.value = withSpring(
          translateY.value * scaleRatio,
          SPRING_CONFIG
        );

        savedScale.value = maxScale;
      } else {
        // Clamp translations to valid bounds
        const clamped = clampTranslation(
          translateX.value,
          translateY.value,
          scale.value
        );

        if (
          Math.abs(clamped.x - translateX.value) > 1 ||
          Math.abs(clamped.y - translateY.value) > 1
        ) {
          translateX.value = withSpring(clamped.x, SPRING_CONFIG);
          translateY.value = withSpring(clamped.y, SPRING_CONFIG);
        }

        savedScale.value = scale.value;
        savedTranslateX.value = clamped.x;
        savedTranslateY.value = clamped.y;
      }
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .maxDuration(250)
    .onEnd((e) => {
      if (scale.value > 1.1) {
        // Already zoomed in, reset
        reset();
      } else {
        // Zoom in to 2.5x centered on tap point
        const targetScale = Math.min(2.5, maxScale);

        // Calculate where the tap is relative to center
        const tapX = e.x - containerWidth / 2;
        const tapY = e.y - containerHeight / 2;

        // We want to move the tap point to the center
        // Translation needed = -tapPosition * (scale - 1)
        const targetX = -tapX * (targetScale - 1);
        const targetY = -tapY * (targetScale - 1);

        // Clamp to valid bounds
        const clamped = clampTranslation(targetX, targetY, targetScale);

        scale.value = withTiming(targetScale, TIMING_CONFIG);
        translateX.value = withTiming(clamped.x, TIMING_CONFIG);
        translateY.value = withTiming(clamped.y, TIMING_CONFIG);

        savedScale.value = targetScale;
        savedTranslateX.value = clamped.x;
        savedTranslateY.value = clamped.y;
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  // Use Race for double-tap to prevent interference, and Simultaneous for pinch+pan
  const pinchPanGesture = Gesture.Simultaneous(pinchGesture, panGesture);
  const composed = Gesture.Race(doubleTapGesture, pinchPanGesture);

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={[styles.container, style]}>
        <Animated.View style={[styles.imageContainer, animatedStyle]}>
          <Image
            source={{ uri }}
            style={styles.image}
            contentFit="contain"
            cachePolicy="memory-disk"
            transition={200}
            placeholder={placeholder}
          />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
