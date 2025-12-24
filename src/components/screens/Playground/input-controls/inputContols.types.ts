export interface InputControlsProps {
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
  autoFocus?: boolean;
  isSubmitDisabled?: boolean;
  prompt?: string;
}

export interface InputControlsHandle {
  focus: () => void;
  blur: () => void;
}
