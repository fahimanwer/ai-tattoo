import { ApiError } from "@/lib/api-client";
import { assetToBase64, urlToBase64 } from "@/lib/base64-utils";
import { BLURHASH } from "@/lib/image-cache";
import { textAndImageToImage } from "@/lib/nano";
import { saveBase64ToAlbum } from "@/lib/save-to-library";
import { Button } from "@/src/components/ui/Button";
import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import { useTattooCreation } from "@/src/context/TattooCreationContext";
import { useSubscription } from "@/src/hooks/useSubscription";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { AnimatedText } from "./Playground/shared/AnimatedText";

// Constants
const MIX_TWO_PHOTOS_PROMPT = `Apply the tattoo design from the second image onto the body part from the first image. Create a hyper-realistic integration where the tattoo design follows the exact curvature and natural folds of the skin from the first image, adapting seamlessly to the anatomy. IMPORTANT: Preserve the exact natural skin tone, color, and texture from the original body part photo - do not alter or change the skin color in any way. The tattoo ink must look authentically healed into the skin: slightly diffused in pores, with natural wear, subtle fading in areas of tension, and matte tones rather than excessive shine. Shading and lines should curve and flow with the muscles and skin surface, never floating above it. Show fine details of skin texture such as pores, wrinkles, and light imperfections, blending with the tattoo ink while maintaining the original skin coloring. Lighting should remain soft and realistic, avoiding glossy or artificial effects, so the tattoo looks fully integrated and aged naturally. The final result should be the body part from the first image with the tattoo design applied, keeping all original skin characteristics intact. No background, only the tattooed body part in ultra-high resolution.`;

