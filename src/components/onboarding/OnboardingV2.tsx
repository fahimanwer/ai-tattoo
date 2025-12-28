import { Text } from "@/src/components/ui/Text";

import { Link, Stack, useRouter } from "expo-router";

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
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { customEvent } from "vexo-analytics";
import { Button } from "../ui/Button";
import { CircleProgress } from "./CircleProgress";
import {
  MultiChoiceStep,
  OnboardingAnswers,
  OnboardingStep,
} from "./onboardingTypes";
import { BeforeAfterStepBody } from "./steps/BeforeAfterStepBody";
import { CongratulationsStepBody } from "./steps/CongratulationsStepBody";
import { MultiChoiceStepBody } from "./steps/MultiChoiceStepBody";
import { ReviewsStepBody } from "./steps/ReviewsStepBody";
import { SingleChoiceStepBody } from "./steps/SingleChoiceStepBody";
import { TextStepBody } from "./steps/TextStepBody";

const ONBOARDING_ANSWERS_VERSION = 1;

const DEFAULT_ONBOARDING_IMAGE =
  "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/onboarding-v1.avif";

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "hero",
    kind: "hero",
    title: "See a tattoo on you before you commit",
    description: "Try-on + AI design in seconds. No regret.",
    image: DEFAULT_ONBOARDING_IMAGE,
    cta: "Get started",
    cta2: "Sign In",
  },
  {
    id: "goal",
    kind: "multiChoice",
    title: "What would you like to do?",
    description: undefined,
    image: undefined,
    required: true,
    options: [
      { id: "try-on", label: "Try tattoos on my photos", value: "try_on" },
      { id: "generate", label: "Generate tattoo ideas", value: "generate" },
      {
        id: "browse",
        label: "Just browsing or looking for inspiration",
        value: "browse",
      },
      {
        id: "cover-up",
        label: "Cover-up/Rework an existing tattoo",
        value: "cover_up",
      },
    ],
  },
  {
    id: "location",
    kind: "multiChoiceChips",
    title: "Where do you want the tattoo?",
    description: undefined,
    image: undefined,
    required: true,
    options: [
      { id: "wrist", label: "Wrist", value: "wrist" },
      { id: "chest", label: "Chest", value: "chest" },
      { id: "hand", label: "Hand", value: "hand" },
      { id: "back", label: "Back", value: "back" },
      { id: "legs", label: "Legs", value: "legs" },
      { id: "forearm", label: "Forearm", value: "forearm" },
      { id: "neck", label: "Neck", value: "neck" },
      { id: "jaw", label: "Jaw", value: "jaw" },
      { id: "forehead", label: "Forehead", value: "forehead" },
      { id: "knuckles", label: "Knuckles", value: "knuckles" },
      { id: "fingers", label: "Fingers", value: "fingers" },
      { id: "cheek", label: "Cheek", value: "cheek" },
      { id: "shoulder", label: "Shoulder", value: "shoulder" },
      { id: "temple", label: "Temple", value: "temple" },
      { id: "ribs", label: "Ribs", value: "ribs" },
      { id: "abdomen", label: "Abdomen", value: "abdomen" },
      { id: "face", label: "Face", value: "face" },
      { id: "hips", label: "Hips", value: "hips" },
      { id: "thigh", label: "Thigh", value: "thigh" },
      { id: "tricep", label: "Tricep", value: "tricep" },
      { id: "bicep", label: "Bicep", value: "bicep" },
      { id: "collarbone", label: "Collarbone", value: "collarbone" },
      { id: "ankle", label: "Ankle", value: "ankle" },
      { id: "foot", label: "Foot", value: "foot" },
      { id: "palm", label: "Palm", value: "palm" },
      { id: "not-sure", label: "Not sure", value: "not_sure" },
    ],
  },
  {
    id: "user-name",
    kind: "text",
    title: "What is your name?",
    description: "We'll use this to personalize your experience.",
    image: undefined,
    required: true,
    placeholder: "Your name",
  },
  {
    id: "user-description",
    kind: "multiChoice",
    title: "Which best describes you?",
    description: undefined,
    image: undefined,
    required: true,
    options: [
      { id: "artist", label: "Tattoo artist", value: "artist" },
      { id: "client", label: "Getting a tattoo", value: "client" },
      { id: "model", label: "Model/Influencer for tattoos", value: "model" },
      { id: "explorer", label: "Just exploring", value: "explorer" },
    ],
  },
  {
    id: "feature-tryon",
    kind: "feature",
    title: "We'll tailor Inkigo for you",
    description: "Inkigo adapts to your workflow and preferences.",
    image: DEFAULT_ONBOARDING_IMAGE,
  },
  {
    id: "styles",
    kind: "multiChoiceChips",
    title: "Pick up to 5 styles you like",
    description: undefined,
    image: undefined,
    required: false,
    max: 5,
    options: [
      { id: "traditional", label: "Traditional", value: "traditional" },
      { id: "realism", label: "Realism", value: "realism" },
      { id: "minimal", label: "Minimal", value: "minimal" },
      { id: "celtic", label: "Celtic", value: "celtic" },
      { id: "blackwork", label: "Blackwork", value: "blackwork" },
      { id: "illustrative", label: "Illustrative", value: "illustrative" },
      { id: "lettering", label: "Lettering", value: "lettering" },
      { id: "irezumi", label: "Irezumi", value: "irezumi" },
      { id: "geometric", label: "Geometric", value: "geometric" },
      { id: "religious", label: "Religious", value: "religious" },
      { id: "anime", label: "Anime", value: "anime" },
      { id: "fine-line", label: "Fine Line", value: "fine_line" },
      { id: "dotwork", label: "Dotwork", value: "dotwork" },
      { id: "linework", label: "Linework", value: "linework" },
      { id: "calligraphy", label: "Calligraphy", value: "calligraphy" },
      { id: "portrait", label: "Portrait", value: "portrait" },
      { id: "floral", label: "Floral", value: "floral" },
      { id: "polynesian", label: "Polynesian", value: "polynesian" },
      { id: "tribal", label: "Tribal", value: "tribal" },
      { id: "maori", label: "Maori", value: "maori" },
      { id: "gothic", label: "Gothic", value: "gothic" },
      { id: "patchwork", label: "Patchwork", value: "patchwork" },
      { id: "abstract", label: "Abstract", value: "abstract" },
      { id: "cyberpunk", label: "Cyberpunk", value: "cyberpunk" },
      { id: "3d", label: "3D", value: "3d" },
      { id: "astrology", label: "Astrology", value: "astrology" },
      { id: "not-sure", label: "Not sure", value: "not_sure" },
    ],
  },
  {
    id: "feature-design",
    kind: "feature",
    title: "Design the tattoo you want",
    description:
      "Type a few words or upload an image and instantly generate unique tattoo designs.",
    image: DEFAULT_ONBOARDING_IMAGE,
  },
  {
    id: "timeframe",
    kind: "singleChoice",
    title: "When are you thinking of getting the tattoo?",
    description: undefined,
    image: undefined,
    required: true,
    options: [
      { id: "this-week", label: "This week", value: "this_week" },
      { id: "this-month", label: "This month", value: "this_month" },
      { id: "this-year", label: "In 1-3 months", value: "this_year" },
      { id: "someday", label: "Someday, I'm just exploring", value: "someday" },
    ],
  },
  {
    id: "before-after",
    kind: "beforeAfter",
    title: "See the tattoo on your skin",
    description: "Size it, move it, and see it in seconds.",
    image: undefined,
  },
  {
    id: "vibe",
    kind: "multiChoiceChips",
    title: "What vibe are you going for?",
    description: undefined,
    image: undefined,
    required: false,
    options: [
      { id: "bold", label: "Bold", value: "bold" },
      { id: "confident", label: "Confident", value: "confident" },
      { id: "soft", label: "Soft", value: "soft" },
      { id: "dark", label: "Dark", value: "dark" },
      { id: "edgy", label: "Edgy", value: "edgy" },
      { id: "elegant", label: "Elegant", value: "elegant" },
      { id: "spiritual", label: "Spiritual", value: "spiritual" },
      { id: "cute", label: "Cute", value: "cute" },
      { id: "symbolic", label: "Symbolic", value: "symbolic" },
      { id: "playful", label: "Playful", value: "playful" },
      { id: "clean", label: "Clean", value: "clean" },
      { id: "modern", label: "Modern", value: "modern" },
      { id: "meaningful", label: "Meaningful", value: "meaningful" },
      {
        id: "personal-story",
        label: "Personal story",
        value: "personal_story",
      },
      { id: "family", label: "Family", value: "family" },
      { id: "love", label: "Love", value: "love" },
      { id: "memory", label: "Memory", value: "memory" },
      { id: "rebirth", label: "Rebirth", value: "rebirth" },
      { id: "freedom", label: "Freedom", value: "freedom" },
      { id: "mystical", label: "Mystical", value: "mystical" },
      { id: "rebellious", label: "Rebellious", value: "rebellious" },
      { id: "serene", label: "Serene", value: "serene" },
      { id: "empowered", label: "Empowered", value: "empowered" },
      { id: "ethereal", label: "Ethereal", value: "ethereal" },
      { id: "fearless", label: "Fearless", value: "fearless" },
      { id: "wanderlust", label: "Wanderlust", value: "wanderlust" },
      { id: "transcendent", label: "Transcendent", value: "transcendent" },
    ],
  },
  {
    id: "reviews-loading",
    kind: "reviews",
    title: "Perfect - building your tattoo set",
    description: undefined,
    image: DEFAULT_ONBOARDING_IMAGE,
  },
  {
    id: "congratulations",
    kind: "congratulations",
    title: "Congratulations!",
    description: "You're all set to get started.",
    image: DEFAULT_ONBOARDING_IMAGE,
  },
];

