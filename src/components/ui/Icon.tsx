import { getIoniconName } from "@/src/constants/icon-map";
import { UISize } from "@/src/types/ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SFSymbol, SymbolView } from "expo-symbols";
import React from "react";
import { Platform, StyleSheet, ViewStyle } from "react-native";

interface IconProps {
  symbol: SFSymbol;
  size?: UISize | number;
  color?: string;
  style?: ViewStyle;
  type?: "monochrome" | "hierarchical" | "palette" | "multicolor";
}

const sizeMap: Record<UISize, number> = {
  xs: 14,
  sm: 18,
  md: 22,
  lg: 26,
  xl: 30,
  "2xl": 34,
};

export const Icon: React.FC<IconProps> = ({
  symbol,
  size = "md",
  color,
  style,
  type = "hierarchical",
}) => {
  const iconSize = typeof size === "string" ? sizeMap[size] : size;

  if (Platform.OS === "ios") {
    return (
      <SymbolView
        name={symbol}
        style={[styles.symbol, { width: iconSize, height: iconSize }, style]}
        tintColor={color}
        type={type}
        resizeMode="scaleAspectFit"
      />
    );
  }

  return (
    <Ionicons
      name={getIoniconName(symbol)}
      size={iconSize}
      color={color}
      style={style as any}
    />
  );
};

const styles = StyleSheet.create({
  symbol: {
    width: 24,
    height: 24,
  },
});
