import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FeaturedTattoo, featuredTattoos } from "@/lib/featured-tattoos";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function AboutStyle() {
  const { style: styleParam } = useLocalSearchParams<{ style: string }>();
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const selectedStyle: FeaturedTattoo | undefined = featuredTattoos.find(
    (tattoo) => tattoo.id.toString() === styleParam
  );

  const currentStyle = selectedStyle || featuredTattoos[0];

  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const galleryItemWidth = screenWidth * 0.7;
  const galleryItemHeight = galleryItemWidth * 1.2;

  const dynamicStyles = {
    heroContainer: {
      ...styles.heroContainer,
      height: screenHeight * 0.65,
    },
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentInsetAdjustmentBehavior="never"
      showsVerticalScrollIndicator={false}
    >
      {/* Full Screen Hero Image */}
      <View style={dynamicStyles.heroContainer}>
        <Image
          source={currentStyle?.image}
          style={styles.heroImage}
          resizeMode="cover"
        />
        {/* Title Overlay - Absolute Position */}
        <View style={styles.titleOverlay}>
          <View style={styles.titleBackground}>
            <Text
              type="4xl"
              weight="bold"
              style={[styles.heroTitle, { color: "white" }]}
            >
              {currentStyle?.title}
            </Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text
            type="xl"
            weight="bold"
            style={[styles.descriptionTitle, { color: colors.text }]}
          >
            About {currentStyle?.title} Style
          </Text>
          <Text
            type="base"
            style={[styles.descriptionText, { color: colors.text }]}
          >
            {currentStyle?.description}
          </Text>

          {/* Characteristics */}
          <View style={styles.characteristicsContainer}>
            <Text
              type="lg"
              weight="semibold"
              style={[styles.characteristicsTitle, { color: colors.text }]}
            >
              Style Details
            </Text>
            <View style={styles.characteristicsList}>
              <View
                style={[
                  styles.characteristicItem,
                  { borderColor: colors.tint },
                ]}
              >
                <Text
                  type="sm"
                  style={[styles.characteristicText, { color: colors.text }]}
                >
                  {currentStyle?.style}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Horizontal Gallery */}
        {currentStyle?.gallery && currentStyle.gallery.length > 0 && (
          <View style={styles.galleryContainer}>
            <Text
              type="xl"
              weight="bold"
              style={[styles.galleryTitle, { color: colors.text }]}
            >
              Gallery Examples
            </Text>
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
                  style={[
                    styles.galleryItem,
                    {
                      width: galleryItemWidth,
                      height: galleryItemHeight,
                      borderColor:
                        selectedGalleryIndex === index
                          ? colors.tint
                          : colors.border,
                      borderWidth: selectedGalleryIndex === index ? 3 : 1,
                    },
                  ]}
                  onPress={() => setSelectedGalleryIndex(index)}
                >
                  <Image
                    source={image}
                    style={styles.galleryImage}
                    resizeMode="cover"
                  />
                  {selectedGalleryIndex === index && (
                    <View
                      style={[
                        styles.galleryOverlay,
                        { backgroundColor: `${colors.tint}20` },
                      ]}
                    >
                      <View
                        style={[
                          styles.selectedIndicator,
                          { backgroundColor: colors.tint },
                        ]}
                      >
                        <Text
                          type="xs"
                          weight="bold"
                          style={{ color: colors.background }}
                        >
                          {index + 1}
                        </Text>
                      </View>
                    </View>
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Button
            title={`Create ${currentStyle?.title} Tattoo`}
            onPress={() => {}}
            variant="solid"
            color="black"
            symbol="plus.circle.fill"
            haptic
          />
          <Button
            title="View More Examples"
            onPress={() => {}}
            variant="outline"
            symbol="arrow.right"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
  heroContainer: {
    position: "relative",
    width: "100%",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  titleOverlay: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  titleBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  heroTitle: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
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
  galleryContainer: {
    marginBottom: 32,
  },
  galleryTitle: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  galleryScrollContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  galleryItem: {
    marginRight: 16,
    borderRadius: 12,
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
  selectedIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  actionContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
});
