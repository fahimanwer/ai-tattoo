import { useGradualAnimation } from "@/hooks/useGradualAnimation";
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
import { InputControls } from "./InputControls";
import { PlaygroundScreenHeaderRight } from "./PlaygroundScreenHeaderRight.ios";
import { AnimatedText } from "./shared/AnimatedText";

const WIDTH = Dimensions.get("screen").width;

export function PlaygroundScreen() {
  const { fakeView } = useGradualAnimation();
  const [prompt, setPrompt] = useState("");
  const [sessionGenerations, setSessionGenerations] = useState<string[]>([]); // array of images
  const lastGeneration = sessionGenerations[sessionGenerations.length - 1];
  const isFirstGeneration = sessionGenerations.length === 0;

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
        <View style={{ flex: 1 }}>
          <AnimatedText text="Describe your tattoo or choose a suggestion below" />
          {/* <AnimatedText text="Generating your tattoo..." /> */}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
            padding: 16,
          }}
        >
          <View style={{ width: WIDTH - 32 }}>
            <InputControls autoFocus onChangeText={setPrompt} />
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
