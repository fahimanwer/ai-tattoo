import { theme } from "@/theme/theme";
import {
  Button,
  Host,
  HStack,
  Image,
  TextField,
  TextFieldRef,
} from "@expo/ui/swift-ui";
import {
  buttonStyle,
  clipShape,
  fixedSize,
  glassEffect,
  padding,
} from "@expo/ui/swift-ui/modifiers";
import { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { InputControlsProps } from "./inputContols.types";
const WIDTH = Dimensions.get("screen").width;

export function InputControls({
  onChangeFocus,
  onChangeText,
  onSubmit,
  autoFocus,
}: InputControlsProps) {
  const textFieldRef = useRef<TextFieldRef>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    if (autoFocus) {
      const timer = setTimeout(() => {
        if (textFieldRef.current) {
          focusTextField();
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  async function focusTextField() {
    try {
      await textFieldRef.current?.focus();
    } catch (error) {
      console.log("Failed to focus text field:", error);
    }
  }

  return (
    <Host matchContents style={{ width: WIDTH - 32 }}>
      <HStack spacing={theme.space8} alignment="bottom">
        <HStack
          modifiers={[
            padding({ horizontal: 16, vertical: 13 }),
            glassEffect({
              glass: {
                variant: "regular",
                interactive: true,
              },
              shape: "capsule",
            }),
          ]}
        >
          <TextField
            ref={textFieldRef}
            placeholder="Generate a realistic tattoo..."
            numberOfLines={2}
            onChangeFocus={(focused: boolean) => {
              if (focused) {
                onChangeFocus?.(true);
                setIsKeyboardVisible(true);
              } else {
                onChangeFocus?.(false);
                setIsKeyboardVisible(false);
              }
            }}
            multiline
            onChangeText={(text) => {
              onChangeText?.(text);
            }}
          />
        </HStack>

        <Button
          modifiers={[clipShape("circle"), buttonStyle("glass")]}
          onPress={async () => {
            if (isKeyboardVisible) {
              await textFieldRef?.current?.blur();
            } else {
              await textFieldRef?.current?.focus();
            }
          }}
        >
          <Image
            systemName={
              isKeyboardVisible
                ? "keyboard.chevron.compact.down.fill"
                : "keyboard"
            }
            size={theme.fontSize20}
            color="white"
            modifiers={[padding({ vertical: 7 })]}
          />
        </Button>
        <Button
          variant="glassProminent"
          controlSize="mini"
          onPress={() => {
            onSubmit?.();
          }}
          modifiers={[fixedSize()]}
        >
          <HStack modifiers={[padding({ vertical: 4 })]}>
            <Image
              systemName="paperplane.fill"
              size={theme.fontSize20}
              color="white"
              modifiers={[padding({ vertical: 2 })]}
            />
          </HStack>
        </Button>
      </HStack>
    </Host>
  );
}
