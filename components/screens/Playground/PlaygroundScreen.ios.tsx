import { router, Stack } from "expo-router";
import { use, useEffect } from "react";
import {
  Alert,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { InputControls } from "./input-controls/InputControls";
import { SessionHistoryItem } from "./session-history/SessionHistoryItem";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { Color } from "@/constants/TWPalette";
import { PlaygroundContext } from "@/context/PlaygroundContext";
import { FeaturedTattoo, featuredTattoos } from "@/lib/featured-tattoos";
import { playgroundEntranceHaptic } from "@/lib/haptics-patterns.ios";
import { FeaturedSuggestion } from "@/modules/animated-input/src/AnimatedInput.types";
import CoreHaptics from "@/modules/native-core-haptics";
import { Host } from "@expo/ui/swift-ui";
import { GlassView } from "expo-glass-effect";
import * as Haptics from "expo-haptics";
import { SymbolView } from "expo-symbols";
import { PressableScale } from "pressto";
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
    activeGenerationUris,
    activeMutation,
    handleTattooGeneration,
    removeImageFromActiveGroup,
  } = use(PlaygroundContext);

  // Play playful entrance haptic on first load
  useEffect(() => {
    // Play the playful AI playground entrance haptic
    CoreHaptics.playPattern(playgroundEntranceHaptic).catch((error) => {
      console.error("Failed to play playground entrance haptic:", error);
    });
  }, []); // Empty dependency array means this runs once on mount

  function dismissToHome() {
    if (router.canGoBack()) {
      router.dismissAll();
    } else {
      router.replace("/(tabs)/(home)");
    }
  }
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
              onPress: () => {
                if (sessionGenerations.length > 0) {
                  Alert.alert(
                    "Clear Everything?",
                    "You're about to clear this session. This will remove all generated tattoos. Save anything you want to keep before continuing.",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Clear Everything",
                        style: "destructive",
                        isPreferred: true,
                        onPress: () => {
                          setSessionGenerations([]);
                          setActiveGenerationIndex(undefined);
                          setPrompt("");
                          dismissToHome();
                        },
                      },
                    ]
                  );
                } else {
                  dismissToHome();
                }
              },
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
              type: "menu",
              icon: {
                name: "ellipsis",
                type: "sfSymbol",
              },
              label: "Actions",
              menu: {
                title: "Actions",
                items: [
                  {
                    type: "action",
                    label: "Reset Session",
                    icon: {
                      name: "arrow.counterclockwise",
                      type: "sfSymbol",
                    },
                    destructive: true,
                    onPress: handleReset,
                    disabled: sessionGenerations.length === 0,
                    selected: false,
                  },
                  {
                    type: "action",
                    label: "Pick Image",
                    icon: {
                      name: "photo.on.rectangle",
                      type: "sfSymbol",
                    },
                    onPress: pickImageFromGallery,
                    selected: false,
                  },
                  {
                    type: "action",
                    label: "Take Photo",
                    icon: {
                      name: "camera",
                      type: "sfSymbol",
                    },
                    onPress: () => router.dismissTo("/camera-view"),
                    selected: false,
                  },
                ],
              },
            },

            {
              type: "button",
              label: "Share",
              icon: {
                name: "square.and.arrow.up",
                type: "sfSymbol",
              },
              onPress: async () => {
                // Share the first image in the active group
                if (activeGenerationUris.length > 0) {
                  await handleShare(activeGenerationUris[0]);
                }
              },
              selected: false,
              disabled: activeGenerationUris.length === 0,
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
                // Save the first image in the active group
                if (activeGenerationUris.length > 0) {
                  await handleSave(activeGenerationUris[0]);
                }
              },
              disabled: activeGenerationUris.length === 0,
              selected: false,
            },
          ],
        }}
      />
      <View style={styles.container}>
        {/* Session generations list */}
        {sessionGenerations.length > 0 && (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderWidth: 1,
                paddingHorizontal: 16,
              }}
            >
              <Text type="sm" weight="bold">
                Your Generations
              </Text>
              <PressableScale onPress={handleReset}>
                <Text type="sm">Clear All</Text>
              </PressableScale>
            </View>
            <FlatList
              data={sessionGenerations}
              renderItem={({ item: imageGroup, index }) => (
                <SessionHistoryItem
                  uri={imageGroup[0]} // Show first image of the group
                  imageCount={imageGroup.length}
                  onSave={() => handleSave(imageGroup[0])}
                  onShare={() => handleShare(imageGroup[0])}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    setActiveGenerationIndex(() => index);
                  }}
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
              keyExtractor={(item, index) =>
                `generation-${index}-${item[0] || ""}`
              }
              contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
              // Performance optimizations
              getItemLayout={(_, index) => ({
                length: 50,
                offset: 50 * index + 16 * index, // item width + gap
                index,
              })}
              removeClippedSubviews={true}
              maxToRenderPerBatch={10}
              windowSize={5}
              initialNumToRender={10}
              ListFooterComponentStyle={{
                justifyContent: "center",
              }}
              ListFooterComponent={() => (
                <PressableScale
                  onPress={() => {
                    setActiveGenerationIndex(undefined);
                  }}
                >
                  <GlassView
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 25,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    isInteractive
                  >
                    <SymbolView name={"plus"} size={30} tintColor="white" />
                  </GlassView>
                </PressableScale>
              )}
              horizontal
            />
          </View>
        )}

        {/* Text to image result */}
        <View style={{ flex: 1 }}>
          {sessionGenerations.length > 0 ? (
            <Text
              type="sm"
              style={{ paddingHorizontal: 16, paddingBottom: 4 }}
              darkColor={Color.zinc[400]}
            >
              {activeGenerationIndex !== undefined
                ? "Mode: Editing - your prompt will modify this image"
                : "Mode: New Design - your prompt will create a new tattoo"}
            </Text>
          ) : null}
          <TextToImageResult
            mutation={activeMutation}
            lastGenerationUris={activeGenerationUris}
            onRemoveImage={removeImageFromActiveGroup}
          />
        </View>

        {activeGenerationUris.length >= 2 ? (
          <View style={{ paddingBottom: 100, paddingHorizontal: 16, gap: 16 }}>
            <Text style={{ textAlign: "center" }}>
              You&apos;ve selected 2 images! You can now combine them to see how
              a tattoo would look on your body.
            </Text>

            <Text
              type="sm"
              style={{ textAlign: "center" }}
              darkColor={Color.zinc[400]}
            >
              For the best results, use a photo of a body part that matches the
              example you selected. Our tattoo examples already include specific
              body parts, so using a similar angle and area in your own photo
              will create more accurate and realistic results. Make sure the
              body part is clean, uncovered, and clearly visible.
            </Text>
            <Button
              title="Combine Images"
              onPress={handleTattooGeneration}
              color="yellow"
              variant="solid"
              loading={activeMutation.isPending}
              disabled={activeMutation.isPending}
            />
          </View>
        ) : (
          <Host
            style={{
              height: activeMutation.isError ? "70%" : "90%",
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
        )}
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
