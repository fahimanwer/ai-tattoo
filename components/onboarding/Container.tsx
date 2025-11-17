import { AppleSignInButton } from "@/components/ui/AppleSignInButton";
import SignInWithGoogleButton from "@/components/ui/SignInWithGoogleButton";
import { Text } from "@/components/ui/Text";

import { authClient } from "@/lib/auth-client";
import { Link } from "expo-router";

import { Color } from "@/constants/TWPalette";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { PressableScale } from "pressto";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const ONBOARDING_VIDEOS = [
  {
    title: "Create Tattoos With a Simple Prompt",
    description:
      "Type a few words and instantly generate unique tattoo designs.",
    video:
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/final-onb-1.mov",
  },
  {
    title: "Refine and Personalize Your Tattoo",
    description:
      "Adjust colors, layout, and style to make the tattoo perfectly yours.",
    video:
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/final-onb-2.mov",
  },
  {
    title: "See the Tattoo on Your Body",
    description:
      "Preview any tattoo on your skin — adjust size and placement instantly.",
    video:
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/final-onb-3.mov",
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Container() {
  const { isPending, isRefetching: isSessionRefetching } =
    authClient.useSession();
  const [showLoading, setShowLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // Create three video players
  const player1 = useVideoPlayer(ONBOARDING_VIDEOS[0].video, (player) => {
    player.loop = true;
    player.playbackRate = 1.5;
    player.play();
  });

  const player2 = useVideoPlayer(ONBOARDING_VIDEOS[1].video, (player) => {
    player.loop = true;
    player.playbackRate = 1.5;
  });

  const player3 = useVideoPlayer(ONBOARDING_VIDEOS[2].video, (player) => {
    player.loop = true;
    player.playbackRate = 1.5;
  });

  const players = [player1, player2, player3];

  const { isPlaying: isPlaying1 } = useEvent(player1, "playingChange", {
    isPlaying: player1.playing,
  });
  const { isPlaying: isPlaying2 } = useEvent(player2, "playingChange", {
    isPlaying: player2.playing,
  });
  const { isPlaying: isPlaying3 } = useEvent(player3, "playingChange", {
    isPlaying: player3.playing,
  });

  const isPlayingStates = [isPlaying1, isPlaying2, isPlaying3];

  useEffect(() => {
    const isLoading = isPending || isSessionRefetching;

    if (isLoading) {
      const timer = setTimeout(() => {
        setShowLoading(true);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setShowLoading(false);
    }
  }, [isPending, isSessionRefetching]);

  // Handle video switching based on current index
  useEffect(() => {
    // Play only the current video, pause others
    if (currentIndex === 0) {
      player1.play();
      player2.pause();
      player3.pause();
    } else if (currentIndex === 1) {
      player1.pause();
      player2.play();
      player3.pause();
    } else if (currentIndex === 2) {
      player1.pause();
      player2.pause();
      player3.play();
    }
  }, [currentIndex, player1, player2, player3]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const togglePlayPause = () => {
    const currentPlayer = players[currentIndex];
    if (isPlayingStates[currentIndex]) {
      currentPlayer.pause();
    } else {
      currentPlayer.play();
    }
  };

  function isLoadingOrPending() {
    return showLoading;
  }

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={SCREEN_WIDTH}
        snapToAlignment="center"
        style={styles.scrollView}
      >
        {ONBOARDING_VIDEOS.map((_, index) => (
          <PressableScale
            key={index}
            onPress={togglePlayPause}
            style={{ width: SCREEN_WIDTH }}
          >
            <VideoView
              style={styles.videoView}
              player={players[index]}
              nativeControls={false}
            />
          </PressableScale>
        ))}
      </ScrollView>

      <View style={styles.container} pointerEvents="box-none">
        <View style={styles.contentContainer} pointerEvents="box-none">
          {/* Pagination Dots */}
          <View style={styles.paginationContainer} pointerEvents="none">
            {ONBOARDING_VIDEOS.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  currentIndex === index && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>

          <View
            style={{
              width: "100%",
              alignItems: "center",
              position: "relative",
            }}
            pointerEvents="box-none"
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

            {isLoadingOrPending() ? (
              <View
                style={{
                  height: 104,
                  width: "100%",
                  marginTop: 32,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator />
              </View>
            ) : (
              <View
                style={{ gap: 16, marginTop: 32, width: "100%" }}
                pointerEvents="auto"
              >
                <SignInWithGoogleButton
                  onPress={() => {
                    authClient.signIn.social({
                      provider: "google",
                      callbackURL: "/(tabs)/home",
                    });
                  }}
                />
                <AppleSignInButton />
              </View>
            )}
            <View style={styles.termsContainer} pointerEvents="auto">
              <Text type="sm" style={styles.termsText}>
                By continuing you agree to our{" "}
                <Link href="/terms-of-service" asChild>
                  <Text type="sm" style={styles.linkText}>
                    Terms of Service
                  </Text>
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },

  videoView: {
    width: SCREEN_WIDTH,
    height: "100%",
    position: "absolute",
    top: -50,
  },

  container: {
    flex: 1,
    position: "relative",
    experimental_backgroundImage: `linear-gradient(to bottom, transparent, ${Color.slate[950]})`,
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
