import { promptToCombineTwoImages } from "@/lib/featured-tattoos";
import {
  cacheBase64Image,
  clearSessionCache,
  getCachedImageAsBase64,
} from "@/lib/image-cache";
import { clog } from "@/lib/log";
import {
  textAndImageToImage,
  TextAndImageToImageInput,
  TextAndImageToImageResponse,
  textToImage,
  TextToImageInput,
  TextToImageResponse,
} from "@/lib/nano";
import { saveBase64ToAlbum } from "@/lib/save-to-library";
import Share from "@/patches/rn-share-re-export";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as StoreReview from "expo-store-review";
import * as React from "react";
import { Alert, Keyboard, Linking } from "react-native";
import Purchases from "react-native-purchases";
import { toast } from "sonner-native";
import { customEvent } from "vexo-analytics";
import { AppSettingsContext } from "./AppSettings";

// Union type that accepts either mutation type
export type ImageGenerationMutation =
  | UseMutationResult<TextToImageResponse | undefined, Error, string, unknown>
  | UseMutationResult<
      TextAndImageToImageResponse | undefined,
      Error,
      any,
      unknown
    >;

export interface InputControlsHandle {
  focus: () => void;
  blur: () => void;
  setText: (text: string) => void;
}

export interface PlaygroundContextValue {
  prompt: string;
  setPrompt: (text: string) => void;
  sessionGenerations: string[][]; // Array of image groups (each group is an array of URIs)
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
  availableSlotsInActiveGroup: number; // How many more images can be added (0, 1, or 2)
  handleShare: (fileUri?: string) => Promise<void>;
  handleSave: (fileUri?: string) => Promise<void>;
  activeGenerationUris: string[]; // Array of file URIs in the active group
  activeMutation: ImageGenerationMutation;
  handleTattooGeneration: () => void;
  removeImageFromActiveGroup: (uri: string) => void;
  resetMutations: () => void;
  cancelGeneration: () => void; // Cancel any in-progress generation
  // Input controls
  inputControlsRef: React.RefObject<InputControlsHandle | null>;
  focusInput: () => void;
  blurInput: () => void;
}

