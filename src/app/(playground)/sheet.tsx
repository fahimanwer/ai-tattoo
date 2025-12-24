import { PlaygroundContext } from "@/src/context/PlaygroundContext";
import { router, Stack } from "expo-router";
import { use } from "react";
import { Pressable, Text, View } from "react-native";

export default function Sheet() {
  const { focusInput } = use(PlaygroundContext);

  function handleDismiss() {
    focusInput();
    router.back();
    // Focus input after sheet dismisses
  }

  return (
    <>
      <Stack.Screen
        options={{
          unstable_headerLeftItems: () => [
            {
              type: "button",
              variant: "plain",
              label: "Close",
              icon: {
                name: "xmark",
                type: "sfSymbol",
              },
              onPress: handleDismiss,
            },
          ],
        }}
      />
      <View style={{ flex: 1, padding: 16 }}>
        <Text>Sheet</Text>
        <Pressable onPress={handleDismiss}>
          <Text>Close & Focus Input</Text>
        </Pressable>
      </View>
    </>
  );
}
