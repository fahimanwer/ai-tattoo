import { listAlbumAssets } from "@/lib/save-to-library";
import { LegendList } from "@legendapp/list";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { PressableScale } from "pressto";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Linking, StyleSheet, View } from "react-native";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";

export function TattooHistory() {
  const [tattoos, setTattoos] = useState<MediaLibrary.Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [permission, requestPermission] = MediaLibrary.usePermissions();

  const loadTattoos = useCallback(async () => {
    try {
      setLoading(true);
      if (permission?.status === MediaLibrary.PermissionStatus.GRANTED) {
        const assets = await listAlbumAssets(100);
        setTattoos(assets);
      }
    } catch (error) {
      console.error("Error loading tattoos from album:", error);
    } finally {
      setLoading(false);
    }
  }, [permission]);

  // Load tattoos when permission is granted
  useEffect(() => {
    loadTattoos();
  }, [loadTattoos]);

  const handleTattooPress = (tattoo: MediaLibrary.Asset) => {
    router.push(`/(tabs)/tattoos/details?id=${tattoo.id}`);
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.emptyDescription}>Loading tattoos...</Text>
        </View>
      );
    }

    if (permission?.status === MediaLibrary.PermissionStatus.UNDETERMINED) {
      return (
        <View style={styles.emptyContainer}>
          <SymbolView
            name="photo.fill.on.rectangle.fill"
            size={60}
            tintColor={"white"}
          />
          <Text type="lg" weight="semibold" style={styles.emptyTitle}>
            Let&apos;s Get Started
          </Text>
          <Text style={styles.emptyDescription}>
            We need access to your photo library so you can view and save your
            tattoos.
          </Text>
          <Button
            onPress={requestPermission}
            title="Continue"
            variant="link"
            color="yellow"
          />
        </View>
      );
    }

    if (permission?.status === MediaLibrary.PermissionStatus.DENIED) {
      return (
        <View style={styles.emptyContainer}>
          <SymbolView
            name="exclamationmark.triangle.fill"
            size={60}
            tintColor={"white"}
          />
          <Text type="lg" weight="semibold" style={styles.emptyTitle}>
            Photo Access Needed
          </Text>
          <Text style={styles.emptyDescription}>
            This feature requires access to your photo library to view and save
            your tattoos. You can manage photo access in your device settings.
          </Text>
          <Button
            onPress={() => Linking.openURL("app-settings:")}
            title="Open Settings"
            variant="link"
            color="yellow"
          />
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <SymbolView name="photo.fill.on.rectangle.fill" size={60} />
        <Text type="lg" weight="semibold" style={styles.emptyTitle}>
          No tattoos saved yet
        </Text>
        <Text style={styles.emptyDescription}>
          Create and save your first tattoo design! Swipe down to refresh.
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <LegendList
      onRefresh={loadTattoos}
      refreshing={loading}
      data={tattoos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PressableScale
          onPress={() => handleTattooPress(item)}
          style={styles.imageContainer}
        >
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: item.uri }}
              style={styles.image}
              contentFit="cover"
            />
          </View>
        </PressableScale>
      )}
      numColumns={4}
      estimatedItemSize={90}
      contentContainerStyle={styles.listContent}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmpty}
      recycleItems
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    gap: 10,
  },
  imageContainer: {
    width: "100%",
    height: 90,
  },
  imageWrapper: {
    flexGrow: 1,
  },
  image: {
    width: "100%",
    height: 90,
    borderRadius: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    minHeight: 400,
  },
  emptyTitle: {
    marginBottom: 8,
    textAlign: "center",
  },
  emptyDescription: {
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
});
