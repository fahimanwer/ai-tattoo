import { isGlassEffectAPIAvailable } from "expo-glass-effect";
import { Stack } from "expo-router";

export default function PlaygroundLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        headerBlurEffect: isGlassEffectAPIAvailable() ? undefined : "dark",
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="index" options={{ presentation: "card" }} />
      <Stack.Screen
        name="camera-view"
        options={{
          presentation: "card",
          title: "",
        }}
      />
    </Stack>
  );
}
