import { useGradualAnimation } from "@/hooks/useGradualAnimation";
import { textToImage } from "@/lib/nano";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { InputControls } from "./input-controls/InputControls";
import { PlaygroundScreenHeaderRight } from "./PlaygroundScreenHeaderRight.ios";
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

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <PlaygroundScreenHeaderRight
              onSave={() => {}}
              onShare={() => {}}
              isSaveDisabled={!lastGeneration}
            />
          ),
        }}
      />
      <View style={styles.container}>
        {/* Text to image result */}
        <TextToImageResult mutation={textToImageMutation} />

        {!isKeyboardVisible && (
          <PlaygroundSuggestions
            onSelect={(suggestionTitle) => {
              console.log("suggestion selected", suggestionTitle);
              setPrompt(suggestionTitle);
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
