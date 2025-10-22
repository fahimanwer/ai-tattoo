import { useLargeHeaderOptions } from "@/constants/navigation-options";
import { isLiquidGlassAvailable } from "expo-glass-effect";
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
          presentation: "formSheet",
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.3, 0.5, 1],
          sheetInitialDetentIndex: 0,
          contentStyle: {
            backgroundColor: isLiquidGlassAvailable() ? "transparent" : "black",
          },
        }}
      />
      <Stack.Screen
        name="about/photo"
        options={{
          headerLargeTitle: false,
          presentation: "fullScreenModal",
        }}
      />
    </Stack>
  );
}
