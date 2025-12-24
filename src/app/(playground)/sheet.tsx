import { cacheBase64Image } from "@/lib/image-cache";
import { Button } from "@/src/components/ui/Button";
import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import { PlaygroundContext } from "@/src/context/PlaygroundContext";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { router, Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import { PressableScale } from "pressto";
import { use, useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RECENT_PHOTOS_LIMIT = 20;
const IMAGE_SIZE = 80;

interface SelectedImage {
  asset: MediaLibrary.Asset;
  order: number;
}

export default function Sheet() {
  const { bottom } = useSafeAreaInsets();
  const {
    addImagesToSession,
    pickImageFromGallery,
    availableSlotsInActiveGroup,
    setActiveGenerationIndex,
    setPrompt,
    activeGenerationUris,
    focusInput,
  } = use(PlaygroundContext);

  // Check if user has a tattoo/image already selected
  const hasActiveImage = activeGenerationUris.length > 0;

  // If there's room in active group, limit to that; otherwise allow 2 for new group
  const maxSelection =
    availableSlotsInActiveGroup > 0 ? availableSlotsInActiveGroup : 2;

  const [recentPhotos, setRecentPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const [permission, requestPermission] = MediaLibrary.usePermissions();

  // Load recent photos from library
  const loadRecentPhotos = useCallback(async () => {
    if (permission?.status !== MediaLibrary.PermissionStatus.GRANTED) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { assets } = await MediaLibrary.getAssetsAsync({
        sortBy: [MediaLibrary.SortBy.creationTime],
        mediaType: ["photo"],
        first: RECENT_PHOTOS_LIMIT,
      });
      setRecentPhotos(assets);
    } catch (error) {
      console.error("Error loading recent photos:", error);
    } finally {
      setLoading(false);
    }
  }, [permission?.status]);

  useEffect(() => {
    loadRecentPhotos();
  }, [loadRecentPhotos]);

  function handleDismiss() {
    router.back();
  }

  function handleCameraPress() {
    router.replace("/(playground)/camera-view");
  }

  async function handleAllPhotosPress() {
    // Let the context handle the selection limit based on active group state
    const success = await pickImageFromGallery();
    if (success) {
      router.back();
    }
  }

  function toggleImageSelection(asset: MediaLibrary.Asset) {
    setSelectedImages((prev) => {
      const existingIndex = prev.findIndex((s) => s.asset.id === asset.id);

      if (existingIndex !== -1) {
        // Remove from selection
        const newSelection = prev.filter((s) => s.asset.id !== asset.id);
        // Reorder remaining items
        return newSelection.map((item, index) => ({
          ...item,
          order: index + 1,
        }));
      }

      // Add to selection if under limit (based on available slots in active group)
      if (prev.length < maxSelection) {
        return [...prev, { asset, order: prev.length + 1 }];
      }

      return prev;
    });
  }

  function getSelectionOrder(assetId: string): number | undefined {
    const selected = selectedImages.find((s) => s.asset.id === assetId);
    return selected?.order;
  }

  async function handleAddPhotos() {
    if (selectedImages.length === 0) return;

    try {
      // Get asset info and cache images
      const imageUris: string[] = [];
      for (const selected of selectedImages) {
        const assetInfo = await MediaLibrary.getAssetInfoAsync(
          selected.asset.id
        );
        const localUri = assetInfo.localUri || assetInfo.uri;

        if (localUri) {
          // Read the file and convert to base64 for caching
          const response = await fetch(localUri);
          const blob = await response.blob();

          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const result = reader.result as string;
              // Remove data URL prefix
              const base64Data = result.split(",")[1];
              resolve(base64Data);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });

          const fileUri = await cacheBase64Image(base64, "png");
          imageUris.push(fileUri);
        }
      }

      if (imageUris.length > 0) {
        addImagesToSession(imageUris);
        router.back();
      }
    } catch (error) {
      console.error("Error adding photos:", error);
    }
  }

  const hasSelection = selectedImages.length > 0;
  const selectionCount = selectedImages.length;

  // Show hint when the total will be 2 images (for try-on or merge)
  // This happens when:
  // - User selected 2 images in the sheet, OR
  // - User selected 1 and there's already 1 in the active group
  const willHaveTwoImages =
    selectionCount === 2 ||
    (selectionCount === 1 && availableSlotsInActiveGroup === 1);

  // Permission fallback content
  function renderPermissionFallback() {
    if (permission?.status === MediaLibrary.PermissionStatus.UNDETERMINED) {
      return (
        <View style={styles.permissionContainer}>
          <Text type="sm" style={styles.permissionText}>
            Access your photos to quickly add images
          </Text>
          <Button
            onPress={requestPermission}
            title="Enable Permissions"
            variant="link"
            color="yellow"
            size="sm"
          />
        </View>
      );
    }

    if (permission?.status === MediaLibrary.PermissionStatus.DENIED) {
      return (
        <View style={styles.permissionContainer}>
          <Text type="sm" style={styles.permissionText}>
            Photo access is needed to select images
          </Text>
          <Button
            onPress={() => Linking.openURL("app-settings:")}
            title="Enable Permissions"
            variant="link"
            color="yellow"
            size="sm"
          />
        </View>
      );
    }

    return null;
  }

  // Horizontal image picker content
  function renderImagePicker() {
    if (permission?.status !== MediaLibrary.PermissionStatus.GRANTED) {
      return renderPermissionFallback();
    }

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" />
        </View>
      );
    }

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Camera button */}
        <PressableScale onPress={handleCameraPress} style={styles.cameraButton}>
          <SymbolView
            name="camera.fill"
            size={28}
            tintColor={Color.zinc[400]}
          />
        </PressableScale>

        {/* Recent photos */}
        {recentPhotos.map((asset) => {
          const selectionOrder = getSelectionOrder(asset.id);
          const isSelected = selectionOrder !== undefined;

          return (
            <PressableScale
              key={asset.id}
              onPress={() => toggleImageSelection(asset)}
              style={styles.imageWrapper}
            >
              <Image
                source={{ uri: asset.uri }}
                style={[styles.image, isSelected && styles.imageSelected]}
                contentFit="cover"
              />
              {isSelected && (
                <View style={styles.selectionBadge}>
                  <Text style={styles.selectionBadgeText}>
                    {selectionOrder}
                  </Text>
                </View>
              )}
            </PressableScale>
          );
        })}
      </ScrollView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          unstable_headerLeftItems: () => [
            {
              type: "button",
              label: "Close",
              icon: {
                name: "xmark",
                type: "sfSymbol",
              },
              onPress: handleDismiss,
            },
          ],
          unstable_headerRightItems: () => [
            {
              type: "button",
              label: "All Photos",
              icon: {
                name: "photo.on.rectangle.angled",
                type: "sfSymbol",
              },
              onPress: handleAllPhotosPress,
            },
          ],
        }}
      />
      <View style={styles.container}>
        {/* Image Picker Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text type="sm" weight="medium" style={{ paddingHorizontal: 16 }}>
              Recent Photos
            </Text>
            {maxSelection === 1 && (
              <Text type="xs" style={styles.sectionSubtitle}>
                Select 1 more to combine
              </Text>
            )}
          </View>
          {renderImagePicker()}
        </View>

        {/* Options List */}
        <View style={styles.optionsSection}>
          <OptionRow
            icon="person.crop.rectangle"
            title="Try On"
            description={
              hasActiveImage
                ? "Add a photo of your body to preview"
                : "Select a tattoo first, then add your photo"
            }
            onPress={() => {
              if (hasActiveImage) {
                // User has a tattoo selected, offer to add body photo
                Alert.alert(
                  "Add Your Photo",
                  "How would you like to add a photo of where you want the tattoo?",
                  [
                    {
                      text: "Take Photo",
                      onPress: () => {
                        router.replace("/(playground)/camera-view");
                      },
                    },
                    {
                      text: "Choose from Library",
                      onPress: async () => {
                        const success = await pickImageFromGallery();
                        if (success) {
                          router.back();
                        }
                      },
                    },
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                  ]
                );
              } else {
                // No tattoo selected, guide user to create one first
                Alert.alert(
                  "Create a Tattoo First",
                  "To try on a tattoo, you'll need to:\n\n1. Generate or select a tattoo design\n2. Then add a photo of your body\n\nWe'll combine them to show how it looks!",
                  [
                    {
                      text: "Create Tattoo",
                      style: "default",
                      isPreferred: true,
                      onPress: () => {
                        setActiveGenerationIndex(undefined);
                        setPrompt("");
                        router.back();
                        setTimeout(() => focusInput(), 100);
                      },
                    },
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                  ]
                );
              }
            }}
          />
          <OptionRow
            icon="wand.and.stars"
            title="Create New Tattoo"
            description="Describe your tattoo idea and we'll generate it"
            onPress={() => {
              // Clear selection to start fresh, dismiss and focus the input
              setActiveGenerationIndex(undefined);
              setPrompt("");
              router.back();
              // Small delay to ensure sheet is dismissed before focusing
              setTimeout(() => focusInput(), 100);
            }}
          />
          <OptionRow
            icon="clock.arrow.circlepath"
            title="Prompt History"
            description="View your previous prompts"
            onPress={() =>
              Alert.alert(
                "Prompt history feature coming soon",
                "This feature is coming soon. Please check back later.",
                [{ text: "OK", style: "default", isPreferred: true }]
              )
            }
          />
        </View>

        {/* Bottom Action Button */}
        {hasSelection && (
          <View style={[styles.bottomAction, { paddingBottom: bottom + 16 }]}>
            {willHaveTwoImages && (
              <Text type="xs" style={styles.hintText}>
                Use selected images to try on a tattoo or merge them into a new
                design
              </Text>
            )}
            <Button
              title={`Add ${selectionCount} photo${
                selectionCount > 1 ? "s" : ""
              }`}
              color="yellow"
              variant="solid"
              size="lg"
              radius="full"
              onPress={handleAddPhotos}
            />
          </View>
        )}
      </View>
    </>
  );
}

