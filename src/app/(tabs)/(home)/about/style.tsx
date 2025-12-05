import { FeaturedTattoo, featuredTattoos } from "@/lib/featured-tattoos";
import ParallaxScrollView from "@/src/components/about/ParallaxScrollView";
import { Button } from "@/src/components/ui/Button";
import { VerticalCard } from "@/src/components/ui/VerticalCard";
import { router, Stack, useLocalSearchParams } from "expo-router";
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
    <>
      <Stack.Screen
        options={{
          unstable_headerRightItems: () => [
            {
              type: "button",
              label: "Use Tattoo",
              icon: {
                name: "plus",
                type: "sfSymbol",
              },
              onPress: () => {
                router.push({
                  pathname: "/image-preview",
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
          title="Read More"
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

                  return (
                    <VerticalCard
                      key={index}
                      style={galleryItem}
                      imageStyle={{
                        width: 160,
                      }}
                      showOverlay={false}
                      onPress={() => {
                        const imageUrl =
                          typeof galleryItem.image === "object" &&
                          "uri" in galleryItem.image
                            ? galleryItem.image.uri
                            : galleryItem.image;

                        router.push({
                          pathname: "/image-preview",
                          params: {
                            imageUrl: imageUrl as string,
                            styleId: currentStyle.id.toString(),
                          },
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
