import { tattooCategories, TattooCategory } from "@/lib/celebrity-tattoos";
import { FeaturedTattoo, featuredTattoos } from "@/lib/featured-tattoos";
import { getMoodById, Mood } from "@/lib/moods";
import ParallaxScrollView from "@/src/components/about/ParallaxScrollView";
import { Button } from "@/src/components/ui/Button";
import { VerticalCard } from "@/src/components/ui/VerticalCard";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import {
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { customEvent } from "vexo-analytics";

export default function AboutStyle() {
  const { style: styleParam } = useLocalSearchParams<{ style: string }>();

  // First search in moods, then tattooCategories, then in featuredTattoos
  const selectedMood: Mood | undefined = getMoodById(
    parseInt(styleParam || "0", 10)
  );

  const selectedCategory: TattooCategory | undefined = tattooCategories.find(
    (category) => category.id.toString() === styleParam
  );

  const selectedStyle: FeaturedTattoo | undefined = featuredTattoos.find(
    (tattoo) => tattoo.id.toString() === styleParam
  );

  // Use mood if found, then category, then featured tattoo, otherwise default to first featured tattoo
  const currentStyle =
    selectedMood || selectedCategory || selectedStyle || featuredTattoos[0];

  // Determine the source type for analytics
  const sourceType = selectedMood
    ? "mood"
    : selectedCategory
    ? "category"
    : "style";

  const { t } = useTranslation();

  // Track style detail view
  useEffect(() => {
    if (currentStyle) {
      customEvent("style_detail_viewed", {
        styleId: currentStyle.id,
        styleName: currentStyle.title,
        source: sourceType,
      });
    }
  }, [currentStyle?.id]);

  return (
    <>
      <Stack.Screen
        options={{
          title: currentStyle?.title || t('common.style'),
          unstable_headerRightItems: () => [
            {
              type: "button",
              label: t('imagePreview.useTattoo'),
              icon: {
                name: "plus",
                type: "sfSymbol",
              },
              onPress: () => {
                customEvent("style_try_pressed", {
                  styleId: currentStyle.id,
                  styleName: currentStyle.title,
                });
                router.push({
                  pathname: "/(tabs)/(home)/about/image-preview",
                  params: {
                    imageUrl:
                      typeof currentStyle?.image === "object" &&
                      "uri" in currentStyle.image
                        ? currentStyle.image.uri
                        : (currentStyle.image as string),
                    styleId: currentStyle.id.toString(),
                  },
                });
              },
              selected: false,
            },
          ],
        }}
      />
      <ParallaxScrollView
        imageUrl={currentStyle?.image as ImageSourcePropType}
        title={currentStyle?.title}
        shortDescription={currentStyle?.short_description}
        imageBlurhash={
          typeof currentStyle?.image === "object" &&
          "blurhash" in currentStyle.image
            ? currentStyle.image.blurhash
            : undefined
        }
      >
        <Button
          title={t('common.readMore')}
          variant="link"
          color="white"
          style={{
            justifyContent: "flex-start",
            paddingLeft: 16,
          }}
          onPress={() =>
            router.push({
              pathname: "/(tabs)/(home)/about/learn-more",
              params: {
                style: currentStyle?.id,
              },
            })
          }
        />
        {/* Main Content */}
        <View style={styles.content}>
          {currentStyle?.gallery && currentStyle.gallery.length > 0 && (
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                decelerationRate="fast"
                snapToInterval={176}
                snapToAlignment="center"
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={styles.galleryScrollContainer}
              >
                {currentStyle.gallery.map((image, index) => {
                  const galleryItem: FeaturedTattoo = {
                    id: index,
                    title: `${currentStyle.title} ${index + 1}`,
                    style: currentStyle.short_description || "Inspiration",
                    short_description: currentStyle.short_description || "",
                    description: "",
                    prompt: "",
                    gallery: [],
                    image: image,
                  };

                  const imageUrl =
                    typeof galleryItem.image === "object" &&
                    "uri" in galleryItem.image
                      ? galleryItem.image.uri
                      : galleryItem.image;

                  return (
                    <VerticalCard
                      key={index}
                      style={galleryItem}
                      imageStyle={{
                        width: 160,
                      }}
                      showOverlay={false}
                      href={{
                        pathname: "/(tabs)/(home)/about/image-preview",
                        params: {
                          imageUrl: imageUrl as string,
                          styleId: currentStyle.id.toString(),
                        },
                      }}
                      onPress={() => {
                        customEvent("gallery_image_viewed", {
                          styleId: currentStyle.id,
                          imageIndex: index,
                        });
                      }}
                    />
                  );
                })}
              </ScrollView>
            </View>
          )}
        </View>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginVertical: 32,
  },
  galleryScrollContainer: {
    paddingHorizontal: 16,
  },
});
