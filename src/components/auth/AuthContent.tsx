import { authClient } from "@/lib/auth-client";
import { AppleSignInButton } from "@/src/components/ui/AppleSignInButton";
import SignInWithGoogleButton from "@/src/components/ui/SignInWithGoogleButton";
import { Text } from "@/src/components/ui/Text";
import { Link } from "expo-router";
import { useState } from "react";
import { View, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface AuthContentProps {
  /** Title to display */
  title?: string;
  /** Description text */
  description?: string;
  /** Callback when authentication succeeds */
  onSuccess: () => void;
  /** Container style override */
  style?: ViewStyle;
}

/**
 * Shared auth content component used by both auth-sheet and onboarding auth.
 * Handles the UI and auth flow, while the parent route controls presentation.
 */
export function AuthContent({
  title = "Welcome back!",
  description = "Please choose your preferred sign in method",
  onSuccess,
  style,
}: AuthContentProps) {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View
      style={[
        {
          gap: 16,
          paddingHorizontal: 16,
          paddingBottom: insets.bottom,
          paddingTop: insets.top,
        },
        style,
      ]}
    >
      <View style={{ gap: 8, marginBottom: 16 }}>
        <Text type="3xl" weight="bold">
          {title}
        </Text>
        <Text type="default">{description}</Text>
      </View>

      <SignInWithGoogleButton
        isLoading={isLoading}
        onPress={async () => {
          try {
            setIsLoading(true);
            await authClient.signIn.social({
              provider: "google",
              callbackURL: "/(tabs)/home",
            });
            onSuccess();
          } catch (error) {
            console.error("Google sign-in error:", error);
          } finally {
            setIsLoading(false);
          }
        }}
        disabled={isLoading}
      />
      <AppleSignInButton onSuccess={onSuccess} />

      <Animated.View
        style={{
          marginTop: 24,
          alignItems: "center",
          width: "100%",
        }}
        pointerEvents="auto"
      >
        <Text
          type="sm"
          style={{
            textAlign: "center",
            opacity: 0.5,
            lineHeight: 20,
          }}
        >
          By continuing you agree to our{" "}
          <Link href="/terms-of-service" asChild>
            <Text type="sm" style={{ textDecorationLine: "underline" }}>
              Terms of Service
            </Text>
          </Link>
        </Text>
      </Animated.View>
    </View>
  );
}
