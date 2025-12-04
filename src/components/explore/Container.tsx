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

  // Memoize body parts data to prevent recalculation on every render
  const bodyPartsData = useMemo(() => {
    const allBodyParts = getAllBodyParts();

    // Si hay un filtro seleccionado, solo mostrar esa parte del cuerpo
    const bodyPartsToShow = selectedBodyPart
      ? [selectedBodyPart]
      : allBodyParts;

    return bodyPartsToShow
      .map((bodyPart) => {
        const images = getBodyPartImagesFromAllStyles(bodyPart);
        return {
          bodyPart,
          images: shuffleImagesWithoutConsecutiveStyles(images),
        };
      })
      .filter((data) => data.images.length > 0);
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

      {/* Netflix-style: One horizontal scroll row per body part */}
      {bodyPartsData.map(({ bodyPart, images }) => (
        <View key={bodyPart} style={styles.bodyPartSection}>
          <Text type="default" weight="bold" style={styles.bodyPartTitle}>
            {getBodyPartDisplayName(bodyPart)}
          </Text>

          <LegendList
            horizontal
            data={images}
            keyExtractor={(image, index) =>
              `${image.styleId}-${image.bodyPart}-${image.gender}-${index}`
            }
            renderItem={({ item: image }) => (
              <VerticalCard
                style={convertToVerticalCardFormat(image)}
                onPress={() => handleImagePress(image)}
                title={
                  image.bodyPart.charAt(0).toUpperCase() +
                  image.bodyPart.slice(1)
                }
                imageStyle={{
                  width: 160,
                }}
                subtitle={image.styleTitle}
              />
            )}
            style={styles.scrollView}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
            recycleItems
          />
        </View>
      ))}
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
  bodyPartSection: {
    gap: 16,
  },
  bodyPartTitle: {
    marginBottom: 0,
  },
  scrollView: {
    height: "auto",
  },
  scrollContainer: {
    paddingHorizontal: 4,
  },
});
