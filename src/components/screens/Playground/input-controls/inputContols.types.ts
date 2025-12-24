export interface InputControlsProps {
  onPressImageGallery?: () => void;
  onChangeFocus?: (focused: boolean) => void;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
  autoFocus?: boolean;
  isSubmitDisabled?: boolean;
  onPressSecondIcon?: () => void;
  prompt?: string;
}

export interface InputControlsHandle {
  focus: () => void;
  blur: () => void;
}
