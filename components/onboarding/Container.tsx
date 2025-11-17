import { AppleSignInButton } from "@/components/ui/AppleSignInButton";
import SignInWithGoogleButton from "@/components/ui/SignInWithGoogleButton";
import { Text } from "@/components/ui/Text";

import { authClient } from "@/lib/auth-client";
import { Link } from "expo-router";

import { Color } from "@/constants/TWPalette";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { PressableScale } from "pressto";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

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
      "Adjust colors, layout, and style to make the tattoo perfectly yours — all in seconds.",
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

export default function Container() {
  const { isPending, isRefetching: isSessionRefetching } =
    authClient.useSession();
  const [showLoading, setShowLoading] = useState(false);
  const player = useVideoPlayer(ONBOARDING_VIDEOS[0].video, (player) => {
    player.loop = false;
    player.playbackRate = 1.5;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

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

  function isLoadingOrPending() {
    return showLoading;
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View>
            <PressableScale
              onPress={() => {
                if (isPlaying) {
                  player.pause();
                } else {
                  player.play();
                }
              }}
            >
              <Text>Play</Text>
            </PressableScale>
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Text
              type="6xl"
              weight="bold"
              style={{ letterSpacing: -2, textAlign: "center", lineHeight: 58 }}
            >
              Try first, {`\n`} ink later
            </Text>
            <Text
              type="xl"
              weight="normal"
              style={{ opacity: 0.6, textAlign: "center" } as any}
            >
              The only tattoo mistake {`\n`} you can undo.
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
              <View style={{ gap: 16, marginTop: 32, width: "100%" }}>
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
            <View style={styles.termsContainer}>
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
      <VideoView
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: -50,
          zIndex: -1,
        }}
        player={player}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    experimental_backgroundImage: `linear-gradient(to bottom, transparent, ${Color.slate[950]})`,
  },

  contentContainer: {
    height: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
    paddingBottom: 32,
    paddingHorizontal: 16,
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
