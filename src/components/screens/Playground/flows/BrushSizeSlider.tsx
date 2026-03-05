/**
 * BrushSizeSlider -- simple pure-RN track slider used by the
 * Select & Edit and Erase flows.  No external slider dependency.
 */

import { Text } from "@/src/components/ui/Text";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BrushSizeSliderProps {
  value: number;
  min: number;
  max: number;
  onValueChange: (v: number) => void;
  isDark: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function BrushSizeSlider({
  value,
  min,
  max,
  onValueChange,
  isDark,
}: BrushSizeSliderProps) {
  const { t } = useTranslation();
  const trackRef = useRef<View>(null);
  const layoutRef = useRef<{ x: number; width: number }>({
    x: 0,
    width: 1,
  });

  const fillColor = "#3563E9";
  const trackColor = isDark ? "#3f3f46" : "#d4d4d8";
  const pct = ((value - min) / (max - min)) * 100;

  const panGesture = Gesture.Pan()
    .onBegin((e) => {
      resolveValue(e.absoluteX);
    })
    .onUpdate((e) => {
      resolveValue(e.absoluteX);
    });

  const tapGesture = Gesture.Tap().onEnd((e) => {
    resolveValue(e.absoluteX);
  });

  function resolveValue(absoluteX: number) {
    const { x, width } = layoutRef.current;
    if (width <= 0) return;
    const rel = (absoluteX - x) / width;
    const clamped = Math.max(0, Math.min(1, rel));
    onValueChange(Math.round(min + clamped * (max - min)));
  }

  const composed = Gesture.Race(panGesture, tapGesture);

  return (
    <View style={styles.row}>
      <Text type="xs" style={{ opacity: 0.5, width: 64 }}>
        {t("flows.selectAndEdit.brushSize")}
      </Text>

      <GestureDetector gesture={composed}>
        <View
          ref={trackRef}
          style={styles.track}
          onLayout={(e) => {
            trackRef.current?.measureInWindow((x, _y, w) => {
              layoutRef.current = { x, width: w };
            });
          }}
        >
          <View
            style={[
              styles.fill,
              { width: `${pct}%`, backgroundColor: fillColor },
            ]}
          />
          <View
            style={[
              styles.bg,
              { width: `${100 - pct}%`, backgroundColor: trackColor },
            ]}
          />
          {/* Thumb indicator */}
          <View
            style={[
              styles.thumb,
              {
                left: `${pct}%`,
                backgroundColor: fillColor,
              },
            ]}
          />
        </View>
      </GestureDetector>

      <Text type="xs" weight="semibold" style={{ width: 28, textAlign: "center" }}>
        {value}
      </Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 4,
  },
  track: {
    flex: 1,
    height: 24,
    justifyContent: "center",
    position: "relative",
    flexDirection: "row",
    borderRadius: 3,
    overflow: "visible",
  },
  fill: {
    height: 6,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    alignSelf: "center",
  },
  bg: {
    height: 6,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    alignSelf: "center",
  },
  thumb: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: -10,
    top: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});
