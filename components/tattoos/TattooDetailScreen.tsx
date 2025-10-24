import { ALBUM_NAME } from "@/lib/save-to-library";
import { File, Paths } from "expo-file-system";
import { GlassView } from "expo-glass-effect";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { router, Stack } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  Share,
  StyleSheet,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Button } from "../ui/Button";
import { HeaderButton } from "../ui/HeaderButtons/HeaderButton";
import { Text } from "../ui/Text";

interface TattooDetailScreenProps {
  tattooId: string;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface InteractiveImageProps {
  uri: string;
}

function InteractiveImage({ uri }: InteractiveImageProps) {
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
        />
      </Animated.View>
    </GestureDetector>
  );
}

export function TattooDetailScreen({ tattooId }: TattooDetailScreenProps) {
  const [asset, setAsset] = useState<MediaLibrary.Asset | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAsset = useCallback(async () => {
    try {
      setLoading(true);

      // Get the album
      const album = await MediaLibrary.getAlbumAsync(ALBUM_NAME);
      if (!album) {
        setLoading(false);
        return;
      }

      // Get all assets from the album
      const { assets } = await MediaLibrary.getAssetsAsync({
        album,
        sortBy: [MediaLibrary.SortBy.creationTime],
        mediaType: ["photo"],
        first: 100,
      });

      // Find the asset with matching ID
      const foundAsset = assets.find((a) => a.id === tattooId);
      setAsset(foundAsset || null);
    } catch (error) {
      console.error("Error loading asset:", error);
    } finally {
      setLoading(false);
    }
  }, [tattooId]);

  useEffect(() => {
    loadAsset();
  }, [loadAsset]);

  const handleSharePress = async () => {
    if (!asset) return;

    try {
      const shareMessage =
        "Check out my AI generated tattoo design created with AI tattoo try on.";

      // Get asset info to get the file extension
      const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
      const fileUri = assetInfo.localUri || assetInfo.uri;

      // Create source and destination file references
      const fileExtension = fileUri.split(".").pop() || "jpg";
      const tempFileName = `tattoo-share-${Date.now()}.${fileExtension}`;
      const sourceFile = new File(fileUri);
      const tempFile = new File(Paths.cache, tempFileName);

      // Copy the file to cache directory for sharing
      await sourceFile.copy(tempFile);

      // Share the file
      if (Platform.OS === "ios") {
        await Share.share({
          url: tempFile.uri,
          message: shareMessage,
        });
      } else {
        // On Android, we need to use url for files
        await Share.share({
          message: shareMessage,
          url: tempFile.uri,
        });
      }

      // Clean up the temporary file after a delay
      setTimeout(async () => {
        try {
          await tempFile.delete();
        } catch (error) {
          console.error("Error cleaning up temp file:", error);
        }
      }, 5000);
    } catch (error) {
      console.error("Error sharing:", error);
      Alert.alert("Error", "Unable to share the image. Please try again.");
    }
  };

  const handleDeletePress = async () => {
    if (!asset) return;

    Alert.alert(
      "Delete Tattoo",
      "Are you sure you want to delete this tattoo design? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await MediaLibrary.deleteAssetsAsync([asset.id]);
              router.back();
            } catch (error) {
              console.error("Error deleting asset:", error);
              Alert.alert(
                "Error",
                "Unable to delete the image. Please try again."
              );
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <HeaderButton
            imageProps={{ systemName: "xmark" }}
            buttonProps={{
              onPress: () => router.back(),
              variant: "glass",
            }}
          />
        </View>
        <View style={styles.errorContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      </View>
    );
  }

  if (!asset) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text type="lg" weight="bold" style={styles.errorText}>
            Tattoo not found
          </Text>
          <Button
            title="Back to home"
            onPress={() => router.back()}
            variant="link"
            color="white"
          />
        </View>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <HeaderButton
              imageProps={{ systemName: "xmark" }}
              buttonProps={{
                onPress: () => router.back(),
                variant: "glass",
              }}
            />
          ),
          headerRight: () => (
            <>
              <HeaderButton
                imageProps={{ systemName: "square.and.arrow.up" }}
                buttonProps={{
                  onPress: handleSharePress,
                  variant: "glass",
                }}
              />
              <HeaderButton
                imageProps={{ systemName: "trash.fill" }}
                buttonProps={{
                  onPress: handleDeletePress,
                  variant: "glass",
                  role: "destructive",
                }}
              />
            </>
          ),
        }}
      />
      <View style={styles.container}>
        {/* Interactive Image */}
        <View style={styles.imageContainer}>
          <InteractiveImage uri={asset.uri} />
        </View>

        {/* Info */}
        <GlassView style={styles.infoContainer} glassEffectStyle="clear">
          <Text type="sm" style={styles.infoSubtitle}>
            {asset.width} × {asset.height} •{" "}
            {new Date(asset.creationTime).toLocaleDateString()}
          </Text>
        </GlassView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 20,
    paddingBottom: 16,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerRightContainer: {
    flexDirection: "row",
    gap: 12,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  infoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
  },
  infoSubtitle: {
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: "#000000",
  },
  errorText: {
    color: "white",
    textAlign: "center",
  },
});
