import { FeaturedSuggestion } from "@/modules/animated-input/src/AnimatedInput.types";

export interface InputControlsProps {
  onPressImageGallery?: () => void;
  onChangeFocus?: (focused: boolean) => void;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
  autoFocus?: boolean;
  isSubmitDisabled?: boolean;
  suggestions?: FeaturedSuggestion[];
}
