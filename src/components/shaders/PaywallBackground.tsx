import {
  Canvas,
  LinearGradient,
  Rect,
  Shader,
  vec,
} from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { Dimensions, LayoutChangeEvent, StyleSheet } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { LAVA_LAMP_SOURCE } from "./shaders-root";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const BACKGROUND_HEIGHT = SCREEN_HEIGHT * 0.6; // 50% of screen

export function PaywallBackground() {
  const [size, setSize] = useState({ width: 1, height: 1 });
  const time = useSharedValue(0);

  useEffect(() => {
    time.value = withRepeat(
      withTiming(1000, { duration: 1000000, easing: Easing.linear }),
      -1
    );
  }, [time]);

  const uniforms = useDerivedValue(
    () => ({
      time: time.value,
      size: vec(size.width, size.height),
    }),
    [time, size]
  );

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  };

  return (
    <Animated.View
      style={styles.container}
      onLayout={onLayout}
      entering={FadeIn.duration(2000)}
    >
      <Canvas style={StyleSheet.absoluteFill}>
        {/* Lava lamp shader */}
        <Rect x={0} y={0} width={size.width} height={size.height}>
          <Shader source={LAVA_LAMP_SOURCE} uniforms={uniforms} />
        </Rect>

        {/* Gradient overlay: transparent at top -> black at bottom */}
        <Rect x={0} y={0} width={size.width} height={size.height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(0, size.height)}
            colors={[
              "transparent",
              "rgba(0,0,0,0.2)",
              "rgba(0,0,0,0.6)",
              "rgba(0,0,0,0.9)",
            ]}
            positions={[0, 0.4, 0.75, 1]}
          />
        </Rect>
      </Canvas>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: BACKGROUND_HEIGHT,
  },
});
