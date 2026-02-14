import { useTheme } from "@/src/context/ThemeContext";
import { Canvas, RoundedRect, Shader, vec } from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { LayoutChangeEvent, StyleSheet } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { LAVA_LAMP_DARK_SOURCE, LAVA_LAMP_LIGHT_SOURCE } from "./shaders-root";

const BORDER_RADIUS = 16;

export function LavaLamp() {
  const { isDark } = useTheme();
  const [size, setSize] = useState({ width: 1, height: 1 });
  const time = useSharedValue(0);
  const shaderSource = isDark ? LAVA_LAMP_DARK_SOURCE : LAVA_LAMP_LIGHT_SOURCE;

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
      style={StyleSheet.absoluteFill}
      onLayout={onLayout}
      entering={FadeIn.duration(2_000)}
    >
      <Canvas style={StyleSheet.absoluteFill}>
        <RoundedRect
          x={0}
          y={0}
          width={size.width}
          height={size.height}
          r={BORDER_RADIUS}
        >
          <Shader source={shaderSource} uniforms={uniforms} />
        </RoundedRect>
      </Canvas>
    </Animated.View>
  );
}