const STEP_INDEX_BY_ID = Object.fromEntries(
  ONBOARDING_STEPS.map((step, index) => [step.id, index])
);

const getNextStepIndex = (step: OnboardingStep, currentIndex: number) => {
  if (step.next) {
    const nextIndex = STEP_INDEX_BY_ID[step.next];
    if (typeof nextIndex === "number") {
      return nextIndex;
    }
  }
  return currentIndex + 1;
};

const isStepComplete = (step: OnboardingStep, answers: OnboardingAnswers) => {
  if (!step.required) {
    return true;
  }

  const answer = answers[step.id];

  if (step.kind === "singleChoice") {
    return typeof answer === "string" && answer.length > 0;
  }

  if (step.kind === "multiChoice" || step.kind === "multiChoiceChips") {
    return Array.isArray(answer) && answer.length > 0;
  }

  if (step.kind === "text") {
    return typeof answer === "string" && answer.trim().length > 0;
  }

  return true;
};

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
  const ctaLabel = currentStep.cta ?? (isLastStep ? "Continue" : "Next");

  // Smooth animation for sign-in link visibility
  const signInVisible = useSharedValue(1);

  useEffect(() => {
    const targetValue = currentIndex === 0 ? 1 : 0;
    signInVisible.value = withTiming(targetValue, {
      duration: 350,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [currentIndex, signInVisible]);

  const signInAnimatedStyle = useAnimatedStyle(() => ({
    opacity: signInVisible.value,
    height: signInVisible.value * 40,
    overflow: "hidden" as const,
  }));

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

    if (step.max && existing.length >= step.max) {
      return;
    }

    setAnswer(step.id, [...existing, value]);
  };

  const stepBody = (() => {
    if (currentStep.kind === "congratulations") {
      return <CongratulationsStepBody step={currentStep} />;
    }

    if (currentStep.kind === "singleChoice") {
      const selected =
        typeof answers[currentStep.id] === "string"
          ? (answers[currentStep.id] as string)
          : undefined;
      return (
        <SingleChoiceStepBody
          step={currentStep}
          value={selected}
          onSelect={(value) => setAnswer(currentStep.id, value)}
        />
      );
    }

    if (
      currentStep.kind === "multiChoice" ||
      currentStep.kind === "multiChoiceChips"
    ) {
      const selected = Array.isArray(answers[currentStep.id])
        ? (answers[currentStep.id] as string[])
        : [];
      return (
        <MultiChoiceStepBody
          step={currentStep}
          values={selected}
          onToggle={(value) => toggleMultiChoice(currentStep, value)}
        />
      );
    }

    if (currentStep.kind === "text") {
      const value =
        typeof answers[currentStep.id] === "string"
          ? (answers[currentStep.id] as string)
          : "";
      return (
        <TextStepBody
          step={currentStep}
          value={value}
          onChange={(text) => setAnswer(currentStep.id, text)}
        />
      );
    }

    if (currentStep.kind === "beforeAfter") {
      return <BeforeAfterStepBody step={currentStep} />;
    }

    if (currentStep.kind === "reviews") {
      return <ReviewsStepBody step={currentStep} />;
    }

    return null;
  })();

  return (
    <>
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
                      <CircleProgress
                        progress={currentIndex / (ONBOARDING_STEPS.length - 1)}
                        size={36}
                        strokeWidth={5}
                      />
                    ),
                    hidesSharedBackground: true,
                  },
                ]
              : [],
        }}
      />
      <StatusBar hidden />
      <Animated.View
        entering={FadeIn.duration(700).delay(200)}
        style={styles.videoContainer}
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
          style={styles.scrollView}
          onScroll={handleScroll}
        >
          {ONBOARDING_STEPS.map((_, index) => (
            <View key={index} style={{ width: SCREEN_WIDTH, height: "100%" }}>
              {ONBOARDING_STEPS[index].image ? (
                <Image
                  source={{ uri: ONBOARDING_STEPS[index].image }}
                  style={{ width: SCREEN_WIDTH, height: "75%" }}
                  contentFit="cover"
                  contentPosition="left"
                />
              ) : (
                <View style={[styles.imageFallback, { width: SCREEN_WIDTH }]} />
              )}
            </View>
          ))}
        </ScrollView>
      </Animated.View>

      <View style={styles.container} pointerEvents="box-none">
        <View style={styles.contentContainer} pointerEvents="box-none">
          <Animated.View
            entering={FadeIn.duration(600).delay(950)}
            style={{
              width: "100%",
              alignItems: "center",
              position: "relative",
            }}
            pointerEvents="box-none"
          >
            <Animated.View
              key={currentIndex}
              entering={FadeIn.duration(500)}
              exiting={FadeOut.duration(500)}
              pointerEvents="none"
              style={{ width: "100%" }}
            >
              <Text type="3xl" weight="bold" style={{ textAlign: "center" }}>
                {currentStep?.title}
              </Text>
              <Text
                type="xl"
                style={
                  { opacity: 0.6, textAlign: "center", marginTop: 12 } as any
                }
              >
                {currentStep?.description}
              </Text>
            </Animated.View>

            <Animated.View
              entering={FadeIn.duration(600).delay(1200)}
              style={{ gap: 16, marginTop: 24, width: "100%" }}
              pointerEvents="auto"
            >
              {stepBody ? (
                <View style={styles.stepBodyContainer}>{stepBody}</View>
              ) : null}
            </Animated.View>

            {/* CTA Button */}
            <Animated.View
              entering={FadeIn.duration(600).delay(1200)}
              style={{ gap: 16, marginTop: 24, width: "100%" }}
              pointerEvents="auto"
            >
              <Button
                title={ctaLabel}
                color={
                  currentIndex === ONBOARDING_STEPS.length - 1
                    ? "yellow"
                    : "white"
                }
                variant="solid"
                size="lg"
                radius="full"
                disabled={!canAdvance}
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
                    NativeCoreHaptics.default.playPattern(
                      onboardingSwipeHaptic
                    );
                  }
                }}
              />
              <Animated.View
                style={[styles.signInContainer, signInAnimatedStyle]}
                pointerEvents={currentIndex === 0 ? "auto" : "none"}
              >
                <Text type="sm" style={styles.termsText}>
                  Already have an account?{" "}
                  <Link href="/(onboarding)/auth?from=onboarding" asChild>
                    <Text type="sm" weight="bold">
                      Sign In
                    </Text>
                  </Link>
                </Text>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },

  scrollView: {
    flex: 1,
  },

  container: {
    flex: 1,
    position: "relative",
    experimental_backgroundImage: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.8) 70%, #000000 100%)`,
    zIndex: 2,
  },

  contentContainer: {
    height: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: 32,
    paddingHorizontal: 16,
  },

  paginationContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },

  paginationDotActive: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: 24,
  },

  termsContainer: {
    marginTop: 24,
    alignItems: "center",
    width: "100%",
  },

  termsText: {
    textAlign: "center",
    opacity: 0.5,
    lineHeight: 20,
  },

  termsLink: {
    // Empty style for inline TouchableOpacity
  },

  imageFallback: {
    height: "75%",
    backgroundColor: "#000",
  },

  stepBodyContainer: {
    width: "100%",
    gap: 12,
    alignItems: "center",
  },

  signInContainer: {
    alignItems: "center",
    width: "100%",
  },
});
