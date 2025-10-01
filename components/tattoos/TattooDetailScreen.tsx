import { ALBUM_NAME } from "@/lib/save-to-library";
import {
  GlassContainer,
  GlassView,
  isLiquidGlassAvailable,
} from "expo-glass-effect";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Share,
  StyleSheet,
  View,
} from "react-native";
import { Icon } from "../ui/Icon";
import { Text } from "../ui/Text";

interface TattooDetailScreenProps {
  tattooId: string;
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <Icon symbol="xmark" style={styles.closeIcon} color="white" />
        </Pressable>
      </View>

      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: asset.uri }}
          style={styles.image}
          contentFit="contain"
          cachePolicy="memory-disk"
        />
      </View>

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text type="lg" weight="bold" style={styles.infoTitle}>
          {asset.filename}
        </Text>
        <Text type="sm" style={styles.infoSubtitle}>
          Created: {new Date(asset.creationTime).toLocaleString()}
        </Text>
        <Text type="sm" style={styles.infoSubtitle}>
          {asset.width} × {asset.height} pixels
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        {isLiquidGlassAvailable() ? (
          <GlassContainer spacing={16}>
            <GlassView style={styles.actionButton} isInteractive>
              <Pressable onPress={handleSharePress}>
                <Icon
                  symbol="square.and.arrow.up"
                  style={styles.actionIcon}
                  color="white"
                />
              </Pressable>
            </GlassView>
          </GlassContainer>
        ) : (
          <View style={styles.fallbackActions}>
            <Pressable
              onPress={handleSharePress}
              style={[styles.actionButton, styles.fallbackButton]}
            >
              <Icon
                symbol="square.and.arrow.up"
                style={styles.actionIcon}
                color="white"
              />
            </Pressable>
          </View>
        )}
      </View>
    </View>
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
  },
  headerInfo: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    color: "white",
    marginBottom: 4,
  },
  subtitle: {
    color: "rgba(255,255,255,0.7)",
    marginBottom: 4,
  },
  ownDataText: {
    color: "#007AFF",
    fontSize: 12,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    width: 16,
    height: 16,
  },
  imageContainer: {
    flex: 1,
    minHeight: 300,
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 4,
  },
  infoTitle: {
    color: "white",
  },
  infoSubtitle: {
    color: "rgba(255,255,255,0.7)",
  },
  actions: {
    padding: 20,
    paddingTop: 16,
    alignItems: "center",
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  actionIcon: {
    width: 20,
    height: 20,
  },
  fallbackActions: {
    flexDirection: "row",
    gap: 16,
  },
  fallbackButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  errorText: {
    color: "white",
    textAlign: "center",
  },
});
