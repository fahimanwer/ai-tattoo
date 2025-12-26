import { authClient } from "@/lib/auth-client";
import { AppleSignInButton } from "@/src/components/ui/AppleSignInButton";
import SignInWithGoogleButton from "@/src/components/ui/SignInWithGoogleButton";
import { Text } from "@/src/components/ui/Text";
import { AppSettingsContext } from "@/src/context/AppSettings";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { use } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUserData } from "../hooks/useUserData";

export default function AuthSheet() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { required } = useLocalSearchParams<{ required?: string }>();
  const { setIsOnboarded } = use(AppSettingsContext);
  const { refresh } = useUserData();

  // Required mode: user just purchased during onboarding, must create account
  const isRequired = required === "true";

  // Handle successful authentication
  const handleAuthSuccess = async () => {
    if (isRequired) {
      // Complete onboarding after successful auth following purchase
      setIsOnboarded(true);
      await refresh();
      router.dismissAll();
      router.replace("/(tabs)/(home)");
    } else {
      await refresh();
      router.dismiss();
    }
  };

  return (
    <>
      {/* Disable gesture dismiss when authentication is required */}
      {isRequired && (
        <Stack.Screen
          options={{
            gestureEnabled: false,
          }}
        />
      )}

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
            {isRequired ? "One more step!" : "Welcome back!"}
          </Text>
          <Text type="default">
            {isRequired
              ? "Create an account to activate your subscription"
              : "Please choose your preferred sign in method"}
          </Text>
        </View>

        <SignInWithGoogleButton
          onPress={async () => {
            try {
              await authClient.signIn.social({
                provider: "google",
                callbackURL: "/(tabs)/home",
              });
              handleAuthSuccess();
            } catch (error) {
              console.error("Google sign-in error:", error);
            }
          }}
        />
        <AppleSignInButton onSuccess={handleAuthSuccess} />

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
    </>
  );
}
