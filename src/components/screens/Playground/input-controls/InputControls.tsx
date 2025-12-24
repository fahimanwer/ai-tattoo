import { Text } from "@/src/components/ui/Text";
import { Ref } from "react";
import { View } from "react-native";
import { InputControlsHandle, InputControlsProps } from "./inputContols.types";

export function InputControls({
  ref: _ref,
  ...props
}: InputControlsProps & { ref?: Ref<InputControlsHandle> }) {
  return (
    <View>
      <Text>Not implemented for non-iOS platforms</Text>
    </View>
  );
}
