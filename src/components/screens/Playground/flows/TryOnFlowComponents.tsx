/**
 * Shared sub-components for TryOnFlow UI shells (Android + iOS).
 */

import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { PressableScale } from "pressto";

// ---------------------------------------------------------------------------
// Mode toggle (Warp / Move)
// ---------------------------------------------------------------------------

export function ModeToggle({
  label,
  isActive,
  onPress,
  isDark,
}: {
  label: string;
  isActive: boolean;
  onPress: () => void;
  isDark: boolean;
}) {
  return (
    <PressableScale
      onPress={onPress}
      style={[
        styles.modeButton,
        {
          backgroundColor: isActive
            ? (isDark ? "#8B5CF6" : "#6D28D9")
            : (isDark ? Color.zinc[800] : Color.zinc[100]),
          borderColor: isActive
            ? "transparent"
            : (isDark ? Color.zinc[700] : Color.zinc[200]),
        },
      ]}
    >
      <Text
        type="sm"
        weight="semibold"
        style={{ color: isActive ? "#fff" : (isDark ? "#fff" : "#000") }}
      >
        {label}
      </Text>
    </PressableScale>
  );
}

// ---------------------------------------------------------------------------
// Image picker card
// ---------------------------------------------------------------------------

export function ImagePickerCard({
  uri,
  label,
  icon,
  onPress,
  isDark,
  foreground,
  isLoading,
}: {
  uri: string | null;
  label: string;
  icon: string;
  onPress: () => void;
  isDark: boolean;
  foreground?: string;
  isLoading?: boolean;
}) {
  const fg = foreground ?? (isDark ? "#fff" : "#000");

  return (
    <PressableScale onPress={onPress} style={styles.pickCard}>
      <View
        style={[
          styles.pickCardInner,
          {
            backgroundColor: isDark ? Color.zinc[800] : Color.zinc[100],
            borderColor: isDark ? Color.zinc[700] : Color.zinc[200],
          },
        ]}
      >
        {isLoading ? (
          <View style={styles.pickCardPlaceholder}>
            <ActivityIndicator size="small" color={fg} />
          </View>
        ) : uri ? (
          <Image source={{ uri }} style={styles.pickCardImage} resizeMode="cover" />
        ) : (
          <View style={styles.pickCardPlaceholder}>
            <Ionicons name={icon as any} size={32} color={fg} />
          </View>
        )}
      </View>
      <Text
        type="sm"
        weight="medium"
        style={{ textAlign: "center", marginTop: 8 }}
      >
        {label}
      </Text>
    </PressableScale>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  modeButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  pickCard: {
    flex: 1,
    alignItems: "center",
  },
  pickCardInner: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  pickCardImage: {
    width: "100%",
    height: "100%",
  },
  pickCardPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
