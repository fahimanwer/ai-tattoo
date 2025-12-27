import { Text } from "@/src/components/ui/Text";
import { View } from "react-native";
import type { BeforeAfterStep } from "../onboardingTypes";

type BeforeAfterStepBodyProps = {
  step: BeforeAfterStep;
};

export function BeforeAfterStepBody({ step }: BeforeAfterStepBodyProps) {
  return (
    <View>
      <Text type="sm">Before</Text>
      <Text type="sm">After</Text>
      {step.description ? <Text type="sm">{step.description}</Text> : null}
    </View>
  );
}
