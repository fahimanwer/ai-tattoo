import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import {
  bodyPartCategories,
  getDefaultBodyPartCategory,
  type BodyPartCategory,
  type BodyPartVariant,
} from "@/constants/BodyParts";
import { Color } from "@/constants/TWPalette";
import { useTattooCreation } from "@/context/TattooCreationContext";
import { ApiError } from "@/lib/api-client";
/* import { Button as ExpoButton } from "@/lib/expo-ui-web"; */
import { featuredTattoos } from "@/lib/featured-tattoos";
import { textAndImageToImage } from "@/lib/nano";
import { useFocusEffect } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { Asset } from "expo-asset";
import { File } from "expo-file-system/next";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

// Constants and utility functions
const MIX_TWO_PHOTOS_PROMPT = `Apply the tattoo design from the second image onto the body part from the first image. Create a hyper-realistic integration where the tattoo design follows the exact curvature and natural folds of the skin from the first image, adapting seamlessly to the anatomy. IMPORTANT: Preserve the exact natural skin tone, color, and texture from the original body part photo - do not alter or change the skin color in any way. The tattoo ink must look authentically healed into the skin: slightly diffused in pores, with natural wear, subtle fading in areas of tension, and matte tones rather than excessive shine. Shading and lines should curve and flow with the muscles and skin surface, never floating above it. Show fine details of skin texture such as pores, wrinkles, and light imperfections, blending with the tattoo ink while maintaining the original skin coloring. Lighting should remain soft and realistic, avoiding glossy or artificial effects, so the tattoo looks fully integrated and aged naturally. The final result should be the body part from the first image with the tattoo design applied, keeping all original skin characteristics intact. No background, only the tattooed body part in ultra-high resolution.`;

/**
 * Convert a bundled static asset (require("../assets/img.png")) into Base64.
 */
export async function assetToBase64(moduleId: number): Promise<string> {
  // 1. Resolve the static asset
  const [asset] = await Asset.loadAsync(moduleId);
  const uri = asset.localUri ?? asset.uri;
  if (!uri) throw new Error("Unable to resolve asset URI");

  // 2. Wrap the path with File
  const file = new File(uri);

  // 3. Read as Base64
  const base64 = file.base64(); // synchronous, returns string
  return base64;
}

/**
 * Convert URI image to Base64
 */
export async function uriToBase64(uri: string): Promise<string> {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // Remove data:image/...;base64, prefix
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    throw new Error(`Failed to convert URI to base64: ${error}`);
  }
}

