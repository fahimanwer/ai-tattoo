import { Stack } from "expo-router";

export default function PlaygroundLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ presentation: "card" }} />
      <Stack.Screen
        name="camera-view"
        options={{
          presentation: "card",
          headerStyle: { backgroundColor: "transparent" },
          headerBlurEffect: undefined,
          title: "",
        }}
      />
    </Stack>
  );
}
