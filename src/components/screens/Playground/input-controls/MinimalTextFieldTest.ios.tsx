import { Host, TextField, TextFieldRef, VStack } from "@expo/ui/swift-ui";
import {
  background,
  glassEffect,
  padding,
  shapes,
} from "@expo/ui/swift-ui/modifiers";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import React, { useEffect, useRef } from "react";
import { Keyboard } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface MinimalTextFieldTestProps {
  onChangeText?: (text: string) => void;
  autoFocus?: boolean;
  prompt?: string;
}

export function MinimalTextFieldTest({
  onChangeText,
  autoFocus,
  prompt = "",
}: MinimalTextFieldTestProps) {
  const { bottom } = useSafeAreaInsets();
  const textFieldRef = useRef<TextFieldRef>(null);
  const startTime = useRef(Date.now());

  // Log keyboard events to reproduce the bug
  useEffect(() => {
    const logTime = (event: string) => {
      const elapsed = Date.now() - startTime.current;
      console.log(`[MinimalTest] ${event}: T+${elapsed}ms`);
    };

    const willShow = Keyboard.addListener("keyboardWillShow", () =>
      logTime("Keyboard WILL SHOW")
    );
    const didShow = Keyboard.addListener("keyboardDidShow", () =>
      logTime("Keyboard DID SHOW")
    );
    const willHide = Keyboard.addListener("keyboardWillHide", () =>
      logTime("Keyboard WILL HIDE")
    );
    const didHide = Keyboard.addListener("keyboardDidHide", () =>
      logTime("Keyboard DID HIDE")
    );

    console.log("[MinimalTest] Component mounted");

    return () => {
      willShow.remove();
      didShow.remove();
      willHide.remove();
      didHide.remove();
      console.log("[MinimalTest] Component unmounted");
    };
  }, []);

  // Log when autoFocus triggers
  useEffect(() => {
    if (autoFocus) {
      console.log("[MinimalTest] autoFocus=true, letting TextField handle it");
    }
  }, [autoFocus]);

  return (
    <KeyboardStickyView
      style={{
        position: "absolute",
        bottom: bottom - 16,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
      }}
    >
      <Host matchContents ignoreSafeArea="keyboard">
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
          ]}
        >
          <TextField
            ref={textFieldRef}
            defaultValue={prompt}
            placeholder="Minimal test field"
            multiline
            allowNewlines
            numberOfLines={5}
            autoFocus={autoFocus}
            modifiers={[padding({ vertical: 12, horizontal: 16 })]}
            onChangeText={onChangeText}
          />
        </VStack>
      </Host>
    </KeyboardStickyView>
  );
}
