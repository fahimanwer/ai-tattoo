import { AnimatedInputView } from "@/modules/animated-input";
import { TextFieldRef } from "@expo/ui/swift-ui";
import { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { InputControlsProps } from "./inputContols.types";

const WIDTH = Dimensions.get("screen").width;

export function InputControls({
  onChangeFocus,
  onChangeText,
  onSubmit,
  autoFocus,
  isSubmitDisabled = false,
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

  return <AnimatedInputView url="https://www.google.com" onLoad={() => {}} />;
  // return (
  //   <Host matchContents style={{ width: WIDTH - 32, backgroundColor: "red" }}>
  //     <HStack spacing={theme.space8} alignment="bottom">
  //       <HStack
  //         spacing={theme.space8}
  //         modifiers={[
  //           padding({ horizontal: 16, vertical: 13 }),
  //           glassEffect({
  //             glass: {
  //               variant: "regular",
  //               interactive: true,
  //             },
  //             shape: "capsule",
  //           }),
  //         ]}
  //       >
  //         <TextField
  //           ref={textFieldRef}
  //           placeholder="Generate a realistic tattoo..."
  //           numberOfLines={2}
  //           onChangeFocus={(focused: boolean) => {
  //             if (focused) {
  //               onChangeFocus?.(true);
  //               setIsKeyboardVisible(true);
  //               CoreHaptics.playPattern(inputFocusFanfareHaptic).catch(
  //                 (error) =>
  //                   console.error("Failed to play input focus haptic:", error)
  //               );
  //             } else {
  //               onChangeFocus?.(false);
  //               setIsKeyboardVisible(false);
  //             }
  //           }}
  //           multiline
  //           onChangeText={(text) => {
  //             onChangeText?.(text);
  //           }}
  //         />
  //         <Button
  //           variant="plain"
  //           systemImage={
  //             isKeyboardVisible
  //               ? "keyboard.chevron.compact.down.fill"
  //               : "keyboard"
  //           }
  //           color="white"
  //           onPress={async () => {
  //             if (isKeyboardVisible) {
  //               await textFieldRef?.current?.blur();
  //             } else {
  //               await textFieldRef?.current?.focus();
  //             }
  //           }}
  //         />
  //       </HStack>

  //       <Button
  //         variant="glassProminent"
  //         controlSize="mini"
  //         disabled={isSubmitDisabled}
  //         onPress={() => {
  //           textFieldRef?.current?.blur();
  //           onSubmit?.();
  //         }}
  //         modifiers={[fixedSize()]}
  //       >
  //         <HStack modifiers={[padding({ vertical: 4 })]}>
  //           <Image
  //             systemName="paperplane.fill"
  //             size={theme.fontSize20}
  //             color="white"
  //             modifiers={[padding({ vertical: 2 })]}
  //           />
  //         </HStack>
  //       </Button>
  //     </HStack>
  //   </Host>
  // );
}
