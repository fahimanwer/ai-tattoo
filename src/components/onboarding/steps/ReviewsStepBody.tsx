import { Color } from "@/src/constants/TWPalette";
import {
  Canvas,
  LinearGradient,
  RoundedRect,
  vec,
} from "@shopify/react-native-skia";
import * as Haptics from "expo-haptics";
import { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, FlatList, LayoutChangeEvent, View } from "react-native";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AnimatedText } from "../../screens/Playground/shared/AnimatedText";
import { Text } from "../../ui/Text";
import { generateLoadingTexts } from "../generateLoadingTexts";
import type { OnboardingAnswers, ReviewsStep } from "../onboardingTypes";
import { ReviewItem, type Review } from "./ReviewItem";

const { width } = Dimensions.get("window");

const DEFAULT_TIMEOUT = 7000;

type ReviewsStepBodyProps = {
  step: ReviewsStep;
  answers?: OnboardingAnswers;
  onReady?: () => void;
};

const reviews: Review[] = [
  {
    stars: 5,
    title: "Amazing app!",
    review:
      "App works, looks and feels great! Impressed by how well it applied the tattoo, taking accurate lighting and shadowing into account.",
    createdAt: new Date("2025-11-19"),
    author: "Jacob C.",
  },
  {
    stars: 5,
    title: "Actually useful",
    review:
      "The tattoo designs are clean and detailed. Some images take a bit longer to generate, but overall it's one of the best AI tattoo apps out there.",
    createdAt: new Date("2024-12-16"),
    author: "Alexrays1",
  },
  {
    stars: 5,
    title: "I love this",
    review: "Highly recommended 🫵🏼",
    createdAt: new Date("2025-11-18"),
    author: "Antoniozam01",
  },
];

// Goal: Make the user feel like we are building something for them
// Disable everything during this time
const FINAL_MESSAGE = "Your tattoo journey starts now";

export function ReviewsStepBody({
  step,
  answers = {},
  onReady,
}: ReviewsStepBodyProps) {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const hasCompletedRef = useRef(false);
  const onReadyRef = useRef(onReady);

  // Keep callback ref up to date
  onReadyRef.current = onReady;

  // Generate personalized loading messages
  const loadingTexts = useMemo(() => generateLoadingTexts(answers), [answers]);

  const timeout = step.timeout ?? DEFAULT_TIMEOUT;

  // Progress bar animation (0 to 1 over timeout duration)
  const progress = useSharedValue(0);

  useEffect(() => {
    if (isLoading) {
      progress.value = 0;
      progress.value = withTiming(1, { duration: timeout });
    }
  }, [isLoading, timeout, progress]);

  // Calculate progress bar width based on progress value
  const animatedWidth = useDerivedValue(() => {
    return progressBarWidth * progress.value;
  });

  const onProgressBarLayout = (event: LayoutChangeEvent) => {
    setProgressBarWidth(event.nativeEvent.layout.width);
  };

  // Manage the loading timeout - runs once on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        setIsLoading(false);
        // Signal that we're ready (enables continue button)
        onReadyRef.current?.();
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  // Text cycling animation (only while loading)
  // Dynamically calculate duration per message based on total timeout
  useEffect(() => {
    if (!isLoading) return;

    const transitionDuration = 200; // transition animation duration
    // Calculate time per message: total timeout / number of messages
    const timePerMessage = Math.floor(timeout / loadingTexts.length);
    const showDuration = timePerMessage - transitionDuration;

    const interval = setInterval(() => {
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % loadingTexts.length);
      }, transitionDuration);
    }, showDuration + transitionDuration);

    return () => clearInterval(interval);
  }, [isLoading, loadingTexts.length, timeout]);

  // Haptic feedback each time the text changes
  useEffect(() => {
    if (isLoading) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [index, isLoading]);

  // Determine which text to show
  const displayText = isLoading ? loadingTexts[index] : FINAL_MESSAGE;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <AnimatedText text={displayText} />
        {/* Subtle progress bar */}
        <View
          onLayout={onProgressBarLayout}
          style={{
            position: "absolute",
            bottom: 60,
            height: 2,
            width: "80%",
            overflow: "hidden",
            alignSelf: "center",
          }}
        >
          {progressBarWidth > 0 && (
            <Canvas style={{ width: progressBarWidth, height: 2 }}>
              <RoundedRect x={0} y={0} width={animatedWidth} height={2} r={1}>
                <LinearGradient
                  start={vec(0, 0)}
                  end={vec(progressBarWidth, 0)}
                  colors={[
                    Color.yellow[700], // colorDark at start
                    Color.yellow[700], // colorDark at 30%
                    Color.yellow[400], // color at 40%
                    Color.yellow[700], // colorDark at 50%
                    Color.yellow[700], // colorDark at end
                  ]}
                  positions={[0, 0.3, 0.4, 0.5, 1]}
                />
              </RoundedRect>
            </Canvas>
          )}
          {isLoading && (
            <Text type="xs">
              {index + 1} / {loadingTexts.length}
            </Text>
          )}
        </View>
      </View>

      <View style={{ height: 250 }}>
        <FlatList
          data={reviews}
          renderItem={({ item, index }) => (
            <ReviewItem review={item} index={index} />
          )}
          style={{
            width: width,
            alignSelf: "center",
          }}
          keyExtractor={(item, index) => `review-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          snapToInterval={332} // 320 width + 12 margin
          decelerationRate="fast"
        />
      </View>
    </View>
  );
}
