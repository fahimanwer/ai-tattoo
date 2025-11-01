import { theme } from "@/theme/theme";
import {
  Button,
  Host,
  HStack,
  Image,
  Text as SwiftUIText,
} from "@expo/ui/swift-ui";
import { fixedSize, padding } from "@expo/ui/swift-ui/modifiers";
import { View } from "react-native";

interface PlaygroundScreenHeaderRightProps {
  onSave: () => void;
  onShare: () => void;
  isSaveDisabled: boolean;
  onReset: () => void;
}
export function PlaygroundScreenHeaderRight({
  onSave,
  onShare,
  isSaveDisabled,
  onReset,
}: PlaygroundScreenHeaderRightProps) {
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <Host matchContents>
        <HStack spacing={theme.space8}>
          <Button variant="glass" controlSize="small" onPress={onReset}>
            <Image
              systemName="arrow.counterclockwise"
              size={theme.fontSize20}
              color="white"
              modifiers={[padding({ vertical: 2 })]}
            />
          </Button>
          <Button variant="glass" controlSize="small" onPress={onShare}>
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
            onPress={onSave}
            disabled={isSaveDisabled}
            modifiers={[fixedSize()]}
          >
            <HStack modifiers={[padding({ vertical: 4 })]}>
              <SwiftUIText color="white">Save</SwiftUIText>
            </HStack>
          </Button>
        </HStack>
      </Host>
    </View>
  );
}
