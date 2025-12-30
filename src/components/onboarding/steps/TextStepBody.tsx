import { inputFocusFanfareHaptic } from "@/lib/haptics-patterns.ios";
import * as NativeCoreHaptics from "@/modules/native-core-haptics";
import * as Haptics from "expo-haptics";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, { type CSSAnimationKeyframes } from "react-native-reanimated";
import { Input } from "../../ui/Input";
import type { TextStep } from "../onboardingTypes";

type TextStepBodyProps = {
  step: TextStep;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
};

const glowIn: CSSAnimationKeyframes = {
  from: {
    boxShadow: "0 0 0 0 rgba(255, 255, 255, 0)",
  },
  to: {
    boxShadow: "0 0 32px 4px rgba(255, 255, 255, 0.5)",
  },
};

const glowOut: CSSAnimationKeyframes = {
  from: {
    boxShadow: "0 0 32px 4px rgba(255, 255, 255, 0.35)",
  },
  to: {
    boxShadow: "0 0 0 0 rgba(255, 255, 255, 0)",
  },
};

export function TextStepBody({
  step,
  value,
  onChange,
  onSubmit,
}: TextStepBodyProps) {
  useEffect(() => {
    NativeCoreHaptics.default.playPattern(inputFocusFanfareHaptic);
  }, []);

  return (
    <View style={{ paddingTop: 46, width: "100%", paddingHorizontal: 32 }}>
      <Animated.View
        style={{
          borderRadius: 9999,
          animationName: value.length > 0 ? glowIn : glowOut,
          animationDuration: "400ms",
          animationFillMode: "forwards",
          animationTimingFunction: "ease-out",
        }}
      >
        <Input
          autoFocus
          value={value}
          cursorColor={"yellow"}
          onChangeText={onChange}
          maxLength={25}
          textContentType="name"
          placeholder={step.placeholder}
          size="lg"
          variant="subtle"
          radius="full"
          color="neutral"
          style={{
            color: "white",
          }}
          onSubmitEditing={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            onSubmit?.();
          }}
          returnKeyType="go"
          enablesReturnKeyAutomatically={true}
        />
      </Animated.View>
    </View>
  );
}
