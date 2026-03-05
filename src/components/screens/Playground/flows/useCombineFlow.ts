/**
 * useCombineFlow -- hook for the Combine flow.
 * Manages picking up to 4 images, optional description, and generation.
 */

import { buildCombinePrompt } from "@/lib/flowPrompts";
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

const MAX_IMAGES = 4;

export function useCombineFlow() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const textAndImageToImageAction = useAction(
    api.generation.textAndImageToImage
  );

  const [imageUris, setImageUris] = useState<string[]>([]);
  const [description, setDescription] = useState("");
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
          type: "combine",
          success: true,
          imageCount: imageUris.length,
        });
      }
    },
    onError: (error) => {
      customEvent("generation_failed", {
        type: "combine",
        error: error.message,
      });
    },
  });

  async function addImage() {
    if (imageUris.length >= MAX_IMAGES) return;

    const remaining = MAX_IMAGES - imageUris.length;
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 0.3,
        allowsMultipleSelection: remaining > 1,
        selectionLimit: remaining,
        base64: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const newUris: string[] = [];
        for (const asset of result.assets) {
          if (asset.base64) {
            const uri = await cacheBase64Image(asset.base64, "png");
            newUris.push(uri);
          }
        }
        if (newUris.length > 0) {
          setImageUris((prev) => [...prev, ...newUris].slice(0, MAX_IMAGES));
        }
      }
    } catch (error) {
      Alert.alert(t("common.error"), t("playground.pickImageError"));
    }
  }

  function removeImage(index: number) {
    setImageUris((prev) => prev.filter((_, i) => i !== index));
  }

  async function generate() {
    if (imageUris.length < 2) return;

    const prompt = buildCombinePrompt(description);

    customEvent("generation_started", {
      type: "combine",
      imageCount: imageUris.length,
    });

    const base64Images = await Promise.all(
      imageUris.map((uri) => getCachedImageAsBase64(uri))
    );

    mutation.mutate({
      prompt,
      images_base64: base64Images,
    });
  }

  function reset() {
    setImageUris([]);
    setDescription("");
    setResultUri(null);
    mutation.reset();
  }

  return {
    imageUris,
    description,
    setDescription,
    resultUri,
    isGenerating: mutation.isPending,
    error: mutation.error,
    addImage,
    removeImage,
    generate,
    reset,
    mutation,
    maxImages: MAX_IMAGES,
  };
}
