import { useGradualAnimation } from "@/hooks/useGradualAnimation";
import {
  textAndImageToImage,
  TextAndImageToImageInput,
  textToImage,
} from "@/lib/nano";
import { saveBase64ToAlbum } from "@/lib/save-to-library";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
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

const WIDTH = Dimensions.get("screen").width;

export function PlaygroundScreen() {
  // Hooks
  const queryClient = useQueryClient();
  const { fakeView } = useGradualAnimation();

  // State
  const [prompt, setPrompt] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [sessionGenerations, setSessionGenerations] = useState<string[]>([]); // array of images

  // Derived state
  const lastGeneration = sessionGenerations[sessionGenerations.length - 1];

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
        setSessionGenerations([
          ...sessionGenerations,
          `data:image/png;base64,${data.imageData}`,
        ]);
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
        setSessionGenerations([
          ...sessionGenerations,
          `data:image/png;base64,${data.imageData}`,
        ]);
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
    toast.info("Generating tattoo...", {
      description: "Please wait while we generate your tattoo...",
    });

    textToImageMutation.mutate(
      `Generate a realistic ${suggestionTitle} tattoo`
    );
  }

  function handleNormalTattooGeneration() {
    if (prompt.trim().length === 0) {
      toast.info("Please enter a prompt!", {});
      return;
    }

    const lastGenerationBase64 =
      sessionGenerations[sessionGenerations.length - 1];

    // Normal tattoo generation
    // Text to image generation
    if (!lastGenerationBase64) {
      textToImageMutation.mutate(prompt);
    } else {
      // Text and image to image generation
      textAndImageToImageMutation.mutate({
        prompt,
        images_base64: [lastGenerationBase64],
      });
    }
  }

  async function handleShare(base64Image: string) {
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

  async function handleSave(base64Image: string) {
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
            textToImageMutation.reset();
            setPrompt("");
          },
        },
      ]
    );
  }
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <PlaygroundScreenHeaderRight
              onReset={handleReset}
              onSave={async () => {
                await handleSave(lastGeneration);
              }}
              onShare={async () => {
                await handleShare(lastGeneration);
              }}
              isSaveDisabled={!lastGeneration}
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
              renderItem={({ item }) => (
                <SessionHistoryItem
                  uri={item}
                  onSave={() => handleSave(item)}
                  onShare={() => handleShare(item)}
                  onDelete={() => {
                    setSessionGenerations(
                      sessionGenerations.filter((_, index) => index !== index)
                    );
                  }}
                />
              )}
              keyExtractor={(item) => item}
              contentContainerStyle={{ gap: 16, paddingHorizontal: 16 }}
              horizontal
            />
          </View>
        )}

        {/* Text to image result */}
        <View style={{ flex: 1 }}>
          {!lastGeneration ? (
            <TextToImageResult mutation={textToImageMutation} />
          ) : (
            <TextToImageResult mutation={textAndImageToImageMutation} />
          )}
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
              onSubmit={handleNormalTattooGeneration}
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
