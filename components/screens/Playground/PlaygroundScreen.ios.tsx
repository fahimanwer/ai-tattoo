import { router, Stack } from "expo-router";
import { use, useEffect } from "react";
import { FlatList, Platform, StatusBar, StyleSheet, View } from "react-native";
import { InputControls } from "./input-controls/InputControls";
import { SessionHistoryItem } from "./session-history/SessionHistoryItem";

import { PlaygroundContext } from "@/context/PlaygroundContext";
import { FeaturedTattoo, featuredTattoos } from "@/lib/featured-tattoos";
import { playgroundEntranceHaptic } from "@/lib/haptics-patterns.ios";
import { FeaturedSuggestion } from "@/modules/animated-input/src/AnimatedInput.types";
import CoreHaptics from "@/modules/native-core-haptics";
import { Host } from "@expo/ui/swift-ui";
import { TextToImageResult } from "./shared/TextToImageResult";

// Prepare suggestions for native view
const suggestions = formattedSuggestions(featuredTattoos);

function formattedSuggestions(tattoos: FeaturedTattoo[]) {
  let suggestions: FeaturedSuggestion[] = [];

  for (const tattoo of tattoos) {
    suggestions.push({
      title: tattoo.title,
      imageUrl:
        (typeof tattoo.image === "object" &&
        tattoo.image !== null &&
        "uri" in tattoo.image
          ? tattoo.image.uri
          : "") || "",
    });
  }
  return suggestions;
}

export function PlaygroundScreen() {
  const {
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
  } = use(PlaygroundContext);

  // Play playful entrance haptic on first load
  useEffect(() => {
    // Play the playful AI playground entrance haptic
    CoreHaptics.playPattern(playgroundEntranceHaptic).catch((error) => {
      console.error("Failed to play playground entrance haptic:", error);
    });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          gestureEnabled: false,
          unstable_headerLeftItems: (props) => [
            {
              type: "button",
              onPress: () => router.dismissAll(),
              label: "Go Back",
              icon: {
                name: "xmark",
                type: "sfSymbol",
              },
              selected: false,
            },
          ],
          unstable_headerRightItems: (props) => [
            {
              type: "button",
              label: "Reset",
              icon: {
                name: "arrow.counterclockwise",
                type: "sfSymbol",
              },
              onPress: handleReset,
              disabled: sessionGenerations.length === 0,
              selected: false,
            },
            {
              type: "button",
              label: "Pick Image",
              disabled: sessionGenerations.length === 0,
              icon: {
                name: "photo.on.rectangle",
                type: "sfSymbol",
              },
              onPress: pickImageFromGallery,
              selected: false,
            },
            {
              type: "button",
              label: "Share",
              icon: {
                name: "square.and.arrow.up",
                type: "sfSymbol",
              },
              onPress: async () => {
                await handleShare(activeGenerationBase64);
              },
              selected: false,
              disabled: !activeGenerationBase64,
            },
            {
              type: "button",
              label: "Save",
              variant: "prominent",
              tintColor: "yellow",
              labelStyle: {
                fontWeight: "bold",
              },
              onPress: async () => {
                await handleSave(activeGenerationBase64);
              },
              disabled: !activeGenerationBase64,
              selected: false,
            },
          ],
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

        <Host
          style={{
            height: "90%",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <InputControls
            onChangeText={setPrompt}
            onPressImageGallery={pickImageFromGallery}
            onSubmit={handleTattooGeneration}
            onSelectSuggestion={() => {}}
            isSubmitDisabled={prompt.length === 0}
            suggestions={suggestions}
          />
        </Host>
        {/* <View
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
        </View> */}

        {/* <Animated.View style={fakeView} /> */}
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
