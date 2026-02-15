import { useTranslation } from "react-i18next";
import { Button } from "../ui/Button";

interface CTAButtonProps {
  title: string;
  trialText?: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function CTAButton({
  title,
  trialText,
  onPress,
  loading = false,
  disabled = false,
}: CTAButtonProps) {
  const { t } = useTranslation();
  const displayTitle = loading ? t('common.processing') : (trialText ?? title);

  return (
    <Button
      title={displayTitle}
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      variant="solid"
      color="blue"
      size="lg"
      radius="lg"
      haptic
      hapticStyle="light"
    />
  );
}
