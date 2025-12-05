import { useLargeHeaderOptions } from "@/src/constants/navigation-options";
import { Stack } from "expo-router";

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
          title: "Get Inspired",
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="about/style"
        options={{
          title: "",
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
        name="about/photo"
        options={{
          headerLargeTitle: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
