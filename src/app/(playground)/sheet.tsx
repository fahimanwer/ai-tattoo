import { router, Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Sheet() {
  function handleDismiss() {
    router.back();
  }

  return (
    <>
      <Stack.Screen
        options={{
          unstable_headerLeftItems: () => [
            {
              type: "button",
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
