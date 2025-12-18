import { router, Stack, useLocalSearchParams } from "expo-router";
import { Activity, use, useEffect, useId, useRef } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { SessionHistoryItem } from "./session-history/SessionHistoryItem";

import { authClient } from "@/lib/auth-client";
import { FeaturedTattoo, featuredTattoos } from "@/lib/featured-tattoos";
import { playgroundEntranceHaptic } from "@/lib/haptics-patterns.ios";
import { FeaturedSuggestion } from "@/modules/animated-input/src/AnimatedInput.types";
import CoreHaptics from "@/modules/native-core-haptics";
import { Button } from "@/src/components/ui/Button";
import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import {
  ImageGenerationMutation,
  PlaygroundContext,
} from "@/src/context/PlaygroundContext";
import { useUsageLimit } from "@/src/hooks/useUsageLimit";
import {
  GlassEffectContainer,
  Host,
  HStack,
  Image,
  Namespace,
  Button as SwiftUIButton,
  TextField,
  VStack,
} from "@expo/ui/swift-ui";
import {
  Animation,
  animation,
  buttonStyle,
  clipShape,
  glassEffect,
  offset,
  padding,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import { GlassView } from "expo-glass-effect";
import * as Haptics from "expo-haptics";
import { SymbolView } from "expo-symbols";
import { PressableScale } from "pressto";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
    handleReset,
    pickImageFromGallery,
    handleShare,
    handleSave,
    activeGenerationUris,
    activeMutation,
    handleTattooGeneration,
    removeImageFromActiveGroup,
    resetMutations,
  } = use(PlaygroundContext);

  const { bottom } = useSafeAreaInsets();
  const { refetch: refetchUsage } = useUsageLimit();
  const hasCheckedUsage = useRef(false);

  // Play playful entrance haptic on first load
  useEffect(() => {
    // Play the playful AI playground entrance haptic
    CoreHaptics.playPattern(playgroundEntranceHaptic).catch((error) => {
      console.error("Failed to play playground entrance haptic:", error);
    });
  }, []); // Empty dependency array means this runs once on mount

  // Reset the check flag when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      hasCheckedUsage.current = false;
    }
  }, [isAuthenticated]);

  // Verify usage status when entering playground and reset errors if needed
  useEffect(() => {
    if (!isAuthenticated || isLoading || hasCheckedUsage.current) return;

    // Mark as checked to prevent multiple calls
    hasCheckedUsage.current = true;

    // Refetch usage to ensure we have the latest data
    refetchUsage()
      .then((result) => {
        // Check the result directly from the refetch
        const usageData = result.data;
        const isCurrentlyAtLimit = usageData?.isLimitReached ?? false;

        // If there's a LIMIT_REACHED error but user is no longer at limit, reset
        if (
          activeMutation.isError &&
          activeMutation.error?.message === "LIMIT_REACHED" &&
          !isCurrentlyAtLimit
        ) {
          // User has updated their plan or period reset, clear the error
          resetMutations();
        }
      })
      .catch((error) => {
        console.error("Error refetching usage:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading]); // Run when component mounts or auth state changes

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
      // Open gallery for edit mode
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
                    onPress: () => router.push("/(playground)/camera-view"),
                    selected: false,
                  },
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
                ],
              },
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
              contentContainerStyle={{
                paddingHorizontal: 4,
                gap: 8,
              }}
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
                      width: 44,
                      height: 44,
                      borderRadius: 99,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    isInteractive
                  >
                    <SymbolView name={"plus"} size={26} tintColor="white" />
                  </GlassView>
                </PressableScale>
              )}
              horizontal
            />
          </View>
        )}

        {/* Text to image result */}
        {/* <PressableScale
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            alert("test");
          }}
          style={{ backgroundColor: "red", padding: 16 }}
        >
          <View style={styles.textToImageResultContainer}>
            <TextToImageResult
              mutation={activeMutation}
              lastGenerationUris={activeGenerationUris}
              onRemoveImage={removeImageFromActiveGroup}
            />
          </View>
        </PressableScale> */}

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
          <ActionControls
            activeGenerationUris={activeGenerationUris}
            bottom={bottom}
            handleTattooGeneration={handleTattooGeneration}
            activeMutation={activeMutation}
            setPrompt={setPrompt}
            prompt={prompt}
            pickImageFromGallery={pickImageFromGallery}
          />
        </Activity>
      </View>
    </>
  );
}

