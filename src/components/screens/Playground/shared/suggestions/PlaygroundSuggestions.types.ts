import { ViewStyle } from "react-native";

export interface TextSuggestion {
  type: "text";
  label: string;
  prompt: string;
}

export interface TryOnSuggestion {
  type: "tryOn";
  label: string;
  styleName: string; // The tattoo style name for the alert
  imageUri: string; // CDN URL of the image to use as context
  thumbnailUri: string; // Thumbnail for display in the suggestion chip
}

export type Suggestion = TextSuggestion | TryOnSuggestion;

export interface PlaygroundSuggestionProps {
  onSelectText: (prompt: string) => void;
  onSelectTryOn: (styleName: string, imageUri: string) => void;
  style?: ViewStyle;
  visible?: boolean; // Controls fade in/out animation
}
