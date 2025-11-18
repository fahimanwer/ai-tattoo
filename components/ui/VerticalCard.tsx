import { Text } from "@/components/ui/Text";
import { Color } from "@/constants/TWPalette";
import { FeaturedTattoo } from "@/lib/featured-tattoos";
import { BLURHASH } from "@/lib/image-cache";
import { BlurView } from "expo-blur";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { PressableScale } from "pressto";
import {
  Dimensions,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
} from "react-native";

interface VerticalCardProps {
  style?: FeaturedTattoo;
  asset?: MediaLibrary.Asset;
  onPress: (data: FeaturedTattoo | MediaLibrary.Asset) => void;
  showOverlay?: boolean; // Controls visibility of title, description, and blur
  title?: string; // Override title from style object
  subtitle?: string; // Override subtitle from style object
  imageStyle?: StyleProp<ImageStyle>;
}

const IMAGE_WIDTH = Dimensions.get("window").width / 2 - 16;
export function VerticalCard({
  style,
  asset,
  onPress,
  showOverlay = true,
  title,
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
          <>
            {isLiquidGlassAvailable() ? (
              <GlassView style={styles.glassViewContainer}>
                <Text type="sm" weight="medium" numberOfLines={1}>
                  {displaySubtitle}
                </Text>
              </GlassView>
            ) : (
              <BlurView intensity={20} style={styles.blurViewContainer}>
                <Text
                  type="sm"
                  weight="normal"
                  style={styles.description}
                  numberOfLines={1}
                >
                  {displaySubtitle}
                </Text>
              </BlurView>
            )}
          </>
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
    height: 50,
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
    borderRadius: 16,
    backgroundColor: "transparent",
    experimental_backgroundImage: `linear-gradient(to bottom, transparent, ${Color.grayscale[50]})`,
  },
  description: {
    width: "100%",
    opacity: 0.7,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});
