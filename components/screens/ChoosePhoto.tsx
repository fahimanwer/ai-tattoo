import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { useTattooCreation } from "@/context/TattooCreationContext";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { Link } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";

export function ChoosePhotoScreen() {
  const { 
    selectedPhoto, 
    setSelectedPhoto, 
    setCurrentStep,
    nextStep 
  } = useTattooCreation();
  
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  
  // Set current step when component mounts
  useEffect(() => {
    setCurrentStep(2);
  }, [setCurrentStep]);

  const loadRecentPhotos = useCallback(async () => {
    try {
      setLoading(true);

      // Request permission if not granted
      if (permissionResponse?.status !== "granted") {
        const permission = await requestPermission();
        if (permission.status !== "granted") {
          Alert.alert(
            "Permission Required",
            "We need access to your photos to show recent images.",
            [{ text: "OK" }]
          );
          setLoading(false);
          return;
        }
      }

      // Fetch recent photos
      const result = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.photo,
        sortBy: MediaLibrary.SortBy.creationTime,
        first: 20, // Get 20 most recent photos
      });

      setPhotos(result.assets);
    } catch (error) {
      console.error("Error loading photos:", error);
      Alert.alert("Error", "Failed to load photos from your library.");
    } finally {
      setLoading(false);
    }
  }, [permissionResponse, requestPermission]);

  useEffect(() => {
    loadRecentPhotos();
  }, [loadRecentPhotos]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      <View style={styles.section}>
        <Text type="subtitle" weight="bold">
          Select a photo
        </Text>
        <Text type="body">
          Select a photo from your recent images to try on a tattoo
        </Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text type="body">Loading photos...</Text>
          </View>
        ) : photos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text type="body">No photos found in your library.</Text>
            <Button
              title="Retry"
              variant="outline"
              onPress={loadRecentPhotos}
            />
          </View>
        ) : (
          <ScrollView
            horizontal
            style={{ flex: 1, height: 200 }}
            showsHorizontalScrollIndicator={false}
          >
            {photos.map((photo) => (
              <Pressable
                key={photo.id}
                onPress={() => setSelectedPhoto(photo)}
                style={styles.photoContainer}
              >
                <Image
                  source={{ uri: photo.uri }}
                  style={[
                    styles.photo,
                    {
                      borderColor:
                        selectedPhoto?.id === photo.id
                          ? "orange"
                          : "transparent",
                    },
                  ]}
                  contentFit="cover"
                />
              </Pressable>
            ))}
          </ScrollView>
        )}

        <Link href="/home/tattoo-result" asChild style={{ marginTop: 16 }}>
          <Button
            symbol="arrow.right"
            variant="solid"
            haptic
            color="orange"
            title="Continue"
            disabled={!selectedPhoto}
            onPress={() => {
              nextStep();
            }}
          />
        </Link>

        <Button
          symbol="camera"
          variant="outline"
          haptic
          color="blue"
          title="Take a photo"
          onPress={() => {
            // TODO: Implement camera functionality
            Alert.alert(
              "Camera", 
              "Camera functionality will be implemented in the next phase"
            );
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 8,
  },
  loadingContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  photoContainer: {
    marginRight: 8,
  },
  photo: {
    width: 200,
    height: 200,
    borderWidth: 3,
    borderRadius: 8,
  },
});
