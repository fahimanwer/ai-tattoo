import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { AnimatedText } from "../../screens/Playground/shared/AnimatedText";
import { Text } from "../../ui/Text";
import type { ReviewsStep } from "../onboardingTypes";

type ReviewsStepBodyProps = {
  step: ReviewsStep;
};

const loadingTexts = [
  "Understanding your idea",
  "Balancing details and contrast",
  "Optimizing for visual accuracy",
  "Calibrating proportions",
  "Processing design...",
  "Almost ready",
];

const reviews = [
  {
    stars: 5,
    title: "Amazing app!",
    review:
      "This is a great app! I love the design and the features. It has helped me create some amazing tattoos.",
    createdAt: new Date("2025-01-01"),
    author: "John Doe",
  },
];

// Goal: Make the user feel like we are building something for them (8s)
// Disable everything during this time
export function ReviewsStepBody({ step }: ReviewsStepBodyProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const showDuration = 2000; // how long the text stays visible
    const transitionDuration = 1000; // matches AnimatedText exit duration

    const interval = setInterval(() => {
      setVisible(false); // trigger unmount animation

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % loadingTexts.length);
        setVisible(true); // remount with new text
      }, transitionDuration);
    }, showDuration + transitionDuration);

    return () => clearInterval(interval);
  }, []);

  // Haptic feedback each time the text changes
  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [index]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {visible && <AnimatedText key={index} text={loadingTexts[index]} />}
      <FlatList
        data={reviews}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
}
