import { useGradualAnimation } from "@/hooks/useGradualAnimation";
import { textToImage } from "@/lib/nano";
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
  const isFirstGeneration = sessionGenerations.length === 0;

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
        setSessionGenerations([
          ...sessionGenerations,
          `data:image/png;base64,${data.imageData}`,
        ]);
        queryClient.invalidateQueries({ queryKey: ["user", "usage"] });
      }
    },
    onError: (error) => console.log("text to image error", error),
  });

  function handlePressSuggestion(suggestionTitle: string) {
    textToImageMutation.mutate(
      `Generate a realistic ${suggestionTitle} tattoo`
    );
  }

  async function handleShare(base64Image: string) {
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

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <PlaygroundScreenHeaderRight
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
          <TextToImageResult mutation={textToImageMutation} />
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
