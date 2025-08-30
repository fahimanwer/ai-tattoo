import { Color } from "@/constants/TWPalette";
import { useColorScheme } from "react-native";

/**
 * Hook that provides reusable large header screen options
 */
export function useLargeHeaderOptions() {
  const colorScheme = useColorScheme();

  return {
    headerTintColor:
      colorScheme === "dark" ? Color.grayscale[950] : Color.grayscale[50],
    headerTransparent: true,
    headerLargeStyle: {
      backgroundColor: "transparent",
    },
    headerLargeTitle: true,
  };
}
