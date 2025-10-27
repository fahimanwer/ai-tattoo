import { useGradualAnimation } from "@/hooks/useGradualAnimation";
import { theme } from "@/theme/theme";
import { Button, Host, HStack, Image, Text } from "@expo/ui/swift-ui";
import { fixedSize, padding } from "@expo/ui/swift-ui/modifiers";
import { Stack } from "expo-router";
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { InputControls } from "./InputControls";

const WIDTH = Dimensions.get("screen").width;

export function PlaygroundScreen() {
  const { fakeView } = useGradualAnimation();

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
      <View style={styles.container}>
        <View style={{ flex: 1 }} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
            padding: 16,
          }}
        >
          <View style={{ width: WIDTH - 32 }}>
            <InputControls />
          </View>
        </View>

        <Animated.View style={fakeView} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  listStyle: {
    padding: 16,
    gap: 16,
  },
  textInput: {
    color: "white",
    flexGrow: 1,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
});
