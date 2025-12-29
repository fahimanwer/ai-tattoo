import { router, Stack, useLocalSearchParams } from "expo-router";
import { Activity, use, useEffect, useRef } from "react";
import { Alert, StyleSheet, useWindowDimensions, View } from "react-native";

import { authClient } from "@/lib/auth-client";
import { playgroundEntranceHaptic } from "@/lib/haptics-patterns.ios";
import CoreHaptics from "@/modules/native-core-haptics";
import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import { PlaygroundContext } from "@/src/context/PlaygroundContext";
import { useSubscription } from "@/src/hooks/useSubscription";
import {
  Host,
  HStack,
  Button as SwiftUIButton,
  Text as SwiftUIText,
} from "@expo/ui/swift-ui";
import {
  buttonStyle,
  controlSize,
  disabled,
  font,
  frame,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import * as Haptics from "expo-haptics";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
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
  // Use RevenueCat as source of truth for subscription status
  const { hasActiveSubscription } = useSubscription();

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

  const { width } = useWindowDimensions();

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
    } else if (mode === "remove") {
      hasHandledMode.current = true;
      // Open gallery for remove mode
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

  // this looks ugly, maybe we don't need it?
  // it usually shows when the token is refreshing
  // if (isLoading) {
  //   return <ActivityIndicator style={{ flex: 1, marginBottom: 100 }} />;
  // }

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
              variant: !hasActiveSubscription ? "plain" : "prominent",
              tintColor: !hasActiveSubscription ? "white" : "yellow",
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
            ...(!hasActiveSubscription && session?.user !== undefined
              ? [
                  {
                    type: "button" as const,
                    label: "Upgrade",
                    variant: "prominent" as const,
                    tintColor: "yellow",
                    labelStyle: {
                      fontWeight: "bold" as const,
                    },
                    onPress: () => {
                      blurInput();
                      router.push("/(paywall)");
                    },
                  },
                ]
              : []),
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
              style={{
                paddingHorizontal: 16,
                paddingVertical: 32,
                gap: 8,
                position: "absolute",
                bottom: -1,
                left: 0,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                borderWidth: 1,
                borderColor: Color.zinc[900],
              }}
            >
              <Text
                type="xl"
                weight="bold"
                style={{
                  textAlign: "center",
                  lineHeight: 24,
                  letterSpacing: 0,
                }}
              >
                Please sign in to continue and get your tattoo created!
              </Text>
              <Text
                type="sm"
                style={{
                  textAlign: "center",
                  lineHeight: 18,
                  letterSpacing: 0,
                  marginBottom: 8,
                  opacity: 0.8,
                }}
              >
                By signing in, we can keep track of your free tattoo generations
                and ensure your account is set up properly.
              </Text>
              <Host matchContents useViewportSizeMeasurement>
                <SwiftUIButton
                  modifiers={[
                    controlSize("mini"),
                    buttonStyle(
                      isLiquidGlassAvailable()
                        ? "glassProminent"
                        : "borderedProminent"
                    ),
                    tint("yellow"),
                    disabled(isPending),
                  ]}
                  onPress={() =>
                    router.push({
                      pathname: "/auth-sheet",
                      params: { dismissImmediately: "true" },
                    })
                  }
                >
                  <HStack
                    spacing={8}
                    modifiers={[frame({ height: 44, width: width - 64 })]}
                  >
                    <SwiftUIText
                      color={"black"}
                      modifiers={[font({ weight: "semibold", size: 16 })]}
                    >
                      Sign in
                    </SwiftUIText>
                  </HStack>
                </SwiftUIButton>
              </Host>
            </Animated.View>
          </Activity>

          <Activity mode={isAuthenticated ? "visible" : "hidden"}>
            <InputControls
              onChangeText={setPrompt}
              prompt={prompt}
              onSubmit={handleTattooGeneration}
              isSubmitDisabled={
                prompt.length === 0 ||
                isPending ||
                isLoading ||
                activeMutation.isPending
              }
              autoFocus={true} // this is causing side effects when true
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
