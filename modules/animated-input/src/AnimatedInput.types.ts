import type { StyleProp, ViewStyle } from "react-native";

export type OnValueChangedEventPayload = {
  value: string;
};

export type OnFocusChangedEventPayload = {
  isFocused: boolean;
};

export type AnimatedInputViewProps = {
  placeholder?: string;
  defaultValue?: string;
  autoFocus?: boolean;
  disableMainAction?: boolean;
  onValueChanged?: (event: { nativeEvent: OnValueChangedEventPayload }) => void;
  onFocusChanged?: (event: { nativeEvent: OnFocusChangedEventPayload }) => void;
  onPressImageGallery?: () => void;
  onPressMainAction?: () => void;
  style?: StyleProp<ViewStyle>;
};
