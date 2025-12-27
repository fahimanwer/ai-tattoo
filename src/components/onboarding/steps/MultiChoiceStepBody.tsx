import { Text } from "@/src/components/ui/Text";
import { Pressable, View } from "react-native";
import type { MultiChoiceStep } from "../onboardingTypes";

type MultiChoiceStepBodyProps = {
  step: MultiChoiceStep;
  values: string[];
  onToggle: (value: string) => void;
};

export function MultiChoiceStepBody({
  step,
  values,
  onToggle,
}: MultiChoiceStepBodyProps) {
  return (
    <View>
      {step.options.map((option) => (
        <Pressable key={option.id} onPress={() => onToggle(option.value)}>
          <Text type="sm">
            {values.includes(option.value) ? "[x] " : "[ ] "}
            {option.label}
          </Text>
        </Pressable>
      ))}
      {step.max ? <Text type="sm">Max: {step.max}</Text> : null}
    </View>
  );
}
