import { GalleryImageCard } from "@/components/ui/GalleryImageCard";
import { Text } from "@/components/ui/Text";
import { Button, ContextMenu, Host } from "@/lib/expo-ui-web";
import {
  GalleryImage,
  getAllBodyPartImages,
  getAllBodyParts,
  getBodyPartDisplayName,
  getBodyPartImagesFromAllStyles,
} from "@/utils/bodyPartsUtils";
import { router } from "expo-router";
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
      pathname: "/home/body-part",
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
        <Host style={styles.contextMenuHost}>
          <ContextMenu>
            <ContextMenu.Items>
              {bodyPartOptions.map((option, index) => (
                <Button
                  key={index}
                  onPress={() => {
                    option.action();
                  }}
                >
                  {option.title}
                </Button>
              ))}
            </ContextMenu.Items>
            <ContextMenu.Trigger>
              <Host style={styles.contextMenuTrigger}>
                <Button
                  systemImage="ellipsis"
                  size="sm"
                  title={getBodyPartDisplayName(selectedBodyPart)}
                />
              </Host>
            </ContextMenu.Trigger>
          </ContextMenu>
        </Host>
      </View>

      <ScrollView
        horizontal
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {filteredImages.map((image, index) => (
          <GalleryImageCard
            key={`${image.styleId}-${image.bodyPart}-${image.gender}-${index}`}
            image={image}
            onPress={handleImagePress}
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
  contextMenuHost: {
    borderRadius: 8,
  },
  contextMenuTrigger: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  scrollView: {
    height: "auto",
  },
  scrollContainer: {
    paddingHorizontal: 4,
  },
});
