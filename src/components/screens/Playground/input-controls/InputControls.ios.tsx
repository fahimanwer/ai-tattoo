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
  offset,
  padding,
  shapes,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { router } from "expo-router";
import React, { Ref, useId, useImperativeHandle, useRef } from "react";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { InputControlsHandle, InputControlsProps } from "./inputContols.types";

export function InputControls({
  ref,
  onPressImageGallery,
  onChangeFocus,
  onChangeText,
  onSubmit,
  autoFocus,
  isSubmitDisabled = false,
  onPressSecondIcon,
  prompt = "",
}: InputControlsProps & { ref?: Ref<InputControlsHandle> }) {
  const { bottom } = useSafeAreaInsets();

  const namespaceId = useId();
  const textFieldRef = useRef<TextFieldRef>(null);

  useImperativeHandle(ref, () => ({
    focus: () => textFieldRef.current?.focus(),
    blur: () => textFieldRef.current?.blur(),
  }));

  function handleSubmit() {
    onSubmit?.();
    textFieldRef.current?.blur();
  }

  //  useEffect(() => {
  //    const unsubscribe = navigation.addListener("focus", () => {
  //      // Only focus if the TextField is actually rendered (when we have less than 2 images)
  //      if (activeGenerationUris.length < 2) {
  //        // Small delay to ensure the native view hierarchy is ready
  //        setTimeout(() => {
  //          textFieldRef.current?.focus();
  //        }, 100);
  //      }
  //    });
  //    return unsubscribe;
  //  }, [navigation, activeGenerationUris.length]);
  return (
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
                  textFieldRef.current?.blur();
                  router.push("/(playground)/sheet");
                }}
                modifiers={[
                  tint("white"),
                  buttonStyle(isLiquidGlassAvailable() ? "glass" : "bordered"),
                  background(
                    isLiquidGlassAvailable() ? "transparent" : "#000000"
                  ),
                  clipShape("circle"),
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

              {prompt.length > 0 && (
                <SwiftUIButton
                  onPress={handleSubmit}
                  modifiers={[
                    tint("yellow"),
                    buttonStyle(
                      isLiquidGlassAvailable() ? "glassProminent" : "bordered"
                    ),
                    background(
                      isLiquidGlassAvailable() ? "transparent" : "yellow"
                    ),
                    clipShape("circle"),
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
                    disabled(isSubmitDisabled),
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
