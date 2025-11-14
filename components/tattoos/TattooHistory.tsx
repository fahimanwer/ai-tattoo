import { listAlbumAssets } from "@/lib/save-to-library";
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  StyleSheet,
  View,
} from "react-native";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";
import { VerticalCard } from "../ui/VerticalCard";

export function TattooHistory() {
  const [tattoos, setTattoos] = useState<MediaLibrary.Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [permission, requestPermission] = MediaLibrary.usePermissions();

  // Load tattoos only on initial mount
  useEffect(() => {
    loadTattoos();
  }, []);

  const loadTattoos = async () => {
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
  };

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
          <SymbolView name="photo.fill.on.rectangle.fill" size={60} />
          <Text type="lg" weight="semibold" style={styles.emptyTitle}>
            Let&apos;s Access Your Photos
          </Text>
          <Text style={styles.emptyDescription}>
            To help you view and save your tattoos, we&apos;ll need access to
            your photo library. You can enable it below whenever you&apos;re
            ready.
          </Text>
          <Button
            onPress={requestPermission}
            title="Enable Photo Access"
            variant="link"
            color="yellow"
          />
        </View>
      );
    }

    if (permission?.status === MediaLibrary.PermissionStatus.DENIED) {
      return (
        <View style={styles.emptyContainer}>
          <Text type="lg" weight="semibold" style={styles.emptyTitle}>
            Photo Library Permission Denied
          </Text>
          <Text style={styles.emptyDescription}>
            We need your permission to access your photo library to view and
            save your tattoos. Please grant permission in settings to continue.
          </Text>
          <Button
            onPress={() => Linking.openURL("app-settings:")}
            title="Open Settings to grant permission"
            variant="link"
            color="yellow"
          />
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text type="lg" weight="semibold" style={styles.emptyTitle}>
          No tattoos saved yet
        </Text>
        <Text style={styles.emptyDescription}>
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