interface OptionRowProps {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
}

function OptionRow({ icon, title, description, onPress }: OptionRowProps) {
  return (
    <PressableScale onPress={onPress} style={styles.optionRow}>
      <View style={styles.optionIconContainer}>
        <SymbolView name={icon as any} size={20} tintColor={Color.zinc[400]} />
      </View>
      <View style={styles.optionContent}>
        <Text type="sm" weight="medium" style={styles.optionTitle}>
          {title}
        </Text>
        <Text type="xs" style={styles.optionDescription}>
          {description}
        </Text>
      </View>
      <SymbolView name="chevron.right" size={14} tintColor={Color.zinc[600]} />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionSubtitle: {
    color: Color.zinc[600],
  },
  scrollContent: {
    gap: 10,
    paddingLeft: 16,
  },
  cameraButton: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 12,
    backgroundColor: Color.zinc[800],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Color.zinc[700],
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  imageSelected: {
    borderColor: "yellow",
  },
  selectionBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  selectionBadgeText: {
    color: Color.zinc[900],
    fontSize: 12,
    fontWeight: "700",
  },
  loadingContainer: {
    height: IMAGE_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionContainer: {
    height: IMAGE_SIZE,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  permissionText: {
    color: Color.zinc[500],
    textAlign: "center",
  },
  optionsSection: {
    paddingHorizontal: 16,
    gap: 4,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
    gap: 12,
  },
  optionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Color.zinc[800],
    alignItems: "center",
    justifyContent: "center",
  },
  optionContent: {
    flex: 1,
    gap: 2,
  },
  optionTitle: {
    color: Color.zinc[100],
  },
  optionDescription: {
    color: Color.zinc[500],
  },
  bottomAction: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 8,
    backgroundColor: Color.zinc[950] + "F0",
  },
  hintText: {
    color: Color.zinc[400],
    textAlign: "center",
  },
});
