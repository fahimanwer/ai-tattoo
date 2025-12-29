import { Button } from "../ui/Button";

interface OnboardingButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  isLastStep?: boolean;
}

export function OnboardingButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  isLastStep = false,
}: OnboardingButtonProps) {
  return (
    <Button
      title={loading ? "" : title}
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      variant="solid"
      color={isLastStep ? "yellow" : "white"}
      size="lg"
      radius="lg"
      haptic
      hapticStyle="light"
    />
  );
}
