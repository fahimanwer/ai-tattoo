import { AnimatedInputView } from "@/modules/animated-input";
import { InputControlsProps } from "./inputContols.types";

export function InputControls({
  onPressImageGallery,
  onChangeFocus,
  onChangeText,
  onSubmit,
  onSelectSuggestion,
  autoFocus,
  isSubmitDisabled = false,
  suggestions = [],
}: InputControlsProps) {
  const handleMainActionPress = () => {
    console.log("Main action button pressed - submit the prompt");
    onSubmit?.();
  };

  const handleSelectSuggestion = (event: {
    nativeEvent: { title: string };
  }) => {
    console.log("Suggestion selected:", event.nativeEvent.title);
    onSelectSuggestion?.(event.nativeEvent.title);
  };

  return (
    <AnimatedInputView
      placeholder="Generate a realistic tattoo..."
      autoFocus={autoFocus}
      disableMainAction={isSubmitDisabled}
      suggestions={suggestions}
      onValueChanged={(event) => {
        onChangeText?.(event.nativeEvent.value);
      }}
      onFocusChanged={(event) => {
        onChangeFocus?.(event.nativeEvent.isFocused);
      }}
      onPressImageGallery={onPressImageGallery}
      onPressMainAction={handleMainActionPress}
      onSelectSuggestion={handleSelectSuggestion}
    />
  );
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
