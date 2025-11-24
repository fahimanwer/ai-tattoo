import { BLURHASH, cacheImageFromUrl } from "@/lib/image-cache";
import { Icon } from "@/src/components/ui/Icon";
import { Text } from "@/src/components/ui/Text";
import { PlaygroundContext } from "@/src/context/PlaygroundContext";
import { Button, Host } from "@expo/ui/swift-ui";
import { fixedSize } from "@expo/ui/swift-ui/modifiers";
import { GlassView } from "expo-glass-effect";
import { Image } from "expo-image";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { use, useState } from "react";
import { Alert, Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

function InteractiveImage({ uri }: { uri: string }) {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value.x },
      { translateY: offset.value.y },
      { scale: scale.value },
    ],
  }));

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      if (scale.value > 1) {
        // Reset to default
        scale.value = withTiming(1);
        savedScale.value = 1;
        offset.value = withTiming({ x: 0, y: 0 });
        start.value = { x: 0, y: 0 };
      } else {
        // Zoom in
        scale.value = withTiming(2);
        savedScale.value = 2;
      }
    });

  const composed = Gesture.Simultaneous(
    doubleTapGesture,
    Gesture.Simultaneous(pinchGesture, panGesture)
  );

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={[styles.imageWrapper, animatedStyles]}>
        <Image
          source={{ uri }}
          style={styles.image}
          contentFit="contain"
          cachePolicy="memory-disk"
          placeholder={{ blurhash: BLURHASH }}
          transition={1000}
        />
      </Animated.View>
    </GestureDetector>
  );
}

export default function Photo() {
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
          title: "Tattoo Preview",
          unstable_headerLeftItems: () => [
            {
              type: "button",
              label: "Close",
              icon: {
                name: "xmark",
                type: "sfSymbol",
              },
              onPress: () => router.back(),
              selected: false,
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
        <GlassView style={styles.actionBar} glassEffectStyle="clear">
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

            <Host matchContents style={{ width: "100%" }}>
              <Button
                systemImage="wand.and.sparkles"
                controlSize="large"
                variant="borderedProminent"
                onPress={handleUseTattoo}
                modifiers={[fixedSize()]}
              >
                {isLoading ? "Loading..." : "Use This Tattoo"}
              </Button>
            </Host>
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
