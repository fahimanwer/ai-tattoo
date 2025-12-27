import { Text } from "@/src/components/ui/Text";
import { View } from "react-native";
import type { ReviewsStep } from "../onboardingTypes";

type ReviewsStepBodyProps = {
  step: ReviewsStep;
};

export function ReviewsStepBody({ step }: ReviewsStepBodyProps) {
  return (
    <View>
      <Text type="sm">Reviews loading...</Text>
      {step.title ? <Text type="sm">{step.title}</Text> : null}
    </View>
  );
}
