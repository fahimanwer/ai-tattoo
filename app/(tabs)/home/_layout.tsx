import { ContextMenuProfile } from "@/components/ContextMenu";
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
        name="index"
        options={{
          title: "Home",
          headerLeft: () => <ContextMenuProfile />,
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerLargeTitle: false,
        }}
      />
      <Stack.Screen
        name="choose-photo"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerLargeTitle: false,
        }}
      />
      <Stack.Screen
        name="tattoo-result"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerLargeTitle: false,
        }}
      />
    </Stack>
  );
}
