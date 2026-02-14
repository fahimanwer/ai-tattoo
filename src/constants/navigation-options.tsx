import { Color } from "@/src/constants/TWPalette";
import { useTheme } from "@/src/context/ThemeContext";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Platform } from "react-native";

/**
 * Hook that provides reusable large header screen options.
 * iOS: transparent header with blur effect.
 * Android: solid header matching current theme.
 */
export function useLargeHeaderOptions(): NativeStackNavigationOptions {
  const isGlassAvailable = isLiquidGlassAvailable();
  const isIOS = Platform.OS === "ios";
  const { isDark } = useTheme();

  // grayscale is inverted in TWPalette: 950=#FFFFFF, 50=#000000
  const tint = isDark ? Color.grayscale[950] : Color.grayscale[50];
  const androidBg = isDark ? "#000000" : "#F5F5F7";

  return {
    headerTintColor: tint,
    headerTransparent: isIOS,
    headerBlurEffect:
      isIOS && !isGlassAvailable ? (isDark ? "dark" : "light") : undefined,
    headerStyle: {
      backgroundColor: isIOS ? undefined : androidBg,
    },
    headerLargeStyle: {
      backgroundColor: isIOS ? "transparent" : androidBg,
    },
    headerLargeTitle: true,
  };
}
