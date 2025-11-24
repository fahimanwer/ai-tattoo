import { ALBUM_NAME } from "@/lib/save-to-library";
import Share from "@/patches/rn-share-re-export";
import { GlassView } from "expo-glass-effect";
import * as MediaLibrary from "expo-media-library";
import { router, Stack } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  View,
} from "react-native";
import { InteractiveImage } from "../ui/InteractiveImage";
import { Button } from "../ui/Button";
import { HeaderButton } from "../ui/HeaderButtons/HeaderButton";
import { Text } from "../ui/Text";

interface TattooDetailScreenProps {
  tattooId: string;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


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
    if (!asset || !Share) return;

    try {
      const appStoreUrl =
        "https://apps.apple.com/us/app/ai-tattoo-try-on/id6751748193";
      const shareMessage =
        "I just got tattooed! Check out this photo 🎨 Try it yourself: " +
        appStoreUrl;

      // Get asset info to get the URI
      const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
      const fileUri = assetInfo.localUri || assetInfo.uri;

      if (!fileUri) {
        Alert.alert("Error", "Unable to access the image file.");
        return;
      }

      // Share using react-native-share with the file URI
      await Share.open({
        message: shareMessage,
        url: fileUri,
      });
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
          unstable_headerRightItems: () => [
            {
              type: "button",
              label: "Share",
              icon: {
                name: "square.and.arrow.up",
                type: "sfSymbol",
              },
              onPress: handleSharePress,
              selected: false,
            },
            {
              type: "button",
              label: "Delete",
              icon: {
                name: "trash.fill",
                type: "sfSymbol",
              },
              onPress: handleDeletePress,
              selected: false,
            },
          ],
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
