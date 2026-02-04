import { cacheImageFromUrl } from "@/lib/image-cache";
import { InteractiveImage } from "@/src/components/ui/InteractiveImage";
import { Text } from "@/src/components/ui/Text";
import { PlaygroundContext } from "@/src/context/PlaygroundContext";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import { use, useState } from "react";
import { Alert, Dimensions, StyleSheet, View } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ImagePreview() {
  const params = useLocalSearchParams<{
    imageUrl: string;
    styleId?: string;
  }>();

  const {
    setSessionGenerations,
    setActiveGenerationIndex,
    activeGenerationIndex,
    sessionGenerations,
  } = use(PlaygroundContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleUseTattoo = async () => {
    setIsLoading(true);

    try {
      // Download image from S3 directly to disk (skips base64 intermediate step)
      // This is more efficient: URL → file instead of URL → base64 → file
      const fileUri = await cacheImageFromUrl(params.imageUrl, "jpg");

      // Store only the file URI (not the base64) to minimize memory usage
      // Check if we can add to the active group (max 2 images per group)
      const canAddToActiveGroup =
        activeGenerationIndex !== undefined &&
        sessionGenerations[activeGenerationIndex].length < 2;

      if (canAddToActiveGroup) {
        // Add to existing group (max 2 images)
        setSessionGenerations((prev) => {
          const newGenerations = [...prev];
          newGenerations[activeGenerationIndex] = [
            ...newGenerations[activeGenerationIndex],
            fileUri,
          ];
          return newGenerations;
        });
      } else {
        // Create a new group with this single image
        setSessionGenerations((prev) => {
          const newGenerations = [...prev, [fileUri]];
          // Set active index to the newly added image
          setActiveGenerationIndex(newGenerations.length - 1);
          return newGenerations;
        });
      }

      // Navigate to playground
      router.dismissTo("/(playground)");
    } catch (error) {
      console.error("Error using tattoo:", error);
      Alert.alert("Error", "Failed to use this tattoo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!params.imageUrl) {
    return (
      <View style={styles.errorContainer}>
        <Text type="lg" weight="bold" style={styles.errorText}>
          Image not found
        </Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTransparent: true,
          headerLargeTitle: false,
          headerBackButtonDisplayMode: "minimal",
          unstable_headerRightItems: () => [
            {
              labelStyle: {
                fontWeight: "bold",
              },
              type: "button",
              label: isLoading ? "Loading..." : "Use Tattoo",
              onPress: handleUseTattoo,
              variant: "prominent",
              tintColor: "yellow",
              disabled: isLoading,
            },
          ],
        }}
      />
      <View style={styles.container}>
        {/* Interactive Image */}
        <Link.AppleZoomTarget>
          <View style={styles.imageContainer}>
            <InteractiveImage uri={params.imageUrl} />
          </View>
        </Link.AppleZoomTarget>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  errorText: {
    color: "white",
  },
});
