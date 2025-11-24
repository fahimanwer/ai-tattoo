import { useLargeHeaderOptions } from "@/src/constants/navigation-options";
import { Stack } from "expo-router";

export default function TattoosLayout() {
  const largeHeaderOptions = useLargeHeaderOptions();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          ...largeHeaderOptions,
          title: "My Tattoos",
        }}
      />
      <Stack.Screen
        name="details/index"
        options={{
          ...largeHeaderOptions,
          presentation: "modal",
          headerShown: true,
          headerLargeTitle: false,
          title: "",
        }}
      />
    </Stack>
  );
}
