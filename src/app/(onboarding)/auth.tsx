import { AuthContent } from "@/src/components/auth/AuthContent";
import { Color } from "@/src/constants/TWPalette";
import { AppSettingsContext } from "@/src/context/AppSettings";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { use } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUserData } from "../../hooks/useUserData";

/**
 * Auth screen for onboarding flow (post-purchase).
 * Lives inside the onboarding protected segment so when isOnboarded is set to true,
 * the entire onboarding segment (including this screen) unmounts together.
 */
export default function OnboardingAuth() {
  const { setIsOnboarded } = use(AppSettingsContext);
  const { refresh } = useUserData();
  const { bottom } = useSafeAreaInsets();

  const handleSuccess = async () => {
    await refresh();
    // Just set isOnboarded - the guard will unmount this screen and show tabs
    setIsOnboarded(true);
  };

  return (
    <>
      <Stack.Screen
        options={{
          gestureEnabled: false,
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
        <AuthContent
          title="One more step!"
          description="Create an account to activate your subscription. This helps us track your subscription and provide you with the best experience."
          onSuccess={handleSuccess}
          style={{ marginBottom: bottom }}
        />
      </View>
    </>
  );
}
