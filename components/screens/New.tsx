import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { Color } from "@/constants/TWPalette";
import { useTattooCreation } from "@/context/TattooCreationContext";
import { ApiError } from "@/lib/api-client";
import { featuredTattoos } from "@/lib/featured-tattoos";
import { textAndImageToImage } from "@/lib/nano";
import { saveBase64ToAlbum } from "@/lib/save-to-library";
import { useMutation } from "@tanstack/react-query";
import { Asset } from "expo-asset";
import { File } from "expo-file-system/next";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

// Constants and utility functions
const MIX_TWO_PHOTOS_PROMPT = `A hyper-realistic integration of the uploaded tattoo design onto the uploaded body photo. The tattoo should follow the exact curvature and natural folds of the skin, adapting seamlessly to the anatomy. The ink must look authentically healed into the skin: slightly diffused in pores, with natural wear, subtle fading in areas of tension, and matte tones rather than excessive shine. Shading and lines should curve and flow with the muscles and skin surface, never floating above it. Show fine details of skin texture such as pores, wrinkles, and light imperfections, blending with the tattoo ink. Lighting should remain soft and realistic, avoiding glossy or artificial effects, so the tattoo looks fully integrated and aged naturally. No background, only the tattooed body part in ultra-high resolution.`;
const bodyPartImage = "/a.jpg";

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

  // Additional state for the tattoo creation functionality
  const [selectedTattooImage, setSelectedTattooImage] =
    useState<ImageSourcePropType | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [armBase64, setArmBase64] = useState<string | null>(null);
  const [tattooBase64, setTattooBase64] = useState<string | null>(null);

  // Set current step when component mounts
  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  // Preload arm image to base64
  useEffect(() => {
    (async () => {
      try {
        const armImage = await assetToBase64(
          require(`@/assets${bodyPartImage}`)
        );
        setArmBase64(armImage);
      } catch (e) {
        console.error("Failed to load arm image:", e);
      }
    })();
  }, []);

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

  // Mutation for generating tattoo
  const mutation = useMutation({
    mutationFn: async () => {
      if (!armBase64 || !tattooBase64) {
        throw new Error("Images not ready");
      }

      let prompt = MIX_TWO_PHOTOS_PROMPT;

      // Modify prompt based on color option
      if (options.colorOption === "blackwhite") {
        prompt +=
          " The tattoo should be rendered in black and white only, with no color elements.";
      } else {
        prompt +=
          " The tattoo should maintain its original colors and vibrancy.";
      }

      return textAndImageToImage({
        prompt,
        images_base64: [armBase64, tattooBase64],
      });
    },
    onSuccess: async (data) => {
      if (data.imageData) {
        setGeneratedImage(`data:image/png;base64,${data.imageData}`);
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

  const saveToLibrary = async () => {
    if (generatedImage) {
      await saveBase64ToAlbum(generatedImage, "png");
      Alert.alert(
        "Saved to Library",
        "Your tattoo design has been saved to your photo library!"
      );
    }
  };

  const canGenerate =
    options.selectedTattoo &&
    options.colorOption &&
    selectedTattooImage &&
    armBase64 &&
    tattooBase64;

  const handleCreateTattoo = () => {
    setGeneratedImage(null);
    mutation.mutate();
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.section}>
        <Text type="subtitle" weight="bold">
          Select a tattoo style
        </Text>
        <Text type="body">Choose a tattoo style to see available designs</Text>
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
            <Text type="body">
              Select the exact tattoo design you want to try
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

      <View style={styles.section}>
        <Text type="subtitle" weight="bold">
          Choose style
        </Text>
        <Text type="body">Select color preference for your tattoo</Text>

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
            Select a tattoo style, design, and color option to create
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
                Original Arm
              </Text>
              <Image
                /* eslint-disable-next-line @typescript-eslint/no-require-imports */
                source={require(`@/assets${bodyPartImage}`)}
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
              symbol="square.and.arrow.down"
              variant="solid"
              color="blue"
              onPress={saveToLibrary}
              title="Save to Library"
              style={{ flex: 1 }}
            />
            <Button
              symbol="arrow.clockwise"
              variant="outline"
              color="orange"
              onPress={handleCreateTattoo}
              title="Generate Again"
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
    gap: 8,
    paddingHorizontal: 16,
  },
  colorOptions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  colorButton: {
    width: "48%",
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
});
