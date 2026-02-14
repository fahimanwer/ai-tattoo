import { Text } from "@/src/components/ui/Text";
import { Link } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OnboardingButton } from "./OnboardingButton";

interface OnboardingCTAProps {
  label: string;
  isLastStep: boolean;
  canAdvance: boolean;
  showSignIn: boolean;
  loading?: boolean;
  onPress: () => void;
}

export function OnboardingCTA({
  label,
  isLastStep,
  canAdvance,
  showSignIn,
  loading = false,
  onPress,
}: OnboardingCTAProps) {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  const signInVisible = useSharedValue(showSignIn ? 1 : 0);

  useEffect(() => {
    signInVisible.value = withTiming(showSignIn ? 1 : 0, {
      duration: 350,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [showSignIn, signInVisible]);

  const signInAnimatedStyle = useAnimatedStyle(() => ({
    opacity: signInVisible.value,
    height: signInVisible.value * 40,
    overflow: "hidden" as const,
  }));

  const isDisabled = !canAdvance || loading;

  return (
    <Animated.View
      entering={FadeIn}
      style={{
        marginTop: 24,
        gap: 24,
        width: "100%",
        paddingBottom: Math.max(bottom, 16),
      }}
      pointerEvents="auto"
    >
      <OnboardingButton
        title={label}
        onPress={onPress}
        loading={loading}
        disabled={isDisabled}
        isLastStep={isLastStep}
      />
      <Animated.View
        style={[
          {
            alignItems: "center",
            width: "100%",
          },
          signInAnimatedStyle,
        ]}
        pointerEvents={showSignIn ? "auto" : "none"}
      >
        <Text
          type="sm"
          style={{
            textAlign: "center",
            opacity: 0.5,
            lineHeight: 20,
          }}
        >
          {t('onboarding.alreadyHaveAccount')}
          <Link href="/(onboarding)/auth?from=onboarding" asChild>
            <Text type="sm" weight="bold">
              {t('onboarding.signIn')}
            </Text>
          </Link>
        </Text>
      </Animated.View>
    </Animated.View>
  );
}
