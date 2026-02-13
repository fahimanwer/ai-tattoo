import { Color } from "@/src/constants/TWPalette";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Platform } from "react-native";

/**
 * Hook that provides reusable large header screen options.
 * iOS: transparent header with blur effect.
 * Android: solid black header (headerBlurEffect is iOS-only).
 */
export function useLargeHeaderOptions(): NativeStackNavigationOptions {
  const isGlassAvailable = isLiquidGlassAvailable();
  const isIOS = Platform.OS === "ios";

  return {
    headerTintColor: Color.grayscale[950],
    headerTransparent: isIOS,
    headerBlurEffect: isIOS && !isGlassAvailable ? "dark" : undefined,
    headerLargeStyle: {
      backgroundColor: isIOS ? "transparent" : "#000000",
    },
    headerLargeTitle: true,
  };
}
