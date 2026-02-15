import { router, Stack, useLocalSearchParams } from "expo-router";
import { Activity, use, useEffect, useRef } from "react";
import { Alert, StyleSheet, useWindowDimensions, View } from "react-native";
import { useTranslation } from "react-i18next";

import { authClient } from "@/lib/auth-client";
import { playgroundEntranceHaptic } from "@/lib/haptics-patterns.ios";
import CoreHaptics from "@/modules/native-core-haptics";
import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import { PlaygroundContext } from "@/src/context/PlaygroundContext";
import { useTheme } from "@/src/context/ThemeContext";
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
  foregroundStyle,
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
  const { t } = useTranslation();
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
    cancelGeneration,
  } = use(PlaygroundContext);

  const { width } = useWindowDimensions();
  const { isDark } = useTheme();

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
        setPrompt(
          "Remove the tattoo from this photo and restore the area as natural skin. Keep the rest of the image unchanged and do not add any new design."
        );
        pickImageFromGallery();
      }, 300);
    }
  }, [
    params.mode,
    isAuthenticated,
    isLoading,
    pickImageFromGallery,
    setPrompt,
  ]);

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
          headerTitle: t('playground.title'),
          headerShadowVisible: false,
          gestureEnabled: false,
          unstable_headerLeftItems: (props) => [
            {
              type: "button",
              variant: "plain",
              label: t('common.close'),
              icon: {
                name: "xmark",
                type: "sfSymbol",
              },
              onPress: () => {
                if (activeMutation.isPending) {
                  Alert.alert(
                    t('playground.cancelGenerationTitle'),
                    t('playground.cancelGenerationMessage'),
                    [
                      { text: t('common.cancel'), style: "cancel" },
                      {
                        text: t('playground.cancelGeneration'),
                        style: "destructive",
                        isPreferred: true,
                        onPress: () => {
                          cancelGeneration();
                          setSessionGenerations([]);
                          setActiveGenerationIndex(undefined);
                          setPrompt("");
                          dismissToHome();
                        },
                      },
                    ]
                  );
                  return;
                }

                if (sessionGenerations.length > 0) {
                  Alert.alert(
                    t('playground.clearEverythingTitle'),
                    t('playground.clearEverythingMessage'),
                    [
                      { text: t('common.cancel'), style: "cancel" },
                      {
                        text: t('playground.clearEverything'),
                        style: "destructive",
                        isPreferred: true,
                        onPress: () => {
                          cancelGeneration();
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
          unstable_headerRightItems: (props) => {
            // Not authenticated - show no right-side header items
            if (!isAuthenticated) {
              return [];
            }

            // Authenticated but no subscription - show only Upgrade button
            if (!hasActiveSubscription) {
              return [
                {
                  type: "button" as const,
                  label: t('common.upgrade'),
                  variant: "prominent" as const,
                  tintColor: "#3563E9",
                  labelStyle: {
                    fontWeight: "bold" as const,
                  },
                  onPress: () => {
                    blurInput();
                    router.push("/(paywall)?variant=discount");
                  },
                },
              ];
            }

            // Authenticated with subscription - show Share and Save buttons
            return [
              {
                type: "button",
                label: t('common.share'),
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
                disabled:
                  activeGenerationUris.length !== 1 ||
                  isPending ||
                  activeMutation.isPending,
              },
              {
                type: "button",
                label: t('common.save'),
                variant: "prominent",
                tintColor: "#3563E9",
                labelStyle: {
                  fontWeight: "bold",
                },
                onPress: async () => {
                  // Save the first image in the active group
                  if (activeGenerationUris.length > 0) {
                    await handleSave(activeGenerationUris[0]);
                  }
                },
                disabled:
                  activeGenerationUris.length !== 1 ||
                  isPending ||
                  activeMutation.isPending,
              },
            ];
          },
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
            key={activeGenerationUris.join(",")} // helps re-render when the active generation changes this is good for the context menus otherwise they won't update
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
                borderColor: isDark ? Color.zinc[900] : Color.zinc[200],
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
                {t('auth.signInToContinue')}
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
                {t('auth.signInBenefit')}
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
                    tint("#3563E9"),
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
                      modifiers={[
                        font({ weight: "semibold", size: 16 }),
                        foregroundStyle("black"),
                      ]}
                    >
                      {t('auth.signIn')}
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
              // Don't auto-focus when mode opens gallery/camera immediately
              autoFocus={!params.mode || params.mode === ""}
              onSubmit={handleTattooGeneration}
              isSubmitDisabled={activeMutation.isPending}
              isSheetDisabled={activeMutation.isPending}
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
  settingsMenuContainer: {
    position: "absolute",
    top: 0,
    right: 60,
    zIndex: 1000,
    paddingTop: 8,
  },
  listStyle: {
    padding: 16,
    gap: 16,
  },
  textInput: {
    flexGrow: 1,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  textToImageResultContainer: {
    flex: 1,
    backgroundColor: "lightblue",
  },
});
