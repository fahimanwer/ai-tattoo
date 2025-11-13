import {
  textAndImageToImage,
  TextAndImageToImageInput,
  textToImage,
} from "@/lib/nano";
import { saveBase64ToAlbum } from "@/lib/save-to-library";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import Share from "react-native-share";
import { toast } from "sonner-native";
import { InputControls } from "./input-controls/InputControls";
import { SessionHistoryItem } from "./session-history/SessionHistoryItem";

import { featuredTattoos } from "@/lib/featured-tattoos";
import { playgroundEntranceHaptic } from "@/lib/haptics-patterns.ios";
import { FeaturedSuggestion } from "@/modules/animated-input/src/AnimatedInput.types";
import CoreHaptics from "@/modules/native-core-haptics";
import { Host } from "@expo/ui/swift-ui";
import * as ImagePicker from "expo-image-picker";
import { TextToImageResult } from "./shared/TextToImageResult";

export function PlaygroundScreen() {
  // Hooks
  const queryClient = useQueryClient();

  // State
  const [prompt, setPrompt] = useState("");
  const [sessionGenerations, setSessionGenerations] = useState<string[]>([]); // array of images

  // Track the active generation by index instead of full base64 string
  const [activeGenerationIndex, setActiveGenerationIndex] = useState<
    number | undefined
  >(undefined);

  // Prepare suggestions for native view
  const suggestions: FeaturedSuggestion[] = useMemo(
    () =>
      featuredTattoos.map((tattoo) => ({
        title: tattoo.title,
        imageUrl:
          (typeof tattoo.image === "object" &&
          tattoo.image !== null &&
          "uri" in tattoo.image
            ? tattoo.image.uri
            : "") || "",
      })),
    []
  );

  // Play playful entrance haptic on first load
  useEffect(() => {
    // Play the playful AI playground entrance haptic
    CoreHaptics.playPattern(playgroundEntranceHaptic).catch((error) => {
      console.error("Failed to play playground entrance haptic:", error);
    });
  }, []); // Empty dependency array means this runs once on mount

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

  function handlePressSuggestion(suggestionTitle: string) {
    // if (textToImageMutation.isPending) {
    //   Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    //   return;
    // }
    // // Clear the active selection since we're starting a fresh generation
    // setActiveGenerationIndex(undefined);
    // // Clear any text in the prompt input
    // setPrompt( `Generate a realistic ${suggestionTitle} tattoo`);
    // textToImageMutation.mutate(
    //   `Generate a realistic ${suggestionTitle} tattoo`
    // );
  }

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

  function handleGoBack() {
    router.dismissTo("/(tabs)/home");
  }

  const pickImageFromGallery = useCallback(async () => {
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
                handleGoBack();
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
            onSelectSuggestion={handlePressSuggestion}
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
