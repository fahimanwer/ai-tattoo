/**
 * PlaygroundCoreContext -- flow-agnostic playground infrastructure.
 * Manages: session generations, image caching, share/save, image picking,
 * input controls ref. Generation mutations are in useGenerationMutations.ts.
 */

import {
  cacheBase64Image,
  clearSessionCache,
  getCachedImageAsBase64,
} from "@/lib/image-cache";
import { saveBase64ToAlbum } from "@/lib/save-to-library";
import Share from "@/patches/rn-share-re-export";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as StoreReview from "expo-store-review";
import * as React from "react";
import { Alert, Linking } from "react-native";
import { toast } from "sonner-native";
import { useTranslation } from "react-i18next";
import { customEvent } from "vexo-analytics";
import { AppSettingsContext } from "../AppSettings";
import {
  useGenerationMutations,
  type ImageGenerationMutation,
} from "./useGenerationMutations";

export type { ImageGenerationMutation };

export interface InputControlsHandle {
  focus: () => void;
  blur: () => void;
  setText: (text: string) => void;
}

export interface PlaygroundCoreContextValue {
  prompt: string;
  setPrompt: (text: string) => void;
  sessionGenerations: string[][];
  setSessionGenerations: React.Dispatch<React.SetStateAction<string[][]>>;
  activeGenerationIndex: number | undefined;
  setActiveGenerationIndex: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  handleReset: () => void;
  pickImageFromGallery: (options?: {
    selectionLimit?: number;
  }) => Promise<boolean>;
  addImagesToSession: (imageUris: string[]) => void;
  availableSlotsInActiveGroup: number;
  handleShare: (fileUri?: string) => Promise<void>;
  handleSave: (fileUri?: string) => Promise<void>;
  activeGenerationUris: string[];
  activeMutation: ImageGenerationMutation;
  handleTattooGeneration: () => void;
  removeImageFromActiveGroup: (uri: string) => void;
  resetMutations: () => void;
  cancelGeneration: () => void;
  inputControlsRef: React.RefObject<InputControlsHandle | null>;
  focusInput: () => void;
  blurInput: () => void;
}

export const PlaygroundCoreContext =
  React.createContext<PlaygroundCoreContextValue>({
    prompt: "",
    setPrompt: () => {},
    sessionGenerations: [],
    setSessionGenerations: () => {},
    activeGenerationIndex: undefined,
    setActiveGenerationIndex: () => {},
    handleReset: () => {},
    pickImageFromGallery: () => Promise.resolve(false),
    addImagesToSession: () => {},
    availableSlotsInActiveGroup: 2,
    handleShare: () => Promise.resolve(),
    handleSave: () => Promise.resolve(),
    activeGenerationUris: [],
    activeMutation: undefined as unknown as ImageGenerationMutation,
    handleTattooGeneration: () => {},
    removeImageFromActiveGroup: () => {},
    resetMutations: () => {},
    cancelGeneration: () => {},
    inputControlsRef: { current: null },
    focusInput: () => {},
    blurInput: () => {},
  });

