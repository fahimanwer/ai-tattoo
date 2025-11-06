import { useLargeHeaderOptions } from "@/constants/navigation-options";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  const largeHeaderOptions = useLargeHeaderOptions();

  return (
    <Stack
      screenOptions={{
        ...largeHeaderOptions,
      }}
    >
      <Stack.Screen
        name="select-body-part"
        options={{
          title: "Select Body Part",
          headerLargeTitle: true,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name="select-tattoo"
        options={{
          title: "Select Tattoo Style",
          headerBackButtonDisplayMode: "minimal",
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="add-details"
        options={{
          title: "Add Details",
          headerBackButtonDisplayMode: "minimal",
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="generation-result"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerShown: false,
          presentation: "fullScreenModal",
        }}
      />
    </Stack>
  );
}
