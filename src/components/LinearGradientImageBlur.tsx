import LinearGradient from "@/src/components/LinearGradient";
import { Color } from "@/src/constants/TWPalette";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import {
  StyleSheet,
  useColorScheme,
  View,
  type ColorValue,
} from "react-native";

export interface LinearGradientImageBlurProps {
  showBlur?: boolean;
  showImage?: boolean;
  showGradient?: boolean;
  gradientColors?: {
    light: readonly [ColorValue, ColorValue, ColorValue];
    dark: readonly [ColorValue, ColorValue, ColorValue];
  };
  imageUrl?: string;
  blurIntensity?: number;
  solidColor?: string;
}

export default function LinearGradientImageBlur({
  showBlur = true,
  showImage = true,
  showGradient = true,
  gradientColors = {
    light: ["transparent", Color.grayscale[950] + "80", Color.grayscale[950]],
    dark: ["transparent", Color.grayscale[50] + "80", Color.grayscale[50]],
  },
  imageUrl,
  blurIntensity = 30,
  solidColor,
}: LinearGradientImageBlurProps) {
  const isDarkMode = useColorScheme() === "dark";

  const selectedColors = isDarkMode
    ? gradientColors.dark
    : gradientColors.light;

  return (
    <View style={styles.container}>
      {/* Blur Section*/}
      {showBlur ? (
        <View style={styles.blurView}>
          <BlurView intensity={blurIntensity} style={{ flex: 1 }} />
        </View>
      ) : null}

      {/* Gradient Section*/}
      {showGradient ? (
        <View style={styles.gradientContainer}>
          <LinearGradient colors={selectedColors} />
        </View>
      ) : null}

      {/* Image Section*/}
      {showImage || imageUrl ? (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            contentFit="cover"
            contentPosition="top"
            source={imageUrl}
          />
        </View>
      ) : null}

      {/* Solid Color Section*/}
      {solidColor ? (
        <View
          style={[styles.solidColorContainer, { backgroundColor: solidColor }]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  solidColorContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  gradientContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  blurView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
    flex: 1,
  },
});
