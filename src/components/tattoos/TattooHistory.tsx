import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/nano";
import { listAlbumAssets, saveBase64ToAlbum } from "@/lib/save-to-library";
import { LegendList } from "@legendapp/list";
import { useQuery, useAction } from "convex/react";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { PressableScale } from "pressto";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Linking, StyleSheet, View } from "react-native";
import { toast } from "sonner-native";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";

export function TattooHistory() {
  const [tattoos, setTattoos] = useState<MediaLibrary.Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRestoring, setIsRestoring] = useState(false);
  const [permission, requestPermission] = MediaLibrary.usePermissions();

  const { data: session } = authClient.useSession();
  const cloudCount = useQuery(
    api.generations.getCloudCount,
    session?.user ? {} : "skip"
  );
  const getRestoreData = useAction(api.generations.getRestoreData);

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

  useEffect(() => {
    loadTattoos();
  }, [loadTattoos]);

  const handleTattooPress = (tattoo: MediaLibrary.Asset) => {
    router.push(`/(tabs)/tattoos/details?id=${tattoo.id}`);
  };

  const handleRestore = useCallback(async () => {
    try {
      setIsRestoring(true);
      toast("Restoring from cloud...", { duration: 2000 });

      const generations = await getRestoreData();

      if (!generations || generations.length === 0) {
        toast("No cloud generations found", { duration: 2000 });
        return;
      }

      let restored = 0;
      for (const gen of generations) {
        if (!gen.imageUrl) continue;
        try {
          // Download image and save to local photo library
          const response = await fetch(gen.imageUrl);
          if (!response.ok) continue;

          const blob = await response.blob();
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });

          await saveBase64ToAlbum(base64, "png");
          restored++;
        } catch (error) {
          console.error("Failed to restore generation:", error);
        }
      }

      toast.success(`Restored ${restored} of ${generations.length} tattoos`, {
        duration: 3000,
      });

      // Refresh the gallery
      await loadTattoos();
    } catch (error) {
      console.error("Restore failed:", error);
      Alert.alert("Restore Failed", "Unable to restore from cloud. Please try again.");
    } finally {
      setIsRestoring(false);
    }
  }, [getRestoreData, loadTattoos]);

  // Show restore banner when user is authenticated and has cloud generations
  const showRestoreBanner =
    session?.user &&
    cloudCount !== undefined &&
    cloudCount > 0 &&
    tattoos.length === 0 &&
    !loading;

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
        {showRestoreBanner && (
          <View style={styles.restoreBanner}>
            <SymbolView name="icloud.and.arrow.down" size={24} tintColor="white" />
            <Text type="sm" style={styles.restoreText}>
              {cloudCount} tattoo{cloudCount !== 1 ? "s" : ""} found in cloud
            </Text>
            <Button
              title={isRestoring ? "Restoring..." : "Restore"}
              variant="link"
              color="yellow"
              onPress={handleRestore}
              disabled={isRestoring}
            />
          </View>
        )}
      </View>
    );
  };

  const renderHeader = () => {
    // Show restore option in the list header when there are local tattoos
    // but also cloud ones available
    if (
      !showRestoreBanner ||
      tattoos.length === 0 ||
      !session?.user ||
      !cloudCount
    ) {
      return null;
    }

    return (
      <View style={styles.restoreBanner}>
        <SymbolView name="icloud.and.arrow.down" size={20} tintColor="white" />
        <Text type="sm" style={styles.restoreText}>
          {cloudCount} in cloud
        </Text>
        <Button
          title={isRestoring ? "Restoring..." : "Restore"}
          variant="link"
          color="yellow"
          onPress={handleRestore}
          disabled={isRestoring}
        />
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
      ListHeaderComponent={renderHeader}
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
  restoreBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  restoreText: {
    opacity: 0.7,
  },
});
