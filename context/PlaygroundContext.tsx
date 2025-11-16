import {
  textAndImageToImage,
  TextAndImageToImageInput,
  textToImage,
} from "@/lib/nano";
import { saveBase64ToAlbum } from "@/lib/save-to-library";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import * as React from "react";
import { Alert, Keyboard } from "react-native";
import Share from "react-native-share";
import { toast } from "sonner-native";

export interface PlaygroundContextValue {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  sessionGenerations: string[];
  setSessionGenerations: React.Dispatch<React.SetStateAction<string[]>>;
  activeGenerationIndex: number | undefined;
  setActiveGenerationIndex: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  handleReset: () => void;
  pickImageFromGallery: () => Promise<void>;
  handleShare: (base64Image?: string) => Promise<void>;
  handleSave: (base64Image?: string) => Promise<void>;
  activeGenerationBase64: string | undefined;
  activeMutation: any;
  handleTattooGeneration: () => void;
}

export const PlaygroundContext = React.createContext<PlaygroundContextValue>({
  prompt: "",
  setPrompt: () => {},
  sessionGenerations: [],
  setSessionGenerations: () => {},
  activeGenerationIndex: undefined,
  setActiveGenerationIndex: () => {},
  handleReset: () => {},
  pickImageFromGallery: () => Promise.resolve(),
  handleShare: () => Promise.resolve(),
  handleSave: () => Promise.resolve(),
  activeGenerationBase64: undefined,
  activeMutation: undefined,
  handleTattooGeneration: () => {},
});

export function PlaygroundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Hooks
  const queryClient = useQueryClient();

  const [prompt, setPrompt] = React.useState("");
  const [sessionGenerations, setSessionGenerations] = React.useState<string[]>(
    []
  );
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
    onSuccess: (data) => {
      if (data?.imageData) {
        const newGenerations = [
          ...sessionGenerations,
          `data:image/png;base64,${data.imageData}`,
        ];
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
   * Text to image mutation
   */
  const textAndImageToImageMutation = useMutation({
    mutationFn: async ({ prompt, images_base64 }: TextAndImageToImageInput) => {
      return textAndImageToImage({
        prompt,
        images_base64,
      });
    },
    onSuccess: (data) => {
      if (data?.imageData) {
        const newGenerations = [
          ...sessionGenerations,
          `data:image/png;base64,${data.imageData}`,
        ];
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

  function handleTattooGeneration() {
    if (prompt.trim().length === 0) {
      return;
    }

    const activeImage =
      activeGenerationIndex !== undefined
        ? sessionGenerations[activeGenerationIndex]
        : undefined;

    setPrompt("");
    Keyboard.dismiss();
    // Normal tattoo generation
    // Text to image generation
    if (!activeImage) {
      // Clear active selection when starting a fresh generation
      setActiveGenerationIndex(undefined);
      textToImageMutation.mutate(prompt);
    } else {
      // Text and image to image generation
      textAndImageToImageMutation.mutate({
        prompt,
        images_base64: [activeImage],
      });
    }
  }

  async function handleShare(base64Image?: string) {
    if (!base64Image) {
      return;
    }

    await Share.open({
      message: "Check out my tattoo design!",
      url: base64Image,
    });
  }

  async function handleSave(base64Image?: string) {
    if (!base64Image) return;
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
          onPress: () => {
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

  const pickImageFromGallery = React.useCallback(async () => {
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
          setSessionGenerations((prev) => [
            ...prev,
            `data:image/png;base64,${selectedImage.base64}`,
          ]);
          setActiveGenerationIndex(() => sessionGenerations.length);
        } else {
          Alert.alert("Error", "Failed to get image data");
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image from gallery");
    }
  }, [sessionGenerations.length]);

  // Compute the active generation base64 from the index
  const activeGenerationBase64 =
    activeGenerationIndex !== undefined
      ? sessionGenerations[activeGenerationIndex]
      : undefined;

  // Determine which mutation is currently active based on their actual states
  // If either mutation is pending, use that one. Otherwise, fall back to
  // the default logic based on whether we have a generation
  const activeMutation = textToImageMutation.isPending
    ? textToImageMutation
    : textAndImageToImageMutation.isPending
    ? textAndImageToImageMutation
    : activeGenerationBase64
    ? textAndImageToImageMutation
    : textToImageMutation;

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
        activeGenerationBase64,
        activeMutation,
        handleTattooGeneration,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
}
