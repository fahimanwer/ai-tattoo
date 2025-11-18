import {
  cacheBase64Image,
  clearSessionCache,
  getCachedImageAsBase64,
} from "@/lib/image-cache";
import {
  textAndImageToImage,
  TextAndImageToImageInput,
  TextAndImageToImageResponse,
  textToImage,
  TextToImageResponse,
} from "@/lib/nano";
import { saveBase64ToAlbum } from "@/lib/save-to-library";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import * as React from "react";
import { Alert, Keyboard, Platform } from "react-native";
import { toast } from "sonner-native";

// Conditionally import react-native-share only on native platforms
let Share: any = null;
if (Platform.OS !== "web") {
  Share = require("react-native-share").default;
}

// Union type that accepts either mutation type
export type ImageGenerationMutation =
  | UseMutationResult<TextToImageResponse | undefined, Error, string, unknown>
  | UseMutationResult<
      TextAndImageToImageResponse | undefined,
      Error,
      any,
      unknown
    >;

export interface PlaygroundContextValue {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  sessionGenerations: string[][]; // Array of image groups (each group is an array of URIs)
  setSessionGenerations: React.Dispatch<React.SetStateAction<string[][]>>;
  activeGenerationIndex: number | undefined;
  setActiveGenerationIndex: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  handleReset: () => void;
  pickImageFromGallery: () => Promise<boolean>;
  handleShare: (fileUri?: string) => Promise<void>;
  handleSave: (fileUri?: string) => Promise<void>;
  activeGenerationUris: string[]; // Array of file URIs in the active group
  activeMutation: ImageGenerationMutation;
  handleTattooGeneration: () => void;
  removeImageFromActiveGroup: (uri: string) => void;
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
  handleShare: () => Promise.resolve(),
  handleSave: () => Promise.resolve(),
  activeGenerationUris: [],
  activeMutation: undefined as unknown as ImageGenerationMutation,
  handleTattooGeneration: () => {},
  removeImageFromActiveGroup: () => {},
});

export function PlaygroundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Hooks
  const queryClient = useQueryClient();

  const [prompt, setPrompt] = React.useState("");
  const [sessionGenerations, setSessionGenerations] = React.useState<
    string[][]
  >([]);
  const [activeGenerationIndex, setActiveGenerationIndex] = React.useState<
    number | undefined
  >(undefined);

  /**
   * Text to image mutation
   */
  const textToImageMutation = useMutation({
    mutationFn: async (prompt: string) => {
      return textToImage({
        prompt: prompt,
      });
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
      }
    },
    onError: (error) => {
      toast.error("Failed to generate tattoo!", {
        dismissible: true,
        duration: 5000,
      });
    },
  });

  /**
   * Text and image to image mutation
   */
  const textAndImageToImageMutation = useMutation({
    mutationFn: async ({ prompt, images_base64 }: TextAndImageToImageInput) => {
      return textAndImageToImage({
        prompt,
        images_base64,
      });
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
      }
    },
    onError: (error) => {
      toast.error("Failed to generate tattoo!", {
        dismissible: true,
        duration: 5000,
      });
    },
  });

  async function handleTattooGeneration() {
    if (prompt.trim().length === 0) {
      return;
    }

    const activeImageGroup =
      activeGenerationIndex !== undefined
        ? sessionGenerations[activeGenerationIndex]
        : undefined;

    setPrompt("");
    Keyboard.dismiss();

    // Normal tattoo generation
    // Text to image generation
    if (!activeImageGroup || activeImageGroup.length === 0) {
      // Clear active selection when starting a fresh generation
      setActiveGenerationIndex(undefined);
      textToImageMutation.mutate(prompt);
    } else {
      // Text and image to image generation
      // Convert all file URIs in the group back to base64 for the API call
      const base64Images = await Promise.all(
        activeImageGroup.map((uri) => getCachedImageAsBase64(uri))
      );
      textAndImageToImageMutation.mutate({
        prompt,
        images_base64: base64Images,
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

      const shareResult = await Share.open({
        message: "Check out my tattoo design!",
        url: base64Image,
      });

      if (shareResult.dismissedAction) {
        return;
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  }

  async function handleSave(fileUri?: string) {
    if (!fileUri) return;

    // Convert file URI to base64 for saving
    const base64Image = await getCachedImageAsBase64(fileUri);
    await saveBase64ToAlbum(base64Image, "png");

    Alert.alert(
      "Saved!",
      "Your tattoo design has been saved to your photo gallery."
    );
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

  /**
   * Pick image from gallery
   * return false if the user cancels the picker
   * return true if the user selects an image
   * return false if there is an error
   */
  const pickImageFromGallery = React.useCallback(async (): Promise<boolean> => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        aspect: [3, 2],
        quality: 0.3,
        allowsMultipleSelection: false,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const selectedImage = result.assets[0];
        if (selectedImage.base64) {
          // Cache the selected image and store the file URI
          const fileUri = await cacheBase64Image(selectedImage.base64, "png");

          // If there's an active group, add to it
          if (activeGenerationIndex !== undefined) {
            setSessionGenerations((prev) => {
              const newGenerations = [...prev];
              newGenerations[activeGenerationIndex] = [
                ...newGenerations[activeGenerationIndex],
                fileUri,
              ];
              return newGenerations;
            });
          } else {
            // Create a new group with this image
            setSessionGenerations((prev) => [...prev, [fileUri]]);
            setActiveGenerationIndex(sessionGenerations.length);
          }
          return true;
        } else {
          Alert.alert("Error", "Failed to get image data");
          return false;
        }
      }
      return false;
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image from gallery");
      return false;
    }
  }, [activeGenerationIndex, sessionGenerations.length]);

  // Compute the active generation URIs from the index
  const activeGenerationUris =
    activeGenerationIndex !== undefined
      ? sessionGenerations[activeGenerationIndex] || []
      : [];

  // Determine which mutation is currently active based on their actual states
  // If either mutation is pending, use that one. Otherwise, fall back to
  // the default logic based on whether we have a generation
  const activeMutation = textToImageMutation.isPending
    ? textToImageMutation
    : textAndImageToImageMutation.isPending
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
        handleShare,
        handleSave,
        activeGenerationUris,
        activeMutation,
        handleTattooGeneration,
        removeImageFromActiveGroup,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
}