function ActionControls({
  activeGenerationUris,
  bottom,
  handleTattooGeneration,
  activeMutation,
  setPrompt,
  prompt,
  pickImageFromGallery,
}: {
  activeGenerationUris: string[];
  bottom: number;
  handleTattooGeneration: () => void;
  activeMutation: ImageGenerationMutation;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  prompt: string;
  pickImageFromGallery: () => Promise<boolean>;
}) {
  const namespaceId = useId();

  return activeGenerationUris.length >= 2 ? (
    <View
      style={{
        paddingBottom: bottom,
        paddingHorizontal: 16,
        gap: 16,
      }}
    >
      <Text style={{ textAlign: "center", fontWeight: "600" }}>
        Ready to preview your tattoo
      </Text>

      <Text
        type="sm"
        style={{ textAlign: "center" }}
        darkColor={Color.zinc[400]}
      >
        We&apos;ll place your selected tattoo onto the body photo you chose. For
        the most realistic result, make sure the body area is uncovered,
        well-lit, and clearly visible.
      </Text>

      <Button
        title="Try It On"
        onPress={handleTattooGeneration}
        color="yellow"
        variant="solid"
        loading={activeMutation.isPending}
        disabled={activeMutation.isPending}
      />
    </View>
  ) : (
    <KeyboardStickyView
      style={{
        position: "absolute",
        bottom: bottom,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
      }}
      offset={{ opened: bottom - 16, closed: 0 }}
    >
      <Host matchContents ignoreSafeAreaKeyboardInsets>
        <Namespace id={namespaceId}>
          <GlassEffectContainer>
            <HStack
              spacing={8}
              alignment="bottom"
              modifiers={
                [
                  // padding({ vertical: 12, horizontal: 16 }),
                  // glassEffect({
                  //   glass: {
                  //     variant: "regular",
                  //     interactive: true,
                  //   },
                  //   shape: "capsule",
                  // }),
                  // clipShape("rectangle", 50),
                ]
              }
            >
              <SwiftUIButton
                onPress={() => {
                  alert("test");
                }}
                modifiers={[tint("white"), buttonStyle("glass")]}
              >
                <Image
                  systemName="plus"
                  size={20}
                  modifiers={[
                    padding({ vertical: 6, horizontal: 0 }),
                    clipShape("circle"),
                  ]}
                />
              </SwiftUIButton>

              <VStack
                modifiers={[
                  glassEffect({
                    glass: {
                      variant: "regular",
                      interactive: true,
                    },
                    shape: "roundedRectangle",
                    cornerRadius: 20,
                  }),
                  animation(
                    Animation.spring({
                      duration: 0.5,
                      dampingFraction: 0.5,
                      blendDuration: 0.5,
                      bounce: 0.5,
                    }),
                    prompt.length > 0
                  ),
                ]}
              >
                <TextField
                  placeholder="Enter text"
                  multiline
                  allowNewlines
                  numberOfLines={5}
                  autoFocus
                  modifiers={[padding({ vertical: 12, horizontal: 16 })]}
                  onChangeText={setPrompt}
                  onSubmit={handleTattooGeneration}
                />
              </VStack>

              {prompt.length > 0 && (
                <SwiftUIButton
                  onPress={() => {
                    alert("test");
                  }}
                  modifiers={[
                    tint("yellow"),
                    buttonStyle("glassProminent"),
                    offset({ x: prompt.length > 0 ? 0 : 100 }),
                    animation(
                      Animation.spring({
                        duration: 0.5,
                        dampingFraction: 0.5,
                        blendDuration: 0.5,
                        bounce: 0.5,
                      }),
                      prompt.length > 0
                    ),
                  ]}
                >
                  <Image
                    systemName="arrow.up"
                    size={16}
                    color={"black"}
                    modifiers={[padding({ vertical: 6, horizontal: 2 })]}
                  />
                </SwiftUIButton>
              )}
            </HStack>
          </GlassEffectContainer>
        </Namespace>
      </Host>
    </KeyboardStickyView>
    // <Host
    //   style={{
    //     height: activeMutation.isError ? "70%" : "80%",
    //     position: "absolute",
    //     bottom: 0,
    //     left: 0,
    //     right: 0,
    //   }}
    // >
    //   <InputControls
    //     onChangeText={setPrompt}
    //     onPressImageGallery={pickImageFromGallery}
    //     onSubmit={handleTattooGeneration}
    //     isSubmitDisabled={prompt.length === 0}
    //     suggestions={suggestions}
    //     onPressSecondIcon={() => router.push("/(playground)/camera-view")}
    //     // autoFocus // this is buggy need to fix later
    //   />
    // </Host>
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
    paddingVertical: 2,
  },
});
