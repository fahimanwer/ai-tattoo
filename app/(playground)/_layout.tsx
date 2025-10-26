import { HeaderButton } from "@/components/ui/HeaderButtons/HeaderButton";
import { router, Stack } from "expo-router";

export default function PlaygroundLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerLeft: () => (
            <HeaderButton
              imageProps={{ systemName: "xmark" }}
              buttonProps={{
                onPress: () => router.back(),
                variant: "glass",
              }}
            />
          ),
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
