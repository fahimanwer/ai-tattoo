import { FeaturedTattoo } from "@/lib/featured-tattoos";
import { getSketchDesignByStyleId } from "@/lib/sketch-design";
import ParallaxScrollView from "@/src/components/about/ParallaxScrollView";
import { NotFound } from "@/src/components/screens/notFound";
import { Button } from "@/src/components/ui/Button";
import { VerticalCard } from "@/src/components/ui/VerticalCard";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { customEvent } from "vexo-analytics";

export default function SketchDesigns() {
  const { design } = useLocalSearchParams<{ design: string }>();
  const router = useRouter();

  const selectedDesign = getSketchDesignByStyleId(parseInt(design || "0", 10));

  if (!selectedDesign) {
    return <NotFound />;
  }

  // Use first image as cover image
  const coverImage: ImageSourcePropType = selectedDesign.gallery[0]
    ? { uri: selectedDesign.gallery[0].uri }
    : { uri: "" };

  const coverImageBlurhash = selectedDesign.gallery[0]?.blurhash;

  return (
    <>
      <Stack.Screen
        options={{
          title: selectedDesign.title,
        }}
      />
      <ParallaxScrollView
        imageUrl={coverImage}
        title={selectedDesign.title}
        shortDescription={selectedDesign.description}
        imageBlurhash={coverImageBlurhash}
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
                style: selectedDesign.id.toString(),
              },
            })
          }
        />
        <View style={styles.content}>
          {selectedDesign.gallery && selectedDesign.gallery.length > 0 && (
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
                {selectedDesign.gallery.map((image, index) => {
                  const galleryItem: FeaturedTattoo = {
                    id: index,
                    title: `${selectedDesign.title} ${index + 1}`,
                    style: selectedDesign.style,
                    short_description: selectedDesign.style,
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
                        customEvent("gallery_image_viewed", {
                          styleId: selectedDesign.id,
                          imageIndex: index,
                        });

                        const imageUrl =
                          typeof galleryItem.image === "object" &&
                          "uri" in galleryItem.image
                            ? galleryItem.image.uri
                            : galleryItem.image;

                        router.push({
                          pathname: "/(tabs)/(home)/about/image-preview",
                          params: {
                            imageUrl: imageUrl as string,
                            styleId: selectedDesign.id.toString(),
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
