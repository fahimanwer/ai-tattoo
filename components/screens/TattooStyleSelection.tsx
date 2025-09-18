import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { Color } from "@/constants/TWPalette";
import { useTattooCreation } from "@/context/TattooCreationContext";
import { featuredTattoos } from "@/lib/featured-tattoos";
import { ContextMenu, Button as ExpoUIButton, Host } from "@expo/ui/swift-ui";
/* import { BlurView } from "expo-blur"; */
import { Icon } from "@/components/ui/Icon";
import { BlurView } from "expo-blur";
import {
  GlassContainer,
  GlassView,
  isLiquidGlassAvailable,
} from "expo-glass-effect";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useCallback } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";

export function TattooStyleSelection() {
  const {
    options,
    selectedTattooImage,
    existingTattooImage,
    isUsingExistingTattoo,
    updateOptions,
    setSelectedTattooImage,
    setExistingTattooImage,
    setIsUsingExistingTattoo,
  } = useTattooCreation();

  // Function to select existing tattoo image from gallery
  const pickExistingTattooFromGallery = useCallback(async () => {
    try {
      // Request permission
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission Required",
          "Permission to access photo library is required!"
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const selectedImage = result.assets[0];
        if (selectedImage.base64) {
          setExistingTattooImage({
            uri: selectedImage.uri,
            base64: selectedImage.base64,
          });
          setIsUsingExistingTattoo(true);
          // Reset selected tattoo image and style when using existing tattoo
          setSelectedTattooImage(null);
          updateOptions({ selectedTattoo: undefined });
        } else {
          Alert.alert("Error", "Failed to get tattoo image data");
        }
      }
    } catch (error) {
      console.error("Error picking existing tattoo image:", error);
      Alert.alert("Error", "Failed to pick existing tattoo image from gallery");
    }
  }, [
    setExistingTattooImage,
    setIsUsingExistingTattoo,
    setSelectedTattooImage,
    updateOptions,
  ]);

  // Function to remove existing tattoo image and return to gallery selection
  const removeExistingTattooImage = useCallback(() => {
    setExistingTattooImage(undefined);
    setIsUsingExistingTattoo(false);
    // Reset selected tattoo image when removing existing tattoo
    setSelectedTattooImage(null);
  }, [
    setExistingTattooImage,
    setIsUsingExistingTattoo,
    setSelectedTattooImage,
  ]);

  function nextStep() {
    router.push("/home/new/add-details");
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.section}>
        <Text type="subtitle" weight="bold">
          Select tattoo style or upload photo
        </Text>
        <Host useViewportSizeMeasurement matchContents>
          <ContextMenu>
            <ContextMenu.Items>
              <ExpoUIButton
                systemImage="photo.on.rectangle"
                onPress={pickExistingTattooFromGallery}
              >
                Select from Library
              </ExpoUIButton>
              <ExpoUIButton
                systemImage="camera.fill"
                onPress={pickExistingTattooFromGallery}
              >
                Take Photo
              </ExpoUIButton>
            </ContextMenu.Items>
            <ContextMenu.Trigger>
              <ExpoUIButton
                systemImage="photo.badge.plus.fill"
                variant="glass"
                color="white"
              />
            </ContextMenu.Trigger>
          </ContextMenu>
        </Host>
      </View>

      {/* Existing Tattoo Image Preview */}
      {isUsingExistingTattoo && existingTattooImage && (
        <View style={styles.customImageSection}>
          <View style={styles.customImageContainer}>
            <Image
              cachePolicy="memory-disk"
              source={{ uri: existingTattooImage.uri }}
              style={styles.customImagePreview}
              contentFit="cover"
            />
            <View style={styles.customImageActions}>
              {isLiquidGlassAvailable() ? (
                <GlassContainer
                  spacing={10}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <GlassView
                    style={{
                      height: 36,
                      width: 36,
                      borderRadius: 999,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    isInteractive
                  >
                    <Pressable onPress={removeExistingTattooImage}>
                      <Icon
                        symbol="trash"
                        style={{ width: 20, height: 20 }}
                        color="white"
                      />
                    </Pressable>
                  </GlassView>
                  <GlassView
                    style={{
                      height: 36,
                      width: 36,
                      borderRadius: 999,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    isInteractive
                  >
                    <Pressable onPress={pickExistingTattooFromGallery}>
                      <Icon
                        symbol="photo"
                        style={{ width: 20, height: 20 }}
                        color="white"
                      />
                    </Pressable>
                  </GlassView>
                </GlassContainer>
              ) : (
                <View style={styles.customImageActionsBlur}>
                  <BlurView
                    intensity={20}
                    tint="dark"
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      gap: 8,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 999,
                      paddingVertical: 8,
                      paddingHorizontal: 8,
                    }}
                  >
                    <Button
                      symbol="trash"
                      onPress={removeExistingTattooImage}
                      radius="full"
                      color="white"
                      style={{ width: 36, height: 36 }}
                    />
                    <Button
                      symbol="photo"
                      onPress={pickExistingTattooFromGallery}
                      radius="full"
                      color="white"
                      style={{ width: 36, height: 36 }}
                    />
                  </BlurView>
                </View>
              )}
            </View>
          </View>
        </View>
      )}

      {/* Tattoo Style Selection - Only show when not using existing tattoo */}
      {!isUsingExistingTattoo && (
        <ScrollView
          horizontal
          style={{ flex: 1, paddingHorizontal: 16 }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 12,
            paddingVertical: 8,
          }}
        >
          {featuredTattoos.map((tattoo) => (
            <Pressable
              key={tattoo.id}
              onPress={() => {
                updateOptions({ selectedTattoo: tattoo });
                setSelectedTattooImage(null); // Reset selected tattoo image when changing style
              }}
              style={{ marginBottom: 8 }}
            >
              <Badge
                variant={
                  options.selectedTattoo?.id === tattoo.id ? "solid" : "outline"
                }
                color={
                  options.selectedTattoo?.id === tattoo.id ? "white" : "neutral"
                }
                size="md"
                radius="full"
                style={{
                  borderWidth: options.selectedTattoo?.id === tattoo.id ? 2 : 1,
                  minWidth: 120,
                  paddingHorizontal: 16,
                }}
              >
                {tattoo.title}
              </Badge>
            </Pressable>
          ))}
        </ScrollView>
      )}

      {/* Tattoo Gallery Selection - Only show when not using existing tattoo */}
      {options.selectedTattoo && !isUsingExistingTattoo && (
        <>
          <View style={styles.section}>
            <Text type="base" weight="bold">
              Select specific design
            </Text>
          </View>
          <ScrollView
            horizontal
            style={{ flex: 1, paddingHorizontal: 16, marginBottom: 24 }}
            showsHorizontalScrollIndicator={false}
          >
            {options.selectedTattoo.gallery.map((galleryImage, index) => (
              <Pressable
                key={`${options.selectedTattoo?.id}-${index}`}
                onPress={() => setSelectedTattooImage(galleryImage)}
              >
                <Image
                  cachePolicy="memory-disk"
                  source={galleryImage}
                  style={{
                    width: 100,
                    height: 100,
                    borderWidth: 3,
                    marginLeft: 8,
                    borderRadius: 12,
                    borderColor:
                      selectedTattooImage === galleryImage
                        ? Color.grayscale[950]
                        : "transparent",
                  }}
                  contentFit="cover"
                />
              </Pressable>
            ))}
          </ScrollView>
        </>
      )}

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <View style={styles.navigationButtons}>
          <Button
            title="Add Details"
            variant="solid"
            radius="full"
            color="orange"
            onPress={nextStep}
            style={styles.navButton}
            disabled={
              !isUsingExistingTattoo &&
              (!options.selectedTattoo || !selectedTattooImage)
            }
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  customImageSection: {
    paddingHorizontal: 16,
    marginTop: 16,
    alignItems: "center",
  },
  customImageContainer: {
    position: "relative",
    alignItems: "center",
    width: "100%",
    height: 300,
  },
  customImagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    borderWidth: 3,
    borderColor: Color.orange[400],
  },
  customImageActions: {
    position: "absolute",
    bottom: 8,
    right: 8,
  },
  customImageActionsBlur: {
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
    gap: 12,
  },
  navigationContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  navigationButtons: {
    flexDirection: "row",
    gap: 12,
  },
  navButton: {
    flex: 1,
  },
});
