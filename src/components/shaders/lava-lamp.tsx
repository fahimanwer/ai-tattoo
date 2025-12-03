import { Canvas, RoundedRect, Shader, vec } from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { LAVA_LAMP_SOURCE } from "./shaders-root";

const BORDER_RADIUS = 16;

export function LavaLamp() {
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
    <View style={StyleSheet.absoluteFill} onLayout={onLayout}>
      <Canvas style={StyleSheet.absoluteFill}>
        <RoundedRect
          x={0}
          y={0}
          width={size.width}
          height={size.height}
          r={BORDER_RADIUS}
        >
          <Shader source={LAVA_LAMP_SOURCE} uniforms={uniforms} />
        </RoundedRect>
      </Canvas>
    </View>
  );
}