export const PlaygroundContext = React.createContext<PlaygroundContextValue>({
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

export function PlaygroundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Hooks
  const queryClient = useQueryClient();
  const { settings, updateSettings } = React.use(AppSettingsContext);
  const [prompt, setPromptState] = React.useState("");
  const [sessionGenerations, setSessionGenerations] = React.useState<
    string[][]
  >([]);
  const [activeGenerationIndex, setActiveGenerationIndex] = React.useState<
    number | undefined
  >(undefined);

  // Input controls ref for focus/blur from anywhere
  const inputControlsRef = React.useRef<InputControlsHandle | null>(null);
  const focusInput = React.useCallback(
    () => inputControlsRef.current?.focus(),
    []
  );
  const blurInput = React.useCallback(
    () => inputControlsRef.current?.blur(),
    []
  );

  // AbortController for canceling in-progress generations
  const abortControllerRef = React.useRef<AbortController | null>(null);

  // Combined setter that updates both state and the text field ref
  const setPrompt = React.useCallback((text: string) => {
    setPromptState(text);
    inputControlsRef.current?.setText(text);
  }, []);

  /**
   * Text to image mutation
   */
  const textToImageMutation = useMutation({
    mutationFn: async ({
      prompt,
      improvePrompt = settings.improvePrompt ?? true,
      signal,
    }: TextToImageInput & { signal?: AbortSignal }) => {
      // Get RevenueCat user ID for accurate usage tracking
      let revenuecatUserId: string | undefined;
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        revenuecatUserId = customerInfo.originalAppUserId;
      } catch {
        // Continue without RC ID (backwards compatibility)
      }

      return textToImage(
        {
          prompt,
          improvePrompt,
          revenuecatUserId,
        },
        signal
      );
    },
    onSuccess: async (data) => {
      if (data?.imageData) {
        // Cache the image to disk and store only the file URI
        const fileUri = await cacheBase64Image(data.imageData, "png");
        // Create a new group with a single image
        const newGenerations = [...sessionGenerations, [fileUri]];
        setSessionGenerations(newGenerations);
        setActiveGenerationIndex(newGenerations.length - 1);
        queryClient.invalidateQueries({ queryKey: ["user", "usage"] });

        customEvent("generation_completed", {
          type: "text_to_image",
          success: true,
        });
      }
    },
    onError: (error) => {
      if (error.name === "AbortError") {
        customEvent("generation_aborted", {
          type: "text_to_image",
          error: error.message,
        });
        clog("PlaygroundContext", "Generation aborted", {
          error: error.message,
        });
        return;
      }
      customEvent("generation_failed", {
        type: "text_to_image",
        error: error.message,
      });
    },
  });

  /**
   * Text and image to image mutation
   */
  const textAndImageToImageMutation = useMutation({
    mutationFn: async ({
      prompt,
      images_base64,
      improvePrompt,
      signal,
    }: TextAndImageToImageInput & { signal?: AbortSignal }) => {
      // Get RevenueCat user ID for accurate usage tracking
      let revenuecatUserId: string | undefined;
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        revenuecatUserId = customerInfo.originalAppUserId;
      } catch {
        // Continue without RC ID (backwards compatibility)
      }

      return textAndImageToImage(
        {
          prompt,
          images_base64,
          improvePrompt,
          revenuecatUserId,
        },
        signal
      );
    },
    onSuccess: async (data) => {
      if (data?.imageData) {
        // Cache the image to disk and store only the file URI
        const fileUri = await cacheBase64Image(data.imageData, "png");
        // Create a new group with a single image
        const newGenerations = [...sessionGenerations, [fileUri]];
        setSessionGenerations(newGenerations);
        setActiveGenerationIndex(newGenerations.length - 1);
        queryClient.invalidateQueries({ queryKey: ["user", "usage"] });

        customEvent("generation_completed", {
          type: "image_to_image",
          success: true,
        });
      }
    },
    onError: (error) => {
      // Don't show error toast for aborted requests
      if (error.name === "AbortError") {
        return;
      }
      customEvent("generation_failed", {
        type: "image_to_image",
        error: error.message,
      });
    },
  });

  async function handleTattooGeneration() {
    // allow passing this validation when there are 2 images selected
    if (prompt.trim().length === 0 && activeGenerationUris?.length !== 2) {
      return;
    }

    const activeImageGroup =
      activeGenerationIndex !== undefined
        ? sessionGenerations[activeGenerationIndex]
        : undefined;

    const isTextToImage = !activeImageGroup || activeImageGroup.length === 0;

    setPrompt("");
    Keyboard.dismiss();

    // Cancel any in-progress generation and create a new AbortController
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    // Normal tattoo generation
    // Text to image generation
    if (isTextToImage) {
      customEvent("generation_started", {
        type: "text_to_image",
        promptLength: prompt.length,
        imageCount: 0,
        improvePrompt: settings.improvePrompt ?? true,
      });
      // Clear active selection when starting a fresh generation
      setActiveGenerationIndex(undefined);
      textToImageMutation.mutate({
        prompt,
        improvePrompt: settings.improvePrompt,
        signal,
      });
    } else {
      customEvent("generation_started", {
        type: "image_to_image",
        promptLength: prompt.length,
        imageCount: activeImageGroup.length,
        improvePrompt: settings.improvePrompt ?? true,
      });
      // Use our custome prompt to combine two images
      const promptToUse =
        activeImageGroup.length === 2 ? promptToCombineTwoImages : prompt;

      // Text and image to image generation
      // Convert all file URIs in the group back to base64 for the API call
      const base64Images = await Promise.all(
        activeImageGroup.map((uri) => getCachedImageAsBase64(uri))
      );
      textAndImageToImageMutation.mutate({
        prompt: promptToUse,
        signal,
        images_base64: base64Images,
        improvePrompt: settings.improvePrompt,
      });
    }
  }

  async function handleShare(fileUri?: string) {
    if (!fileUri || !Share) {
      return;
    }

    try {
      // Convert file URI to base64 for sharing
      const base64Image = await getCachedImageAsBase64(fileUri);
      const appStoreUrl =
        "https://apps.apple.com/us/app/ai-tattoo-try-on/id6751748193";

      const shareResult = await Share.open({
        message: `I just got tattooed! Check out this photo \n🎨 Try it yourself: ${appStoreUrl}`,
        url: base64Image,
      });

      if (shareResult.dismissedAction) {
        return;
      }

      customEvent("tattoo_shared", {
        source: "playground",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  }

  async function handleSave(fileUri?: string) {
    if (!fileUri) return;

    try {
      // Check permissions first
      const permission = await MediaLibrary.getPermissionsAsync();

      if (!permission.granted) {
        // Request permission if not granted
        const requestResult = await MediaLibrary.requestPermissionsAsync();

        if (!requestResult.granted) {
          // Permission denied - show alert with option to open settings
          Alert.alert(
            "Photo Access Needed",
            "To save images to your gallery, we need access to your photos. You can enable this in Settings.",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Open Settings",
                style: "default",
                onPress: () => {
                  Linking.openURL("app-settings:");
                },
              },
            ]
          );
          return;
        }
      }

      // Convert file URI to base64 for saving
      const base64Image = await getCachedImageAsBase64(fileUri);
      await saveBase64ToAlbum(base64Image, "png");

      customEvent("tattoo_saved", {
        source: "playground",
      });

      toast.success("Image saved to gallery!", {
        dismissible: true,
        duration: 1_000,
      });

      // Request store review after first save (only once ever)
      if (!settings.hasRequestedReview) {
        // Delay to let user see the success toast first
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
      toast.error("Failed to save image. Please try again.", {
        dismissible: true,
        duration: 2_000,
      });
    }
  }

  function handleReset() {
    if (sessionGenerations.length === 0) return;
    Alert.alert(
      "Reset Session?",
      "Are you sure you want to reset the session? This will clear all generated tattoos and start a new session.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "default",
          isPreferred: true,
          onPress: async () => {
            // Clear cached images from file system
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

  // Calculate how many more images can be added to the active group
  const availableSlotsInActiveGroup = React.useMemo(() => {
    if (activeGenerationIndex === undefined) return 2; // No active group, can select 2
    const currentGroupSize =
      sessionGenerations[activeGenerationIndex]?.length ?? 0;
    return Math.max(0, 2 - currentGroupSize);
  }, [activeGenerationIndex, sessionGenerations]);

  /**
   * Pick image(s) from gallery
   * @param options.selectionLimit - Override max number of images to select
   *   If not provided, automatically calculates based on active group:
   *   - If active group has room, limits to available slots
   *   - If no active group or group is full, allows 2 (creates new group)
   * @returns false if the user cancels the picker, true if images were selected
   */
  const pickImageFromGallery = React.useCallback(
    async (options?: { selectionLimit?: number }): Promise<boolean> => {
      // If there's room in active group, limit to that; otherwise allow 2 for new group
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
          // Cache all selected images and collect their URIs
          const fileUris: string[] = [];
          for (const asset of result.assets) {
            if (asset.base64) {
              const fileUri = await cacheBase64Image(asset.base64, "png");
              fileUris.push(fileUri);
            }
          }

          if (fileUris.length === 0) {
            Alert.alert("Error", "Failed to get image data");
            return false;
          }

          // Check if we can add to the active group
          const canAddToActiveGroup =
            activeGenerationIndex !== undefined &&
            sessionGenerations[activeGenerationIndex].length +
              fileUris.length <=
              2;

          if (canAddToActiveGroup) {
            // Add to existing group
            setSessionGenerations((prev) => {
              const newGenerations = [...prev];
              newGenerations[activeGenerationIndex!] = [
                ...newGenerations[activeGenerationIndex!],
                ...fileUris,
              ];
              return newGenerations;
            });
          } else {
            // Create a new group with all selected images
            setSessionGenerations((prev) => [...prev, fileUris]);
            setActiveGenerationIndex(sessionGenerations.length);
          }
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error picking image:", error);
        Alert.alert("Error", "Failed to pick image from gallery");
        return false;
      }
    },
    [sessionGenerations, activeGenerationIndex, availableSlotsInActiveGroup]
  );

  /**
   * Add images to session from external sources (like the sheet picker)
   * If there's room in the active group, adds there; otherwise creates a new group
   */
  const addImagesToSession = React.useCallback(
    (imageUris: string[]) => {
      if (imageUris.length === 0) return;

      // Use setSessionGenerations with functional update to get the actual current state
      setSessionGenerations((prev) => {
        // Check if we can add to the active group using actual current state
        const canAddToActiveGroup =
          activeGenerationIndex !== undefined &&
          prev[activeGenerationIndex] &&
          prev[activeGenerationIndex].length + imageUris.length <= 2;

        if (canAddToActiveGroup) {
          // Add to existing group - keep the same active index
          const newGenerations = [...prev];
          newGenerations[activeGenerationIndex!] = [
            ...newGenerations[activeGenerationIndex!],
            ...imageUris,
          ];
          return newGenerations;
        } else {
          // Create a new group at the end and set it as active
          // Use prev.length as the new index (this is the actual current length)
          setActiveGenerationIndex(prev.length);
          return [...prev, imageUris];
        }
      });
    },
    [activeGenerationIndex]
  );

  // Compute the active generation URIs from the index
  const activeGenerationUris =
    activeGenerationIndex !== undefined
      ? sessionGenerations[activeGenerationIndex] || []
      : [];

  // Determine which mutation is currently active based on their actual states
  // Priority: pending > error > success
  // If either mutation is pending, use that one.
  // If either has error, show the error (important for LIMIT_REACHED handling).
  // If either has success, use that.
  // Otherwise, fall back to the default logic based on whether we have a generation
  const activeMutation = textToImageMutation.isPending
    ? textToImageMutation
    : textAndImageToImageMutation.isPending
    ? textAndImageToImageMutation
    : textToImageMutation.isError
    ? textToImageMutation
    : textAndImageToImageMutation.isError
    ? textAndImageToImageMutation
    : textToImageMutation.isSuccess
    ? textToImageMutation
    : textAndImageToImageMutation.isSuccess
    ? textAndImageToImageMutation
    : activeGenerationUris.length > 0
    ? textAndImageToImageMutation
    : textToImageMutation;

  // Function to remove an image from the active group
  const removeImageFromActiveGroup = React.useCallback(
    (uri: string) => {
      if (activeGenerationIndex === undefined) return;

      setSessionGenerations((prev) => {
        const newGenerations = [...prev];
        const activeGroup = newGenerations[activeGenerationIndex];
        newGenerations[activeGenerationIndex] = activeGroup.filter(
          (u) => u !== uri
        );

        // If the group is now empty, remove it entirely
        if (newGenerations[activeGenerationIndex].length === 0) {
          newGenerations.splice(activeGenerationIndex, 1);
          setActiveGenerationIndex(undefined);
        }

        return newGenerations;
      });
    },
    [activeGenerationIndex]
  );

  // Function to reset mutations (useful when usage status changes)
  const resetMutations = React.useCallback(() => {
    textToImageMutation.reset();
    textAndImageToImageMutation.reset();
  }, [textToImageMutation, textAndImageToImageMutation]);

  // Cancel any in-progress generation (useful when leaving screen)
  const cancelGeneration = React.useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    textToImageMutation.reset();
    textAndImageToImageMutation.reset();
  }, [textToImageMutation, textAndImageToImageMutation]);

  return (
    <PlaygroundContext.Provider
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
    </PlaygroundContext.Provider>
  );
}
