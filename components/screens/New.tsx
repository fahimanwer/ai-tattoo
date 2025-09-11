import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
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
import { BlurView } from "expo-blur";
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
async function uriToBase64(uri: string): Promise<string> {
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
  // Simplified state for custom user image with base64
  const [customUserImage, setCustomUserImage] = useState<{
    uri: string;
    base64: string;
  } | null>(null);
  const [isUsingCustomImage, setIsUsingCustomImage] = useState(false);

  // Simplified state for existing tattoo image with base64
  const [existingTattooImage, setExistingTattooImage] = useState<{
    uri: string;
    base64: string;
  } | null>(null);
  const [isUsingExistingTattoo, setIsUsingExistingTattoo] = useState(false);

  // State for custom prompt instructions
  const [customInstructions, setCustomInstructions] = useState<string>("");
  const [showInstructionsInput, setShowInstructionsInput] = useState(false);

  // Set current step when component mounts
  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  // We'll add the back button prevention after mutation is declared

  // Helper function to convert static asset to base64
  const getStaticImageBase64 = async (
    imageSource: ImageSourcePropType
  ): Promise<string> => {
    if (typeof imageSource === "number") {
      // Static require() asset
      return await assetToBase64(imageSource);
    } else if (
      typeof imageSource === "object" &&
      "uri" in imageSource &&
      imageSource.uri
    ) {
      // URI-based image
      return await uriToBase64(imageSource.uri);
    }
    throw new Error("Invalid image source");
  };

  // Mutation for generating tattoo
  const mutation = useMutation({
    mutationFn: async () => {
      let bodyImage: string;
      let tattooImage: string;

      // Get body image base64
      if (isUsingCustomImage) {
        if (!customUserImage?.base64) {
          throw new Error("Custom user image not ready");
        }
        bodyImage = customUserImage.base64;
      } else {
        if (!selectedBodyPartVariant) {
          throw new Error("No body part selected");
        }
        bodyImage = await getStaticImageBase64(selectedBodyPartVariant.image);
      }

      // Get tattoo image base64
      if (isUsingExistingTattoo) {
        if (!existingTattooImage?.base64) {
          throw new Error("Existing tattoo image not ready");
        }
        tattooImage = existingTattooImage.base64;
      } else {
        if (!selectedTattooImage) {
          throw new Error("No tattoo image selected");
        }
        tattooImage = await getStaticImageBase64(selectedTattooImage);
      }

      const colorPrompt =
        options.colorOption === "blackwhite"
          ? " The tattoo design should be rendered in black and white ink only, with no color elements in the tattoo itself. The skin tone and natural skin coloring from the original body part photo must remain completely unchanged and realistic."
          : " The tattoo design should maintain its original colors and vibrancy. The skin tone and natural skin coloring from the original body part photo must remain completely unchanged and realistic.";

      const customInstructionsPrompt = customInstructions.trim()
        ? ` Additional instructions: ${customInstructions.trim()}`
        : "";

      const prompt =
        MIX_TWO_PHOTOS_PROMPT + colorPrompt + customInstructionsPrompt;

      return textAndImageToImage({
        prompt,
        images_base64: [bodyImage, tattooImage],
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
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        allowsMultipleSelection: false,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const selectedImage = result.assets[0];
        if (selectedImage.base64) {
          setCustomUserImage({
            uri: selectedImage.uri,
            base64: selectedImage.base64,
          });
          setIsUsingCustomImage(true);
          // Reset body part selection when using custom image
          setSelectedBodyPartVariant(null);
        } else {
          Alert.alert("Error", "Failed to get image data");
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image from gallery");
    }
  }, []);

  // Function to remove custom image and return to default
  const removeCustomImage = useCallback(() => {
    setCustomUserImage(null);
    setIsUsingCustomImage(false);
    // Reset to default body part
    setSelectedBodyPartVariant(null);
  }, []);

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
  }, [updateOptions]);

  // Function to remove existing tattoo image and return to gallery selection
  const removeExistingTattooImage = useCallback(() => {
    setExistingTattooImage(null);
    setIsUsingExistingTattoo(false);
    // Reset selected tattoo image when removing existing tattoo
    setSelectedTattooImage(null);
  }, []);

  // Function to reset all form state
  const resetFormCompletely = useCallback(() => {
    setSelectedBodyPartCategory(null);
    setSelectedBodyPartVariant(null);
    setSelectedTattooImage(null);
    setGeneratedImage(null);
    setCustomUserImage(null);
    setIsUsingCustomImage(false);
    setExistingTattooImage(null);
    setIsUsingExistingTattoo(false);
    setCustomInstructions("");
    setShowInstructionsInput(false);
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
    options.colorOption &&
    ((isUsingExistingTattoo && existingTattooImage?.base64) ||
      (!isUsingExistingTattoo && selectedTattooImage)) &&
    ((isUsingCustomImage && customUserImage?.base64) ||
      (!isUsingCustomImage && selectedBodyPartVariant));

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
          <View style={styles.customImageContainer}>
            <Image
              source={{ uri: customUserImage.uri }}
              style={styles.customImagePreview}
              contentFit="cover"
            />
            <View style={styles.customImageActions}>
              <BlurView intensity={20} style={styles.customImageActionsBlur}>
                <Button
                  symbol="trash"
                  onPress={removeCustomImage}
                  radius="full"
                  variant="outline"
                  color="white"
                  style={{ width: 36, height: 36 }}
                />
                <Button
                  symbol="photo"
                  onPress={pickImageFromGallery}
                  radius="full"
                  variant="outline"
                  color="white"
                  style={{ width: 36, height: 36 }}
                />
              </BlurView>
            </View>
          </View>
        </View>
      )}

      {/* Body Part Category Selection - Only show when not using custom image */}
      {!isUsingCustomImage && (
        <ScrollView
          horizontal
          style={{
            flex: 1,
            paddingHorizontal: 16,
            marginBottom: 12,
          }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 12,
            paddingVertical: 8,
          }}
        >
          {bodyPartCategories.map((category) => (
            <Pressable
              key={category.id}
              onPress={() => {
                setSelectedBodyPartCategory(category);
                setSelectedBodyPartVariant(null); // Reset selected variant when changing category
              }}
              style={{ marginBottom: 8 }}
            >
              <Badge
                variant={
                  selectedBodyPartCategory?.id === category.id
                    ? "solid"
                    : "outline"
                }
                color={
                  selectedBodyPartCategory?.id === category.id
                    ? "white"
                    : "neutral"
                }
                size="md"
                radius="full"
                style={{
                  borderWidth:
                    selectedBodyPartCategory?.id === category.id ? 2 : 1,
                  minWidth: 120,
                  paddingHorizontal: 16,
                }}
              >
                {category.name}
              </Badge>
            </Pressable>
          ))}
        </ScrollView>
      )}

      {/* Custom Instructions Section */}
      <View style={[styles.section, { marginVertical: 24 }]}>
        <Text type="subtitle" weight="bold">
          Custom instructions
        </Text>
        <Button
          symbol={showInstructionsInput ? "minus" : "plus"}
          onPress={() => setShowInstructionsInput(!showInstructionsInput)}
          radius="full"
          variant="link"
          color="white"
          style={{ width: 40, height: 40 }}
        />
      </View>

      {showInstructionsInput && (
        <View style={styles.instructionsContainer}>
          <Input
            placeholder="e.g., 'Add the tattoo to the left side of my face' or 'Place the tattoo on my upper arm'"
            value={customInstructions}
            onChangeText={setCustomInstructions}
            multiline
            numberOfLines={3}
            style={styles.instructionsInput}
          />
          <Text type="caption" style={styles.instructionsHint}>
            Add specific instructions about where to place the tattoo or any
            other details you want to include.
          </Text>
        </View>
      )}

      {/* Body Part Variant Selection - Only show when not using custom image */}
      {!isUsingCustomImage && selectedBodyPartCategory && (
        <>
          <View style={[styles.section]}>
            <Text type="base" weight="bold">
              Choose specific {selectedBodyPartCategory.name.toLowerCase()}
            </Text>
          </View>

          <ScrollView
            horizontal
            style={{
              flex: 1,
              paddingHorizontal: 16,
              marginBottom: 12,
            }}
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
                    width: 100,
                    height: 100,
                    borderWidth: 3,
                    marginLeft: 8,
                    borderRadius: 12,
                    borderColor:
                      selectedBodyPartVariant?.id === variant.id
                        ? Color.grayscale[950]
                        : "transparent",
                  }}
                  contentFit="cover"
                />
                <Text
                  type="caption"
                  weight="medium"
                  style={{ textAlign: "center", marginTop: 6, width: "100%" }}
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
          Select a tattoo
        </Text>
        <Button
          symbol={isUsingExistingTattoo ? "trash" : "plus"}
          onPress={
            isUsingExistingTattoo
              ? removeExistingTattooImage
              : pickExistingTattooFromGallery
          }
          radius="full"
          variant="link"
          color="white"
          style={{ width: 40, height: 40 }}
        />
      </View>

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

      {/* Existing Tattoo Image Preview */}
      {isUsingExistingTattoo && existingTattooImage && (
        <View style={styles.customImageSection}>
          <View style={styles.customImageContainer}>
            <Image
              source={{ uri: existingTattooImage.uri }}
              style={styles.customImagePreview}
              contentFit="cover"
            />
            <View style={styles.customImageActions}>
              <BlurView intensity={20} style={styles.customImageActionsBlur}>
                <Button
                  symbol="trash"
                  onPress={removeExistingTattooImage}
                  radius="full"
                  variant="outline"
                  color="white"
                  style={{ width: 36, height: 36 }}
                />
                <Button
                  symbol="photo"
                  onPress={pickExistingTattooFromGallery}
                  radius="full"
                  variant="outline"
                  color="white"
                  style={{ width: 36, height: 36 }}
                />
              </BlurView>
            </View>
          </View>
        </View>
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
          Choose color
        </Text>

        <View style={styles.colorOptions}>
          <Button
            title="Color"
            variant={options.colorOption === "color" ? "solid" : "outline"}
            color={options.colorOption === "color" ? "white" : "gray"}
            onPress={() => updateOptions({ colorOption: "color" })}
            style={styles.colorButton}
            radius="full"
          />

          <Button
            title="Black & White"
            variant={options.colorOption === "blackwhite" ? "solid" : "outline"}
            color={options.colorOption === "blackwhite" ? "white" : "gray"}
            onPress={() => updateOptions({ colorOption: "blackwhite" })}
            style={styles.colorButton}
            radius="full"
          />
        </View>
      </View>

      {/* Create Button */}
      <View style={[styles.section, { marginTop: 32 }]}>
        <Button
          symbol="sparkles"
          variant="solid"
          radius="full"
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
            Select body part, tattoo style (or upload existing tattoo), and
            color option to create
          </Text>
        )}
      </View>

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
    bottom: -20,
    flexDirection: "row",
    gap: 12,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: "hidden",
  },
  customImageActionsBlur: {
    position: "relative",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    gap: 12,
  },
  instructionsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  instructionsInput: {
    minHeight: 80,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  instructionsHint: {
    marginTop: 8,
    marginBottom: 32,
    color: "#6b7280",
    fontStyle: "italic",
  },
});
