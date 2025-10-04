import { BodyPartSelection } from "@/components/screens/BodyPartSelection";
import { HeaderButton } from "@/components/ui/HeaderButtons/HeaderButton";
import { fixedSize, frame } from "@expo/ui/swift-ui/modifiers";
import { router, Stack } from "expo-router";

export default function BodyPartSelectionScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <HeaderButton
              imageProps={{
                systemName: "chevron.left",
                modifiers: [frame({ width: 20, height: 30 }), fixedSize()],
              }}
              buttonProps={{
                onPress: () => {
                  if (!router.canGoBack()) {
                    router.replace("/(tabs)/home");
                  } else {
                    router.back();
                  }
                },
              }}
            />
          ),
        }}
      />
      <BodyPartSelection />
    </>
  );
}
