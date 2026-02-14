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

interface OnboardingButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  isLastStep?: boolean;
  controlSizeProp?: "small" | "regular" | "mini" | "large" | "extraLarge";
  fullWidth?: boolean;
}

export function OnboardingButton({
  title,
  onPress,
  loading = false,
  disabled: isDisabled = false,
  isLastStep = false,
  controlSizeProp = "large",
  fullWidth = true,
}: OnboardingButtonProps) {
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
          tint(isLastStep ? "#3563E9" : "white"),
          controlSize(controlSizeProp),
          disabled(buttonDisabled),
        ]}
        onPress={() => {
          if (buttonDisabled) return;
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          onPress();
        }}
      >
        <Label
          title={loading ? "" : title}
          modifiers={[
            frame({ width: fullWidth ? width - 64 : undefined }),
            foregroundStyle("black"),
            font({ weight: "bold" }),
          ]}
        />
      </SwiftUIButton>
    </Host>
  );
}
