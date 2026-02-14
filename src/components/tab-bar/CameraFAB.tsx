import { Platform, StyleSheet } from "react-native";
import { PressableScale } from "pressto";
import { SymbolView } from "expo-symbols";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TAB_BAR, useTabColors } from "./tab-bar-constants";

interface CameraFABProps {
  onPress: () => void;
}

export function CameraFAB({ onPress }: CameraFABProps) {
  const colors = useTabColors();

  return (
    <PressableScale
      onPress={onPress}
      style={[
        styles.fab,
        {
          backgroundColor: colors.fabBackground,
          shadowColor: colors.fabShadow,
        },
      ]}
      accessibilityLabel="Try On Tattoo"
      accessibilityRole="button"
    >
      {Platform.OS === "ios" ? (
        <SymbolView
          name="camera.fill"
          tintColor={colors.fabIcon}
          type="monochrome"
          style={styles.icon}
          resizeMode="scaleAspectFit"
        />
      ) : (
        <Ionicons
          name="camera"
          size={TAB_BAR.FAB_ICON_SIZE}
          color={colors.fabIcon}
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
    top: -FAB_R,
    width: TAB_BAR.FAB_SIZE,
    height: TAB_BAR.FAB_SIZE,
    borderRadius: FAB_R,
    alignItems: "center",
    justifyContent: "center",
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
