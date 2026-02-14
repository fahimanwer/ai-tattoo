import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function PaywallLayout() {
  const isIOS = Platform.OS === "ios";

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          presentation: "modal",
          headerTransparent: isIOS,
          headerStyle: {
            backgroundColor: isIOS ? "transparent" : "#000000",
          },
          headerBlurEffect: undefined,
        }}
      />
    </Stack>
  );
}
