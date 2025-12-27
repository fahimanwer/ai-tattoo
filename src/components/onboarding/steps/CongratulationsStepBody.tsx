import { Text } from "@/src/components/ui/Text";
import { View } from "react-native";
import type { CongratulationsStep } from "../onboardingTypes";

type CongratulationsStepBodyProps = {
  step: CongratulationsStep;
};

export function CongratulationsStepBody({
  step,
}: CongratulationsStepBodyProps) {
  return (
    <View>
      {step.title ? <Text type="xl">{step.title}</Text> : null}
      {step.description ? <Text type="sm">{step.description}</Text> : null}
    </View>
  );
}
