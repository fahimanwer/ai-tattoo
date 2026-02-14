import { useLargeHeaderOptions } from "@/src/constants/navigation-options";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function ExploreLayout() {
  const largeHeaderOptions = useLargeHeaderOptions();

  return (
    <Stack
      screenOptions={{
        ...largeHeaderOptions,
        headerLargeTitle: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Explore",
          headerShown: Platform.OS === "ios",
        }}
      />
      <Stack.Screen
        name="image-preview"
        options={{
          presentation: "card",
        }}
      />
    </Stack>
  );
}
