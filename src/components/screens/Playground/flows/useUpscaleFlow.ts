/**
 * useUpscaleFlow -- hook for the Upscale flow.
 * Simple one-step: pick image, upscale, show result.
 */

import { buildUpscalePrompt } from "@/lib/flowPrompts";
import {
  cacheBase64Image,
  getCachedImageAsBase64,
} from "@/lib/image-cache";
import { api, TextAndImageToImageInput } from "@/lib/nano";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAction } from "convex/react";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";
import Purchases from "react-native-purchases";
import { customEvent } from "vexo-analytics";

export function useUpscaleFlow() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const textAndImageToImageAction = useAction(
    api.generation.textAndImageToImage
  );

  const [sourceUri, setSourceUri] = useState<string | null>(null);
  const [resultUri, setResultUri] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (input: TextAndImageToImageInput) => {
      let revenuecatUserId: string | undefined;
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        revenuecatUserId = customerInfo.originalAppUserId;
      } catch {
        // Continue without RC ID
      }
      return textAndImageToImageAction({
        prompt: input.prompt,
        images_base64: input.images_base64,
        improvePrompt: false,
        revenuecatUserId,
      });
    },
    onSuccess: async (data) => {
      if (data?.imageData) {
        const fileUri = await cacheBase64Image(data.imageData, "png");
        setResultUri(fileUri);
        queryClient.invalidateQueries({ queryKey: ["user", "usage"] });
        customEvent("generation_completed", {
          type: "upscale",
          success: true,
        });
      }
    },
    onError: (error) => {
      customEvent("generation_failed", {
        type: "upscale",
        error: error.message,
      });
    },
  });

  async function pickImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 0.3,
        base64: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset.base64) {
          const uri = await cacheBase64Image(asset.base64, "png");
          setSourceUri(uri);
          setResultUri(null);
          mutation.reset();
        }
      }
    } catch (error) {
      Alert.alert(t("common.error"), t("playground.pickImageError"));
    }
  }

  async function upscale() {
    if (!sourceUri) return;

    customEvent("generation_started", { type: "upscale" });

    const base64 = await getCachedImageAsBase64(sourceUri);
    mutation.mutate({
      prompt: buildUpscalePrompt(),
      images_base64: [base64],
    });
  }

  function reset() {
    setSourceUri(null);
    setResultUri(null);
    mutation.reset();
  }

  return {
    sourceUri,
    resultUri,
    isGenerating: mutation.isPending,
    error: mutation.error,
    pickImage,
    upscale,
    reset,
    mutation,
  };
}
