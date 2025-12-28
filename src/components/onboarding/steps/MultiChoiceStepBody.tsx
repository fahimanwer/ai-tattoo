import type { HapticPatternData } from "@/modules/native-core-haptics";
import CoreHaptics from "@/modules/native-core-haptics";
import { Color } from "@/src/constants/TWPalette";
import { PressableScale } from "pressto";
import { useEffect, useRef } from "react";
import { View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
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
const INITIAL_DELAY = 200; // ms before first item appears
const STAGGER_DELAY = 100; // ms between each option appearing
const FADE_DURATION = 350; // duration of fade animation

type MultiChoiceStepBodyProps = {
  step: MultiChoiceStep;
  values: string[];
  onToggle: (value: string) => void;
};

type MultiChoiceOptionProps = {
  option: ChoiceOption;
  isSelected: boolean;
  onPress: () => void;
  index: number;
};

/**
 * Creates a piano-like haptic pattern for multi-choice options appearing
 * Each "note" is slightly different, creating a gentle melodic feel
 * Like soft piano keys: toon toon toon toon ♪
 */
function createMultiChoiceEntranceHaptic(
  optionCount: number
): HapticPatternData {
  const baseDelay = INITIAL_DELAY / 1000; // Sync with animation initial delay
  const events = [];

  for (let i = 0; i < optionCount; i++) {
    // Calculate time based on stagger delay
    const time = baseDelay + (i * STAGGER_DELAY) / 1000;

    // Vary intensity and sharpness slightly for each "note"
    // Creates a gentle ascending feel, like walking up piano keys
    const baseIntensity = 0.25;
    const intensityVariation = 0.08 * (i % 3); // Subtle variation
    const intensity = Math.min(baseIntensity + intensityVariation, 0.5);

    // Lower sharpness = softer, rounder feel (like soft piano)
    const sharpness = 0.3 + 0.05 * (i % 2);

    events.push({
      eventType: "hapticTransient" as const,
      time,
      parameters: [
        { parameterID: "hapticIntensity" as const, value: intensity },
        { parameterID: "hapticSharpness" as const, value: sharpness },
      ],
    });
  }

  // Add a gentle settling continuous haptic at the end
  const settlingTime = baseDelay + (optionCount * STAGGER_DELAY) / 1000 + 0.1;
  events.push({
    eventType: "hapticContinuous" as const,
    time: settlingTime,
    eventDuration: 0.15,
    parameters: [
      { parameterID: "hapticIntensity" as const, value: 0.12 },
      { parameterID: "hapticSharpness" as const, value: 0.08 },
    ],
  });

  return {
    events,
    parameterCurves: [
      {
        parameterID: "hapticIntensityControl",
        relativeTime: settlingTime,
        controlPoints: [
          { relativeTime: 0.0, value: 0.15 },
          { relativeTime: 0.15, value: 0.0 },
        ],
      },
    ],
  };
}

function MultiChoiceOption({
  option,
  isSelected,
  onPress,
  index,
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

  // Calculate stagger delay for this option (with initial delay before first item)
  const enteringDelay = INITIAL_DELAY + index * STAGGER_DELAY;

  return (
    <Animated.View
      entering={FadeIn.duration(FADE_DURATION).delay(enteringDelay)}
      exiting={FadeOut.duration(200)}
    >
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
    </Animated.View>
  );
}

export function MultiChoiceStepBody({
  step,
  values,
  onToggle,
}: MultiChoiceStepBodyProps) {
  const hasPlayedHaptic = useRef(false);

  // Play the piano-like haptic pattern when component mounts
  useEffect(() => {
    if (hasPlayedHaptic.current) return;
    hasPlayedHaptic.current = true;

    const hapticPattern = createMultiChoiceEntranceHaptic(step.options.length);

    // Sync haptic with the animation start
    const timer = setTimeout(() => {
      CoreHaptics.playPattern(hapticPattern).catch((error) => {
        console.error("Failed to play multi-choice entrance haptic:", error);
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [step.options.length]);

  return (
    <View style={{ gap: 12 }}>
      {step.options.map((option, index) => (
        <MultiChoiceOption
          key={option.id}
          option={option}
          isSelected={values.includes(option.value)}
          onPress={() => onToggle(option.value)}
          index={index}
        />
      ))}
    </View>
  );
}
