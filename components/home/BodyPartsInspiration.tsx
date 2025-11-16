import { Text } from "@/components/ui/Text";
import { VerticalCard } from "@/components/ui/VerticalCard";
import { FeaturedTattoo } from "@/lib/featured-tattoos";
import {
  GalleryImage,
  getAllBodyPartImages,
  getAllBodyParts,
  getBodyPartDisplayName,
  getBodyPartImagesFromAllStyles,
} from "@/utils/bodyPartsUtils";
import { GlassView } from "expo-glass-effect";
import { router } from "expo-router";
import { PressableScale } from "pressto";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export function BodyPartsInspiration() {
  const allBodyParts = getAllBodyParts();
  const [selectedBodyPart, setSelectedBodyPart] = useState("all");

  // Get filtered images based on selected body part
  const getFilteredImages = (bodyPart: string): GalleryImage[] => {
    if (bodyPart === "all") {
      return getAllBodyPartImages();
    }
    return getBodyPartImagesFromAllStyles(bodyPart);
  };

  const filteredImages = getFilteredImages(selectedBodyPart);

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

  const handleBodyPartSelect = (bodyPart: string) => {
    setSelectedBodyPart(bodyPart);
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

  // Create options including "all" category
  const bodyPartOptions = [
    { title: "All", action: () => handleBodyPartSelect("all") },
    ...allBodyParts.map((part) => ({
      title: getBodyPartDisplayName(part),
      action: () => handleBodyPartSelect(part),
    })),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text type="subtitle" weight="bold">
          Discover by body part
        </Text>
      </View>

      <ScrollView
        horizontal
        style={styles.filterScrollView}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        {bodyPartOptions.map((option, index) => {
          const isSelected =
            option.title === "All"
              ? selectedBodyPart === "all"
              : selectedBodyPart === allBodyParts[index - 1];

          return (
            <PressableScale key={index} onPress={option.action}>
              <GlassView
                style={[
                  styles.filterChip,
                  isSelected && styles.filterChipSelected,
                ]}
                isInteractive={false}
              >
                <Text
                  type="body"
                  weight={isSelected ? "bold" : "normal"}
                  style={[
                    styles.filterText,
                    isSelected && styles.filterTextSelected,
                  ]}
                >
                  {option.title}
                </Text>
              </GlassView>
            </PressableScale>
          );
        })}
      </ScrollView>

      <ScrollView
        horizontal
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {filteredImages.map((image, index) => (
          <VerticalCard
            key={`${image.styleId}-${image.bodyPart}-${image.gender}-${index}`}
            style={convertToVerticalCardFormat(image)}
            onPress={() => handleImagePress(image)}
            title={
              image.bodyPart.charAt(0).toUpperCase() + image.bodyPart.slice(1)
            }
            imageStyle={{
              width: 160,
            }}
            subtitle={image.styleTitle}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterScrollView: {
    height: "auto",
  },
  filterContainer: {
    gap: 8,
    paddingHorizontal: 4,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  filterChipSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  filterText: {
    color: "white",
  },
  filterTextSelected: {
    color: "white",
  },
  scrollView: {
    height: "auto",
  },
  scrollContainer: {
    paddingHorizontal: 4,
  },
});
