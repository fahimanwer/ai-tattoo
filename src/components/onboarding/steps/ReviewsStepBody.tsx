import * as Haptics from "expo-haptics";
import { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { AnimatedText } from "../../screens/Playground/shared/AnimatedText";
import { Text } from "../../ui/Text";
import type { ReviewsStep } from "../onboardingTypes";

const DEFAULT_TIMEOUT = 10000; // 10 seconds

type ReviewsStepBodyProps = {
  step: ReviewsStep;
  onLoadingComplete?: () => void;
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

// Goal: Make the user feel like we are building something for them
// Disable everything during this time
export function ReviewsStepBody({
  step,
  onLoadingComplete,
}: ReviewsStepBodyProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const hasCompletedRef = useRef(false);
  const onLoadingCompleteRef = useRef(onLoadingComplete);

  // Keep callback ref up to date
  onLoadingCompleteRef.current = onLoadingComplete;

  const timeout = step.timeout ?? DEFAULT_TIMEOUT;

  // Manage the loading timeout - runs once on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        setIsLoading(false);
        onLoadingCompleteRef.current?.();
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  // Text cycling animation (only while loading)
  useEffect(() => {
    if (!isLoading) return;

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
  }, [isLoading]);

  // Haptic feedback each time the text changes
  useEffect(() => {
    if (isLoading) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [index, isLoading]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isLoading && visible && (
        <AnimatedText key={index} text={loadingTexts[index]} />
      )}
      <FlatList
        data={reviews}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
}
