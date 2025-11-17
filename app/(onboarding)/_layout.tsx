import { Redirect, Stack } from "expo-router";
import { Platform } from "react-native";

export default function OnboardingLayout() {
  if (Platform.OS === "web") {
    return <Redirect href="/(desktop)" />;
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
