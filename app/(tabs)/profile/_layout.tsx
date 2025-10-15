import { useLargeHeaderOptions } from "@/constants/navigation-options";
import { Stack } from "expo-router";

export default function HomeLayout() {
  const largeHeaderOptions = useLargeHeaderOptions();

  return (
    <Stack
      screenOptions={{
        ...largeHeaderOptions,
        title: "Profile",
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
