import { Text } from "@/src/components/ui/Text";

import { Link, useRouter } from "expo-router";

import {
  onboardingEntranceHaptic,
  onboardingSwipeHaptic,
} from "@/lib/haptics-patterns.ios";
import * as NativeCoreHaptics from "@/modules/native-core-haptics";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { customEvent } from "vexo-analytics";
import { Button } from "../ui/Button";

const ONBOARDING_STEPS = [
  {
    title: "See a tattoo on you before you commit",
    description: "Try-on + AI design in seconds. No regret.",
    image:
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/onboarding-v1.avif",
  },
  {
    title: "Generate Tattoos Instantly",
    description:
      "Type a few words and instantly generate unique tattoo designs.",
    image:
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/onboarding-v1.avif",
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function OnboardingV2() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPausedIndicator, setShowPausedIndicator] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const hasPlayedEntranceHaptic = useRef(false);
  const pausedIndicatorTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const onboardingStartTime = useRef<number>(Date.now());
  const stepsViewed = useRef<Set<number>>(new Set([0])); // Track which steps were viewed

  // Play entrance haptic on first mount and track first step
  useEffect(() => {
    if (!hasPlayedEntranceHaptic.current) {
      hasPlayedEntranceHaptic.current = true;
      NativeCoreHaptics.default.playPattern(onboardingEntranceHaptic);

      // Track first step view
      customEvent("onboarding_step_viewed", {
        step: 1,
        stepTitle: ONBOARDING_STEPS[0].title,
      });
    }
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  return (
    <>
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
              <Image
                source={{ uri: ONBOARDING_STEPS[index].image }}
                style={{ width: SCREEN_WIDTH, height: "75%" }}
                contentFit="cover"
                contentPosition="left"
              />
            </View>
          ))}
        </ScrollView>
      </Animated.View>

      <View style={styles.container} pointerEvents="box-none">
        <View style={styles.contentContainer} pointerEvents="box-none">
          {/* Pagination Dots */}
          <Animated.View
            entering={FadeIn.duration(600).delay(700)}
            style={styles.paginationContainer}
            pointerEvents="none"
          >
            {ONBOARDING_STEPS.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  currentIndex === index && styles.paginationDotActive,
                ]}
              />
            ))}
          </Animated.View>

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
                {ONBOARDING_STEPS[currentIndex].title}
              </Text>
              <Text
                type="xl"
                style={
                  { opacity: 0.6, textAlign: "center", marginTop: 12 } as any
                }
              >
                {ONBOARDING_STEPS[currentIndex].description}
              </Text>
            </Animated.View>

            <Animated.View
              entering={FadeIn.duration(600).delay(1200)}
              style={{ gap: 16, marginTop: 32, width: "100%" }}
              pointerEvents="auto"
            >
              <Button
                title={currentIndex === 2 ? "Continue" : "Get started"}
                color="yellow"
                variant="solid"
                size="md"
                radius="full"
                onPress={() => {
                  if (currentIndex === 2) {
                    // Calculate duration in seconds
                    const durationMs = Date.now() - onboardingStartTime.current;
                    const durationSeconds = Math.round(durationMs / 1000);

                    // Track onboarding videos completion (paywall comes next)
                    customEvent("onboarding_videos_completed", {
                      stepsViewed: stepsViewed.current.size,
                      duration: durationSeconds,
                    });

                    // Navigate to paywall (user can purchase before auth)
                    router.push("/(paywall)");
                  } else {
                    // Track step view for next step
                    const nextIndex = currentIndex + 1;
                    if (!stepsViewed.current.has(nextIndex)) {
                      stepsViewed.current.add(nextIndex);
                      customEvent("onboarding_step_viewed", {
                        step: nextIndex + 1,
                        stepTitle: ONBOARDING_STEPS[nextIndex].title,
                      });
                    }

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
            </Animated.View>

            <Animated.View
              entering={FadeIn.duration(600).delay(1450)}
              style={styles.termsContainer}
              pointerEvents="auto"
            >
              <Text type="sm" style={styles.termsText}>
                By continuing you agree to our{" "}
                <Link href="/terms-of-service" asChild>
                  <Text type="sm" style={styles.linkText}>
                    Terms of Service
                  </Text>
                </Link>
              </Text>
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

  videoView: {
    width: SCREEN_WIDTH,
    height: "100%",

    // marginTop: 35,
  },

  videoTapArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },

  pausedIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -60 }, { translateY: -25 }],
    zIndex: 20,
  },

  pausedIndicatorBg: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
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

  linkText: {
    textDecorationLine: "underline",
  },
});
