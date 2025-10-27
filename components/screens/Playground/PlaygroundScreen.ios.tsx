import { theme } from "@/theme/theme";
import {
  Button,
  Host,
  HStack,
  Image,
  Text,
  TextField,
  TextFieldRef,
} from "@expo/ui/swift-ui";
import { fixedSize, glassEffect, padding } from "@expo/ui/swift-ui/modifiers";
import { Stack } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { useKeyboardHandler } from "react-native-keyboard-controller";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const PADDING_BOTTOM = 20;

const WIDTH = Dimensions.get("screen").width;

const useGradualAnimation = () => {
  const height = useSharedValue(PADDING_BOTTOM);

  useKeyboardHandler(
    {
      onMove: (e) => {
        "worklet";
        // set height to min 10
        height.value = Math.max(e.height, PADDING_BOTTOM);
      },
      onEnd: (e) => {
        "worklet";
        height.value = e.height;
      },
    },
    []
  );
  return { height };
};

export function PlaygroundScreen() {
  const { height } = useGradualAnimation();
  const textRef = useRef<TextFieldRef>(null);
  const [inputIsFocused, setInputIsFocused] = useState(false);

  const fakeView = useAnimatedStyle(() => {
    return {
      height: Math.abs(height.value),
      marginBottom: height.value > 0 ? 0 : PADDING_BOTTOM,
    };
  }, []);
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
          {/* <GlassView
            glassEffectStyle="regular"
            style={{
              flexGrow: 1,
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 20,
            }}
            isInteractive={true}
          >
            <TextInput
              placeholder="Type a message..."
              style={styles.textInput}
              cursorColor={"oragne"}
            />
          </GlassView> */}

          <View style={{ width: WIDTH - 32 }}>
            <Host matchContents style={{ width: WIDTH - 32 }}>
              <HStack spacing={theme.space8} alignment="bottom">
                <HStack
                  modifiers={[
                    padding({ horizontal: 16, vertical: 13 }),
                    glassEffect({
                      glass: {
                        variant: "regular",
                        interactive: true,
                      },
                      shape: "capsule",
                    }),
                  ]}
                >
                  <TextField
                    ref={textRef}
                    placeholder="Type a message..."
                    numberOfLines={2}
                    multiline
                    onChangeFocus={() => {
                      setInputIsFocused(true);
                    }}
                    modifiers={
                      [
                        // padding({ horizontal: 16, vertical: 13 }),
                        // glassEffect({
                        //   glass: {
                        //     variant: "regular",
                        //     interactive: true,
                        //   },
                        //   shape: "capsule",
                        // }),
                      ]
                    }
                  />
                  <Button
                    onPress={() => {
                      console.log("mic");
                    }}
                    controlSize="small"
                    variant="accessoryBar"
                  >
                    <HStack modifiers={[padding({ vertical: 2 })]}>
                      <Image
                        systemName="mic.fill"
                        size={theme.fontSize20}
                        color="white"
                      />
                    </HStack>
                  </Button>
                </HStack>

                <Button
                  variant="glass"
                  controlSize="small"
                  onPress={async () => {
                    await textRef.current?.blur();
                  }}
                >
                  <Image
                    systemName="keyboard.chevron.compact.down.fill"
                    size={theme.fontSize20}
                    color="white"
                    modifiers={[padding({ vertical: 7 })]}
                  />
                </Button>
                <Button
                  variant="glassProminent"
                  controlSize="mini"
                  onPress={() => {}}
                  modifiers={[fixedSize()]}
                >
                  <HStack modifiers={[padding({ vertical: 4 })]}>
                    <Image
                      systemName="paperplane.fill"
                      size={theme.fontSize20}
                      color="white"
                      modifiers={[padding({ vertical: 2 })]}
                    />
                  </HStack>
                </Button>
              </HStack>
            </Host>
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
