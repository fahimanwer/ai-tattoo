import { BodyPartFilter } from "@/src/components/explore/BodyPartFilter";
import { MoodFilter } from "@/src/components/explore/MoodFilter";
import { StyleFilter } from "@/src/components/explore/StyleFilter";
import { useExploreFilter } from "@/src/context/ExploreFilterContext";
import {
  GalleryImage,
  getAllBodyParts,
  getAllGalleryImages,
  getAllMoodGalleryImages,
  getBodyPartDisplayName,
  getBodyPartImagesFromAllStyles,
  getMoodImagesByMoodId,
} from "@/src/utils/bodyPartsUtils";
import { LegendList } from "@legendapp/list";
import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import { PressableScale } from "pressto";
import { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { customEvent } from "vexo-analytics";

export function ExploreScreen() {
  const {
    filterMode,
    selectedBodyPart,
    setSelectedBodyPart,
    selectedStyle,
    setSelectedStyle,
    selectedMood,
    setSelectedMood,
  } = useExploreFilter();

  const allImages = useMemo(() => {
    if (filterMode === "styles") {
      const images = getAllGalleryImages();
      if (selectedStyle === null) return images;
      return images.filter((image) => image.styleId === selectedStyle);
    }

    if (filterMode === "moods") {
      const images = getAllMoodGalleryImages();
      if (selectedMood === null) return images;
      return getMoodImagesByMoodId(selectedMood);
    }

    // Filter by body part
    const bodyPartsToShow = selectedBodyPart
      ? [selectedBodyPart]
      : getAllBodyParts();

    return bodyPartsToShow
      .flatMap((bodyPart) => getBodyPartImagesFromAllStyles(bodyPart))
      .filter(Boolean) as GalleryImage[];
  }, [selectedBodyPart, selectedStyle, selectedMood, filterMode]);

  const handleImagePress = useCallback((image: GalleryImage) => {
    customEvent("explore_image_viewed", {
      bodyPart: image.bodyPart,
      styleId: image.styleId,
      moodId: image.moodId,
    });
    router.push({
      pathname: "/(tabs)/explore/image-preview",
      params: {
        bodyPart: image.bodyPart,
        imageUrl: image.uri,
        title: getBodyPartDisplayName(image.bodyPart),
      },
    });
  }, []);

  const headerTitle = useMemo(() => {
    if (filterMode === "styles") return "Explore by styles";
    if (filterMode === "moods") return "Explore by moods";
    return "Explore by body part";
  }, [filterMode]);

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
        ) : filterMode === "styles" ? (
          <Animated.View key="style" entering={FadeIn} exiting={FadeOut}>
            <StyleFilter
              selectedStyle={selectedStyle}
              onSelectStyle={setSelectedStyle}
            />
          </Animated.View>
        ) : (
          <Animated.View key="mood" entering={FadeIn} exiting={FadeOut}>
            <MoodFilter
              selectedMood={selectedMood}
              onSelectMood={setSelectedMood}
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
      selectedMood,
      setSelectedMood,
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
          `${image.moodId || image.styleId}-${image.bodyPart}-${
            image.gender
          }-${index}`
        }
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{ gap: 8, paddingHorizontal: 8 }}
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
    borderRadius: 12,
  },
});
