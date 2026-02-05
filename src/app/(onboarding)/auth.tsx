import { authClient } from "@/lib/auth-client";
import { AuthContent } from "@/src/components/auth/AuthContent";
import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import { AppSettingsContext } from "@/src/context/AppSettings";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { use, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUserData } from "../../hooks/useUserData";

/**
 * Auth screen for onboarding flow (post-purchase).
 * Lives inside the onboarding protected segment so when isOnboarded is set to true,
 * the entire onboarding segment (including this screen) unmounts together.
 */
export default function OnboardingAuth() {
  const { setIsOnboarded } = use(AppSettingsContext);
  const { syncAfterAuth } = useUserData();
  const { bottom } = useSafeAreaInsets();
  const [isSyncing, setIsSyncing] = useState(false);
  const { from } = useLocalSearchParams();

  const handleSuccess = async () => {
    // Get the authenticated user's ID
    const session = await authClient.getSession();
    const userId = session?.data?.user?.id;

    if (userId) {
      if (from === "onboarding") {
        setIsOnboarded(true);
        return;
      }

      // Show loading state during sync
      setIsSyncing(true);

      // Link RevenueCat with Better Auth user ID + restore purchases + refresh usage
      await syncAfterAuth(userId);

      setIsSyncing(false);
    }

    // Just set isOnboarded - the guard will unmount this screen and show tabs
    setIsOnboarded(true);
  };

  return (
    <>
      <Stack.Screen
        options={{
          gestureEnabled: from === "onboarding" ? true : false,
          headerShown: false,
        }}
      />
      {/* Background */}
      <View style={StyleSheet.absoluteFill}>
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              zIndex: 1,
              experimental_backgroundImage: `linear-gradient(to bottom, transparent 0%, ${Color.grayscale[50]} 50%)`,
            },
          ]}
        />
        <Image
          source={{
            uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/paywall-bg.avif",
          }}
          contentFit="cover"
          contentPosition="center"
          style={[StyleSheet.absoluteFill]}
        />
      </View>

      <View style={{ flex: 1, justifyContent: "flex-end", zIndex: 2 }}>
        {isSyncing ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              paddingBottom: bottom + 40,
            }}
          >
            <ActivityIndicator size="large" color="#fff" />
            <Text type="lg" weight="medium" style={{ color: "#fff" }}>
              Activating your subscription...
            </Text>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }} />
            <AuthContent
              title={from === "onboarding" ? "Welcome back!" : "One more step!"}
              description={
                from === "onboarding"
                  ? "Please sign in to continue your journey."
                  : "Please sign in to activate your subscription. This helps us track your subscription and provide you with the best experience."
              }
              onSuccess={handleSuccess}
              style={{ marginBottom: bottom }}
            />
          </View>
        )}
      </View>
    </>
  );
}
