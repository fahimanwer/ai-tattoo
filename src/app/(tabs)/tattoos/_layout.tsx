import { useLargeHeaderOptions } from "@/src/constants/navigation-options";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function TattoosLayout() {
  const largeHeaderOptions = useLargeHeaderOptions();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          ...largeHeaderOptions,
          title: "My Tattoos",
          headerLargeTitle: false,
          headerShown: Platform.OS === "ios",
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
