import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerBlurEffect: undefined,
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTintColor: "white",
          title: "",
        }}
      />
      <Stack.Screen
        name="auth"
        options={{
          headerShown: false,
          presentation: "card",
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}
