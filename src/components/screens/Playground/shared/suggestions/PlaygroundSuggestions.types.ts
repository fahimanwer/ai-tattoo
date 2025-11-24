import { ViewStyle } from "react-native";

export interface PlaygroundSuggestionProps {
  onSelect: (suggestionTitle: string) => void;
  style?: ViewStyle;
}
