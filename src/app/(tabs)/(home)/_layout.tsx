import { useLargeHeaderOptions } from "@/src/constants/navigation-options";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function ProfileLayout() {
  const largeHeaderOptions = useLargeHeaderOptions();

  return (
    <Stack
      screenOptions={{
        ...largeHeaderOptions,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Tattoo Design AI",
          headerLargeTitle: true,
          headerShown: Platform.OS === "ios",
        }}
      />
      <Stack.Screen
        name="about/style"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerLargeTitle: false,
        }}
      />
      <Stack.Screen
        name="body-part"
        options={{
          title: "Body Part",
          headerBackButtonDisplayMode: "minimal",
          headerLargeTitle: false,
        }}
      />
      <Stack.Screen
        name="about/learn-more"
        options={{
          headerLargeTitle: true,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="about/image-preview"
        options={{
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="about/sketch-designs"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerLargeTitle: false,
        }}
      />
    </Stack>
  );
}
