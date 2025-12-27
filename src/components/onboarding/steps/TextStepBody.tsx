import { Input } from "@/src/components/ui/Input";
import { View } from "react-native";
import type { TextStep } from "../onboardingTypes";

type TextStepBodyProps = {
  step: TextStep;
  value: string;
  onChange: (value: string) => void;
};

export function TextStepBody({ step, value, onChange }: TextStepBodyProps) {
  return (
    <View>
      <Input
        value={value}
        onChangeText={onChange}
        placeholder={step.placeholder}
      />
    </View>
  );
}
