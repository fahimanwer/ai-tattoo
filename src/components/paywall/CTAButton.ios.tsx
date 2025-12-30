import { Host, Label, Button as SwiftUIButton } from "@expo/ui/swift-ui";
import {
  buttonStyle,
  controlSize,
  disabled,
  font,
  foregroundStyle,
  frame,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import * as Haptics from "expo-haptics";
import { Dimensions } from "react-native";

interface CTAButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function CTAButton({
  title,
  onPress,
  loading = false,
  disabled: isDisabled = false,
}: CTAButtonProps) {
  const { width } = Dimensions.get("window");
  const buttonDisabled = loading || isDisabled;

  return (
    <Host
      style={{
        width: "100%",
        height: 60,
      }}
    >
      <SwiftUIButton
        modifiers={[
          buttonStyle(
            isLiquidGlassAvailable() ? "glassProminent" : "borderedProminent"
          ),
          tint("yellow"),
          controlSize("large"),
          disabled(buttonDisabled),
        ]}
        onPress={() => {
          if (buttonDisabled) return;
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          onPress();
        }}
      >
        <Label
          title={loading ? "Processing..." : title}
          modifiers={[
            frame({ width: width - 64 }),
            foregroundStyle("black"),
            font({ weight: "bold" }),
          ]}
        />
      </SwiftUIButton>
    </Host>
  );
}
