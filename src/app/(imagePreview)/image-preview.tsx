import { cacheImageFromUrl } from "@/lib/image-cache";
import { Icon } from "@/src/components/ui/Icon";
import { InteractiveImage } from "@/src/components/ui/InteractiveImage";
import { Text } from "@/src/components/ui/Text";
import { PlaygroundContext } from "@/src/context/PlaygroundContext";
import { GlassView } from "expo-glass-effect";
import { router, Stack, useLocalSearchParams } from "expo-router";
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
          unstable_headerLeftItems: () => [
            {
              type: "button",
              label: "Close",
              icon: {
                name: "xmark",
                type: "sfSymbol",
              },
              onPress: () => router.back(),
            },
          ],
          unstable_headerRightItems: () => [
            {
              type: "button",
              label: isLoading ? "Loading..." : "Use Tattoo",
              onPress: handleUseTattoo,
              disabled: isLoading,
            },
          ],
        }}
      />
      <View style={styles.container}>
        {/* Interactive Image */}
        <View style={styles.imageContainer}>
          <InteractiveImage uri={params.imageUrl} />
        </View>

        {/* Action Bar */}
        <GlassView style={styles.actionBar}>
          <View style={styles.actionContent}>
            <View style={styles.hintContainer}>
              <Icon
                symbol="hand.tap.fill"
                style={styles.hintIcon}
                color="rgba(255,255,255,0.6)"
              />
              <Text type="caption" style={styles.hintText}>
                Pinch to zoom • Double tap to reset
              </Text>
            </View>
          </View>
        </GlassView>
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
  actionBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 34,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  actionContent: {
    gap: 12,
    alignItems: "center",
  },
  hintContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  hintIcon: {
    width: 16,
    height: 16,
  },
  hintText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
  },
  closeButton: {
    padding: 8,
  },
  icon: {
    width: 20,
    height: 20,
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
