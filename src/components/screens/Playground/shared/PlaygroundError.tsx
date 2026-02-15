import { Text } from "@/src/components/ui/Text";
import { useRouter } from "expo-router";
import { useThemeColor } from "heroui-native";
import { PressableScale } from "pressto";
import { Activity } from "react";
import { Linking, View } from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Error types for the Playground error component
 */
export type PlaygroundErrorType =
  | "limit_reached_free"
  | "limit_reached_subscribed"
  | "generic";

interface PlaygroundErrorProps {
  /**
   * The type of error to display.
   * - "limit_reached_free": Conversion-optimized messaging for free users
   * - "limit_reached_subscribed": Fair use limit messaging for subscribed users
   * - "generic": Generic error with custom message
   */
  errorType: PlaygroundErrorType;
  /**
   * Custom error message for generic errors
   */
  errorMessage?: string;
  /**
   * Callback when the user dismisses the error or takes action
   */
  onDismiss?: () => void;
  /**
   * Support email address for contact support link
   * @default "contact@fahimanwer.com"
   */
  supportEmail?: string;
}

/**
 * PlaygroundError - Reusable error component for the Playground
 *
 * Displays different error states with appropriate messaging:
 * - Free users hitting limit: Conversion-optimized upgrade prompt
 * - Subscribed users hitting limit: Fair use messaging with support option
 * - Generic errors: Simple error display with retry option
 *
 * @example
 * // Free user limit reached
 * <PlaygroundError
 *   errorType="limit_reached_free"
 *   onDismiss={() => mutation.reset()}
 * />
 *
 * @example
 * // Subscribed user limit reached
 * <PlaygroundError
 *   errorType="limit_reached_subscribed"
 *   onDismiss={() => mutation.reset()}
 * />
 *
 * @example
 * // Generic error
 * <PlaygroundError
 *   errorType="generic"
 *   errorMessage="Network connection failed"
 *   onDismiss={() => mutation.reset()}
 * />
 */
export function PlaygroundError({
  errorType,
  errorMessage,
  onDismiss,
  supportEmail = "contact@fahimanwer.com",
}: PlaygroundErrorProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const fg = useThemeColor("foreground");
  const muted = useThemeColor("muted");

  const handleUpgrade = () => {
    onDismiss?.();
    router.push("/(paywall)?variant=discount");
  };

  const handleContactSupport = () => {
    Linking.openURL(`mailto:${supportEmail}`);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          gap: 16,
          paddingHorizontal: 24,
        }}
      >
        {/* Free user - conversion-optimized messaging */}
        <Activity
          mode={errorType === "limit_reached_free" ? "visible" : "hidden"}
        >
          <View style={{ alignItems: "center", gap: 16 }}>
            <Text
              type="lg"
              weight="semibold"
              style={{ textAlign: "center", color: fg }}
            >
              {t('playground.error.keepCreating')}
            </Text>
            <Text
              type="sm"
              style={{ color: muted, textAlign: "center" }}
            >
              {t('playground.error.limitReachedFree')}
            </Text>
            <PressableScale onPress={handleUpgrade}>
              <Text
                type="default"
                weight="semibold"
                style={{ color: "#3563E9" }}
              >
                {t('playground.error.unlockUnlimited')}
              </Text>
            </PressableScale>
          </View>
        </Activity>

        {/* Subscribed user - fair use limit messaging */}
        <Activity
          mode={errorType === "limit_reached_subscribed" ? "visible" : "hidden"}
        >
          <View style={{ alignItems: "center", gap: 16 }}>
            <Text
              type="lg"
              weight="semibold"
              style={{ textAlign: "center", color: fg }}
            >
              {t('playground.error.limitReachedSubscribed')}
            </Text>
            <Text
              type="sm"
              style={{ color: muted, textAlign: "center" }}
            >
              {t('playground.error.limitReachedSubscribedDesc')}
            </Text>
            <View style={{ gap: 8, alignItems: "center" }}>
              <PressableScale onPress={onDismiss}>
                <Text
                  type="default"
                  weight="medium"
                  style={{ color: fg }}
                >
                  {t('playground.error.tryAgainLater')}
                </Text>
              </PressableScale>
              <PressableScale onPress={handleContactSupport}>
                <Text
                  type="sm"
                  style={{
                    color: muted,
                    textDecorationLine: "underline",
                  }}
                >
                  {t('playground.error.contactSupport')}
                </Text>
              </PressableScale>
            </View>
          </View>
        </Activity>

        {/* Generic error */}
        <Activity mode={errorType === "generic" ? "visible" : "hidden"}>
          <View style={{ alignItems: "center", gap: 16 }}>
            <Text
              type="lg"
              weight="semibold"
              style={{ textAlign: "center", color: fg }}
            >
              {t('common.somethingWentWrong')}
            </Text>
            <Text
              type="sm"
              style={{ color: muted, textAlign: "center" }}
            >
              {errorMessage || t('common.unexpectedError')}
            </Text>
            <PressableScale onPress={onDismiss}>
              <Text type="default" weight="medium" style={{ color: "#3563E9" }}>
                {t('common.tryAgain')}
              </Text>
            </PressableScale>
          </View>
        </Activity>
      </View>
    </SafeAreaView>
  );
}

/**
 * Helper function to determine error type from mutation error and subscription tier
 */
export function getPlaygroundErrorType(
  errorMessage: string | undefined,
  isFreeTier: boolean
): PlaygroundErrorType {
  if (errorMessage === "LIMIT_REACHED") {
    return isFreeTier ? "limit_reached_free" : "limit_reached_subscribed";
  }
  return "generic";
}
