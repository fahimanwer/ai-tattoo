import { cacheImageFromUrl } from "@/lib/image-cache";
import { PlaygroundContext } from "@/src/context/PlaygroundContext";
import { useUsageLimit } from "@/src/hooks/useUsageLimit";
import {
  GlassEffectContainer,
  Host,
  HStack,
  Image,
  Namespace,
  Button as SwiftUIButton,
  TextField,
  TextFieldRef,
  VStack,
} from "@expo/ui/swift-ui";
import {
  Animation,
  animation,
  background,
  buttonStyle,
  clipShape,
  disabled,
  glassEffect,
  padding,
  shapes,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { router } from "expo-router";
import React, { use, useId, useImperativeHandle, useRef } from "react";
import { Alert, View } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PlaygroundSuggestions } from "../shared/suggestions/PlaygroundSuggestions";
import { InputControlsProps } from "./inputContols.types";

export function InputControls({
  onChangeText,
  onSubmit,
  autoFocus,
  isSubmitDisabled = false,
  prompt = "",
  isSheetDisabled = false,
}: InputControlsProps) {
  const { bottom } = useSafeAreaInsets();
  const { inputControlsRef, addImagesToSession, activeGenerationUris } =
    use(PlaygroundContext);
  const { isLimitReached, subscriptionTier } = useUsageLimit();
  const isFreeTier = subscriptionTier === "free";

  const namespaceId = useId();
  const textFieldRef = useRef<TextFieldRef>(null);

  // Suggestions should be hidden when there's input or selected images
  const shouldShowSuggestions =
    prompt.length === 0 && activeGenerationUris.length === 0;

  // Register with context so focusInput/blurInput/setText work from anywhere
  useImperativeHandle(inputControlsRef, () => ({
    focus: () => textFieldRef.current?.focus(),
    blur: () => textFieldRef.current?.blur(),
    setText: (text: string) => textFieldRef.current?.setText(text),
  }));

  function handleSubmit() {
    // If free user has reached their limit, redirect to paywall
    if (isLimitReached && isFreeTier) {
      textFieldRef.current?.blur();
      router.push("/(paywall)");
      return;
    }

    onSubmit?.();
    textFieldRef.current?.blur();
  }

  async function handleTryOnSelect(styleName: string, imageUri: string) {
    // If free user has reached their limit, redirect to paywall
    if (isLimitReached && isFreeTier) {
      textFieldRef.current?.blur();
      router.push("/(paywall)");
      return;
    }

    try {
      // Cache the image from the CDN URL
      const cachedUri = await cacheImageFromUrl(imageUri);
      // Add the cached image to the session
      addImagesToSession([cachedUri]);
      // Note: We don't set the prompt here because there's an automatic prompt
      // applied when the user selects multiple images

      // Show alert to explain what happened and prompt them to select their image
      Alert.alert(
        `Try on ${styleName}`,
        "Take a photo of your body part to see how this tattoo looks on you!",
        [
          {
            text: "Choose Photo",
            style: "default",
            onPress: () => {
              textFieldRef.current?.blur();
              router.push("/(playground)/sheet");
            },
            isPreferred: true,
          },
          {
            text: "Later",
            style: "cancel",
          },
        ]
      );
    } catch (error) {
      console.error("Failed to load try-on image:", error);
    }
  }

  return (
    <KeyboardStickyView
      style={{
        position: "absolute",
        bottom: bottom,
        left: 0,
        right: 0,
      }}
      offset={{ opened: bottom - 16, closed: 0 }}
    >
      <PlaygroundSuggestions
        style={{ marginBottom: 16 }}
        visible={shouldShowSuggestions}
        onSelectText={(suggestionPrompt) => {
          onChangeText?.(suggestionPrompt);
          textFieldRef.current?.focus();
        }}
        onSelectTryOn={handleTryOnSelect}
      />
      <View style={{ paddingHorizontal: 16 }}>
        <Host matchContents ignoreSafeAreaKeyboardInsets>
          <Namespace id={namespaceId}>
            <GlassEffectContainer>
              <HStack spacing={8} alignment="bottom">
                <SwiftUIButton
                  onPress={() => {
                    textFieldRef.current?.blur();
                    router.push("/(playground)/sheet");
                  }}
                  modifiers={[
                    tint("white"),
                    buttonStyle(
                      isLiquidGlassAvailable() ? "glass" : "bordered"
                    ),
                    background(
                      isLiquidGlassAvailable() ? "transparent" : "#000000"
                    ),
                    clipShape("circle"),
                    disabled(isSheetDisabled),
                  ]}
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
                    background(
                      isLiquidGlassAvailable() ? "transparent" : "black",
                      shapes.roundedRectangle({
                        cornerRadius: 20,
                        roundedCornerStyle: "continuous",
                      })
                    ),
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
                    ref={textFieldRef}
                    defaultValue={prompt}
                    placeholder="Enter text"
                    multiline
                    allowNewlines
                    numberOfLines={5}
                    autoFocus={autoFocus}
                    modifiers={[padding({ vertical: 12, horizontal: 16 })]}
                    onChangeText={onChangeText}
                    onSubmit={handleSubmit}
                  />
                </VStack>

                <SwiftUIButton
                  onPress={handleSubmit}
                  modifiers={[
                    tint(prompt.length > 0 ? "yellow" : "gray"),
                    buttonStyle(
                      isLiquidGlassAvailable() ? "glassProminent" : "bordered"
                    ),
                    background(
                      isLiquidGlassAvailable()
                        ? "transparent"
                        : prompt.length > 0
                        ? "yellow"
                        : "#333333"
                    ),
                    clipShape("circle"),
                    disabled(isSubmitDisabled || prompt.length === 0),
                  ]}
                >
                  <Image
                    systemName={"arrow.up"}
                    size={16}
                    color={prompt.length > 0 ? "black" : "gray"}
                    modifiers={[padding({ vertical: 6, horizontal: 2 })]}
                  />
                </SwiftUIButton>
              </HStack>
            </GlassEffectContainer>
          </Namespace>
        </Host>
      </View>
    </KeyboardStickyView>
  );
}

// Old native input
// <AnimatedInputView
//   style={{ flex: 1 }}
//   placeholder="Generate a realistic tattoo..."
//   autoFocus={autoFocus}
//   disableMainAction={isSubmitDisabled}
//   suggestions={suggestions}
//   onValueChanged={(event) => {
//     onChangeText?.(event.nativeEvent.value);
//   }}
//   onFocusChanged={(event) => {
//     onChangeFocus?.(event.nativeEvent.isFocused);
//   }}
//   onPressSecondIcon={onPressSecondIcon}
//   onPressImageGallery={onPressImageGallery}
//   onPressMainAction={handleMainActionPress}
// />
