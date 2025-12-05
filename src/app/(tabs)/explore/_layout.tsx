import { useLargeHeaderOptions } from "@/src/constants/navigation-options";
import { Stack } from "expo-router";

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
