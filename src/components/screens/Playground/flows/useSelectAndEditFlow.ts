/**
 * useSelectAndEditFlow -- business-logic hook for the inpainting flow.
 *
 * Manages: source image, mask, edit prompt, generation call, result.
 * Step machine:  1 = pick  |  2 = paint  |  3 = prompt  |  4 = result
 */

import { buildInpaintPrompt } from "@/lib/flowPrompts";
import {
  cacheBase64Image,
  getCachedImageAsBase64,
} from "@/lib/image-cache";
import { api } from "@/lib/nano";
import { useAction } from "convex/react";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";
import Purchases from "react-native-purchases";
import { useTranslation } from "react-i18next";
import { customEvent } from "vexo-analytics";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SelectAndEditStep = 1 | 2 | 3 | 4;

export interface UseSelectAndEditFlowReturn {
  step: SelectAndEditStep;
  setStep: (s: SelectAndEditStep) => void;

  sourceUri: string | null;
  maskBase64: string | null;
  editPrompt: string;
  resultUri: string | null;

  isGenerating: boolean;
  error: string | null;

  pickImage: () => Promise<void>;
  setMask: (base64: string) => void;
  setEditPrompt: (text: string) => void;
  generate: () => Promise<void>;
  reset: () => void;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useSelectAndEditFlow(): UseSelectAndEditFlowReturn {
  const { t } = useTranslation();
  const textAndImageToImageAction = useAction(
    api.generation.textAndImageToImage
  );

  const [step, setStep] = useState<SelectAndEditStep>(1);
  const [sourceUri, setSourceUri] = useState<string | null>(null);
  const [maskBase64, setMaskBase64] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState("");
  const [resultUri, setResultUri] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ------------------------------------------------------------------
  // Pick source image
  // ------------------------------------------------------------------

  async function pickImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 0.8,
        base64: true,
      });

      if (result.canceled || result.assets.length === 0) return;

      const asset = result.assets[0];
      if (!asset.base64) {
        Alert.alert(t("common.error"), t("playground.imageDataError"));
        return;
      }

      const fileUri = await cacheBase64Image(asset.base64, "png");
      setSourceUri(fileUri);
      setStep(2);

      customEvent("select_and_edit_image_picked", {});
    } catch (err) {
      console.error("SelectAndEdit: pick image failed", err);
      Alert.alert(t("common.error"), t("playground.pickImageError"));
    }
  }

  // ------------------------------------------------------------------
  // Store mask
  // ------------------------------------------------------------------

  function setMask(base64: string) {
    setMaskBase64(base64);
  }

  // ------------------------------------------------------------------
  // Generate (inpaint)
  // ------------------------------------------------------------------

  async function generate() {
    if (!sourceUri || !maskBase64) {
      Alert.alert(
        t("common.error"),
        t("flows.selectAndEdit.noMaskError")
      );
      return;
    }

    if (editPrompt.trim().length === 0) {
      Alert.alert(
        t("common.error"),
        t("flows.selectAndEdit.noPromptError")
      );
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Get RevenueCat user id
      let revenuecatUserId: string | undefined;
      try {
        const info = await Purchases.getCustomerInfo();
        revenuecatUserId = info.originalAppUserId;
      } catch {
        // continue
      }

      // Convert source + mask to base64 data URIs
      const sourceBase64 = await getCachedImageAsBase64(sourceUri);
      const maskDataUri = `data:image/png;base64,${maskBase64}`;

      const prompt = buildInpaintPrompt(editPrompt);

      customEvent("select_and_edit_generation_started", {
        promptLength: editPrompt.length,
      });

      const result = await textAndImageToImageAction({
        prompt,
        images_base64: [sourceBase64, maskDataUri],
        improvePrompt: false,
        revenuecatUserId,
      });

      if (result?.imageData) {
        const fileUri = await cacheBase64Image(result.imageData, "png");
        setResultUri(fileUri);
        setStep(4);

        customEvent("select_and_edit_generation_completed", {
          success: true,
        });
      }
    } catch (err: unknown) {
      console.error("SelectAndEdit: generation failed", err);

      const errorData =
        typeof err === "object" && err !== null && "data" in err
          ? (err as { data?: unknown }).data
          : undefined;
      const errorMessage =
        err instanceof Error
          ? err.message
          : typeof err === "string"
            ? err
            : undefined;
      const msg =
        errorData ?? errorMessage ?? t("flows.selectAndEdit.generationFailed");
      const normalizedMessage =
        typeof msg === "string" ? msg : JSON.stringify(msg);
      setError(normalizedMessage);

      customEvent("select_and_edit_generation_failed", {
        error:
          err instanceof Error
            ? err.message
            : typeof err === "string"
              ? err
              : "unknown",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  // ------------------------------------------------------------------
  // Reset entire flow
  // ------------------------------------------------------------------

  function reset() {
    setStep(1);
    setSourceUri(null);
    setMaskBase64(null);
    setEditPrompt("");
    setResultUri(null);
    setIsGenerating(false);
    setError(null);
  }

  return {
    step,
    setStep,
    sourceUri,
    maskBase64,
    editPrompt,
    resultUri,
    isGenerating,
    error,
    pickImage,
    setMask,
    setEditPrompt,
    generate,
    reset,
  };
}
