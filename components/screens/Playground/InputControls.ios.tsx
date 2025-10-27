import { theme } from "@/theme/theme";
import {
  Button,
  Host,
  HStack,
  Image,
  TextField,
  TextFieldRef,
} from "@expo/ui/swift-ui";
import { fixedSize, glassEffect, padding } from "@expo/ui/swift-ui/modifiers";
import { useRef } from "react";
import { Dimensions } from "react-native";
const WIDTH = Dimensions.get("screen").width;

export function InputControls() {
  const textFieldRef = useRef<TextFieldRef>(null);

  return (
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
            ref={textFieldRef}
            placeholder="Type a message..."
            numberOfLines={2}
            multiline
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
            await textFieldRef?.current?.blur();
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
  );
}
