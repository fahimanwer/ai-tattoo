import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import { useRouter } from "expo-router";
import { PressableScale } from "pressto";
import { Activity } from "react";
import { Linking, View } from "react-native";
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
   * @default "support@inkigo.app"
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
  supportEmail = "beto@codewithbeto.dev",
}: PlaygroundErrorProps) {
  const router = useRouter();

  const handleUpgrade = () => {
    onDismiss?.();
    router.push("/(paywall)");
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
              style={{ textAlign: "center", color: Color.zinc[100] }}
            >
              Keep creating without limits
            </Text>
            <Text
              type="sm"
              style={{ color: Color.zinc[400], textAlign: "center" }}
            >
              {
                "You've reached your current generation limit. Upgrade now to explore variations, refine designs, and keep creating without waiting."
              }
            </Text>
            <PressableScale onPress={handleUpgrade}>
              <Text
                type="default"
                weight="semibold"
                style={{ color: "yellow" }}
              >
                Unlock unlimited designs →
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
              style={{ textAlign: "center", color: Color.zinc[100] }}
            >
              {"You've reached your limit for this period"}
            </Text>
            <Text
              type="sm"
              style={{ color: Color.zinc[400], textAlign: "center" }}
            >
              {
                "Your plan's generation limit has been reached. Your limit will reset at the start of your next billing period."
              }
            </Text>
            <View style={{ gap: 8, alignItems: "center" }}>
              <PressableScale onPress={onDismiss}>
                <Text
                  type="default"
                  weight="medium"
                  style={{ color: Color.zinc[300] }}
                >
                  Try again later
                </Text>
              </PressableScale>
              <PressableScale onPress={handleContactSupport}>
                <Text
                  type="sm"
                  style={{
                    color: Color.zinc[500],
                    textDecorationLine: "underline",
                  }}
                >
                  Contact support
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
              style={{ textAlign: "center", color: Color.zinc[100] }}
            >
              Something went wrong
            </Text>
            <Text
              type="sm"
              style={{ color: Color.zinc[400], textAlign: "center" }}
            >
              {errorMessage || "An unexpected error occurred"}
            </Text>
            <PressableScale onPress={onDismiss}>
              <Text type="default" weight="medium" style={{ color: "yellow" }}>
                Try again
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
