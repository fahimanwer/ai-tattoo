import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { VerticalCard } from "@/components/ui/VerticalCard";
import { Button, ContextMenu, Host } from "@/lib/expo-ui-web";
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

        <Host style={styles.contextMenuHost}>
          {/* <GlassContainer spacing={10} style={{ height: 40, width: 100 }}>
            <GlassView style={{ height: 40, width: 100 }} isInteractive />
            <GlassView style={{ height: 40, width: 100 }} isInteractive />
          </GlassContainer> */}
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
              <GlassView
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 99,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon symbol="ellipsis" size={20} color="white" />
              </GlassView>
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
            subtitle={
              image.gender.charAt(0).toUpperCase() +
              image.gender.slice(1) +
              " | " +
              image.styleTitle
            }
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
