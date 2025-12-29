import {
  onboardingEntranceHaptic,
  onboardingSwipeHaptic,
} from "@/lib/haptics-patterns.ios";
import * as NativeCoreHaptics from "@/modules/native-core-haptics";
import LinearGradientImageBlur from "@/src/components/LinearGradientImageBlur";
import { Text } from "@/src/components/ui/Text";
import { AppSettingsContext } from "@/src/context/AppSettings";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { use, useCallback, useEffect, useRef, useState } from "react";
import {
  AppState,
  AppStateStatus,
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
import { BeforeAfterStep, MultiChoiceStep } from "./onboardingTypes";
import { BeforeAfterSlider } from "./steps/BeforeAfterSlider";
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
  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex; // Keep ref in sync

  const { settings, updateSettingsSync } = use(AppSettingsContext);
  const { top } = useSafeAreaInsets();
  const answers = settings.onboardingAnswers ?? {};
  const currentStep = ONBOARDING_STEPS[currentIndex] ?? ONBOARDING_STEPS[0];
  const isLastStep = currentIndex >= ONBOARDING_STEPS.length - 1;
  const canAdvance = isStepComplete(currentStep, answers);
  const ctaLabel = currentStep.cta ?? "Continue";
  const canGoBack = currentIndex < 11 && currentIndex !== 0; // Prevents going back after reviews step
  const [isReviewsReady, setIsReviewsReady] = useState(false);

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

  const trackStepViewed = useCallback((index: number) => {
    if (!stepsViewed.current.has(index)) {
      stepsViewed.current.add(index);
      customEvent("onboarding_step_viewed", {
        step: index + 1,
        stepId: ONBOARDING_STEPS[index].id,
        stepTitle: ONBOARDING_STEPS[index].title,
      });
    }
  }, []);

  // Track drop-offs when app goes to background
  useEffect(() => {
    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === "background" || nextState === "inactive") {
        customEvent("onboarding_dropoff", {
          step: currentIndexRef.current + 1,
          stepId: ONBOARDING_STEPS[currentIndexRef.current].id,
          stepTitle: ONBOARDING_STEPS[currentIndexRef.current].title,
        });
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription.remove();
  }, []);

  // Handle scroll events from programmatic scrolling
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    const currIdx = currentIndexRef.current;

    if (index !== currIdx && index >= 0 && index < ONBOARDING_STEPS.length) {
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

  // Callback for when reviews step is ready (enables continue button)
  const handleReviewsReady = useCallback(() => {
    setIsReviewsReady(true);
  }, []);

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
            onChange={(text) => setAnswer(currentStep.id, text.trim())}
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
        return <CongratulationsStepBody step={currentStep} answers={answers} />;

      case "beforeAfter":
        // No step body - slider is rendered in background layer
        return null;

      case "reviews":
        return (
          <ReviewsStepBody
            step={currentStep}
            answers={answers}
            onReady={handleReviewsReady}
          />
        );

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
            canGoBack
              ? [
                  {
                    type: "button",
                    variant: "plain",
                    onPress: () => {
                      const prevIndex = currentIndex - 1;
                      scrollViewRef.current?.scrollTo({
                        x: prevIndex * SCREEN_WIDTH,
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
        // entering={FadeIn}
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
          scrollEnabled={false}
          style={{
            flex: 1,
          }}
          onScroll={handleScroll}
        >
          {ONBOARDING_STEPS.map((step, index) => (
            <View
              key={index}
              style={{
                width: SCREEN_WIDTH,
                height: "100%",
              }}
            >
              {step.kind === "beforeAfter" ? (
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#000",
                    position: "relative",
                  }}
                >
                  <LinearGradient
                    colors={[
                      "transparent",
                      "transparent",
                      "transparent",
                      "#000000",
                      "#000000",
                    ]}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: 1,
                    }}
                  />

                  <BeforeAfterSlider
                    imagePairs={(step as BeforeAfterStep).imagePairs}
                  />
                </View>
              ) : step.image ? (
                <LinearGradientImageBlur
                  imageUrl={step.image}
                  showBlur={false}
                  showGradient={true}
                  gradientColors={{
                    light: ["transparent", "transparent", "#000000", "#000000"],
                    dark: ["transparent", "transparent", "#000000", "#000000"],
                  }}
                  contentFit="cover"
                  contentPosition={index === 0 ? { left: -166 } : { left: 0 }}
                  imageHeight={index === 0 ? "75%" : "100%"}
                />
              ) : null}
            </View>
          ))}
        </ScrollView>
      </Animated.View>

      <Animated.View
        // entering={FadeIn}
        style={{
          flex: 1,
          position: "relative",
          zIndex: 2,
          justifyContent: "flex-end",
          paddingTop: top + 56,
          width: "100%",
        }}
        pointerEvents="box-none"
      >
        {/* Title and Description */}
        <Animated.View
          key={currentIndex}
          pointerEvents="none"
          style={{
            width: "100%",
          }}

          // entering={SlideInRight}
          // exiting={SlideOutLeft}
        >
          <Text
            type="4xl"
            weight="bold"
            style={{
              width: "100%",
              alignSelf: "center",
              textAlign: "center",
              lineHeight: 34,
              paddingHorizontal: 16,
            }}
          >
            {currentStep?.kind === "congratulations" && answers["user-name"]
              ? `${answers["user-name"]}, you're all set!`
              : currentStep?.id === "user-description" && answers["user-name"]
              ? `${answers["user-name"]}, which best describes you?`
              : currentStep?.title}
          </Text>
          <Text
            type="xl"
            style={{
              opacity: 0.6,
              textAlign: "center",
              marginTop: 8,
              letterSpacing: -0.3,
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
        <KeyboardStickyView style={{}} offset={{ opened: top - 32, closed: 0 }}>
          <OnboardingCTA
            label={ctaLabel}
            isLastStep={isLastStep}
            canAdvance={canAdvance}
            showSignIn={currentIndex === 0}
            loading={currentStep.kind === "reviews" && !isReviewsReady}
            onPress={() => {
              const nextIndex = getNextStepIndex(currentStep, currentIndex);
              if (nextIndex >= ONBOARDING_STEPS.length) {
                // Calculate duration in seconds
                const durationMs = Date.now() - onboardingStartTime.current;
                const durationSeconds = Math.round(durationMs / 1000);

                // Track onboarding completion (paywall comes next)
                customEvent("onboarding_completed", {
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
