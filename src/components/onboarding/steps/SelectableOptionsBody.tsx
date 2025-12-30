import type { HapticPatternData } from "@/modules/native-core-haptics";
import CoreHaptics from "@/modules/native-core-haptics";
import { Color } from "@/src/constants/TWPalette";
import { PressableScale } from "pressto";
import { useEffect } from "react";
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
import type {
  ChoiceOption,
  MultiChoiceStep,
  SingleChoiceStep,
} from "../onboardingTypes";

const AnimatedPressableScale = Animated.createAnimatedComponent(PressableScale);

const ANIMATION_DURATION = 200;

// Timing configuration per variant
const TIMING = {
  list: {
    initialDelay: 200, // ms before first item appears
    staggerDelay: 100, // ms between each option appearing
    fadeDuration: 350, // duration of fade animation
    sharpness: 0.3,
  },
  chips: {
    initialDelay: 66, // 3x faster
    staggerDelay: 33, // 3x faster
    fadeDuration: 117, // 3x faster
    sharpness: 0.01,
  },
} as const;

type SelectableOptionsVariant = "list" | "chips";

type ChoiceStep = SingleChoiceStep | MultiChoiceStep;

// Props for single selection mode
type SingleSelectionProps = {
  step: SingleChoiceStep;
  value?: string;
  onSelect: (value: string) => void;
};

// Props for multi selection mode
type MultiSelectionProps = {
  step: MultiChoiceStep;
  values: string[];
  onToggle: (value: string) => void;
};

type SelectableOptionsBodyProps = SingleSelectionProps | MultiSelectionProps;

type TimingConfig = (typeof TIMING)[SelectableOptionsVariant];

type SelectableOptionProps = {
  option: ChoiceOption;
  isSelected: boolean;
  onPress: () => void;
  index: number;
  variant: SelectableOptionsVariant;
  timing: TimingConfig;
};

/**
 * Creates a piano-like haptic pattern for options appearing
 * Each "note" is slightly different, creating a gentle melodic feel
 * Like soft piano keys: toon toon toon toon ♪
 */
function createOptionsEntranceHaptic(
  optionCount: number,
  timing: TimingConfig
): HapticPatternData {
  const baseDelay = timing.initialDelay / 1000; // Sync with animation initial delay
  const staggerDelay = timing.staggerDelay / 1000;
  const events = [];

  for (let i = 0; i < optionCount; i++) {
    // Calculate time based on stagger delay
    const time = baseDelay + i * staggerDelay;

    // Vary intensity and sharpness slightly for each "note"
    // Creates a gentle ascending feel, like walking up piano keys
    const baseIntensity = 0.25;
    const intensityVariation = 0.08 * (i % 3); // Subtle variation
    const intensity = Math.min(baseIntensity + intensityVariation, 0.5);

    // Lower sharpness = softer, rounder feel (like soft piano)
    const sharpness = timing.sharpness + 0.05 * (i % 2);

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
  const settlingTime = baseDelay + optionCount * staggerDelay + 0.05;
  const settlingDuration = timing === TIMING.chips ? 0.05 : 0.15;
  events.push({
    eventType: "hapticContinuous" as const,
    time: settlingTime,
    eventDuration: settlingDuration,
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
          { relativeTime: settlingDuration, value: 0.0 },
        ],
      },
    ],
  };
}

function getVariant(step: ChoiceStep): SelectableOptionsVariant {
  return step.kind === "multiChoiceChips" ? "chips" : "list";
}

function SelectableOption({
  option,
  isSelected,
  onPress,
  index,
  variant,
  timing,
}: SelectableOptionProps) {
  const progress = useSharedValue(isSelected ? 1 : 0);
  const isChip = variant === "chips";

  useEffect(() => {
    progress.value = withTiming(isSelected ? 1 : 0, {
      duration: ANIMATION_DURATION,
    });
  }, [isSelected, progress]);

  const animatedCardStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      [Color.grayscale[300] + "90", "white"]
    ),
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ["black", Color.grayscale[300] + "80"]
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
  const enteringDelay = timing.initialDelay + index * timing.staggerDelay;

  return (
    <Animated.View
      style={{ paddingHorizontal: isChip ? 0 : 16 }}
      entering={FadeIn.duration(timing.fadeDuration).delay(enteringDelay)}
      exiting={FadeOut.duration(16)}
    >
      <AnimatedPressableScale
        onPress={onPress}
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            gap: isChip ? 0 : 12,
            paddingHorizontal: isChip ? 16 : 17,
            paddingVertical: isChip ? 5 : 17,
            borderWidth: 1,
            borderRadius: 68,
          },
          animatedCardStyle,
        ]}
      >
        {/* Icon with crossfade animation - only for list variant */}
        {!isChip && (
          <View style={{ width: 26, height: 26 }}>
            <Animated.View style={unselectedIconOpacity}>
              <Icon
                symbol="circle.fill"
                size="lg"
                color={Color.grayscale[200]}
              />
            </Animated.View>
            <Animated.View style={selectedIconOpacity}>
              <Icon symbol="checkmark.circle.fill" size="lg" color="white" />
            </Animated.View>
          </View>
        )}

        <Text weight="medium" style={isChip ? undefined : { flex: 1 }}>
          {option.label}
        </Text>
      </AnimatedPressableScale>
    </Animated.View>
  );
}

// Type guard to check if props are for single selection
function isSingleSelection(
  props: SelectableOptionsBodyProps
): props is SingleSelectionProps {
  return props.step.kind === "singleChoice";
}

export function SelectableOptionsBody(props: SelectableOptionsBodyProps) {
  const { step } = props;

  const variant = getVariant(step);
  const timing = TIMING[variant];

  // Get selected values based on selection mode
  const selectedValues: string[] = isSingleSelection(props)
    ? props.value
      ? [props.value]
      : []
    : props.values;

  // Handle option press based on selection mode
  const handleOptionPress = (value: string) => {
    if (isSingleSelection(props)) {
      props.onSelect(value);
    } else {
      props.onToggle(value);
    }
  };

  // Play the piano-like haptic pattern when step changes or on mount
  useEffect(() => {
    const hapticPattern = createOptionsEntranceHaptic(
      step.options.length,
      timing
    );

    // Sync haptic with the animation start
    const timer = setTimeout(() => {
      CoreHaptics.playPattern(hapticPattern).catch((error) => {
        console.error("Failed to play options entrance haptic:", error);
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [step.id, step.options.length, timing]);

  return (
    <View
      style={
        variant === "chips"
          ? {
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 10,
              marginTop: 32,
            }
          : { gap: 12, marginTop: 32 }
      }
    >
      {step.options.map((option, index) => (
        <SelectableOption
          key={option.id}
          option={option}
          isSelected={selectedValues.includes(option.value)}
          onPress={() => handleOptionPress(option.value)}
          index={index}
          variant={variant}
          timing={timing}
        />
      ))}
    </View>
  );
}