export function PlaygroundCoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation();
  const { settings, updateSettings } = React.use(AppSettingsContext);

  const [prompt, setPromptState] = React.useState("");
  const [sessionGenerations, setSessionGenerations] = React.useState<
    string[][]
  >([]);
  const [activeGenerationIndex, setActiveGenerationIndex] = React.useState<
    number | undefined
  >(undefined);

  const inputControlsRef = React.useRef<InputControlsHandle | null>(null);
  const focusInput = () => inputControlsRef.current?.focus();
  const blurInput = () => inputControlsRef.current?.blur();

  const setPrompt = (text: string) => {
    setPromptState(text);
    inputControlsRef.current?.setText(text);
  };

  // Generation mutations (extracted)
  const {
    handleTattooGeneration,
    activeMutation,
    activeGenerationUris,
    resetMutations,
    cancelGeneration,
    textToImageMutation,
    textAndImageToImageMutation,
  } = useGenerationMutations({
    sessionGenerations,
    setSessionGenerations,
    activeGenerationIndex,
    setActiveGenerationIndex,
    prompt,
    setPrompt,
    improvePrompt: settings.improvePrompt,
  });

  // --- Share & Save ---

  async function handleShare(fileUri?: string) {
    if (!fileUri || !Share) return;
    try {
      const shareResult = await Share.open({
        url: fileUri,
        message: "https://fahimanwer.com/tattooai",
      });
      if (shareResult.dismissedAction) return;
      customEvent("tattoo_shared", { source: "playground" });
    } catch (error) {
      console.error("Error sharing:", error);
      const isUserCancelledShare =
        error instanceof Error && error.message === "User did not share";
      if (!isUserCancelledShare) {
        toast.error(t("playground.shareError"), { dismissible: true });
      }
    }
  }

  async function handleSave(fileUri?: string) {
    if (!fileUri) return;
    try {
      const permission = await MediaLibrary.getPermissionsAsync();
      if (!permission.granted) {
        const requestResult = await MediaLibrary.requestPermissionsAsync();
        if (!requestResult.granted) {
          Alert.alert(
            t("playground.photoAccessTitle"),
            t("playground.photoAccessMessage"),
            [
              { text: t("common.cancel"), style: "cancel" },
              {
                text: t("common.openSettings"),
                style: "default",
                onPress: () => Linking.openURL("app-settings:"),
              },
            ]
          );
          return;
        }
      }
      const base64Image = await getCachedImageAsBase64(fileUri);
      await saveBase64ToAlbum(base64Image, "png");
      customEvent("tattoo_saved", { source: "playground" });
      toast.success(t("playground.imageSaved"), {
        dismissible: true,
        duration: 1_000,
      });
      if (!settings.hasRequestedReview) {
        setTimeout(async () => {
          try {
            const hasAction = await StoreReview.hasAction();
            if (hasAction) {
              await StoreReview.requestReview();
              await updateSettings({ hasRequestedReview: true });
            }
          } catch (error) {
            console.error("Failed to request store review:", error);
          }
        }, 1500);
      }
    } catch (error) {
      console.error("Error saving image:", error);
      toast.error(t("playground.imageSaveFailed"), {
        dismissible: true,
        duration: 2_000,
      });
    }
  }

  // --- Reset ---

  function handleReset() {
    if (sessionGenerations.length === 0) return;
    Alert.alert(
      t("playground.resetSessionTitle"),
      t("playground.resetSessionMessage"),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("playground.resetButton"),
          style: "default",
          isPreferred: true,
          onPress: async () => {
            await clearSessionCache();
            setSessionGenerations([]);
            setActiveGenerationIndex(undefined);
            textToImageMutation.reset();
            textAndImageToImageMutation.reset();
            setPrompt("");
          },
        },
      ]
    );
  }

  // --- Image picking ---

  const availableSlotsInActiveGroup = (() => {
    if (activeGenerationIndex === undefined) return 2;
    const currentGroupSize =
      sessionGenerations[activeGenerationIndex]?.length ?? 0;
    return Math.max(0, 2 - currentGroupSize);
  })();

  const pickImageFromGallery = async (options?: { selectionLimit?: number }): Promise<boolean> => {
    const effectiveLimit =
      options?.selectionLimit ??
      (availableSlotsInActiveGroup > 0 ? availableSlotsInActiveGroup : 2);

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        aspect: [3, 2],
        quality: 0.3,
        allowsMultipleSelection: effectiveLimit > 1,
        selectionLimit: effectiveLimit,
        base64: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const fileUris: string[] = [];
        for (const asset of result.assets) {
          if (asset.base64) {
            const fileUri = await cacheBase64Image(asset.base64, "png");
            fileUris.push(fileUri);
          }
        }
        if (fileUris.length === 0) {
          Alert.alert(t("common.error"), t("playground.imageDataError"));
          return false;
        }
        const canAddToActiveGroup =
          activeGenerationIndex !== undefined &&
          sessionGenerations[activeGenerationIndex].length +
            fileUris.length <=
            2;

        if (canAddToActiveGroup) {
          setSessionGenerations((prev) => {
            const newGenerations = [...prev];
            newGenerations[activeGenerationIndex!] = [
              ...newGenerations[activeGenerationIndex!],
              ...fileUris,
            ];
            return newGenerations;
          });
        } else {
          setSessionGenerations((prev) => {
            setActiveGenerationIndex(prev.length);
            return [...prev, fileUris];
          });
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert(t("common.error"), t("playground.pickImageError"));
      return false;
    }
  };

  const addImagesToSession = (imageUris: string[]) => {
    if (imageUris.length === 0) return;
    setSessionGenerations((prev) => {
      const canAddToActiveGroup =
        activeGenerationIndex !== undefined &&
        prev[activeGenerationIndex] &&
        prev[activeGenerationIndex].length + imageUris.length <= 2;

      if (canAddToActiveGroup) {
        const newGenerations = [...prev];
        newGenerations[activeGenerationIndex!] = [
          ...newGenerations[activeGenerationIndex!],
          ...imageUris,
        ];
        return newGenerations;
      } else {
        setActiveGenerationIndex(prev.length);
        return [...prev, imageUris];
      }
    });
  };

  const removeImageFromActiveGroup = (uri: string) => {
    if (activeGenerationIndex === undefined) return;
    setSessionGenerations((prev) => {
      const newGenerations = [...prev];
      const activeGroup = newGenerations[activeGenerationIndex];
      newGenerations[activeGenerationIndex] = activeGroup.filter(
        (u) => u !== uri
      );
      if (newGenerations[activeGenerationIndex].length === 0) {
        newGenerations.splice(activeGenerationIndex, 1);
        setActiveGenerationIndex(undefined);
      }
      return newGenerations;
    });
  };

  return (
    <PlaygroundCoreContext
      value={{
        prompt,
        setPrompt,
        sessionGenerations,
        setSessionGenerations,
        activeGenerationIndex,
        setActiveGenerationIndex,
        handleReset,
        pickImageFromGallery,
        addImagesToSession,
        availableSlotsInActiveGroup,
        handleShare,
        handleSave,
        activeGenerationUris,
        activeMutation,
        handleTattooGeneration,
        removeImageFromActiveGroup,
        resetMutations,
        cancelGeneration,
        inputControlsRef,
        focusInput,
        blurInput,
      }}
    >
      {children}
    </PlaygroundCoreContext>
  );
}
