import { useLargeHeaderOptions } from "@/src/constants/navigation-options";
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
          presentation: "modal",
          // this is crashing when dismissing the sheet. no idea why maybe re-enable later
          // sheetGrabberVisible: true,
          // sheetAllowedDetents: [0.8],
          // contentStyle: {
          //   backgroundColor: isLiquidGlassAvailable() ? "transparent" : "black",
          // },
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
