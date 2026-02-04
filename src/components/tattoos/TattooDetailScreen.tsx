import { ALBUM_NAME } from "@/lib/save-to-library";
import Share from "@/patches/rn-share-re-export";
import * as MediaLibrary from "expo-media-library";
import { router, Stack } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { customEvent } from "vexo-analytics";
import { Button } from "../ui/Button";
import { HeaderButton } from "../ui/HeaderButtons/HeaderButton";
import { InteractiveImage } from "../ui/InteractiveImage";
import { Text } from "../ui/Text";

interface TattooDetailScreenProps {
  tattooId: string;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export function TattooDetailScreen({ tattooId }: TattooDetailScreenProps) {
  const [asset, setAsset] = useState<MediaLibrary.Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTabBarView, setShowTabBarView] = useState(false);

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
    customEvent("saved_tattoo_viewed", {
      source: "my_tattoos",
    });
  }, [loadAsset]);

  const handleSharePress = async () => {
    if (!asset || !Share) return;

    try {
      // Get asset info to get the URI
      const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
      const fileUri = assetInfo.localUri || assetInfo.uri;

      if (!fileUri) {
        Alert.alert("Error", "Unable to access the image file.");
        return;
      }

      await Share.open({
        message: "https://cwb.sh/inkigo-ios?r=app",
        url: fileUri,
      });

      customEvent("tattoo_shared", {
        source: "detail_screen",
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
              customEvent("saved_tattoo_deleted", {});
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
      <Stack.Toolbar placement="left">
        <Stack.Toolbar.Button onPress={() => router.back()} icon={"xmark"} />
      </Stack.Toolbar>

      <Stack.Toolbar placement="bottom">
        <Stack.Toolbar.Button
          onPress={handleSharePress}
          icon={"square.and.arrow.up"}
        />
        <Stack.Toolbar.Button
          onPress={() => setShowTabBarView(!showTabBarView)}
          icon={"info"}
          hidden={showTabBarView}
        />

        <Stack.Toolbar.Spacer />

        <Stack.Toolbar.View hidden={!showTabBarView}>
          <Pressable
            onPress={() => setShowTabBarView(!showTabBarView)}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 200,
              height: 40,
            }}
          >
            <Text type="sm" style={{}}>
              {asset.width} x {asset.height} -{" "}
              {new Date(asset.creationTime).toLocaleDateString()}
            </Text>
          </Pressable>
        </Stack.Toolbar.View>

        <Stack.Toolbar.Spacer />

        <Stack.Toolbar.Button onPress={handleDeletePress} icon={"trash"} />
      </Stack.Toolbar>

      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <InteractiveImage uri={asset.uri} />
        </View>
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
