import { Text } from "@/src/components/ui/Text";

import { Stack, useRouter } from "expo-router";

import {
  onboardingEntranceHaptic,
  onboardingSwipeHaptic,
} from "@/lib/haptics-patterns.ios";
import * as NativeCoreHaptics from "@/modules/native-core-haptics";
import { AppSettingsContext } from "@/src/context/AppSettings";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { use, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { customEvent } from "vexo-analytics";
import { CircleProgress } from "./CircleProgress";
import { OnboardingCTA } from "./OnboardingCTA";
import {
  getNextStepIndex,
  isStepComplete,
  ONBOARDING_ANSWERS_VERSION,
  ONBOARDING_STEPS,
} from "./onboardingSteps";
import { MultiChoiceStep } from "./onboardingTypes";
import { BeforeAfterStepBody } from "./steps/BeforeAfterStepBody";
import { CongratulationsStepBody } from "./steps/CongratulationsStepBody";
import { ReviewsStepBody } from "./steps/ReviewsStepBody";
import { SelectableOptionsBody } from "./steps/SelectableOptionsBody";
import { TextStepBody } from "./steps/TextStepBody";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function OnboardingV2() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const hasPlayedEntranceHaptic = useRef(false);
  const onboardingStartTime = useRef<number>(Date.now());
  const stepsViewed = useRef<Set<number>>(new Set([0])); // Track which steps were viewed
  const { settings, updateSettingsSync } = use(AppSettingsContext);
  const { top } = useSafeAreaInsets();
  const answers = settings.onboardingAnswers ?? {};
  const currentStep = ONBOARDING_STEPS[currentIndex] ?? ONBOARDING_STEPS[0];
  const isLastStep = currentIndex >= ONBOARDING_STEPS.length - 1;
  const canAdvance = isStepComplete(currentStep, answers);
  const ctaLabel = currentStep.cta ?? "Continue";

  // Play entrance haptic on first mount and track first step
  useEffect(() => {
    if (!hasPlayedEntranceHaptic.current) {
      hasPlayedEntranceHaptic.current = true;
      NativeCoreHaptics.default.playPattern(onboardingEntranceHaptic);

      // Track first step view
      customEvent("onboarding_step_viewed", {
        step: 1,
        stepId: ONBOARDING_STEPS[0].id,
        stepTitle: ONBOARDING_STEPS[0].title,
      });
    }
  }, []);

  useEffect(() => {
    if (settings.onboardingAnswersVersion !== ONBOARDING_ANSWERS_VERSION) {
      updateSettingsSync({
        onboardingAnswers: {},
        onboardingAnswersVersion: ONBOARDING_ANSWERS_VERSION,
      });
    }
  }, [settings.onboardingAnswersVersion, updateSettingsSync]);

  const trackStepViewed = (index: number) => {
    if (!stepsViewed.current.has(index)) {
      stepsViewed.current.add(index);
      customEvent("onboarding_step_viewed", {
        step: index + 1,
        stepId: ONBOARDING_STEPS[index].id,
        stepTitle: ONBOARDING_STEPS[index].title,
      });
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    if (
      index !== currentIndex &&
      index >= 0 &&
      index < ONBOARDING_STEPS.length
    ) {
      setCurrentIndex(index);
      trackStepViewed(index);
    }
  };

  const setAnswer = (stepId: string, value: string | string[]) => {
    updateSettingsSync({
      onboardingAnswers: {
        ...answers,
        [stepId]: value,
      },
      onboardingAnswersVersion: ONBOARDING_ANSWERS_VERSION,
    });
  };

  const toggleMultiChoice = (step: MultiChoiceStep, value: string) => {
    const existing = Array.isArray(answers[step.id])
      ? (answers[step.id] as string[])
      : [];
    if (existing.includes(value)) {
      setAnswer(
        step.id,
        existing.filter((item) => item !== value)
      );
      return;
    }

    if (step.max && existing.length > step.max) {
      return;
    }

    setAnswer(step.id, [...existing, value]);
  };

  const getStringAnswer = (id: string) =>
    typeof answers[id] === "string" ? (answers[id] as string) : undefined;

  const getArrayAnswer = (id: string) =>
    Array.isArray(answers[id]) ? (answers[id] as string[]) : [];

  const stepBody = (() => {
    switch (currentStep.kind) {
      case "singleChoice":
        return (
          <SelectableOptionsBody
            step={currentStep}
            value={getStringAnswer(currentStep.id)}
            onSelect={(value) => setAnswer(currentStep.id, value)}
          />
        );

      case "multiChoice":
      case "multiChoiceChips":
        return (
          <SelectableOptionsBody
            step={currentStep}
            values={getArrayAnswer(currentStep.id)}
            onToggle={(value) => toggleMultiChoice(currentStep, value)}
          />
        );

      case "text":
        return (
          <TextStepBody
            step={currentStep}
            value={getStringAnswer(currentStep.id) ?? ""}
            onChange={(text) => setAnswer(currentStep.id, text)}
            onSubmit={() => {
              // Assuming this is not the last step
              const nextIndex = getNextStepIndex(currentStep, currentIndex);
              scrollViewRef.current?.scrollTo({
                x: nextIndex * SCREEN_WIDTH,
                animated: true,
              });
            }}
          />
        );

      case "congratulations":
        return <CongratulationsStepBody step={currentStep} />;

      case "beforeAfter":
        return <BeforeAfterStepBody step={currentStep} />;

      case "reviews":
        return <ReviewsStepBody step={currentStep} />;

      default:
        return null;
    }
  })();

  return (
    <>
      <StatusBar hidden />
      <Stack.Screen
        options={{
          unstable_headerLeftItems: () =>
            currentIndex > 0
              ? [
                  {
                    type: "button",
                    variant: "plain",
                    onPress: () => {
                      scrollViewRef.current?.scrollTo({
                        x: (currentIndex - 1) * SCREEN_WIDTH,
                        animated: true,
                      });
                    },
                    label: "Back",
                    icon: {
                      name: "chevron.left",
                      type: "sfSymbol",
                    },
                    hidesSharedBackground: true,
                  },
                ]
              : [],
          unstable_headerRightItems: () =>
            currentIndex > 0
              ? [
                  {
                    type: "custom",
                    variant: "plain",
                    element: (
                      <Animated.View entering={FadeIn} exiting={FadeOut}>
                        <CircleProgress
                          progress={
                            currentIndex / (ONBOARDING_STEPS.length - 1)
                          }
                          size={36}
                          strokeWidth={5}
                        />
                      </Animated.View>
                    ),
                    hidesSharedBackground: true,
                  },
                ]
              : [],
        }}
      />
      <Animated.View
        entering={FadeIn.duration(700).delay(200)}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToInterval={SCREEN_WIDTH}
          snapToAlignment="center"
          style={{
            flex: 1,
          }}
          onScroll={handleScroll}
        >
          {ONBOARDING_STEPS.map((_, index) => (
            <View key={index} style={{ width: SCREEN_WIDTH, height: "100%" }}>
              {ONBOARDING_STEPS[index].image ? (
                <Image
                  source={{ uri: ONBOARDING_STEPS[index].image }}
                  style={{ width: SCREEN_WIDTH, height: "100%" }}
                  contentFit="cover"
                  contentPosition="center"
                />
              ) : (
                <View
                  style={{
                    height: "75%",
                    backgroundColor: "#000",
                    width: SCREEN_WIDTH,
                  }}
                />
              )}
            </View>
          ))}
        </ScrollView>
      </Animated.View>

      <Animated.View
        entering={FadeIn.duration(600).delay(950)}
        style={{
          flex: 1,
          position: "relative",
          experimental_backgroundImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.8) 70%, #000000 100%)",
          zIndex: 2,
          justifyContent: "flex-end",
          paddingHorizontal: 16,
          paddingTop: top + 32,
        }}
        pointerEvents="box-none"
      >
        {/* Title and Description */}
        <Animated.View
          key={currentIndex}
          pointerEvents="none"
          style={{
            width: "100%",
            paddingTop: 24,
          }}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <Text
            type="4xl"
            weight="bold"
            style={{ alignSelf: "center", textAlign: "center" }}
            textBalance
          >
            {currentStep?.title}
          </Text>
          <Text
            type="xl"
            style={{
              opacity: 0.6,
              textAlign: "center",
              marginTop: 12,
            }}
          >
            {currentStep?.description}
          </Text>
        </Animated.View>

        {/* Step body - takes available space */}
        {stepBody && (
          <View
            style={{
              flex: 1,
            }}
            pointerEvents="box-none"
          >
            {stepBody}
          </View>
        )}

        {/* CTA - always at the bottom with safe area */}
        <KeyboardStickyView style={{}} offset={{ opened: top - 16, closed: 0 }}>
          <OnboardingCTA
            label={ctaLabel}
            isLastStep={isLastStep}
            canAdvance={canAdvance}
            showSignIn={currentIndex === 0}
            onPress={() => {
              const nextIndex = getNextStepIndex(currentStep, currentIndex);
              if (nextIndex >= ONBOARDING_STEPS.length) {
                // Calculate duration in seconds
                const durationMs = Date.now() - onboardingStartTime.current;
                const durationSeconds = Math.round(durationMs / 1000);

                // Track onboarding completion (paywall comes next)
                customEvent("onboarding_videos_completed", {
                  stepsViewed: stepsViewed.current.size,
                  duration: durationSeconds,
                });

                // Navigate to paywall (user can purchase before auth)
                router.push("/(paywall)");
              } else {
                // Advance to next video
                scrollViewRef.current?.scrollTo({
                  x: nextIndex * SCREEN_WIDTH,
                  animated: true,
                });
                // Play swipe haptic
                NativeCoreHaptics.default.playPattern(onboardingSwipeHaptic);
              }
            }}
          />
        </KeyboardStickyView>
      </Animated.View>
    </>
  );
}
