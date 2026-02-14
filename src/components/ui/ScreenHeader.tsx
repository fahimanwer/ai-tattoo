import { useThemeColor } from "heroui-native";
import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "./Text";

interface ScreenHeaderProps {
  title: string;
  rightComponent?: React.ReactNode;
}

/**
 * In-screen header for Android (replaces native Stack header).
 * Returns null on iOS — iOS uses native blur headers.
 */
export function ScreenHeader({ title, rightComponent }: ScreenHeaderProps) {
  if (Platform.OS !== "android") return null;

  const insets = useSafeAreaInsets();
  const fg = useThemeColor("foreground");

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <Text
        type="title"
        weight="bold"
        style={{ color: fg, fontSize: 28 }}
        numberOfLines={1}
      >
        {title}
      </Text>
      {rightComponent}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