export function New() {
  const { options, updateOptions, setCurrentStep } = useTattooCreation();
  const router = useRouter();

  // Additional state for the tattoo creation functionality
  const [selectedTattooImage, setSelectedTattooImage] =
    useState<ImageSourcePropType | null>(null);
  const [selectedBodyPartCategory, setSelectedBodyPartCategory] =
    useState<BodyPartCategory | null>(getDefaultBodyPartCategory());
  const [selectedBodyPartVariant, setSelectedBodyPartVariant] =
    useState<BodyPartVariant | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [bodyPartBase64, setBodyPartBase64] = useState<string | null>(null);
  const [tattooBase64, setTattooBase64] = useState<string | null>(null);

  // New state for custom user image
  const [customUserImage, setCustomUserImage] = useState<string | null>(null);
  const [customUserImageBase64, setCustomUserImageBase64] = useState<
    string | null
  >(null);
  const [isUsingCustomImage, setIsUsingCustomImage] = useState(false);

  // Set current step when component mounts
  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  // We'll add the back button prevention after mutation is declared

  // Preload selected body part variant image to base64
  useEffect(() => {
    if (!selectedBodyPartVariant) {
      setBodyPartBase64(null);
      return;
    }

    (async () => {
      try {
        const bodyPartImage = await uriToBase64(
          selectedBodyPartVariant.imageUrl
        );
        setBodyPartBase64(bodyPartImage);
      } catch (e) {
        console.error("Failed to load body part image:", e);
      }
    })();
  }, [selectedBodyPartVariant]);

  // Convert selected tattoo image to base64 when it changes
  useEffect(() => {
    if (!selectedTattooImage) {
      setTattooBase64(null);
      return;
    }

    (async () => {
      try {
        if (
          selectedTattooImage &&
          typeof selectedTattooImage === "object" &&
          "uri" in selectedTattooImage &&
          selectedTattooImage.uri
        ) {
          const tattooImage = await uriToBase64(selectedTattooImage.uri);
          setTattooBase64(tattooImage);
        } else {
          console.error("Invalid tattoo image format");
        }
      } catch (e) {
        console.error("Failed to convert tattoo image:", e);
      }
    })();
  }, [selectedTattooImage]);

  // Convert custom user image to base64 when it changes
  useEffect(() => {
    if (!customUserImage) {
      setCustomUserImageBase64(null);
      return;
    }

    (async () => {
      try {
        const customImage = await uriToBase64(customUserImage);
        setCustomUserImageBase64(customImage);
      } catch (e) {
        console.error("Failed to convert custom user image:", e);
      }
    })();
  }, [customUserImage]);

  // Mutation for generating tattoo
  const mutation = useMutation({
    mutationFn: async () => {
      const bodyImage = isUsingCustomImage
        ? customUserImageBase64
        : bodyPartBase64;

      if (!bodyImage || !tattooBase64) {
        throw new Error("Images not ready");
      }

      let prompt = MIX_TWO_PHOTOS_PROMPT;

      // Modify prompt based on color option - ONLY affects tattoo, NOT skin
      if (options.colorOption === "blackwhite") {
        prompt +=
          " The tattoo design should be rendered in black and white ink only, with no color elements in the tattoo itself. The skin tone and natural skin coloring from the original body part photo must remain completely unchanged and realistic.";
      } else {
        prompt +=
          " The tattoo design should maintain its original colors and vibrancy. The skin tone and natural skin coloring from the original body part photo must remain completely unchanged and realistic.";
      }

      return textAndImageToImage({
        prompt,
        images_base64: [bodyImage, tattooBase64],
      });
    },
    onSuccess: async (data) => {
      if (data.imageData) {
        const generatedImageUri = `data:image/png;base64,${data.imageData}`;
        setGeneratedImage(generatedImageUri);

        // Redirect to result page with the generated image
        router.push({
          pathname: "/(tabs)/home/generated-result",
          params: { imageUri: generatedImageUri },
        });
      }
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        console.error("AI generation failed:", error.message, error.details);
      } else {
        console.error("AI generation failed:", error);
      }
      setGeneratedImage(null);
    },
  });

  // Function to select image from gallery
  const pickImageFromGallery = useCallback(async () => {
    try {
      // Request permission
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission Required",
          "Permission to access camera roll is required!"
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const selectedImage = result.assets[0];
        setCustomUserImage(selectedImage.uri);
        setIsUsingCustomImage(true);
        // Reset body part selection when using custom image
        setSelectedBodyPartVariant(null);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image from gallery");
    }
  }, []);

  // Function to remove custom image and return to default
  const removeCustomImage = useCallback(() => {
    setCustomUserImage(null);
    setCustomUserImageBase64(null);
    setIsUsingCustomImage(false);
    // Reset to default body part
    setSelectedBodyPartVariant(null);
  }, []);

  // Function to reset all form state
  const resetFormCompletely = useCallback(() => {
    setSelectedBodyPartCategory(null);
    setSelectedBodyPartVariant(null);
    setSelectedTattooImage(null);
    setGeneratedImage(null);
    setBodyPartBase64(null);
    setTattooBase64(null);
    setCustomUserImage(null);
    setCustomUserImageBase64(null);
    setIsUsingCustomImage(false);
    updateOptions({
      selectedTattoo: undefined,
      colorOption: undefined,
    });
  }, [updateOptions]);

  // Handle back navigation with different behavior based on state
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (mutation.isPending) {
          // Prevent going back during loading
          return true;
        }

        if (mutation.isSuccess && generatedImage) {
          // Show confirmation alert when trying to go back after successful generation
          Alert.alert(
            "Reset Form",
            "If you go back, the current form will be reset and you'll start from the beginning. Are you sure?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Accept",
                style: "destructive",
                onPress: () => {
                  resetFormCompletely();
                  // Navigate back after reset
                  router.back();
                },
              },
            ]
          );
          return true; // Prevent default back action until user decides
        }

        return false; // Allow normal back navigation
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [
      mutation.isPending,
      mutation.isSuccess,
      generatedImage,
      resetFormCompletely,
      router,
    ])
  );

  // Remove saveToLibrary function as it's now handled in the result screen

  const canGenerate =
    options.selectedTattoo &&
    options.colorOption &&
    selectedTattooImage &&
    tattooBase64 &&
    ((isUsingCustomImage && customUserImageBase64) ||
      (!isUsingCustomImage && selectedBodyPartVariant && bodyPartBase64));

  const handleCreateTattoo = () => {
    setGeneratedImage(null);
    mutation.mutate();
  };

  // Show only loading when generating
  if (mutation.isPending) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text
          type="subtitle"
          weight="bold"
          style={{ marginTop: 16, textAlign: "center", color: "#ffffff" }}
        >
          Creating your tattoo design...
        </Text>
        <Text
          type="body"
          style={{ marginTop: 8, textAlign: "center", color: "#ffffff" }}
        >
          This may take a few moments
        </Text>
        <Text
          type="caption"
          style={{ marginTop: 4, textAlign: "center", color: "#ffffff" }}
        >
          Please keep the application open
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.section}>
        <Text type="subtitle" weight="bold">
          Select body part
        </Text>
        <Button
          symbol={isUsingCustomImage ? "photo" : "plus"}
          onPress={
            isUsingCustomImage ? pickImageFromGallery : pickImageFromGallery
          }
          radius="full"
          variant="link"
          color="white"
          style={{ width: 40, height: 40 }}
        />
      </View>

      {/* Custom User Image Preview */}
      {isUsingCustomImage && customUserImage && (
        <View style={styles.customImageSection}>
          <Text
            type="body"
            weight="bold"
            style={{ marginBottom: 12, textAlign: "center" }}
          >
            Your Custom Image
          </Text>
          <View style={styles.customImageContainer}>
            <Image
              source={{ uri: customUserImage }}
              style={styles.customImagePreview}
              contentFit="cover"
            />
            <View style={styles.customImageActions}>
              <Button
                symbol="trash"
                onPress={removeCustomImage}
                radius="full"
                variant="outline"
                color="red"
                style={{ width: 36, height: 36 }}
              />
              <Button
                symbol="photo"
                onPress={pickImageFromGallery}
                radius="full"
                variant="outline"
                color="blue"
                style={{ width: 36, height: 36 }}
              />
            </View>
          </View>
          <Text
            type="caption"
            style={{
              textAlign: "center",
              marginTop: 8,
              color: Color.gray[500],
            }}
          >
            Tap the camera icon to change or trash icon to remove
          </Text>
        </View>
      )}

      {/* Body Part Category Selection - Only show when not using custom image */}
      {!isUsingCustomImage && (
        <ScrollView
          horizontal
          style={{ flex: 1, height: 200, paddingHorizontal: 16 }}
          showsHorizontalScrollIndicator={false}
        >
          {bodyPartCategories.map((category) => (
            <Pressable
              key={category.id}
              onPress={() => {
                setSelectedBodyPartCategory(category);
                setSelectedBodyPartVariant(null); // Reset selected variant when changing category
              }}
            >
              <Image
                source={category.image}
                style={{
                  width: 100,
                  height: 100,
                  borderWidth: 3.5,
                  marginLeft: 8,
                  borderRadius: 16,
                  borderColor:
                    selectedBodyPartCategory?.id === category.id
                      ? Color.orange[400]
                      : "transparent",
                }}
                contentFit="cover"
              />
              <Text
                type="body"
                weight="bold"
                style={{ textAlign: "center", marginTop: 8 }}
                numberOfLines={2}
              >
                {category.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}

      {/* Body Part Variant Selection - Only show when not using custom image */}
      {!isUsingCustomImage && selectedBodyPartCategory && (
        <>
          <View style={[styles.section, { marginTop: 24 }]}>
            <Text type="subtitle" weight="bold">
              Choose specific {selectedBodyPartCategory.name.toLowerCase()}
            </Text>
          </View>
          <ScrollView
            horizontal
            style={{ flex: 1, height: 180, paddingHorizontal: 16 }}
            showsHorizontalScrollIndicator={false}
          >
            {selectedBodyPartCategory.gallery.map((variant) => (
              <Pressable
                key={variant.id}
                onPress={() => setSelectedBodyPartVariant(variant)}
              >
                <Image
                  source={variant.image}
                  style={{
                    width: 140,
                    height: 140,
                    borderWidth: 3,
                    marginLeft: 8,
                    borderRadius: 12,
                    borderColor:
                      selectedBodyPartVariant?.id === variant.id
                        ? Color.orange[400]
                        : "transparent",
                  }}
                  contentFit="cover"
                />
                <Text
                  type="caption"
                  weight="medium"
                  style={{ textAlign: "center", marginTop: 6, width: 140 }}
                  numberOfLines={2}
                >
                  {variant.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </>
      )}

      <View style={[styles.section, { marginTop: 24 }]}>
        <Text type="subtitle" weight="bold">
          Select a tattoo style
        </Text>
      </View>

      {/* Tattoo Style Selection */}
      <ScrollView
        horizontal
        style={{ flex: 1, height: 200, paddingHorizontal: 16 }}
        showsHorizontalScrollIndicator={false}
      >
        {featuredTattoos.map((tattoo) => (
          <Pressable
            key={tattoo.id}
            onPress={() => {
              updateOptions({ selectedTattoo: tattoo });
              setSelectedTattooImage(null); // Reset selected tattoo image when changing style
            }}
          >
            <Image
              key={tattoo.id}
              source={tattoo.image}
              style={{
                width: 160,
                height: 160,
                borderWidth: 3.5,
                marginLeft: 8,
                borderRadius: 16,
                borderColor:
                  options.selectedTattoo?.id === tattoo.id
                    ? Color.orange[400]
                    : "transparent",
              }}
              contentFit="contain"
            />
            <Text
              type="body"
              weight="bold"
              style={{ textAlign: "center", marginTop: 8, width: 160 }}
              numberOfLines={2}
            >
              {tattoo.title}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Tattoo Gallery Selection */}
      {options.selectedTattoo && (
        <>
          <View style={[styles.section, { marginTop: 24 }]}>
            <Text type="subtitle" weight="bold">
              Choose specific design
            </Text>
          </View>
          <ScrollView
            horizontal
            style={{ flex: 1, height: 180, paddingHorizontal: 16 }}
            showsHorizontalScrollIndicator={false}
          >
            {options.selectedTattoo.gallery.map((galleryImage, index) => (
              <Pressable
                key={`${options.selectedTattoo?.id}-${index}`}
                onPress={() => setSelectedTattooImage(galleryImage)}
              >
                <Image
                  source={galleryImage}
                  style={{
                    width: 140,
                    height: 140,
                    borderWidth: 3,
                    marginLeft: 8,
                    borderRadius: 12,
                    borderColor:
                      selectedTattooImage === galleryImage
                        ? Color.orange[400]
                        : "transparent",
                  }}
                  contentFit="cover"
                />
              </Pressable>
            ))}
          </ScrollView>
        </>
      )}

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 8,
          paddingHorizontal: 16,
        }}
      >
        <Text type="subtitle" weight="bold">
          Choose style
        </Text>

        <View style={styles.colorOptions}>
          <Button
            title="Color"
            variant={options.colorOption === "color" ? "solid" : "outline"}
            color={options.colorOption === "color" ? "orange" : "gray"}
            onPress={() => updateOptions({ colorOption: "color" })}
            style={styles.colorButton}
          />

          <Button
            title="Black & White"
            variant={options.colorOption === "blackwhite" ? "solid" : "outline"}
            color={options.colorOption === "blackwhite" ? "orange" : "gray"}
            onPress={() => updateOptions({ colorOption: "blackwhite" })}
            style={styles.colorButton}
          />
        </View>
      </View>

      {/* Create Button */}
      <View style={[styles.section, { marginTop: 32 }]}>
        <Button
          symbol="sparkles"
          variant="solid"
          haptic
          color="orange"
          title={mutation.isPending ? "Creating..." : "Create Tattoo"}
          disabled={!canGenerate || mutation.isPending}
          onPress={handleCreateTattoo}
        />
        {!canGenerate && (
          <Text
            type="caption"
            style={{
              marginTop: 8,
              textAlign: "center",
              color: Color.gray[500],
            }}
          >
            Select body part, tattoo style, design, and color option to create
          </Text>
        )}
      </View>

      {/* Loading State */}
      {mutation.isPending && (
        <View style={styles.loadingSection}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 10, textAlign: "center" }}>
            Creating your tattoo design...
          </Text>
          <Text
            type="caption"
            style={{
              marginTop: 4,
              textAlign: "center",
              color: Color.gray[500],
            }}
          >
            This may take a few moments
          </Text>
        </View>
      )}

      {/* Error State */}
      {mutation.isError && (
        <View style={styles.errorSection}>
          <Text style={styles.errorTitle}>
            {mutation.error?.message?.startsWith("Validation Error:")
              ? "❌ Invalid Request"
              : "⚠️ Generation Failed"}
          </Text>
          <Text style={styles.errorMessage}>
            {mutation.error?.message || "Failed to generate tattoo design"}
          </Text>
          <Button
            title="Try Again"
            variant="outline"
            color="orange"
            onPress={() => mutation.reset()}
            style={{ marginTop: 12 }}
          />
        </View>
      )}

      {/* Success State with Generated Image */}
      {generatedImage && (
        <View style={styles.resultSection}>
          <Text
            type="subtitle"
            weight="bold"
            style={{ marginBottom: 16, textAlign: "center" }}
          >
            Your Tattoo Design
          </Text>

          {/* Show before and after */}
          <View style={styles.beforeAfterContainer}>
            <View style={styles.imageContainer}>
              <Text
                type="body"
                weight="bold"
                style={{ marginBottom: 8, textAlign: "center" }}
              >
                Original {selectedBodyPartVariant?.name}
              </Text>
              <Image
                source={selectedBodyPartVariant?.image}
                style={styles.previewImage}
                contentFit="cover"
              />
            </View>

            <View style={styles.imageContainer}>
              <Text
                type="body"
                weight="bold"
                style={{ marginBottom: 8, textAlign: "center" }}
              >
                With Tattoo
              </Text>
              <Image
                source={{ uri: generatedImage }}
                style={styles.previewImage}
                contentFit="cover"
              />
            </View>
          </View>

          {/* Action buttons */}
          <View style={styles.actionButtons}>
            <Button
              symbol="eye"
              variant="solid"
              color="blue"
              onPress={() => {
                if (generatedImage) {
                  router.push({
                    pathname: "/(tabs)/home/generated-result",
                    params: { imageUri: generatedImage },
                  });
                }
              }}
              title="See detail"
              style={{ flex: 1 }}
            />
            <Button
              symbol="arrow.clockwise"
              variant="outline"
              color="orange"
              onPress={handleCreateTattoo}
              title="Generate another"
              disabled={mutation.isPending}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      )}
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
    marginBottom: 16,
  },
  colorOptions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  colorButton: {
    width: "48%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    backgroundColor: "#000000",
  },
  loadingSection: {
    alignItems: "center",
    padding: 24,
    marginHorizontal: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    marginTop: 16,
  },
  errorSection: {
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: "#ffebee",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#c62828",
    marginTop: 16,
  },
  errorTitle: {
    color: "#c62828",
    fontWeight: "bold",
    marginBottom: 4,
  },
  errorMessage: {
    color: "#c62828",
    fontSize: 14,
  },
  resultSection: {
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: "#f0fdf4",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#bbf7d0",
    marginTop: 16,
    marginBottom: 24,
  },
  beforeAfterContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: 160,
    borderRadius: 8,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  customImageSection: {
    paddingHorizontal: 16,
    marginTop: 16,
    alignItems: "center",
  },
  customImageContainer: {
    position: "relative",
    alignItems: "center",
  },
  customImagePreview: {
    width: 200,
    height: 200,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: Color.orange[400],
  },
  customImageActions: {
    position: "absolute",
    bottom: -8,
    flexDirection: "row",
    gap: 12,
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
