import { useTheme } from "@/src/context/ThemeContext";
import { Canvas, Path, Skia } from "@shopify/react-native-skia";
import { useEffect, useMemo } from "react";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface CircleProgressProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
}

export function CircleProgress({
  progress,
  size = 44,
  strokeWidth = 3,
}: CircleProgressProps) {
  const { isDark } = useTheme();
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  const animatedProgress = useSharedValue(progress);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 400 });
  }, [progress, animatedProgress]);

  const backgroundPath = useMemo(() => {
    const path = Skia.Path.Make();
    path.addCircle(center, center, radius);
    return path;
  }, [center, radius]);

  const progressPath = useDerivedValue(() => {
    const path = Skia.Path.Make();
    const startAngle = -90; // Start from top
    const sweepAngle = animatedProgress.value * 360;

    path.addArc(
      {
        x: strokeWidth / 2,
        y: strokeWidth / 2,
        width: size - strokeWidth,
        height: size - strokeWidth,
      },
      startAngle,
      sweepAngle
    );

    return path;
  }, [animatedProgress, size, strokeWidth]);

  return (
    <Canvas style={{ width: size, height: size }}>
      {/* Background circle */}
      <Path
        path={backgroundPath}
        style="stroke"
        strokeWidth={strokeWidth}
        color={isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)"}
        strokeCap="round"
      />
      {/* Progress arc */}
      <Path
        path={progressPath}
        style="stroke"
        strokeWidth={strokeWidth}
        color={isDark ? "rgba(255, 255, 255, 1)" : "#3563E9"}
        strokeCap="round"
      />
    </Canvas>
  );
}
