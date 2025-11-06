import { listAlbumAssets } from "@/lib/save-to-library";
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { Text } from "../ui/Text";
import { VerticalCard } from "../ui/VerticalCard";

export function TattooHistory() {
  const [tattoos, setTattoos] = useState<MediaLibrary.Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Load tattoos only on initial mount
  useEffect(() => {
    loadTattoos();
  }, []);

  const loadTattoos = async () => {
    try {
      setLoading(true);

      // Check permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        setPermissionGranted(false);
        setLoading(false);
        return;
      }

      setPermissionGranted(true);

      // Load tattoos from album
      const assets = await listAlbumAssets(100);
      setTattoos(assets);
    } catch (error) {
      console.error("Error loading tattoos from album:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTattooPress = (tattoo: MediaLibrary.Asset) => {
    router.push(`/(tabs)/tattoos/details?id=${tattoo.id}`);
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" />
          <Text type="sm" style={styles.emptyDescription}>
            Loading tattoos...
          </Text>
        </View>
      );
    }

    if (!permissionGranted) {
      return (
        <View style={styles.emptyContainer}>
          <Text type="lg" weight="semibold" style={styles.emptyTitle}>
            Permission Required
          </Text>
          <Text type="sm" style={styles.emptyDescription}>
            Please grant photo library access to view your saved tattoos.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text type="lg" weight="semibold" style={styles.emptyTitle}>
          No tattoos saved yet
        </Text>
        <Text type="sm" style={styles.emptyDescription}>
          Create and save your first tattoo design!
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadTattoos}
      refreshing={loading}
      data={tattoos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <VerticalCard asset={item} onPress={() => handleTattooPress(item)} />
      )}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.listContainer}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmpty}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    color: "#666",
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
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
    padding: 40,
    minHeight: 300,
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
