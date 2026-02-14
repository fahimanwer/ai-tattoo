import { useLargeHeaderOptions } from "@/src/constants/navigation-options";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function HomeLayout() {
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
          title: "Profile",
          headerLargeTitle: true,
          headerShown: Platform.OS === "ios",
        }}
      />
    </Stack>
  );
}
