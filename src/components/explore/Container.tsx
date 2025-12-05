import { FeaturedTattoo } from "@/lib/featured-tattoos";
import { Text } from "@/src/components/ui/Text";
import { VerticalCard } from "@/src/components/ui/VerticalCard";
import { useExploreFilter } from "@/src/context/ExploreFilterContext";
import {
  GalleryImage,
  getAllBodyParts,
  getAllGalleryImages,
  getBodyPartDisplayName,
  getBodyPartImagesFromAllStyles,
} from "@/src/utils/bodyPartsUtils";
import { LegendList } from "@legendapp/list";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { BodyPartFilter } from "./BodyPartFilter";
import { StyleFilter } from "./StyleFilter";

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
  const {
    filterMode,
    selectedBodyPart,
    setSelectedBodyPart,
    selectedStyle,
    setSelectedStyle,
  } = useExploreFilter();

  // Animation values for smooth transitions
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Handle filter mode changes with animation
  useEffect(() => {
    // Fade out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -20,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Fade in with slide
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterMode]);

  // Memoize all images based on filter mode and selected filters
  const allImages = useMemo(() => {
    if (filterMode === "styles") {
      // When filtering by styles
      let images = getAllGalleryImages();

      // If a specific style is selected, filter by it
      if (selectedStyle !== null) {
        images = images.filter((image) => image.styleId === selectedStyle);
      }

      return shuffleImagesWithoutConsecutiveStyles(images);
    } else {
      // When filtering by body part (default behavior)
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
    }
  }, [selectedBodyPart, selectedStyle, filterMode]);

  const handleImagePress = (image: GalleryImage) => {
    // Navigate to body part detail screen
    router.push({
      pathname: "/image-preview",
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

  const headerText =
    filterMode === "styles" ? "Explore by styles" : "Explore by body part";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text type="subtitle" weight="bold">
          {headerText}
        </Text>
      </View>

      {/* Filters with animation */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {filterMode === "body part" ? (
          <BodyPartFilter
            selectedBodyPart={selectedBodyPart}
            onSelectBodyPart={setSelectedBodyPart}
          />
        ) : (
          <StyleFilter
            selectedStyle={selectedStyle}
            onSelectStyle={setSelectedStyle}
          />
        )}
      </Animated.View>

      {/* Single grid with all images */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
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
      </Animated.View>
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
