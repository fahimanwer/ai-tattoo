import { ALBUM_NAME } from "@/lib/save-to-library";
import { GlassView } from "expo-glass-effect";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { router, Stack } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
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
import { Icon } from "../ui/Icon";
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
      await Share.share({
        url: asset.uri,
        message: `Check out my AI-generated tattoo design!`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.closeButton}>
            <Icon symbol="xmark" style={styles.closeIcon} color="white" />
          </Pressable>
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
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.closeButton}>
            <Icon symbol="xmark" style={styles.closeIcon} color="white" />
          </Pressable>
        </View>
        <View style={styles.errorContainer}>
          <Text type="lg" weight="bold" style={styles.errorText}>
            Tattoo not found
          </Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.closeButton}>
              <Icon symbol="xmark" style={styles.closeIcon} color="white" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={handleSharePress} style={styles.shareButton}>
              <Icon
                symbol="square.and.arrow.up"
                style={styles.closeIcon}
                color="white"
              />
            </Pressable>
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
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  shareButton: {
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
