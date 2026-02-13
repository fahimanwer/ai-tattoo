import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { TAB_BAR, TAB_COLORS, TAB_SPRING } from "./tab-bar-constants";
import { TabBarIcon } from "./tab-bar-icons";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface TabBarItemProps {
  routeName: string;
  label: string;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

export function TabBarItem({
  routeName,
  label,
  isFocused,
  onPress,
  onLongPress,
}: TabBarItemProps) {
  const progress = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(isFocused ? 1 : 0, TAB_SPRING);
  }, [isFocused]);

  // Container: morphs between circle and pill
  const containerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [TAB_COLORS.inactiveCircle, TAB_COLORS.activePill]
    );

    // Circle → pill height stays the same, width is handled by flex parent
    return { backgroundColor };
  });

  // Label fades and slides in
  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0.3, 0.8],
      [0, 1],
      Extrapolation.CLAMP
    ),
    maxWidth: interpolate(
      progress.value,
      [0, 0.3, 1],
      [0, 0, 100],
      Extrapolation.CLAMP
    ),
    marginLeft: interpolate(
      progress.value,
      [0, 1],
      [0, TAB_BAR.PILL_GAP],
      Extrapolation.CLAMP
    ),
    transform: [
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [-6, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  // Inactive icon fades out
  const inactiveIconStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0, 0.4],
      [1, 0],
      Extrapolation.CLAMP
    ),
    position: "absolute" as const,
  }));

  // Active icon fades in
  const activeIconStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0.4, 0.8],
      [0, 1],
      Extrapolation.CLAMP
    ),
    position: "absolute" as const,
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.container, containerStyle]}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      accessibilityLabel={label}
    >
      {/* Icon with cross-fade between active/inactive colors */}
      <Animated.View style={styles.iconWrapper}>
        <Animated.View style={inactiveIconStyle}>
          <TabBarIcon
            routeName={routeName}
            color={TAB_COLORS.inactiveIcon}
            size={TAB_BAR.ICON_SIZE}
          />
        </Animated.View>
        <Animated.View style={activeIconStyle}>
          <TabBarIcon
            routeName={routeName}
            color={TAB_COLORS.activeIcon}
            size={TAB_BAR.ICON_SIZE}
          />
        </Animated.View>
      </Animated.View>

      {/* Label - animated width prevents overflow */}
      <Animated.Text
        style={[styles.label, labelStyle]}
        numberOfLines={1}
        allowFontScaling={false}
      >
        {label}
      </Animated.Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: TAB_BAR.PILL_HEIGHT,
    borderRadius: TAB_BAR.PILL_BORDER_RADIUS,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: TAB_BAR.PILL_PADDING_HORIZONTAL,
    alignSelf: "center",
  },
  iconWrapper: {
    width: TAB_BAR.ICON_SIZE,
    height: TAB_BAR.ICON_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: TAB_BAR.LABEL_FONT_SIZE,
    fontWeight: TAB_BAR.LABEL_FONT_WEIGHT,
    lineHeight: TAB_BAR.LABEL_LINE_HEIGHT,
    color: TAB_COLORS.activeLabel,
    overflow: "hidden",
  },
});
