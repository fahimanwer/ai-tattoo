import { useLargeHeaderOptions } from "@/constants/navigation-options";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack } from "expo-router";

export default function TattoosLayout() {
  const largeHeaderOptions = useLargeHeaderOptions();

  return (
    <Stack
      screenOptions={{
        ...largeHeaderOptions,
        title: "My Tattoos",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="details/index"
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
    </Stack>
  );
}
