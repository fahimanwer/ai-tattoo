import { Icon } from "@/components/ui/Icon";
import { useLargeHeaderOptions } from "@/constants/navigation-options";
import { useUsageLimit } from "@/hooks/useUsageLimit";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack, useRouter } from "expo-router";
import { Pressable, View } from "react-native";

function ButtonToCreateTattoo() {
  const router = useRouter();
  const { isLimitReached } = useUsageLimit();

  const goToCreateTattoo = () => {
    router.push("/(new)/select-body-part");
  };

  console.log("isLimitReached", isLimitReached);
  // Don't show button if limit is reached
  if (isLimitReached) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Pressable style={{ paddingLeft: 8 }} onPress={goToCreateTattoo}>
        <Icon symbol="plus" color={"#007AFF"} />
      </Pressable>
    </View>
  );
}

export default function TattoosLayout() {
  const largeHeaderOptions = useLargeHeaderOptions();

  return (
    <Stack
      screenOptions={{
        ...largeHeaderOptions,
        title: "My Tattoos",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerRight: () => <ButtonToCreateTattoo />,
        }}
      />
      <Stack.Screen
        name="[id]"
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
