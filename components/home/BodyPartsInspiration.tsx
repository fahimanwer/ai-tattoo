import { Text } from "@/components/ui/Text";
import { VerticalCard } from "@/components/ui/VerticalCard";
import { FeaturedTattoo } from "@/lib/featured-tattoos";
import {
  GalleryImage,
  getAllBodyParts,
  getBodyPartDisplayName,
  getBodyPartImagesFromAllStyles,
} from "@/utils/bodyPartsUtils";
import { LegendList } from "@legendapp/list";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

export function BodyPartsInspiration() {
  // Memoize body parts data to prevent recalculation on every render
  const bodyPartsData = useMemo(() => {
    const allBodyParts = getAllBodyParts();
    return allBodyParts
      .map((bodyPart) => ({
        bodyPart,
        images: getBodyPartImagesFromAllStyles(bodyPart),
      }))
      .filter((data) => data.images.length > 0);
  }, []);

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

      {/* Netflix-style: One horizontal scroll row per body part */}
      {bodyPartsData.map(({ bodyPart, images }) => (
        <View key={bodyPart} style={styles.bodyPartSection}>
          <Text type="subtitle" weight="bold" style={styles.bodyPartTitle}>
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
