import { SFSymbol, SymbolView } from "expo-symbols";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Platform, StyleSheet } from "react-native";

// Route name → icon mapping
const SF_SYMBOLS: Record<string, SFSymbol> = {
  "(home)": "house.fill",
  explore: "globe",
  tattoos: "photo.fill.on.rectangle.fill",
  profile: "person.fill",
  "camera-view": "camera.fill",
};

const IONICON_NAMES: Record<string, keyof typeof Ionicons.glyphMap> = {
  "(home)": "home",
  explore: "globe-outline",
  tattoos: "images",
  profile: "person",
  "camera-view": "camera",
};

interface TabBarIconProps {
  routeName: string;
  color: string;
  size: number;
}

export function TabBarIcon({ routeName, color, size }: TabBarIconProps) {
  if (Platform.OS === "ios") {
    const sfName = SF_SYMBOLS[routeName];
    if (sfName) {
      return (
        <SymbolView
          name={sfName}
          tintColor={color}
          type="monochrome"
          style={{ width: size, height: size }}
          resizeMode="scaleAspectFit"
        />
      );
    }
  }

  const ionName = IONICON_NAMES[routeName];
  if (ionName) {
    return <Ionicons name={ionName} size={size} color={color} />;
  }

  return null;
}
