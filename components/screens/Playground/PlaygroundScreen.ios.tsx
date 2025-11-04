import { HeaderButton } from "@/components/ui/HeaderButtons/HeaderButton.ios";
import { useGradualAnimation } from "@/hooks/useGradualAnimation";
import {
  textAndImageToImage,
  TextAndImageToImageInput,
  textToImage,
} from "@/lib/nano";
import { saveBase64ToAlbum } from "@/lib/save-to-library";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Keyboard,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import Share from "react-native-share";
import { toast } from "sonner-native";
import { InputControls } from "./input-controls/InputControls";
import { PlaygroundScreenHeaderRight } from "./PlaygroundScreenHeaderRight.ios";
import { SessionHistoryItem } from "./session-history/SessionHistoryItem";
import { PlaygroundSuggestions } from "./shared/suggestions/PlaygroundSuggestions";
import { TextToImageResult } from "./shared/TextToImageResult";

import * as Haptics from "expo-haptics";
const WIDTH = Dimensions.get("screen").width;

export function PlaygroundScreen() {
  // Hooks
  const queryClient = useQueryClient();
  const { fakeView } = useGradualAnimation();

  // State
  const [prompt, setPrompt] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [sessionGenerations, setSessionGenerations] = useState<string[]>([]); // array of images

  // Track the active generation by index instead of full base64 string
  const [activeGenerationIndex, setActiveGenerationIndex] = useState<
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
        toast.success("Tattoo generated successfully!", {
          description: "Your tattoo has been generated successfully!",
        });
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
        toast.success("Tattoo generated successfully!", {
          description: "Your tattoo has been generated successfully!",
        });
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

  function handlePressSuggestion(suggestionTitle: string) {
    if (textToImageMutation.isPending) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    // Clear the active selection since we're starting a fresh generation
    setActiveGenerationIndex(undefined);
    // Clear any text in the prompt input
    setPrompt("");

    /* toast.info("Generating tattoo...", {
      description: "Please wait while we generate your tattoo...",
    }); */

    textToImageMutation.mutate(
      `Generate a realistic ${suggestionTitle} tattoo`
    );
  }

  function handleTattooGeneration() {
    if (prompt.trim().length === 0) {
      toast.info("Please enter a prompt!", {});
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
      toast.info("Generating tattoo...", {
        description: "Please wait while we generate your tattoo...",
      });
      textToImageMutation.mutate(prompt);
    } else {
      toast.info("Updating tattoo...", {
        description: "Please wait while we update your tattoo...",
      });
      // Text and image to image generation
      textAndImageToImageMutation.mutate({
        prompt,
        images_base64: [activeImage],
      });
    }
  }

  async function handleShare(base64Image?: string) {
    if (!base64Image) {
      toast.info("No tattoo to share!", {
        description: "Please generate a tattoo first.",
      });
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

  function handleGoBack() {
    router.dismissTo("/(tabs)/home");
  }

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
    <>
      <Stack.Screen
        options={{
          headerTitle: "AI Tattoo Playground",
          headerLeft: () => (
            <HeaderButton
              imageProps={{ systemName: "chevron.left" }}
              buttonProps={{ onPress: handleGoBack }}
            />
          ),
          headerRight: () => (
            <PlaygroundScreenHeaderRight
              onReset={handleReset}
              onSelectImageFromGallery={async (imageBase64: string) => {
                setSessionGenerations((prev) => [
                  ...prev,
                  `data:image/png;base64,${imageBase64}`,
                ]);
                setActiveGenerationIndex(() => sessionGenerations.length);
              }}
              onSave={async () => {
                await handleSave(activeGenerationBase64);
              }}
              onShare={async () => {
                await handleShare(activeGenerationBase64);
              }}
              isSaveDisabled={!activeGenerationBase64}
            />
          ),
        }}
      />
      <View style={styles.container}>
        {/* Session generations list */}
        {sessionGenerations.length > 0 && (
          <View style={{}}>
            <FlatList
              data={sessionGenerations}
              renderItem={({ item, index }) => (
                <SessionHistoryItem
                  uri={item}
                  onSave={() => handleSave(item)}
                  onShare={() => handleShare(item)}
                  onPress={() => setActiveGenerationIndex(() => index)}
                  onDelete={() => {
                    const newGenerations = sessionGenerations.filter(
                      (_, i) => i !== index
                    );
                    setSessionGenerations(newGenerations);
                    // Update active index if needed
                    if (activeGenerationIndex === index) {
                      setActiveGenerationIndex(undefined);
                    } else if (
                      activeGenerationIndex !== undefined &&
                      activeGenerationIndex > index
                    ) {
                      setActiveGenerationIndex(activeGenerationIndex - 1);
                    }
                  }}
                  onSelect={() => setActiveGenerationIndex(index)}
                  isActive={activeGenerationIndex === index}
                />
              )}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => `${index}-${item.slice(0, 50)}`}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              horizontal
            />
          </View>
        )}

        {/* Text to image result */}
        <View style={{ flex: 1 }}>
          <TextToImageResult
            mutation={activeMutation}
            lastGenerationBase64={activeGenerationBase64}
          />
        </View>

        {!isKeyboardVisible && (
          <PlaygroundSuggestions
            onSelect={(suggestionTitle) => {
              handlePressSuggestion(suggestionTitle);
            }}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
            padding: 16,
          }}
        >
          <View style={{ width: WIDTH - 32 }}>
            <InputControls
              onChangeText={setPrompt}
              onChangeFocus={setIsKeyboardVisible}
              onSubmit={handleTattooGeneration}
              isSubmitDisabled={prompt.length === 0}
            />
          </View>
        </View>

        <Animated.View style={fakeView} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  listStyle: {
    padding: 16,
    gap: 16,
  },
  textInput: {
    color: "white",
    flexGrow: 1,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
});
