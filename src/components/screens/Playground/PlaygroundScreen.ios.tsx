import { router, Stack, useLocalSearchParams } from "expo-router";
import { Activity, use, useEffect, useRef } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";

import { authClient } from "@/lib/auth-client";
import { playgroundEntranceHaptic } from "@/lib/haptics-patterns.ios";
import CoreHaptics from "@/modules/native-core-haptics";
import { Button } from "@/src/components/ui/Button";
import { Text } from "@/src/components/ui/Text";
import { PlaygroundContext } from "@/src/context/PlaygroundContext";
import * as Haptics from "expo-haptics";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scheduleOnRN } from "react-native-worklets";
import { InputControls } from "./input-controls/InputControls";
import { SessionHistoryList } from "./session-history/SessionHistoryList";
import { TextToImageResult } from "./shared/TextToImageResult";

export function PlaygroundScreen() {
  const { data: session, isPending, isRefetching } = authClient.useSession();
  const isAuthenticated = session?.user !== undefined;
  const isLoading = isPending || isRefetching;
  const params = useLocalSearchParams<{ mode?: string }>();
  const hasHandledMode = useRef(false);

  const {
    prompt,
    setPrompt,
    sessionGenerations,
    setSessionGenerations,
    activeGenerationIndex,
    setActiveGenerationIndex,
    pickImageFromGallery,
    handleShare,
    handleSave,
    activeGenerationUris,
    activeMutation,
    handleTattooGeneration,
    focusInput,
    blurInput,
  } = use(PlaygroundContext);

  const { bottom } = useSafeAreaInsets();

  // Play playful entrance haptic on first load
  useEffect(() => {
    // Play the playful AI playground entrance haptic
    CoreHaptics.playPattern(playgroundEntranceHaptic).catch((error) => {
      console.error("Failed to play playground entrance haptic:", error);
    });
  }, []); // Empty dependency array means this runs once on mount

  // Handle mode parameter for quick actions
  useEffect(() => {
    if (hasHandledMode.current || !isAuthenticated || isLoading) return;

    const mode = params.mode;
    if (mode === "preview") {
      hasHandledMode.current = true;
      // Navigate directly to camera for preview mode
      setTimeout(() => {
        router.push("/(playground)/camera-view");
      }, 300);
    } else if (mode === "edit") {
      hasHandledMode.current = true;
      // OPEn gallery for edit mode
      setTimeout(() => {
        pickImageFromGallery();
      }, 300);
    }
  }, [params.mode, isAuthenticated, isLoading, pickImageFromGallery]);

  function dismissToHome() {
    if (router.canGoBack()) {
      router.dismissAll();
    } else {
      router.replace("/(tabs)/(home)");
    }
  }

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1, marginBottom: 100 }} />;
  }

  const handleHaptic = () =>
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

  const panGesture = Gesture.Pan().onEnd((e) => {
    // check if swiping down or up
    if (e.translationY > 0) {
      // swiping down - dismiss keyboard
      scheduleOnRN(blurInput);
      scheduleOnRN(handleHaptic);
    } else {
      // swiping up - focus input
      scheduleOnRN(focusInput);
      scheduleOnRN(handleHaptic);
    }
  });

  const tapGesture = Gesture.Tap().onEnd(() => {
    scheduleOnRN(blurInput);
  });

  const composedGesture = Gesture.Race(panGesture);

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
              variant: "plain",
              label: "Close",
              icon: {
                name: "xmark",
                type: "sfSymbol",
              },
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
            },
          ],
          unstable_headerRightItems: (props) => [
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
            },
          ],
        }}
      />
      <GestureDetector gesture={composedGesture}>
        <View style={[styles.container]}>
          {/* Session generations list */}
          <SessionHistoryList
            sessionGenerations={sessionGenerations}
            activeGenerationIndex={activeGenerationIndex}
            setActiveGenerationIndex={setActiveGenerationIndex}
            setSessionGenerations={setSessionGenerations}
            handleSave={handleSave}
            handleShare={handleShare}
          />

          {/* Text to image result */}
          <TextToImageResult
            mutation={activeMutation}
            lastGenerationUris={activeGenerationUris}
          />

          <Activity mode={!isAuthenticated ? "visible" : "hidden"}>
            <Animated.View
              entering={FadeIn.duration(1000)}
              exiting={FadeOut.duration(1000)}
              style={{ padding: 16, gap: 16, paddingBottom: bottom }}
            >
              <Text type="lg" weight="bold">
                A quick sign-in before we create your tattoo.
              </Text>
              <Text type="sm">
                This lets us track your free generations and make sure your
                account is good to go.
              </Text>
              <Button
                title="Sign in"
                color="yellow"
                variant="solid"
                size="lg"
                radius="full"
                hapticStyle="medium"
                loading={isPending}
                disabled={isPending}
                onPress={() => router.push("/auth-sheet")}
              />
            </Animated.View>
          </Activity>

          <Activity mode={isAuthenticated ? "visible" : "hidden"}>
            <InputControls
              onChangeText={setPrompt}
              prompt={prompt}
              onSubmit={handleTattooGeneration}
              isSubmitDisabled={prompt.length === 0 || isPending || isLoading}
              autoFocus={true}
            />
          </Activity>
        </View>
      </GestureDetector>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  textToImageResultContainer: {
    flex: 1,
    backgroundColor: "lightblue",
  },
});
