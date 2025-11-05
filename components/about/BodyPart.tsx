import { Text } from "@/components/ui/Text";
import { VerticalCard } from "@/components/ui/VerticalCard";
import { Color } from "@/constants/TWPalette";
import { FeaturedTattoo } from "@/lib/featured-tattoos";
import {
  filterImagesByBodyPart,
  GalleryImage,
  getBodyPartDisplayName,
} from "@/utils/bodyPartsUtils";
import { Image } from "expo-image";
import { router } from "expo-router";
import type { PropsWithChildren } from "react";
import { ImageSourcePropType, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

const HEADER_HEIGHT = 420;

export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

interface BodyPartParallaxViewProps {
  bodyPart: string;
  coverImage: ImageSourcePropType;
  title?: string;
  description?: string;
}

export default function BodyPartParallaxView({
  bodyPart,
  coverImage,
  title,
  description,
}: PropsWithChildren<BodyPartParallaxViewProps>) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  // Get filtered images for this body part
  const filteredImages = filterImagesByBodyPart(bodyPart);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    // Only apply parallax effect when pulling down (negative scroll offset)
    // When scrolling up (positive offset), behave like normal scroll item
    const translateY =
      scrollOffset.value <= 0
        ? interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0],
            [-HEADER_HEIGHT / 2, 0]
          )
        : 0; // No transform when scrolling up - let natural scroll handle it

    const scale =
      scrollOffset.value <= 0
        ? interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0], [2, 1])
        : 1; // No scaling when scrolling up

    return {
      transform: [
        {
          translateY,
        },
        {
          scale,
        },
      ],
    };
  });

  const handleImagePress = (image: GalleryImage) => {
    // Navigate to tattoo detail or generation screen
    router.push({
      pathname: "/home/about/style",
      params: {
        style: image.styleId,
      },
    });
  };

  // Convert GalleryImage to FeaturedTattoo format for VerticalCard
  const convertToVerticalCardFormat = (image: GalleryImage): FeaturedTattoo => {
    return {
      id: image.styleId,
      title: image.styleTitle,
      short_description: "",
      style: image.styleTitle,
      gallery: [],
      prompt: "",
      description: "",
      image: { uri: image.uri },
    };
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={32}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Image
            source={coverImage}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
            style={{
              width: "100%",
              height: HEADER_HEIGHT,
            }}
          />
        </Animated.View>
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <Text type="4xl" weight="bold">
              {title || getBodyPartDisplayName(bodyPart)}
            </Text>
            <Text type="default" weight="normal" style={{ opacity: 0.7 }}>
              {filteredImages.length} tattoo designs
            </Text>
          </View>
        </View>

        {/* Gallery Section */}
        <View style={styles.galleryContainer}>
          <Text type="lg" weight="bold" style={styles.galleryTitle}>
            Featured Designs
          </Text>

          <View style={styles.galleryGrid}>
            {filteredImages.map((image, index) => (
              <View
                key={`${image.styleId}-${image.bodyPart}-${image.gender}-${index}`}
                style={styles.galleryItem}
              >
                <VerticalCard
                  style={convertToVerticalCardFormat(image)}
                  onPress={() => handleImagePress(image)}
                  title={image.styleTitle}
                />
              </View>
            ))}
          </View>

          {filteredImages.length === 0 && (
            <View style={styles.emptyState}>
              <Text
                type="default"
                weight="normal"
                style={{ opacity: 0.7, textAlign: "center" }}
              >
                No designs available for{" "}
                {getBodyPartDisplayName(bodyPart).toLowerCase()} yet.
              </Text>
            </View>
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: Color.grayscale[50],
    position: "relative",
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
    position: "relative",
  },
  headerContainer: {
    position: "absolute",
    width: "100%",
    height: HEADER_HEIGHT,
    backgroundColor: "transparent",
    experimental_backgroundImage: `linear-gradient(to bottom, transparent, ${Color.grayscale[50]})`,
  },
  headerContent: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  galleryContainer: {
    padding: 16,
    gap: 16,
  },
  galleryTitle: {
    marginBottom: 8,
  },
  galleryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "space-between",
  },
  galleryItem: {
    width: "47%", // Two columns with gap
  },
  emptyState: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
