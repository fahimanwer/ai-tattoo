/**
 * useTryOnFlow -- state machine driving the Try-On experience.
 *
 * Steps:
 *   1. pickTattoo  -- user selects a tattoo image
 *   2. pickBody    -- user selects a body photo (gallery or camera)
 *   3. overlay     -- interactive Skia canvas for positioning
 *
 * After compositing the user can:
 *   - "Save Preview" (free, instant snapshot)
 *   - "Refine with AI" (1 credit, sends composite through textAndImageToImage)
 *
 * Tattoo extraction pipeline:
 *   - User-picked photos: sent to Gemini extractTattoo API (free, configurable model)
 *   - Built-in designs: use pre-processed transparent PNGs directly
 */

import { cacheBase64Image, cacheImageFromUrl } from "@/lib/image-cache";
import { api } from "@/lib/nano";
import { PlaygroundCoreContext } from "@/src/context/playground";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAction, useMutation as useConvexMutation } from "convex/react";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { use, useState } from "react";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";
import Purchases from "react-native-purchases";
import { toast } from "sonner-native";
import { customEvent } from "vexo-analytics";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TryOnStep = "pickImages" | "overlay";

export interface TryOnFlowState {
  step: TryOnStep;
  tattooUri: string | null;
  bodyUri: string | null;
  compositeBase64: string | null;
  opacity: number;
  isRefining: boolean;
  refinedUri: string | null;
  isProcessingTattoo: boolean;
  isWarpMode: boolean;
}

export interface TryOnFlowActions {
  pickTattoo: () => Promise<void>;
  pickBody: () => Promise<void>;
  takeBodyPhoto: () => Promise<void>;
  setOpacity: (value: number) => void;
  captureComposite: (base64: string) => void;
  refineWithAi: (base64?: string) => Promise<void>;
  savePreview: (base64?: string) => Promise<void>;
  selectTattooFromUrl: (url: string) => Promise<void>;
  setIsWarpMode: (value: boolean) => void;
  reset: () => void;
}

// ---------------------------------------------------------------------------
// Prompts
// ---------------------------------------------------------------------------

