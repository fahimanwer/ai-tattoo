import { Text } from "@/src/components/ui/Text";
import { Pressable, View } from "react-native";
import type { SingleChoiceStep } from "../onboardingTypes";

type SingleChoiceStepBodyProps = {
  step: SingleChoiceStep;
  value?: string;
  onSelect: (value: string) => void;
};

export function SingleChoiceStepBody({
  step,
  value,
  onSelect,
}: SingleChoiceStepBodyProps) {
  return (
    <View>
      {step.options.map((option) => (
        <Pressable key={option.id} onPress={() => onSelect(option.value)}>
          <Text type="sm">
            {value === option.value ? "[x] " : "[ ] "}
            {option.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
