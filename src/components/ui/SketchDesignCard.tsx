import { SketchDesignStyle } from "@/lib/sketch-design";
import { BLURHASH } from "@/lib/image-cache";
import { Text } from "@/src/components/ui/Text";
import { Image } from "expo-image";
import { PressableScale } from "pressto";
import {
  Dimensions,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
} from "react-native";

interface SketchDesignCardProps {
  design: SketchDesignStyle;
  onPress: (data: SketchDesignStyle) => void;
  showOverlay?: boolean;
  subtitle?: string;
  imageStyle?: StyleProp<ImageStyle>;
}

const IMAGE_WIDTH = Dimensions.get("window").width / 2 - 16;

export function SketchDesignCard({
  design,
  onPress,
  showOverlay = true,
  subtitle,
  imageStyle,
}: SketchDesignCardProps) {
  if (!design || !design.gallery || design.gallery.length === 0) {
    return null;
  }

  // Use the first image from the gallery as the main image
  const firstImage = design.gallery[0];
  const imageSource: ImageSourcePropType = { uri: firstImage.uri };
  const blurhash = firstImage.blurhash || BLURHASH;

  return (
    <PressableScale
      key={design.id}
      onPress={() => onPress(design)}
      style={styles.styleContainer}
    >
      <Image
        cachePolicy="memory-disk"
        source={imageSource}
        style={[
          {
            width: IMAGE_WIDTH,
            height: 280,
            borderRadius: 16,
          },
          imageStyle,
        ]}
        contentFit="cover"
        contentPosition="center"
        placeholder={{ blurhash }}
        transition={1000}
      />
      {showOverlay && (
        <View style={styles.blurViewContainer}>
          {subtitle && (
            <Text
              type="sm"
              weight="bold"
              style={[styles.description, { color: "white" }]}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          )}
        </View>
      )}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  styleContainer: {
    position: "relative",
    marginRight: 12,
    alignItems: "center",
    gap: 6,
    overflow: "hidden",
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
  },
  blurViewContainer: {
    position: "absolute",
    width: "100%",
    height: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    left: "50%",
    transform: [{ translateX: "-50%" }],
    bottom: 0,
    zIndex: 2,
    paddingBottom: 16,
    paddingHorizontal: 16,
    experimental_backgroundImage: `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 1))`,
  },
  description: {
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
  },
});
