import { FeaturedSuggestion } from "@/modules/animated-input/src/AnimatedInput.types";

export interface InputControlsProps {
  onPressImageGallery?: () => void;
  onChangeFocus?: (focused: boolean) => void;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
  onSelectSuggestion?: (title: string) => void;
  autoFocus?: boolean;
  isSubmitDisabled?: boolean;
  suggestions?: FeaturedSuggestion[];
}