export function TattooGenerationResult() {
  const {
    customInstructions,
    selectedBodyPartCategory,
    selectedBodyPartVariant,
    customUserImage,
    isUsingCustomImage,
    selectedTattooImage,
    existingTattooImage,
    isUsingExistingTattoo,
    options,
    reset: resetTattooCreation,
    setCurrentStep,
  } = useTattooCreation();

  const router = useRouter();
  const queryClient = useQueryClient();
  const { refreshSubscriptionStatus } = useSubscription();
  const [hasBeenSaved, setHasBeenSaved] = useState(false);

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
        if (!selectedBodyPartVariant || !selectedBodyPartCategory) {
          throw new Error("No body part selected");
        }
        bodyImage = await urlToBase64(selectedBodyPartVariant);
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
        if (typeof selectedTattooImage === "number") {
          tattooImage = await assetToBase64(selectedTattooImage);
        } else if (
          typeof selectedTattooImage === "object" &&
          "uri" in selectedTattooImage &&
          selectedTattooImage.uri
        ) {
          tattooImage = await urlToBase64(selectedTattooImage.uri);
        } else {
          throw new Error("Invalid tattoo image source");
        }
      }

      const colorPrompt =
        options.colorOption === "blackwhite"
          ? " The tattoo design should be rendered in black and white ink only, with no color elements in the tattoo itself. The skin tone and natural skin coloring from the original body part photo must remain completely unchanged and realistic."
          : " The tattoo design should maintain its original colors and vibrancy. The skin tone and natural skin coloring from the original body part photo must remain completely unchanged and realistic.";

      const customInstructionsPrompt = customInstructions?.trim()
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
      queryClient.invalidateQueries({ queryKey: ["user", "usage"] });

      try {
        await refreshSubscriptionStatus();
      } catch (error) {
        console.warn("Failed to refresh subscription status:", error);
      }
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        console.error("AI generation failed:", error.message, error.details);
      } else {
        console.error("AI generation failed:", error);
      }
    },
  });

  // Start generation when component mounts
  useEffect(() => {
    if (!mutation.isPending && !mutation.isSuccess && !mutation.isError) {
      mutation.mutate();
    }
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveToLibrary = useCallback(async () => {
    if (mutation.data?.imageData) {
      try {
        const imageUri = `data:image/png;base64,${mutation.data.imageData}`;
        await saveBase64ToAlbum(imageUri, "png");

        // Mark as saved
        setHasBeenSaved(true);

        Alert.alert(
          "Saved!",
          "Your tattoo design has been saved to your photo gallery.",
          [
            {
              text: "View in gallery",
              style: "default",
              onPress: () => {
                resetTattooCreation();
                setCurrentStep(1);
                // Navigate and ensure gallery refreshes
                router.replace("/(tabs)/tattoos");
              },
            },
            { text: "Back", style: "cancel" },
          ]
        );
      } catch (error) {
        Alert.alert("Error", "Unable to save image. Please try again.");
        console.error("Error saving to library:", error);
      }
    }
  }, [mutation.data, resetTattooCreation, setCurrentStep, router]);

  const handleGenerateAnother = useCallback(async () => {
    // If the tattoo hasn't been saved, show confirmation alert with save option
    if (!hasBeenSaved) {
      Alert.alert(
        "Generate Another?",
        "You haven't saved this tattoo yet. Would you like to save it before continuing?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Continue Without Saving",
            style: "destructive",
            onPress: () => {
              resetTattooCreation();
              setCurrentStep(1);
              router.replace("/(tabs)/(home)");
            },
          },
          {
            text: "Save and Continue",
            style: "default",
            onPress: async () => {
              // Save the tattoo first
              if (mutation.data?.imageData) {
                try {
                  const imageUri = `data:image/png;base64,${mutation.data.imageData}`;
                  await saveBase64ToAlbum(imageUri, "png");
                  setHasBeenSaved(true);

                  // Then proceed to generate another
                  resetTattooCreation();
                  setCurrentStep(1);
                  router.replace("/(tabs)/(home)");
                } catch (error) {
                  Alert.alert(
                    "Error",
                    "Unable to save image. Please try again."
                  );
                  console.error("Error saving to library:", error);
                }
              }
            },
          },
        ]
      );
    } else {
      // If already saved, proceed without confirmation
      resetTattooCreation();
      setCurrentStep(1);
      router.replace("/(tabs)/(home)");
    }
  }, [
    hasBeenSaved,
    mutation.data,
    resetTattooCreation,
    setCurrentStep,
    router,
  ]);

  const handleCancelGeneration = useCallback(() => {
    Alert.alert(
      "Cancel Generation?",
      "Your tattoo is still being generated. If you cancel now, this generation will still count towards your usage limit. Are you sure you want to cancel?",
      [
        { text: "Keep Generating", style: "cancel", isPreferred: true },
        {
          text: "Cancel",
          style: "destructive",
          onPress: () => {
            // Reset all state
            resetTattooCreation();
            setCurrentStep(1);
            // Navigate to home
            router.replace("/(tabs)/(home)");
          },
        },
      ]
    );
  }, [resetTattooCreation, setCurrentStep, router]);

  // Show loading state
  if (mutation.isPending) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
        }}
      >
        <AnimatedText
          text="Applying your tattoo design..."
          color={Color.orange[400]}
          colorDark={Color.orange[700]}
          style={{ flex: 0 }}
        />
        <Button
          title="Cancel"
          variant="link"
          color="red"
          onPress={handleCancelGeneration}
        />
      </View>
    );
  }

  // Show error state
  if (mutation.isError) {
    return (
      <View style={styles.errorContainer}>
        <Text type="subtitle" weight="bold" style={styles.errorTitle}>
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
          onPress={() => mutation.mutate()}
          style={{ marginTop: 12 }}
        />
        <Button
          title="Start Over"
          variant="solid"
          color="white"
          onPress={handleGenerateAnother}
          style={{ marginTop: 12 }}
        />
      </View>
    );
  }

  // Show success state with generated tattoo
  if (mutation.isSuccess && mutation.data?.imageData) {
    const imageUri = `data:image/png;base64,${mutation.data.imageData}`;

    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.resultContainer}
      >
        <View style={styles.resultHeader}>
          <Text type="title" weight="bold" style={styles.resultTitle}>
            Your Tattoo is Ready!
          </Text>
          <Text type="default" style={styles.resultSubtitle}>
            This is how your design would look applied
          </Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            cachePolicy="memory-disk"
            source={{ uri: imageUri }}
            style={styles.resultImage}
            contentFit="cover"
            contentPosition="center"
            transition={1000}
            placeholder={{ blurhash: BLURHASH }}
          />
        </View>

        <View style={styles.actionsContainer}>
          <View style={styles.buttonGrid}>
            <Button
              symbol="square.and.arrow.down"
              variant="solid"
              color="white"
              title="Save to Gallery"
              onPress={handleSaveToLibrary}
              style={styles.primaryButton}
              haptic
              radius="full"
            />
            <Button
              symbol="arrow.clockwise"
              variant="outline"
              color="white"
              title="Generate Another"
              onPress={handleGenerateAnother}
              style={styles.secondaryButton}
              radius="full"
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    gap: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    gap: 12,
  },
  errorTitle: {
    color: "#ff6b6b",
    marginBottom: 8,
    textAlign: "center",
  },
  errorMessage: {
    color: "#ff6b6b",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },
  resultContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  resultHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 12,
    gap: 1,
  },
  resultTitle: {
    textAlign: "center",
    color: Color.grayscale[950],
  },
  resultSubtitle: {
    textAlign: "center",
    color: Color.grayscale[950] + "80",
  },
  imageContainer: {
    marginBottom: 30,
    borderRadius: 16,
    overflow: "hidden",
  },
  resultImage: {
    width: "100%",
    height: 360,
    borderRadius: 16,
  },
  actionsContainer: {
    marginBottom: 24,
  },
  buttonGrid: {
    gap: 12,
  },
  primaryButton: {
    width: "100%",
  },
  secondaryButton: {
    width: "100%",
  },
});
