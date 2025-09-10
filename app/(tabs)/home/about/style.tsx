import ParallaxScrollView from "@/components/about/ParallaxScrollView";
import { Button } from "@/components/ui/Button";
import { VerticalCard } from "@/components/ui/VerticalCard";
import { FeaturedTattoo, featuredTattoos } from "@/lib/featured-tattoos";
import { router, useLocalSearchParams } from "expo-router";
import {
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function AboutStyle() {
  const { style: styleParam } = useLocalSearchParams<{ style: string }>();

  const selectedStyle: FeaturedTattoo | undefined = featuredTattoos.find(
    (tattoo) => tattoo.id.toString() === styleParam
  );

  const currentStyle = selectedStyle || featuredTattoos[0];

  return (
    <ParallaxScrollView
      imageUrl={currentStyle?.image as ImageSourcePropType}
      title={currentStyle?.title}
      shortDescription={currentStyle?.short_description}
      onReadMore={() =>
        router.push({
          pathname: "/home/about/learn-more",
          params: {
            style: currentStyle?.id,
          },
        })
      }
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
                snapToInterval={176} // VerticalCard width (160) + marginRight (16)
                snapToAlignment="center"
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={styles.galleryScrollContainer}
              >
                {currentStyle.gallery.map((image, index) => {
                  // Transform gallery image to FeaturedTattoo-like object for VerticalCard
                  const galleryItem: FeaturedTattoo = {
                    id: index,
                    title: `${currentStyle.title} ${index + 1}`,
                    style: currentStyle.short_description || "Inspiration",
                    short_description: currentStyle.short_description || "",
                    description: "",
                    prompt: "",
                    gallery: [],
                    image: image as ImageSourcePropType,
                  };

                  return (
                    <VerticalCard
                      key={index}
                      style={galleryItem}
                      showOverlay={false}
                      onPress={() => {
                        const imageUrl =
                          typeof galleryItem.image === "object" &&
                          "uri" in galleryItem.image
                            ? galleryItem.image.uri
                            : galleryItem.image;

                        router.push({
                          pathname: "/home/about/photo",
                          params: {
                            imageUrl: imageUrl as string,
                          },
                        });
                      }}
                    />
                  );
                })}
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
              radius="full"
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
    paddingBottom: 56,
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
  actionContainer: {
    paddingHorizontal: 16,
    marginBottom: 32,
    marginTop: 32,
  },
});