const REFINE_PROMPT =
  "Blend the tattoo into the skin realistically. Match the tattoo's shading, colour temperature, and texture to the person's skin tone. Add subtle skin-grain, light wrapping, and shadow so it looks like a real tattoo. Do NOT change the tattoo design, body pose, or background.";

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useTryOnFlow(): TryOnFlowState & TryOnFlowActions {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { handleSave } = use(PlaygroundCoreContext);
  const textAndImageToImageAction = useAction(
    api.generation.textAndImageToImage
  );
  const extractTattooAction = useAction(api.generation.extractTattoo);
  const generateUploadUrl = useConvexMutation(api.extractedTattoos.generateUploadUrl);
  const storeExtractedTattoo = useConvexMutation(api.extractedTattoos.store);

  // State
  const [tattooUri, setTattooUri] = useState<string | null>(null);
  const [bodyUri, setBodyUri] = useState<string | null>(null);
  const [compositeBase64, setCompositeBase64] = useState<string | null>(null);
  const [opacity, setOpacity] = useState(0.85);
  const [refinedUri, setRefinedUri] = useState<string | null>(null);
  const [isProcessingTattoo, setIsProcessingTattoo] = useState(false);
  const [isWarpMode, setIsWarpMode] = useState(false);

  // Derived step
  const step: TryOnStep = tattooUri && bodyUri ? "overlay" : "pickImages";

  // AI refine mutation
  const refineMutation = useMutation({
    mutationFn: async (compositeB64: string) => {
      let revenuecatUserId: string | undefined;
      try {
        const info = await Purchases.getCustomerInfo();
        revenuecatUserId = info.originalAppUserId;
      } catch {
        // Continue without RC ID
      }

      return textAndImageToImageAction({
        prompt: REFINE_PROMPT,
        images_base64: [compositeB64],
        improvePrompt: false,
        revenuecatUserId,
      });
    },
    onSuccess: async (data) => {
      if (data?.imageData) {
        const fileUri = await cacheBase64Image(data.imageData, "png");
        setRefinedUri(fileUri);
        queryClient.invalidateQueries({ queryKey: ["user", "usage"] });
        customEvent("tryon_refined", { success: true });
        toast.success(t("common.success"), { duration: 1500 });
      }
    },
    onError: (error: any) => {
      handleConvexError(error, "tryon_refine_failed");
    },
  });

  // -----------------------------------------------------------------------
  // Shared Convex error handler
  // -----------------------------------------------------------------------

  function handleConvexError(error: any, eventName: string) {
    const convexData = error?.data;
    const errorCode =
      typeof convexData === "object" ? convexData?.code : undefined;
    const message =
      typeof convexData === "object" && convexData?.message
        ? convexData.message
        : typeof convexData === "string"
          ? convexData
          : error.message;

    if (errorCode === "LIMIT_REACHED") {
      customEvent(`${eventName}_limit_reached`, {});
      router.push("/(paywall)?variant=discount");
      return;
    }

    customEvent(eventName, { error: message });
    Alert.alert(t("common.error"), message);
  }

  // -----------------------------------------------------------------------
  // Tattoo extraction via API
  // -----------------------------------------------------------------------

  async function extractTattooFromImage(base64: string): Promise<string> {
    const dataUri = base64.startsWith("data:")
      ? base64
      : `data:image/png;base64,${base64}`;

    const result = await extractTattooAction({
      image_base64: dataUri,
      model: "flash",
    });

    // Store for community reuse (fire-and-forget)
    try {
      const binaryString = atob(result.imageData);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: "image/png" });
      const storageId = await uploadToConvexStorage(blob);
      if (storageId) {
        storeExtractedTattoo({ storageId: storageId as any });
      }
    } catch {
      // Non-critical — don't block the flow
    }

    return result.imageData;
  }

  /** Upload a blob to Convex storage, return storageId or null on failure */
  async function uploadToConvexStorage(blob: Blob) {
    try {
      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": blob.type },
        body: blob,
      });
      const json = await res.json();
      return json.storageId as string;
    } catch {
      return null;
    }
  }

  // -----------------------------------------------------------------------
  // Actions
  // -----------------------------------------------------------------------

  async function pickTattoo() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]?.base64) {
        setIsProcessingTattoo(true);
        setCompositeBase64(null);
        setRefinedUri(null);
        customEvent("tryon_tattoo_picked", { source: "library" });

        // Fire-and-forget: start extraction immediately so user can pick body
        // photo in parallel. When extraction finishes, tattooUri updates and
        // the overlay step activates automatically.
        const rawBase64 = result.assets[0].base64;
        extractTattooFromImage(rawBase64)
          .then(async (extractedBase64) => {
            const fileUri = await cacheBase64Image(extractedBase64, "png");
            setTattooUri(fileUri);
          })
          .catch(async () => {
            // Fallback: use raw image if API fails
            const fileUri = await cacheBase64Image(rawBase64, "png");
            setTattooUri(fileUri);
          })
          .finally(() => setIsProcessingTattoo(false));
      }
    } catch (error) {
      setIsProcessingTattoo(false);
      Alert.alert(t("common.error"), t("playground.pickImageError"));
    }
  }

  async function pickBody() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]?.base64) {
        const uri = await cacheBase64Image(result.assets[0].base64, "png");
        setBodyUri(uri);
        setCompositeBase64(null);
        setRefinedUri(null);
        customEvent("tryon_body_picked", { source: "gallery" });
      }
    } catch (error) {
      console.error("pickBody error:", error);
      Alert.alert(t("common.error"), t("playground.pickImageError"));
    }
  }

  async function takeBodyPhoto() {
    try {
      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (!perm.granted) {
        Alert.alert(
          t("permissions.cameraAccessDeniedTitle"),
          t("permissions.cameraAccessDeniedDescription")
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]?.base64) {
        const uri = await cacheBase64Image(result.assets[0].base64, "png");
        setBodyUri(uri);
        setCompositeBase64(null);
        setRefinedUri(null);
        customEvent("tryon_body_picked", { source: "camera" });
      }
    } catch (error) {
      console.error("takeBodyPhoto error:", error);
      Alert.alert(t("common.error"), t("playground.pickImageError"));
    }
  }

  async function selectTattooFromUrl(url: string) {
    try {
      setIsProcessingTattoo(true);

      const isPng = url.endsWith(".png") || url.endsWith(".PNG");
      let uri: string;

      if (isPng) {
        // PNG (transparent) — cache directly, Skia can decode
        uri = await cacheImageFromUrl(url, "png");
      } else {
        // AVIF fallback — convert via platform decoder (Skia can't decode AVIF)
        const { manipulateAsync, SaveFormat } = await import(
          "expo-image-manipulator"
        );
        const result = await manipulateAsync(url, [], {
          format: SaveFormat.PNG,
        });
        uri = result.uri;
      }

      setTattooUri(uri);
      setCompositeBase64(null);
      setRefinedUri(null);
      customEvent("tryon_tattoo_picked", { source: "app_gallery" });
    } catch (error) {
      Alert.alert(t("common.error"), t("playground.pickImageError"));
    } finally {
      setIsProcessingTattoo(false);
    }
  }

  function captureComposite(base64: string) {
    setCompositeBase64(base64);
  }

  async function refineWithAi(base64?: string) {
    const data = base64 || compositeBase64;
    if (!data) {
      toast.error(t("common.error"), { duration: 1500 });
      return;
    }
    if (base64) setCompositeBase64(base64);

    const dataUri = data.startsWith("data:")
      ? data
      : `data:image/jpeg;base64,${data}`;

    refineMutation.mutate(dataUri);
  }

  async function savePreview(base64?: string) {
    // Prefer the refined image if available
    if (refinedUri) {
      await handleSave(refinedUri);
      customEvent("tryon_saved", { refined: true });
      return;
    }

    const data = base64 || compositeBase64;
    if (!data) return;

    if (base64) setCompositeBase64(base64);

    const raw = data.startsWith("data:") ? data.split(",")[1]! : data;
    const fileUri = await cacheBase64Image(raw, "jpg");
    await handleSave(fileUri);
    customEvent("tryon_saved", { refined: false });
  }

  function reset() {
    setTattooUri(null);
    setBodyUri(null);
    setCompositeBase64(null);
    setOpacity(0.85);
    setRefinedUri(null);
    setIsWarpMode(false);
    refineMutation.reset();
  }

  return {
    // State
    step,
    tattooUri,
    bodyUri,
    compositeBase64,
    opacity,
    isRefining: refineMutation.isPending,
    refinedUri,
    isProcessingTattoo,
    isWarpMode,
    // Actions
    pickTattoo,
    pickBody,
    takeBodyPhoto,
    setOpacity,
    captureComposite,
    refineWithAi,
    savePreview,
    selectTattooFromUrl,
    setIsWarpMode,
    reset,
  };
}
