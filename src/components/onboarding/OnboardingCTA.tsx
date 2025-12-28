import { Text } from "@/src/components/ui/Text";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import { useEffect } from "react";
import Animated, {
  Easing,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../ui/Button";

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

  const handlePress = () => {
    if (isDisabled) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    onPress();
  };

  return (
    <Animated.View
      entering={FadeIn.duration(600).delay(1200)}
      style={{
        gap: 16,
        width: "100%",
        paddingTop: 24,
        paddingBottom: Math.max(bottom, 16),
      }}
      pointerEvents="auto"
    >
      <Button
        title={loading ? "" : label}
        color={isLastStep ? "yellow" : "white"}
        variant="solid"
        size="lg"
        radius="full"
        style={isDisabled ? { opacity: 0.5 } : undefined}
        onPress={handlePress}
        loading={loading}
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
          Already have an account?{" "}
          <Link href="/(onboarding)/auth?from=onboarding" asChild>
            <Text type="sm" weight="bold">
              Sign In
            </Text>
          </Link>
        </Text>
      </Animated.View>
    </Animated.View>
  );
}
