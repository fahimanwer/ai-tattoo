import { inputFocusFanfareHaptic } from "@/lib/haptics-patterns.ios";
import * as NativeCoreHaptics from "@/modules/native-core-haptics";
import { useTheme } from "@/src/context/ThemeContext";
import * as Haptics from "expo-haptics";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
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

const glowInDark: CSSAnimationKeyframes = {
  from: {
    boxShadow: "0 0 0 0 rgba(255, 255, 255, 0)",
  },
  to: {
    boxShadow: "0 0 32px 4px rgba(255, 255, 255, 0.5)",
  },
};

const glowOutDark: CSSAnimationKeyframes = {
  from: {
    boxShadow: "0 0 32px 4px rgba(255, 255, 255, 0.35)",
  },
  to: {
    boxShadow: "0 0 0 0 rgba(255, 255, 255, 0)",
  },
};

const glowInLight: CSSAnimationKeyframes = {
  from: {
    boxShadow: "0 0 0 0 rgba(53, 99, 233, 0)",
  },
  to: {
    boxShadow: "0 0 32px 4px rgba(53, 99, 233, 0.4)",
  },
};

const glowOutLight: CSSAnimationKeyframes = {
  from: {
    boxShadow: "0 0 32px 4px rgba(53, 99, 233, 0.3)",
  },
  to: {
    boxShadow: "0 0 0 0 rgba(53, 99, 233, 0)",
  },
};

export function TextStepBody({
  step,
  value,
  onChange,
  onSubmit,
}: TextStepBodyProps) {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  useEffect(() => {
    NativeCoreHaptics.default.playPattern(inputFocusFanfareHaptic);
  }, []);

  const glowIn = isDark ? glowInDark : glowInLight;
  const glowOut = isDark ? glowOutDark : glowOutLight;

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
          cursorColor={"#3563E9"}
          onChangeText={onChange}
          maxLength={25}
          textContentType="name"
          placeholder={step.placeholder ? t(step.placeholder) : undefined}
          size="lg"
          variant="subtle"
          radius="full"
          color="neutral"
          style={{
            color: isDark ? "white" : "black",
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
