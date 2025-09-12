import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { useTattooCreation } from "@/context/TattooCreationContext";
import { ApiError } from "@/lib/api-client";
import { assetToBase64, urlToBase64 } from "@/lib/base64-utils";
import { textAndImageToImage } from "@/lib/nano";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

// Constants
const MIX_TWO_PHOTOS_PROMPT = `Apply the tattoo design from the second image onto the body part from the first image. Create a hyper-realistic integration where the tattoo design follows the exact curvature and natural folds of the skin from the first image, adapting seamlessly to the anatomy. IMPORTANT: Preserve the exact natural skin tone, color, and texture from the original body part photo - do not alter or change the skin color in any way. The tattoo ink must look authentically healed into the skin: slightly diffused in pores, with natural wear, subtle fading in areas of tension, and matte tones rather than excessive shine. Shading and lines should curve and flow with the muscles and skin surface, never floating above it. Show fine details of skin texture such as pores, wrinkles, and light imperfections, blending with the tattoo ink while maintaining the original skin coloring. Lighting should remain soft and realistic, avoiding glossy or artificial effects, so the tattoo looks fully integrated and aged naturally. The final result should be the body part from the first image with the tattoo design applied, keeping all original skin characteristics intact. No background, only the tattooed body part in ultra-high resolution.`;

export function TattooCreation() {
  const {
    selectedBodyPartCategory,
    selectedBodyPartVariant,
    customUserImage,
    isUsingCustomImage,
    selectedTattooImage,
    existingTattooImage,
    isUsingExistingTattoo,
    customInstructions,
    options,
  } = useTattooCreation();

  const router = useRouter();

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
        // For URL-based images, convert to base64
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
        // Handle both static assets and URL-based images
        if (typeof selectedTattooImage === "number") {
          // Static require() asset
          tattooImage = await assetToBase64(selectedTattooImage);
        } else if (
          typeof selectedTattooImage === "object" &&
          "uri" in selectedTattooImage &&
          selectedTattooImage.uri
        ) {
          // URL-based image
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
      if (data.imageData) {
        const generatedImageUri = `data:image/png;base64,${data.imageData}`;

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
    },
  });

  // Auto-start generation when component mounts
  useEffect(() => {
    if (!mutation.isPending && !mutation.isSuccess && !mutation.isError) {
      mutation.mutate();
    }
  }, [mutation]);

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
          onPress={() => mutation.reset()}
          style={{ marginTop: 12 }}
        />
      </View>
    );
  }

  // This should not be reached as success redirects to result page
  return null;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    backgroundColor: "#000000",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    backgroundColor: "#000000",
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
});
