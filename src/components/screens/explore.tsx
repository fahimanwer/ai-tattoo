import { BodyPartFilter } from "@/src/components/explore/BodyPartFilter";
import { StyleFilter } from "@/src/components/explore/StyleFilter";
import { useExploreFilter } from "@/src/context/ExploreFilterContext";
import {
  GalleryImage,
  getAllBodyParts,
  getAllGalleryImages,
  getBodyPartDisplayName,
  getBodyPartImagesFromAllStyles,
} from "@/src/utils/bodyPartsUtils";
import { LegendList } from "@legendapp/list";
import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import { PressableScale } from "pressto";
import { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export function ExploreScreen() {
  const {
    filterMode,
    selectedBodyPart,
    setSelectedBodyPart,
    selectedStyle,
    setSelectedStyle,
  } = useExploreFilter();

  const allImages = useMemo(() => {
    if (filterMode === "styles") {
      const images = getAllGalleryImages();
      if (selectedStyle === null) return images;
      return images.filter((image) => image.styleId === selectedStyle);
    }

    // Filter by body part
    const bodyPartsToShow = selectedBodyPart
      ? [selectedBodyPart]
      : getAllBodyParts();

    return bodyPartsToShow
      .flatMap((bodyPart) => getBodyPartImagesFromAllStyles(bodyPart))
      .filter(Boolean) as GalleryImage[];
  }, [selectedBodyPart, selectedStyle, filterMode]);

  const handleImagePress = useCallback((image: GalleryImage) => {
    router.push({
      pathname: "/(tabs)/explore/image-preview",
      params: {
        bodyPart: image.bodyPart,
        imageUrl: image.uri,
        title: getBodyPartDisplayName(image.bodyPart),
      },
    });
  }, []);

  const headerTitle =
    filterMode === "styles" ? "Explore by styles" : "Explore by body part";

  const ListHeader = useMemo(
    () => (
      <View style={styles.listHeader}>
        {filterMode === "body part" ? (
          <Animated.View key="body-part" entering={FadeIn} exiting={FadeOut}>
            <BodyPartFilter
              selectedBodyPart={selectedBodyPart}
              onSelectBodyPart={setSelectedBodyPart}
            />
          </Animated.View>
        ) : (
          <Animated.View key="style" entering={FadeIn} exiting={FadeOut}>
            <StyleFilter
              selectedStyle={selectedStyle}
              onSelectStyle={setSelectedStyle}
            />
          </Animated.View>
        )}
      </View>
    ),
    [
      filterMode,
      selectedBodyPart,
      setSelectedBodyPart,
      selectedStyle,
      setSelectedStyle,
    ]
  );

  return (
    <>
      <Stack.Screen options={{ title: headerTitle }} />
      <LegendList
        style={styles.list}
        contentInsetAdjustmentBehavior="automatic"
        numColumns={4}
        data={allImages}
        keyExtractor={(image, index) =>
          `${image.styleId}-${image.bodyPart}-${image.gender}-${index}`
        }
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item: image }) => (
          <PressableScale
            onPress={() => handleImagePress(image)}
            style={styles.imageContainer}
          >
            <View style={{ flexGrow: 1 }}>
              <Image
                cachePolicy="memory-disk"
                source={{ uri: image.uri }}
                style={styles.image}
                contentPosition="center"
                placeholder={{ blurhash: image.blurhash }}
                transition={500}
              />
            </View>
          </PressableScale>
        )}
        showsVerticalScrollIndicator={false}
        recycleItems
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listHeader: {
    height: 100,
  },
  imageContainer: {
    width: "100%",
    height: 90,
  },
  image: {
    width: "100%",
    height: 90,
    borderRadius: 16,
  },
});
