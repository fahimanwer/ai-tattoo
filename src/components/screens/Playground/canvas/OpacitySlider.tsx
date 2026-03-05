/**
 * OpacitySlider -- gesture-based slider for controlling tattoo overlay opacity.
 * Extracted from TattooOverlayCanvas for modularity.
 */

import { useTheme } from "@/src/context/ThemeContext";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const SLIDER_TRACK_HEIGHT = 6;
const SLIDER_THUMB_SIZE = 24;

export function OpacitySlider({
  value,
  onValueChange,
}: {
  value: number;
  onValueChange: (v: number) => void;
}) {
  const { isDark } = useTheme();
  const trackWidth = useSharedValue(0);
  const thumbX = useSharedValue(0);
  const savedX = useSharedValue(0);

  // Sync thumb position when value changes externally
  useEffect(() => {
    if (trackWidth.value > 0) {
      thumbX.value = value * trackWidth.value;
    }
  }, [thumbX, trackWidth, value]);

  const clamp = (v: number, min: number, max: number) => {
    "worklet";
    return Math.min(Math.max(v, min), max);
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      savedX.value = thumbX.value;
    })
    .onUpdate((e) => {
      const newX = clamp(savedX.value + e.translationX, 0, trackWidth.value);
      thumbX.value = newX;
      const normalised = trackWidth.value > 0 ? newX / trackWidth.value : 0;
      runOnJS(onValueChange)(Math.round(normalised * 100) / 100);
    });

  const tapGesture = Gesture.Tap().onEnd((e) => {
    const newX = clamp(e.x - SLIDER_THUMB_SIZE / 2, 0, trackWidth.value);
    thumbX.value = newX;
    const normalised = trackWidth.value > 0 ? newX / trackWidth.value : 0;
    runOnJS(onValueChange)(Math.round(normalised * 100) / 100);
  });

  const composedGesture = Gesture.Race(panGesture, tapGesture);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: thumbX.value }],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    width: thumbX.value + SLIDER_THUMB_SIZE / 2,
  }));

  const activeColor = isDark ? "#8B5CF6" : "#6D28D9";
  const inactiveColor = isDark ? "#3a3a3c" : "#d1d1d6";
  const thumbColor = isDark ? "#a78bfa" : "#7c3aed";

  return (
    <GestureDetector gesture={composedGesture}>
      <View
        style={styles.container}
        onLayout={(e) => {
          const w = e.nativeEvent.layout.width - SLIDER_THUMB_SIZE;
          trackWidth.value = w;
          thumbX.value = value * w;
        }}
      >
        {/* Track background */}
        <View
          style={[styles.track, { backgroundColor: inactiveColor }]}
        />
        {/* Filled portion */}
        <Animated.View
          style={[
            styles.trackFill,
            { backgroundColor: activeColor },
            fillStyle,
          ]}
        />
        {/* Thumb */}
        <Animated.View
          style={[
            styles.thumb,
            { backgroundColor: thumbColor },
            thumbStyle,
          ]}
        />
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    justifyContent: "center",
  },
  track: {
    position: "absolute",
    left: SLIDER_THUMB_SIZE / 2,
    right: SLIDER_THUMB_SIZE / 2,
    height: SLIDER_TRACK_HEIGHT,
    borderRadius: SLIDER_TRACK_HEIGHT / 2,
  },
  trackFill: {
    position: "absolute",
    left: 0,
    height: SLIDER_TRACK_HEIGHT,
    borderRadius: SLIDER_TRACK_HEIGHT / 2,
    top: "50%",
    marginTop: -SLIDER_TRACK_HEIGHT / 2,
  },
  thumb: {
    position: "absolute",
    width: SLIDER_THUMB_SIZE,
    height: SLIDER_THUMB_SIZE,
    borderRadius: SLIDER_THUMB_SIZE / 2,
    top: "50%",
    marginTop: -SLIDER_THUMB_SIZE / 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
});
