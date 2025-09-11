import { Text } from "@/components/ui/Text";
import { Color } from "@/constants/TWPalette";
import { GalleryImage } from "@/utils/bodyPartsUtils";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";

interface GalleryImageCardProps {
  image: GalleryImage;
  onPress: (image: GalleryImage) => void;
}

export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export function GalleryImageCard({ image, onPress }: GalleryImageCardProps) {
  return (
    <Pressable
      onPress={() => onPress(image)}
      style={({ pressed }) => [
        styles.imageContainer,
        { transform: [{ scale: pressed ? 0.99 : 1 }] },
      ]}
    >
      <Image
        cachePolicy="memory-disk"
        source={{ uri: image.uri }}
        placeholder={{ blurhash }}
        transition={1000}
        style={styles.image}
        contentFit="cover"
        contentPosition="center"
      />
      <BlurView intensity={20} style={styles.blurOverlay} />
      <View style={styles.textContainer}>
        <Text type="base" weight="bold" style={styles.title}>
          {image.styleTitle}
        </Text>
        <Text type="sm" weight="normal" style={styles.subtitle}>
          {image.gender.charAt(0).toUpperCase() + image.gender.slice(1)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    marginRight: 12,
    alignItems: "center",
    gap: 6,
    overflow: "hidden",
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
  },
  image: {
    width: 160,
    height: 280,
    borderRadius: 16,
  },
  blurOverlay: {
    position: "absolute",
    left: 0,
    bottom: 0,
    height: 70,
    width: "100%",
  },
  textContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    left: 0,
    top: 0,
    zIndex: 2,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
    backgroundColor: "transparent",
    experimental_backgroundImage: `linear-gradient(to bottom, transparent, ${Color.grayscale[50]})`,
  },
  title: {
    color: "white",
  },
  subtitle: {
    width: "100%",
    opacity: 0.7,
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "white",
  },
});
