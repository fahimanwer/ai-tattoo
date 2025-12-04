import { FeaturedTattoo } from "@/lib/featured-tattoos";
import { Text } from "@/src/components/ui/Text";
import { VerticalCard } from "@/src/components/ui/VerticalCard";
import {
  GalleryImage,
  getAllBodyParts,
  getBodyPartDisplayName,
  getBodyPartImagesFromAllStyles,
} from "@/src/utils/bodyPartsUtils";
import { LegendList } from "@legendapp/list";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { BodyPartFilter } from "./BodyPartFilter";

/**
 * Shuffles images ensuring no two consecutive images have the same style
 */
function shuffleImagesWithoutConsecutiveStyles(
  images: GalleryImage[]
): GalleryImage[] {
  if (images.length === 0) return [];

  // Simple random shuffle
  const shuffled = [...images].sort(() => Math.random() - 0.5);

  // Fix consecutive same styles by swapping
  for (let i = 1; i < shuffled.length; i++) {
    if (shuffled[i].styleId === shuffled[i - 1].styleId) {
      // Find a different style to swap with
      for (let j = i + 1; j < shuffled.length; j++) {
        if (shuffled[j].styleId !== shuffled[i].styleId) {
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          break;
        }
      }
    }
  }

  return shuffled;
}

export function ExploreContainer() {
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);

  // Memoize all images in a single flat array
  const allImages = useMemo(() => {
    const allBodyParts = getAllBodyParts();

    // If there is a selected body part, only show that body part
    const bodyPartsToShow = selectedBodyPart
      ? [selectedBodyPart]
      : allBodyParts;

    // Get all images from all body parts and flatten them into a single array
    const images = bodyPartsToShow
      .flatMap((bodyPart) => getBodyPartImagesFromAllStyles(bodyPart))
      .filter((image) => image !== null);

    return shuffleImagesWithoutConsecutiveStyles(images);
  }, [selectedBodyPart]);

  const handleImagePress = (image: GalleryImage) => {
    // Navigate to body part detail screen
    router.push({
      pathname: "/(tabs)/(home)/about/photo",
      params: {
        bodyPart: image.bodyPart,
        imageUrl: image.uri,
        title: getBodyPartDisplayName(image.bodyPart),
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
      image: { uri: image.uri, blurhash: image.blurhash },
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text type="subtitle" weight="bold">
          Discover by body part
        </Text>
      </View>

      {/* Body part filter */}
      <BodyPartFilter
        selectedBodyPart={selectedBodyPart}
        onSelectBodyPart={setSelectedBodyPart}
      />

      {/* Single grid with all images */}
      <LegendList
        numColumns={4}
        columnWrapperStyle={{ rowGap: 10 }}
        data={allImages}
        keyExtractor={(image, index) =>
          `${image.styleId}-${image.bodyPart}-${image.gender}-${index}`
        }
        renderItem={({ item: image }) => (
          <VerticalCard
            style={convertToVerticalCardFormat(image)}
            onPress={() => handleImagePress(image)}
            showOverlay={false}
            imageStyle={{
              width: "100%",
              height: 90,
            }}
          />
        )}
        showsHorizontalScrollIndicator={false}
        recycleItems
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
