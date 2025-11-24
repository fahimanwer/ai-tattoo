import { authClient } from "@/lib/auth-client";
import { AppleSignInButton } from "@/src/components/ui/AppleSignInButton";
import SignInWithGoogleButton from "@/src/components/ui/SignInWithGoogleButton";
import { Text } from "@/src/components/ui/Text";
import { Link, useRouter } from "expo-router";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AuthSheet() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View
      style={{
        gap: 16,
        paddingHorizontal: 16,
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
      }}
    >
      <View style={{ gap: 8, marginBottom: 16 }}>
        <Text type="3xl" weight="bold">
          Welcome back!
        </Text>
        <Text type="default">Please choose your preferred sign in method</Text>
      </View>

      <SignInWithGoogleButton
        onPress={async () => {
          try {
            await authClient.signIn.social({
              provider: "google",
              callbackURL: "/(tabs)/home",
            });
            router.dismiss();
          } catch (error) {
            console.error("Google sign-in error:", error);
          }
        }}
      />
      <AppleSignInButton onSuccess={() => router.dismiss()} />

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
