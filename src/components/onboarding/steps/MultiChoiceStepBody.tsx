import { Color } from "@/src/constants/TWPalette";
import { PressableScale } from "pressto";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Icon } from "../../ui/Icon";
import { Text } from "../../ui/Text";
import type { ChoiceOption, MultiChoiceStep } from "../onboardingTypes";

const AnimatedPressableScale = Animated.createAnimatedComponent(PressableScale);

const ANIMATION_DURATION = 200;

type MultiChoiceStepBodyProps = {
  step: MultiChoiceStep;
  values: string[];
  onToggle: (value: string) => void;
};

type MultiChoiceOptionProps = {
  option: ChoiceOption;
  isSelected: boolean;
  onPress: () => void;
};

function MultiChoiceOption({
  option,
  isSelected,
  onPress,
}: MultiChoiceOptionProps) {
  const progress = useSharedValue(isSelected ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isSelected ? 1 : 0, {
      duration: ANIMATION_DURATION,
    });
  }, [isSelected, progress]);

  const animatedCardStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      [Color.grayscale[100], "white"]
    ),
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ["black", Color.grayscale[100]]
    ),
  }));

  const selectedIconOpacity = useAnimatedStyle(() => ({
    opacity: progress.value,
    position: "absolute" as const,
  }));

  const unselectedIconOpacity = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
  }));

  return (
    <AnimatedPressableScale
      onPress={onPress}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          paddingHorizontal: 17,
          paddingVertical: 17,
          borderWidth: 1,
          borderRadius: 68,
        },
        animatedCardStyle,
      ]}
    >
      {/* Icon with crossfade animation */}
      <View style={{ width: 26, height: 26 }}>
        <Animated.View style={unselectedIconOpacity}>
          <Icon symbol="circle.fill" size="lg" color={Color.grayscale[700]} />
        </Animated.View>
        <Animated.View style={selectedIconOpacity}>
          <Icon symbol="checkmark.circle.fill" size="lg" color="white" />
        </Animated.View>
      </View>

      <Text weight="medium" style={{ flex: 1 }}>
        {option.label}
      </Text>
    </AnimatedPressableScale>
  );
}

export function MultiChoiceStepBody({
  step,
  values,
  onToggle,
}: MultiChoiceStepBodyProps) {
  return (
    <View style={{ gap: 12 }}>
      {step.options.map((option) => (
        <MultiChoiceOption
          key={option.id}
          option={option}
          isSelected={values.includes(option.value)}
          onPress={() => onToggle(option.value)}
        />
      ))}
    </View>
  );
}
