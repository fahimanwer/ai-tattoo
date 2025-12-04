import { FeaturedTattoo } from "@/lib/featured-tattoos";
import { BLURHASH } from "@/lib/image-cache";
import { Text } from "@/src/components/ui/Text";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { PressableScale } from "pressto";
import {
  Dimensions,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
} from "react-native";

interface VerticalCardProps {
  style?: FeaturedTattoo;
  asset?: MediaLibrary.Asset;
  onPress: (data: FeaturedTattoo | MediaLibrary.Asset) => void;
  showOverlay?: boolean; // Controls visibility of title, description, and blur
  subtitle?: string; // Override subtitle from style object
  imageStyle?: StyleProp<ImageStyle>;
}

const IMAGE_WIDTH = Dimensions.get("window").width / 2 - 16;
export function VerticalCard({
  style,
  asset,
  onPress,
  showOverlay = true,
  subtitle,
  imageStyle,
}: VerticalCardProps) {
  // Determine which data source to use
  const data = asset || style;
  if (!data) return null;

  // Get image source
  let imageSource: ImageSourcePropType;
  if (asset) {
    imageSource = { uri: asset.uri };
  } else if (style?.image) {
    imageSource = style.image;
  } else {
    return null;
  }

  const displaySubtitle =
    subtitle ||
    (asset ? new Date(asset.creationTime).toLocaleDateString() : style!.style);

  // Use specific blurhash from featured tattoo if available, otherwise use generic
  const blurhash = style?.image?.blurhash || BLURHASH;

  return (
    <>
      <PressableScale
        key={asset?.id || style?.id}
        onPress={() => onPress(data)}
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
                weight="normal"
                style={styles.description}
                numberOfLines={1}
              >
                {displaySubtitle}
              </Text>
            )}
          </View>
        )}
      </PressableScale>
    </>
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
  glassViewContainer: {
    position: "absolute",
    width: "95%",
    height: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    left: "50%",
    transform: [{ translateX: "-50%" }],
    bottom: 4,
    zIndex: 2,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    /* backgroundColor: "transparent",
    experimental_backgroundImage: `linear-gradient(to bottom, transparent, ${Color.grayscale[50]})`, */
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
