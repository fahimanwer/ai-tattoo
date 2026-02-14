import { authClient } from "@/lib/auth-client";
import { featuredTattoos } from "@/lib/featured-tattoos";
import { AppleSignInButton } from "@/src/components/ui/AppleSignInButton";
import SignInWithGoogleButton from "@/src/components/ui/SignInWithGoogleButton";
import { Text } from "@/src/components/ui/Text";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { View, ViewStyle } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
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

  // Easter egg: pick a random tattoo for curious users who expand the sheet
  const randomTattoo = useMemo(() => {
    const allImages = featuredTattoos.flatMap((t) => t.gallery);
    return allImages[Math.floor(Math.random() * allImages.length)];
  }, []);

  return (
    <View
      style={[
        {
          flex: 1,
          gap: 16,
          paddingHorizontal: 16,
          paddingBottom: insets.bottom,
          paddingTop: insets.top,
        },
        style,
      ]}
    >
      <View
        style={{
          flex: 1,
          gap: 8,
          overflow: "hidden",
        }}
      >
        <Text type="3xl" weight="bold">
          {title}
        </Text>
        <Text type="default">
          {description}
        </Text>

        {/* Easter egg: visible when users expand the sheet */}
        <Animated.View
          entering={FadeIn.duration(600)}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 12,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: randomTattoo.uri }}
              style={{ width: 80, height: 80 }}
            />
          </View>
          <Text type="default" weight="semibold">
            Ink-ognito mode
          </Text>
          <Text
            type="sm"
            style={{ opacity: 0.6, textAlign: "center" }}
          >
            Your designs stay with you, not with us.
          </Text>
        </Animated.View>
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
            <Text
              type="sm"
              style={{ textDecorationLine: "underline" }}
            >
              Terms of Service
            </Text>
          </Link>
        </Text>
      </Animated.View>
    </View>
  );
}
