import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { Color } from "@/constants/TWPalette";
import { useTattooCreation } from "@/context/TattooCreationContext";
import { featuredTattoos } from "@/lib/featured-tattoos";
import {
  ContextMenu,
  Button as ExpoUIButton,
  Image as ExpoUIImage,
  Text as ExpoUIText,
  Host,
  HStack,
} from "@expo/ui/swift-ui";
/* import { BlurView } from "expo-blur"; */
import { Icon } from "@/components/ui/Icon";
import { theme } from "@/theme/theme";
import { buttonStyle, fixedSize, frame } from "@expo/ui/swift-ui/modifiers";
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

  // Helper function to compare images (handles both direct references and URI objects)
  const isImageSelected = useCallback(
    (galleryImage: any) => {
      if (!selectedTattooImage) return false;

      // Direct reference comparison
      if (selectedTattooImage === galleryImage) return true;

      // URI comparison for objects
      const selectedUri =
        typeof selectedTattooImage === "object" && "uri" in selectedTattooImage
          ? selectedTattooImage.uri
          : null;
      const galleryUri =
        typeof galleryImage === "object" && "uri" in galleryImage
          ? galleryImage.uri
          : null;

      return selectedUri && galleryUri && selectedUri === galleryUri;
    },
    [selectedTattooImage]
  );

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
        allowsEditing: false,
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
    router.push("/(new)/add-details");
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.section}>
        <Text type="subtitle" weight="bold">
          Select tattoo style or upload photo
        </Text>
        <Host useViewportSizeMeasurement matchContents>
          <ContextMenu modifiers={[buttonStyle("glass")]}>
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
              <ExpoUIImage
                systemName="photo.badge.plus.fill"
                size={theme.fontSize20}
                modifiers={[frame({ width: 30, height: 30 }), fixedSize()]}
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
          style={{ flex: 1, paddingHorizontal: theme.space16 }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: theme.space12,
            paddingVertical: theme.space8,
            marginBottom: theme.space16,
          }}
        >
          {featuredTattoos.map((tattoo) => (
            <Host matchContents key={tattoo.id}>
              <ExpoUIButton
                onPress={() => {
                  updateOptions({ selectedTattoo: tattoo });
                  setSelectedTattooImage(null); // Reset selected tattoo image when changing style
                }}
                variant={
                  options.selectedTattoo?.id === tattoo.id
                    ? "glassProminent"
                    : "glass"
                }
                modifiers={[fixedSize()]}
              >
                {tattoo.title}
              </ExpoUIButton>
            </Host>
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
            {options.selectedTattoo.gallery.map((galleryImage, index) => {
              const isSelected = isImageSelected(galleryImage);

              return (
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
                      borderColor: isSelected
                        ? Color.orange[400]
                        : "transparent",
                    }}
                    contentFit="cover"
                  />
                </Pressable>
              );
            })}
          </ScrollView>
        </>
      )}

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <Host matchContents style={{ alignSelf: "center" }}>
          <ExpoUIButton
            variant="glassProminent"
            onPress={nextStep}
            controlSize="large"
            modifiers={[fixedSize()]}
            disabled={
              !isUsingExistingTattoo &&
              (!options.selectedTattoo || !selectedTattooImage)
            }
          >
            <HStack spacing={8}>
              <ExpoUIText>Add Details</ExpoUIText>
              <ExpoUIImage systemName="chevron.right" size={theme.fontSize18} />
            </HStack>
          </ExpoUIButton>
        </Host>
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
