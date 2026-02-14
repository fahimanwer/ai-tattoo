import { cacheBase64Image } from "@/lib/image-cache";
import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import { PlaygroundContext } from "@/src/context/PlaygroundContext";
import { useTheme } from "@/src/context/ThemeContext";
import { useThemeColor } from "heroui-native";
import {
  Host,
  HStack,
  Button as SwiftUIButton,
  Text as SwiftUIText,
} from "@expo/ui/swift-ui";
import {
  buttonStyle,
  controlSize,
  font,
  foregroundStyle,
  frame,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { router, Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import { PressableScale } from "pressto";
import { Activity, use, useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { customEvent } from "vexo-analytics";

const RECENT_PHOTOS_LIMIT = 20;
const IMAGE_SIZE = 80;

interface SelectedImage {
  asset: MediaLibrary.Asset;
  order: number;
}

export default function Sheet() {
  const {
    addImagesToSession,
    pickImageFromGallery,
    availableSlotsInActiveGroup,
    setActiveGenerationIndex,
    setPrompt,
    activeGenerationUris,
    focusInput,
  } = use(PlaygroundContext);

  const { width } = useWindowDimensions();
  const { isDark } = useTheme();
  const fg = useThemeColor("foreground");
  const muted = useThemeColor("muted");
  const iconColor = isDark ? Color.zinc[300] : Color.zinc[700];

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
    customEvent("photo_added", {
      source: "camera",
      count: 1,
    });
    router.replace("/(playground)/camera-view");
  }

  async function handleAllPhotosPress() {
    customEvent("photo_added", {
      source: "all_photos",
      count: 1,
    });
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
        customEvent("photo_added", {
          source: "recent_photos",
          count: imageUris.length,
        });
        addImagesToSession(imageUris);
        router.back();
      }
    } catch (error) {
      console.error("Error adding photos:", error);
    }
  }

  const hasSelection = selectedImages.length > 0;
  const selectionCount = selectedImages.length;

  // Permission fallback content
  function renderPermissionFallback() {
    if (permission?.status === MediaLibrary.PermissionStatus.UNDETERMINED) {
      return (
        <View style={styles.permissionContainer}>
          <Text type="sm" style={[styles.permissionText, { color: muted }]}>
            We need access to your photos to add images
          </Text>
          <Host matchContents useViewportSizeMeasurement>
            <SwiftUIButton
              modifiers={[
                controlSize("mini"),
                buttonStyle("glassProminent"),
                tint("#3563E9"),
              ]}
              onPress={requestPermission}
            >
              <HStack
                spacing={8}
                modifiers={[frame({ height: 44, width: width - 64 })]}
              >
                <SwiftUIText
                  modifiers={[
                    font({ weight: "semibold", size: 16 }),
                    foregroundStyle("white"),
                  ]}
                >
                  Continue
                </SwiftUIText>
              </HStack>
            </SwiftUIButton>
          </Host>
        </View>
      );
    }

    if (permission?.status === MediaLibrary.PermissionStatus.DENIED) {
      return (
        <View style={styles.permissionContainer}>
          <Host matchContents useViewportSizeMeasurement>
            <SwiftUIButton
              modifiers={[
                controlSize("mini"),
                buttonStyle("glassProminent"),
                tint("#3563E9"),
              ]}
              onPress={() => Linking.openURL("app-settings:")}
            >
              <HStack
                spacing={8}
                modifiers={[frame({ height: 44, width: width - 64 })]}
              >
                <SwiftUIText
                  modifiers={[
                    font({ weight: "semibold", size: 16 }),
                    foregroundStyle("white"),
                  ]}
                >
                  Open Settings
                </SwiftUIText>
              </HStack>
            </SwiftUIButton>
          </Host>
          <Text type="xs" style={[styles.permissionText, { color: muted }]}>
            We need access to your photos to add images
          </Text>
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
        <PressableScale onPress={handleCameraPress} style={[styles.cameraButton, { backgroundColor: isDark ? Color.zinc[800] : Color.zinc[100] }]}>
          <SymbolView name="camera.fill" size={32} tintColor={iconColor} />
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
          unstable_headerRightItems: () => {
            const items: any[] = [
              {
                type: "button",
                label: "All Photos",
                icon: {
                  name: "photo.on.rectangle.angled",
                  type: "sfSymbol",
                },
                onPress: handleAllPhotosPress,
              },
            ];
            if (hasSelection) {
              items.push({
                type: "button",
                variant: "prominent",
                tintColor: "#3563E9",
                label: `Add ${selectionCount} photo${
                  selectionCount > 1 ? "s" : ""
                }`,
                onPress: handleAddPhotos,
              });
            }
            return items;
          },
        }}
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          height: 600,
          paddingBottom: 100,
        }}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        {/* Image Picker Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text type="sm" weight="medium" style={{ paddingHorizontal: 16, color: fg }}>
              Recent Photos
            </Text>
            <Activity mode={maxSelection === 1 ? "visible" : "hidden"}>
              <Text type="xs" style={[styles.sectionSubtitle, { color: muted }]}>
                Select 1 more to combine
              </Text>
            </Activity>
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
              customEvent("sheet_action_pressed", {
                action: "try_on",
                hasActiveImage,
              });
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
              customEvent("sheet_action_pressed", {
                action: "create_new",
                hasActiveImage,
              });
              // Clear selection to start fresh, dismiss and focus the input
              setActiveGenerationIndex(undefined);
              setPrompt("");
              router.back();
              // Small delay to ensure sheet is dismissed before focusing
              setTimeout(() => focusInput(), 100);
            }}
          />
          <OptionRow
            icon="lightbulb.max"
            title="Tattoo Cover-Up Idea"
            description="Generate an idea to cover up an existing tattoo using a photo as reference"
            onPress={async () => {
              customEvent("sheet_action_pressed", {
                action: "cover_up_idea",
                hasActiveImage,
              });
              setPrompt(
                "Design a tattoo cover-up that incorporates and conceals the existing tattoo in this photo. Build the new design over the current tattoo (not on blank skin) and match the style and complexity of the original as much as possible."
              );
              // pick image if there is no active image
              if (!hasActiveImage) {
                await pickImageFromGallery({ selectionLimit: 1 });
              }
              router.back();
              setTimeout(() => focusInput(), 100);
            }}
          />
          <OptionRow
            icon="eraser.line.dashed"
            title="Remove Tattoo"
            description="Remove an existing tattoo from the photo"
            onPress={async () => {
              customEvent("sheet_action_pressed", {
                action: "remove_tattoo",
                hasActiveImage,
              });
              setPrompt(
                "Remove the tattoo from this photo and restore the area as natural skin. Keep the rest of the image unchanged and do not add any new design."
              );
              // pick image if there is no active image
              if (!hasActiveImage) {
                await pickImageFromGallery({ selectionLimit: 1 });
              }
              router.back();
              setTimeout(() => focusInput(), 100);
            }}
          />
          <OptionRow
            icon="clock.arrow.circlepath"
            title="Prompt History"
            description="View your previous prompts"
            onPress={() => {
              customEvent("sheet_action_pressed", {
                action: "prompt_history",
                hasActiveImage,
              });
              router.push("/(playground)/prompt-history" as any);
            }}
          />
          <OptionRow
            icon="lightbulb"
            title="Request a Feature"
            description="Tell us what you'd like Inkigo to support next"
            onPress={() => {
              customEvent("sheet_action_pressed", {
                action: "feature_request",
                hasActiveImage,
              });
              router.push("/(playground)/feature-request" as any);
            }}
          />
        </View>
      </ScrollView>
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
  const { isDark } = useTheme();
  const fg = useThemeColor("foreground");
  const muted = useThemeColor("muted");
  const iconColor = isDark ? Color.zinc[300] : Color.zinc[700];

  return (
    <PressableScale onPress={onPress} style={styles.optionRow} hitSlop={16}>
      <View style={[styles.optionIconContainer, { backgroundColor: isDark ? Color.zinc[800] : Color.zinc[100] }]}>
        <SymbolView name={icon as any} size={24} tintColor={iconColor} />
      </View>
      <View style={styles.optionContent}>
        <Text weight="medium" style={{ color: fg }}>{title}</Text>
        <Text type="xs" style={[styles.optionDescription, { color: muted }]}>
          {description}
        </Text>
      </View>
      <SymbolView name="chevron.right" size={14} tintColor={muted} />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionSubtitle: {
    paddingHorizontal: 16,
  },
  scrollContent: {
    gap: 10,
    paddingLeft: 16,
  },
  cameraButton: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
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
    borderColor: "#3563E9",
  },
  selectionBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#3563E9",
    alignItems: "center",
    justifyContent: "center",
  },
  selectionBadgeText: {
    color: "white",
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
    alignItems: "center",
    justifyContent: "center",
  },
  optionContent: {
    flex: 1,
    gap: 2,
  },
  optionDescription: {},
  bottomAction: {
    marginTop: "auto",
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 8,
  },
  hintText: {
    textAlign: "center",
    paddingHorizontal: 32,
  },
});
