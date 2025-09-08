import ParallaxScrollView from "@/components/about/ParallaxScrollView";
import { Button } from "@/components/ui/Button";
import { FeaturedTattoo, featuredTattoos } from "@/lib/featured-tattoos";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function AboutStyle() {
  const { style: styleParam } = useLocalSearchParams<{ style: string }>();
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);

  const selectedStyle: FeaturedTattoo | undefined = featuredTattoos.find(
    (tattoo) => tattoo.id.toString() === styleParam
  );

  const currentStyle = selectedStyle || featuredTattoos[0];

  const { width: screenWidth } = Dimensions.get("screen");
  const galleryItemWidth = screenWidth * 0.7;

  return (
    <ParallaxScrollView
      imageUrl={currentStyle?.image as ImageSourcePropType}
      title={currentStyle?.title}
      shortDescription={currentStyle?.short_description}
    >
      <ScrollView
        style={[styles.container]}
        contentInsetAdjustmentBehavior="never"
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Content */}
        <View style={styles.content}>
          {currentStyle?.gallery && currentStyle.gallery.length > 0 && (
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                decelerationRate="fast"
                snapToInterval={galleryItemWidth + 16}
                snapToAlignment="center"
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={styles.galleryScrollContainer}
              >
                {currentStyle.gallery.map((image, index) => (
                  <Pressable
                    key={index}
                    style={({ pressed }) => [
                      styles.galleryItem,
                      {
                        transform: [{ scale: pressed ? 0.99 : 1 }],
                        width: galleryItemWidth,
                        height: 240,
                      },
                    ]}
                    onPress={() => setSelectedGalleryIndex(index)}
                  >
                    <Image
                      source={image as ImageSourcePropType}
                      style={styles.galleryImage}
                      contentFit="cover"
                      contentPosition="center"
                    />
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}

          <View style={styles.actionContainer}>
            <Button
              title={`Create ${currentStyle?.title} Tattoo`}
              onPress={() => {}}
              variant="solid"
              color="white"
              symbol="plus.circle.fill"
              haptic
            />
          </View>
        </View>
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: 32,
  },
  heroContainer: {
    position: "relative",
    width: "100%",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    position: "absolute",
    bottom: 16,
    left: 0,
    zIndex: 10,
    paddingHorizontal: 16,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  descriptionTitle: {
    marginBottom: 12,
  },
  descriptionText: {
    lineHeight: 24,
    marginBottom: 20,
  },
  characteristicsContainer: {
    marginTop: 8,
  },
  characteristicsTitle: {
    marginBottom: 12,
  },
  characteristicsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  characteristicItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  characteristicText: {},

  galleryTitle: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  galleryScrollContainer: {
    paddingHorizontal: 16,
  },
  galleryItem: {
    marginRight: 16,
    overflow: "hidden",
    position: "relative",
  },
  galleryImage: {
    width: "100%",
    height: "100%",
  },
  galleryOverlay: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  actionContainer: {
    paddingHorizontal: 16,
    marginBottom: 32,
    marginTop: 32,
  },
});
