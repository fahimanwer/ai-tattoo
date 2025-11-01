export interface InputControlsProps {
  onChangeFocus?: (focused: boolean) => void;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
  autoFocus?: boolean;
}
