import { Platform, StyleSheet } from "react-native";
import { PressableScale } from "pressto";
import { SymbolView } from "expo-symbols";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TAB_BAR, TAB_COLORS } from "./tab-bar-constants";

interface CameraFABProps {
  onPress: () => void;
}

export function CameraFAB({ onPress }: CameraFABProps) {
  return (
    <PressableScale
      onPress={onPress}
      style={styles.fab}
      accessibilityLabel="Try On Tattoo"
      accessibilityRole="button"
    >
      {Platform.OS === "ios" ? (
        <SymbolView
          name="camera.fill"
          tintColor={TAB_COLORS.fabIcon}
          type="monochrome"
          style={styles.icon}
          resizeMode="scaleAspectFit"
        />
      ) : (
        <Ionicons
          name="camera"
          size={TAB_BAR.FAB_ICON_SIZE}
          color={TAB_COLORS.fabIcon}
        />
      )}
    </PressableScale>
  );
}

const FAB_R = TAB_BAR.FAB_SIZE / 2;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    alignSelf: "center",
    // Center the FAB so its center sits at the top edge of the bar (y=0)
    // The bezier notch cradles the bottom half
    top: -FAB_R,
    width: TAB_BAR.FAB_SIZE,
    height: TAB_BAR.FAB_SIZE,
    borderRadius: FAB_R,
    backgroundColor: TAB_COLORS.fabBackground,
    alignItems: "center",
    justifyContent: "center",
    // Glow shadow
    shadowColor: TAB_COLORS.fabShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 10,
  },
  icon: {
    width: TAB_BAR.FAB_ICON_SIZE,
    height: TAB_BAR.FAB_ICON_SIZE,
  },
});
