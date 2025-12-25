import { Button } from "../ui/Button";

interface CTAButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function CTAButton({
  title,
  onPress,
  loading = false,
  disabled = false,
}: CTAButtonProps) {
  return (
    <Button
      title={loading ? "Processing..." : title}
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      variant="solid"
      color="yellow"
      size="lg"
      radius="lg"
      haptic
      hapticStyle="light"
    />
  );
}
