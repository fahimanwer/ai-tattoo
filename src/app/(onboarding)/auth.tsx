import { AuthContent } from "@/src/components/auth/AuthContent";
import { AppSettingsContext } from "@/src/context/AppSettings";
import { Stack } from "expo-router";
import { use } from "react";
import { useUserData } from "../../hooks/useUserData";

/**
 * Auth screen for onboarding flow (post-purchase).
 * Lives inside the onboarding protected segment so when isOnboarded is set to true,
 * the entire onboarding segment (including this screen) unmounts together.
 */
export default function OnboardingAuth() {
  const { setIsOnboarded } = use(AppSettingsContext);
  const { refresh } = useUserData();

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
      <AuthContent
        title="One more step!"
        description="Create an account to activate your subscription"
        onSuccess={handleSuccess}
        style={{ flex: 1, paddingTop: 60, backgroundColor: "#000" }}
      />
    </>
  );
}
