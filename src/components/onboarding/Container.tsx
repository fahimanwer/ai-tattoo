import { Text } from "@/src/components/ui/Text";

import { Link } from "expo-router";

import {
  onboardingEntranceHaptic,
  onboardingSwipeHaptic,
} from "@/lib/haptics-patterns.ios";
import * as NativeCoreHaptics from "@/modules/native-core-haptics";
import { AppSettingsContext } from "@/src/context/AppSettings";
import { useEvent } from "expo";
import { StatusBar } from "expo-status-bar";
import { useVideoPlayer, VideoView } from "expo-video";
import { PressableScale } from "pressto";
import { use, useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Button } from "../ui/Button";

const ONBOARDING_VIDEOS = [
  {
    title: "Generate Tattoos Instantly",
    description:
      "Type a few words and instantly generate unique tattoo designs.",
    video:
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/Onboarding2.mov",
  },
  {
    title: "Personalize Your Design",
    description:
      "Adjust colors, layout, and style to make the tattoo perfectly yours.",
    video:
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/Onboarding22.mov",
  },
  {
    title: "Preview on Your Skin",
    description:
      "Preview any tattoo on your skin — adjust size and placement instantly.",
    video:
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/Onboarding2222.mov",
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Container() {
  const { setIsOnboarded } = use(AppSettingsContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPausedIndicator, setShowPausedIndicator] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const hasPlayedEntranceHaptic = useRef(false);
  const pausedIndicatorTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // Create three video players
  const player1 = useVideoPlayer(ONBOARDING_VIDEOS[0].video, (player) => {
    player.loop = false;
    player.playbackRate = 1.5;
    player.play();
  });

  const player2 = useVideoPlayer(ONBOARDING_VIDEOS[1].video, (player) => {
    player.loop = false;
    player.playbackRate = 1.5;
  });

  const player3 = useVideoPlayer(ONBOARDING_VIDEOS[2].video, (player) => {
    player.loop = false;
    player.playbackRate = 1.5;
  });

  const players = useMemo(
    () => [player1, player2, player3],
    [player1, player2, player3]
  );

  const { isPlaying: isPlaying1 } = useEvent(player1, "playingChange", {
    isPlaying: player1.playing,
  });
  const { isPlaying: isPlaying2 } = useEvent(player2, "playingChange", {
    isPlaying: player2.playing,
  });
  const { isPlaying: isPlaying3 } = useEvent(player3, "playingChange", {
    isPlaying: player3.playing,
  });

  const isPlayingStates = useMemo(
    () => [isPlaying1, isPlaying2, isPlaying3],
    [isPlaying1, isPlaying2, isPlaying3]
  );

  // Listen for video status changes to detect when video ends
  const { status: status1 } = useEvent(player1, "statusChange", {
    status: player1.status,
  });
  const { status: status2 } = useEvent(player2, "statusChange", {
    status: player2.status,
  });
  const { status: status3 } = useEvent(player3, "statusChange", {
    status: player3.status,
  });

  // Play entrance haptic on first mount
  useEffect(() => {
    if (!hasPlayedEntranceHaptic.current) {
      hasPlayedEntranceHaptic.current = true;
      NativeCoreHaptics.default.playPattern(onboardingEntranceHaptic);
    }
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (pausedIndicatorTimer.current) {
        clearTimeout(pausedIndicatorTimer.current);
      }
    };
  }, []);

  // Auto-advance to next video when current video ends
  useEffect(() => {
    const currentPlayer = players[currentIndex];
    const isCurrentlyPlaying = isPlayingStates[currentIndex];

    // Check if video has ended (not playing and at the end)
    if (
      !isCurrentlyPlaying &&
      currentPlayer.currentTime > 0 &&
      currentPlayer.duration > 0 &&
      currentPlayer.currentTime >= currentPlayer.duration - 0.1
    ) {
      // Wait 1 second then advance to next video
      const timer = setTimeout(() => {
        const nextIndex = currentIndex === 2 ? 0 : currentIndex + 1;

        // Scroll to next video
        scrollViewRef.current?.scrollTo({
          x: nextIndex * SCREEN_WIDTH,
          animated: true,
        });

        // Play swipe haptic
        NativeCoreHaptics.default.playPattern(onboardingSwipeHaptic);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [status1, status2, status3, currentIndex, isPlayingStates, players]);

  // Handle video switching based on current index
  useEffect(() => {
    // Play only the current video, pause others, and restart from beginning
    if (currentIndex === 0) {
      player1.currentTime = 0;
      player1.play();
      player2.pause();
      player3.pause();
    } else if (currentIndex === 1) {
      player1.pause();
      player2.currentTime = 0;
      player2.play();
      player3.pause();
    } else if (currentIndex === 2) {
      player1.pause();
      player2.pause();
      player3.currentTime = 0;
      player3.play();
    }
  }, [currentIndex, player1, player2, player3]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    if (
      index !== currentIndex &&
      index >= 0 &&
      index < ONBOARDING_VIDEOS.length
    ) {
      setCurrentIndex(index);
      // Play swipe haptic when changing steps
      NativeCoreHaptics.default.playPattern(onboardingSwipeHaptic);
    }
  };

  const togglePlayPause = () => {
    const currentPlayer = players[currentIndex];
    if (isPlayingStates[currentIndex]) {
      // Pausing the video
      currentPlayer.pause();

      // Clear any existing timer
      if (pausedIndicatorTimer.current) {
        clearTimeout(pausedIndicatorTimer.current);
      }

      // Show the paused indicator
      setShowPausedIndicator(true);

      // Hide it after 1.5 seconds
      pausedIndicatorTimer.current = setTimeout(() => {
        setShowPausedIndicator(false);
      }, 1500);
    } else {
      // Playing the video - no indicator needed
      currentPlayer.play();

      // Hide paused indicator if it's showing
      if (showPausedIndicator) {
        setShowPausedIndicator(false);
      }
      if (pausedIndicatorTimer.current) {
        clearTimeout(pausedIndicatorTimer.current);
      }
    }
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
          onScroll={handleScroll}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToInterval={SCREEN_WIDTH}
          snapToAlignment="center"
          style={styles.scrollView}
        >
          {ONBOARDING_VIDEOS.map((_, index) => (
            <View key={index} style={{ width: SCREEN_WIDTH, height: "100%" }}>
              <VideoView
                style={styles.videoView}
                player={players[index]}
                nativeControls={false}
              />
              <PressableScale
                onPress={togglePlayPause}
                style={styles.videoTapArea}
              />
              {/* Paused Indicator */}
              {showPausedIndicator && index === currentIndex && (
                <Animated.View
                  entering={FadeIn.duration(300)}
                  exiting={FadeOut.duration(300)}
                  style={styles.pausedIndicator}
                  pointerEvents="none"
                >
                  <View style={styles.pausedIndicatorBg}>
                    <Text type="xl" weight="semibold" style={{ color: "#fff" }}>
                      Paused
                    </Text>
                  </View>
                </Animated.View>
              )}
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
            {ONBOARDING_VIDEOS.map((_, index) => (
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
                {ONBOARDING_VIDEOS[currentIndex].title}
              </Text>
              <Text
                type="xl"
                style={
                  { opacity: 0.6, textAlign: "center", marginTop: 12 } as any
                }
              >
                {ONBOARDING_VIDEOS[currentIndex].description}
              </Text>
            </Animated.View>

            <Animated.View
              entering={FadeIn.duration(600).delay(1200)}
              style={{ gap: 16, marginTop: 32, width: "100%" }}
              pointerEvents="auto"
            >
              <Button
                title={currentIndex === 2 ? "Continue" : "Next"}
                color="white"
                variant="solid"
                size="md"
                radius="full"
                onPress={() => {
                  if (currentIndex === 2) {
                    // On last video, complete onboarding
                    setIsOnboarded(true);
                  } else {
                    // Advance to next video
                    const nextIndex = currentIndex + 1;
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
              {/* <Button
                title="Skip"
                variant="link"
                color="gray"
                size="sm"
                style={{ height: 20 }}
                radius="full"
                onPress={() => {
                  setIsOnboarded(true);
                }}
              /> */}
              {/* <SignInWithGoogleButton
                onPress={() => {
                  authClient.signIn.social({
                    provider: "google",
                    callbackURL: "/(tabs)/home",
                  });
                }}
              />
              <AppleSignInButton /> */}
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
