import { theme } from "@/theme/theme";
import { Button, Host, HStack, Image, Text } from "@expo/ui/swift-ui";
import { fixedSize, padding } from "@expo/ui/swift-ui/modifiers";
import { Stack } from "expo-router";
import { View } from "react-native";

export function PlaygroundScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Host matchContents>
                <HStack spacing={theme.space8}>
                  <Button
                    variant="glass"
                    controlSize="small"
                    onPress={() => {}}
                  >
                    <Image
                      systemName="square.and.arrow.up"
                      size={theme.fontSize20}
                      color="white"
                      modifiers={[padding({ vertical: 2 })]}
                    />
                  </Button>
                  <Button
                    variant="glassProminent"
                    controlSize="mini"
                    onPress={() => {}}
                    modifiers={[fixedSize()]}
                  >
                    <HStack modifiers={[padding({ vertical: 4 })]}>
                      <Text>Save</Text>
                    </HStack>
                  </Button>
                </HStack>
              </Host>
            </View>
          ),
        }}
      />
      <View>
        <Host matchContents>
          <Text color="white">Playground</Text>
        </Host>
      </View>
    </>
  );
}
