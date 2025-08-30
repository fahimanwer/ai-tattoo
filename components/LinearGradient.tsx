import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, type ColorValue } from "react-native";

interface LinearGradientComponentProps {
  colors: readonly [ColorValue, ColorValue, ...ColorValue[]];
}

export default function LinearGradientComponent({
  colors,
}: LinearGradientComponentProps) {
  return <LinearGradient colors={colors} style={styles.background} />;
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
});
