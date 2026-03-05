/**
 * usePortraitFlow -- shared hook for AI Portrait and Pet Portrait flows.
 * Manages: source image selection, style choice, generation, result caching.
 *
 * Both AiPortraitFlow and PetPortraitFlow consume this hook,
 * passing their own prompt builder.
 */

import { cacheBase64Image, getCachedImageAsBase64 } from "@/lib/image-cache";
import { api, TextAndImageToImageResponse } from "@/lib/nano";
import type { PortraitStyle } from "@/src/context/playground/flow-types";
import { useUsageLimit } from "@/src/hooks/useUsageLimit";
import { ConvexError } from "convex/values";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAction } from "convex/react";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";
import Purchases from "react-native-purchases";
import { useTranslation } from "react-i18next";
import { customEvent } from "vexo-analytics";

export type PromptBuilder = (style: PortraitStyle) => string;

export interface UsePortraitFlowReturn {
  /** URI of the user-picked source photo */
  sourceUri: string | null;
  /** Currently selected portrait style */
  selectedStyle: PortraitStyle;
  /** Set the portrait style */
  setSelectedStyle: (style: PortraitStyle) => void;
  /** URI of the generated result image */
  resultUri: string | null;
  /** Whether a generation is in progress */
  isGenerating: boolean;
  /** Error from the last generation attempt */
  error: Error | null;
  /** Open the image picker to select a source photo */
  pickPhoto: () => Promise<void>;
  /** Run generation with the given prompt builder */
  generate: (promptBuilder: PromptBuilder) => Promise<void>;
  /** Clear the result so the user can regenerate */
  clearResult: () => void;
  /** Reset the entire flow back to initial state */
  reset: () => void;
}

const PORTRAIT_STYLES: PortraitStyle[] = [
  "tattoo",
  "sketch",
  "watercolor",
  "lineArt",
  "blackwork",
  "dotwork",
];

export { PORTRAIT_STYLES };

export function usePortraitFlow(): UsePortraitFlowReturn {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { isLimitReached } = useUsageLimit();
  const textAndImageToImageAction = useAction(
    api.generation.textAndImageToImage
  );

  const [sourceUri, setSourceUri] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] =
    useState<PortraitStyle>("tattoo");
  const [resultUri, setResultUri] = useState<string | null>(null);

  const mutation = useMutation<
    TextAndImageToImageResponse | undefined,
    Error,
    { prompt: string; imageBase64: string }
  >({
    mutationFn: async ({ prompt, imageBase64 }) => {
      // Pre-check credits client-side for instant feedback
      if (isLimitReached) {
        throw new ConvexError({
          code: "LIMIT_REACHED",
          message: t("playground.error.limitReachedFree"),
        });
      }

      let revenuecatUserId: string | undefined;
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        revenuecatUserId = customerInfo.originalAppUserId;
      } catch {
        // Continue without RC ID
      }

      return textAndImageToImageAction({
        prompt,
        images_base64: [imageBase64],
        improvePrompt: false, // Prompt is already well-crafted
        revenuecatUserId,
      });
    },
    onSuccess: async (data) => {
      if (data?.imageData) {
        const fileUri = await cacheBase64Image(data.imageData, "png");
        setResultUri(fileUri);
        queryClient.invalidateQueries({ queryKey: ["user", "usage"] });
        customEvent("generation_completed", {
          type: "portrait_flow",
          success: true,
        });
      }
    },
    onError: (error) => {
      customEvent("generation_failed", {
        type: "portrait_flow",
        error: error.message,
      });
    },
  });

  async function pickPhoto() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        allowsMultipleSelection: false,
        base64: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset.base64) {
          const fileUri = await cacheBase64Image(asset.base64, "png");
          setSourceUri(fileUri);
          // Clear previous result when picking a new photo
          setResultUri(null);
          mutation.reset();
        } else {
          Alert.alert(t("common.error"), t("playground.imageDataError"));
        }
      }
    } catch (error) {
      console.error("Error picking portrait photo:", error);
      Alert.alert(t("common.error"), t("playground.pickImageError"));
    }
  }

  async function generate(promptBuilder: PromptBuilder) {
    if (!sourceUri) return;

    const prompt = promptBuilder(selectedStyle);
    const imageBase64 = await getCachedImageAsBase64(sourceUri);

    customEvent("generation_started", {
      type: "portrait_flow",
      style: selectedStyle,
    });

    mutation.mutate({ prompt, imageBase64 });
  }

  function clearResult() {
    setResultUri(null);
    mutation.reset();
  }

  function reset() {
    setSourceUri(null);
    setSelectedStyle("tattoo");
    setResultUri(null);
    mutation.reset();
  }

  return {
    sourceUri,
    selectedStyle,
    setSelectedStyle,
    resultUri,
    isGenerating: mutation.isPending,
    error: mutation.error,
    pickPhoto,
    generate,
    clearResult,
    reset,
  };
}
