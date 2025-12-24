export interface InputControlsProps {
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
  autoFocus?: boolean;
  isSubmitDisabled?: boolean;
  prompt?: string;
}
