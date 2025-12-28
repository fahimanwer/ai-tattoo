import { Button, Host, Image as SwiftUIImage } from "@expo/ui/swift-ui";
import {
  background,
  buttonStyle,
  frame,
  padding,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import { isLiquidGlassAvailable } from "expo-glass-effect";

type SliderHandleProps = {
  size: number;
};

export function SliderHandle({ size }: SliderHandleProps) {
  return (
    <Host matchContents>
      <Button
        onPress={() => {}}
        modifiers={[
          tint("white"),
          buttonStyle(isLiquidGlassAvailable() ? "glass" : "bordered"),
          background(isLiquidGlassAvailable() ? "transparent" : "#000000"),
          frame({ width: size, height: size }),
          padding({ vertical: 0, horizontal: 0 }),
        ]}
      >
        <SwiftUIImage
          systemName="chevron.left.chevron.right"
          size={24}
          modifiers={[frame({ width: 20, height: 30 })]}
        />
      </Button>
    </Host>
  );
}
