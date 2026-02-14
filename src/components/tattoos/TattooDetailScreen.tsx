import { ALBUM_NAME } from "@/lib/save-to-library";
import { useTheme } from "@/src/context/ThemeContext";
import Share from "@/patches/rn-share-re-export";
import * as MediaLibrary from "expo-media-library";
import { router, Stack } from "expo-router";
import { useThemeColor } from "heroui-native";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
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
  const { isDark } = useTheme();
  const foreground = useThemeColor("foreground");
  const { t } = useTranslation();

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
        Alert.alert(t('common.error'), t('tattoos.imageAccessError'));
        return;
      }

      await Share.open({
        message: "https://fahimanwer.com/tattooai",
        url: fileUri,
      });

      customEvent("tattoo_shared", {
        source: "detail_screen",
      });
    } catch (error) {
      console.error("Error sharing:", error);
      Alert.alert(t('common.error'), t('tattoos.shareError'));
    }
  };

  const handleDeletePress = async () => {
    if (!asset) return;

    Alert.alert(
      t('tattoos.deleteTitle'),
      t('tattoos.deleteMessage'),
      [
        {
          text: t('common.cancel'),
          style: "cancel",
        },
        {
          text: t('common.delete'),
          style: "destructive",
          onPress: async () => {
            try {
              await MediaLibrary.deleteAssetsAsync([asset.id]);
              customEvent("saved_tattoo_deleted", {});
              router.back();
            } catch (error) {
              console.error("Error deleting asset:", error);
              Alert.alert(
                t('common.error'),
                t('tattoos.deleteError')
              );
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? "#000000" : "#F5F5F7" },
        ]}
      >
        <View style={styles.header}>
          <HeaderButton
            imageProps={{ systemName: "xmark" }}
            buttonProps={{
              onPress: () => router.back(),
            }}
          />
        </View>
        <View style={styles.errorContainer}>
          <ActivityIndicator size="large" color={foreground} />
        </View>
      </View>
    );
  }

  if (!asset) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? "#000000" : "#F5F5F7" },
        ]}
      >
        <View style={styles.errorContainer}>
          <Text type="lg" weight="bold" style={{ color: foreground }}>
            {t('tattoos.tattooNotFound')}
          </Text>
          <Button
            title={t('tattoos.backToHome')}
            onPress={() => router.back()}
            variant="link"
            color="blue"
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

      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? "#000000" : "#F5F5F7" },
        ]}
      >
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
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
});
