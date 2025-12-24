import { Host, Image, Button as SwiftUIButton } from "@expo/ui/swift-ui";
import {
  background,
  buttonStyle,
  clipShape,
  controlSize,
  padding,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { SessionHistoryListFooterProps } from "./SessionHistoryListFooter.types";

export function SessionHistoryListFooter({
  onPress,
}: SessionHistoryListFooterProps) {
  return (
    <Host matchContents>
      <SwiftUIButton
        onPress={onPress}
        modifiers={[
          tint("white"),
          buttonStyle(isLiquidGlassAvailable() ? "glass" : "bordered"),
          background(isLiquidGlassAvailable() ? "transparent" : "#000000"),
          clipShape("circle"),
          controlSize("small"),
        ]}
      >
        <Image
          systemName="square.and.pencil"
          size={20}
          modifiers={[
            padding({ vertical: 6, horizontal: 0 }),
            clipShape("circle"),
          ]}
        />
      </SwiftUIButton>
    </Host>
  );
}
