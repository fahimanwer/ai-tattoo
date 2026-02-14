import { useCallback, useEffect, useState } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { TAB_BAR, TAB_SPRING, useTabColors } from "./tab-bar-constants";
import { TabBarBackground } from "./TabBarBackground";
import { TabBarItem } from "./TabBarItem";
import { CameraFAB } from "./CameraFAB";

const CAMERA_ROUTE = "camera-view";

// Animated wrapper that grows/shrinks based on active state
function TabSlot({
  children,
  isActive,
}: {
  children: React.ReactNode;
  isActive: boolean;
}) {
  const flex = useSharedValue(isActive ? TAB_BAR.ACTIVE_FLEX : TAB_BAR.INACTIVE_FLEX);

  useEffect(() => {
    flex.value = withSpring(
      isActive ? TAB_BAR.ACTIVE_FLEX : TAB_BAR.INACTIVE_FLEX,
      TAB_SPRING
    );
  }, [isActive]);

  const style = useAnimatedStyle(() => ({
    flex: flex.value,
  }));

  return (
    <Animated.View style={[styles.tabSlot, style]}>{children}</Animated.View>
  );
}

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets();
  const [barWidth, setBarWidth] = useState(0);
  const isCameraActive = state.routes[state.index]?.name === CAMERA_ROUTE;
  const tabColors = useTabColors();

  const visibleRoutes = state.routes.filter((r) => r.name !== CAMERA_ROUTE);
  const cameraRoute = state.routes.find((r) => r.name === CAMERA_ROUTE);

  // Split: 2 left of notch, 2 right
  const leftRoutes = visibleRoutes.slice(0, 2);
  const rightRoutes = visibleRoutes.slice(2);

  const onBarLayout = useCallback((e: LayoutChangeEvent) => {
    setBarWidth(e.nativeEvent.layout.width);
  }, []);

  // Hide bar when camera is active
  const wrapperStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(
          isCameraActive ? TAB_BAR.HEIGHT + bottom + 60 : 0,
          { duration: 250 }
        ),
      },
    ],
    opacity: withTiming(isCameraActive ? 0 : 1, { duration: 200 }),
  }));

  const renderTabItem = (route: (typeof state.routes)[number]) => {
    const routeIndex = state.routes.indexOf(route);
    const isFocused = state.index === routeIndex;
    const { options } = descriptors[route.key];
    const label = options.title || route.name;

    return (
      <TabSlot key={route.key} isActive={isFocused}>
        <TabBarItem
          routeName={route.name}
          label={label}
          isFocused={isFocused}
          colors={tabColors}
          onPress={() => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          }}
          onLongPress={() => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          }}
        />
      </TabSlot>
    );
  };

  return (
    <Animated.View
      style={[styles.wrapper, { paddingBottom: bottom }, wrapperStyle]}
    >
      <View style={styles.barContainer} onLayout={onBarLayout}>
        {/* SVG background with bezier notch */}
        <TabBarBackground width={barWidth} />

        {/* Camera FAB in the notch */}
        {cameraRoute && (
          <CameraFAB
            onPress={() => {
              const event = navigation.emit({
                type: "tabPress",
                target: cameraRoute.key,
                canPreventDefault: true,
              });
              if (!event.defaultPrevented) {
                navigation.navigate(cameraRoute.name);
              }
            }}
          />
        )}

        {/* Tabs: left group | notch spacer | right group */}
        <View style={styles.tabsRow}>
          <View style={styles.tabGroup}>
            {leftRoutes.map(renderTabItem)}
          </View>

          <View style={styles.notchSpacer} />

          <View style={styles.tabGroup}>
            {rightRoutes.map(renderTabItem)}
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const NOTCH_WIDTH = (TAB_BAR.NOTCH_RADIUS + TAB_BAR.NOTCH_SPREAD) * 2;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: TAB_BAR.BAR_HORIZONTAL_MARGIN,
    paddingTop: TAB_BAR.FAB_SIZE / 2,
  },
  barContainer: {
    height: TAB_BAR.HEIGHT,
    width: "100%",
    alignItems: "center",
  },
  tabsRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: TAB_BAR.PADDING,
  },
  tabGroup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  tabSlot: {
    alignItems: "center",
    justifyContent: "center",
  },
  notchSpacer: {
    width: NOTCH_WIDTH,
  },
});
