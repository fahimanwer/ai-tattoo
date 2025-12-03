import { authClient } from "@/lib/auth-client";
import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import { useUsageLimit } from "@/src/hooks/useUsageLimit";
import { router } from "expo-router";
import { PressableScale } from "pressto";
import { Alert, StyleSheet, View } from "react-native";
import { SlideInLeft } from "react-native-reanimated";
import { LavaLamp } from "../shaders/lava-lamp";

export function Banner() {
  const { isLimitReached, subscriptionTier } = useUsageLimit();
  const { data: session } = authClient.useSession();
  const isAuthenticated = session?.user !== undefined;
  const hasSubscription = subscriptionTier !== "free";

  // Determine banner content and action based on user state
  const getBannerConfig = () => {
    // Not authenticated → Sign in
    if (!isAuthenticated) {
      return {
        title: "Sign In to Start Creating",
        subtitle: "Create unlimited tattoo designs with AI",
        action: () => router.push("/auth-sheet"),
      };
    }

    // Limit reached or no subscription → Show paywall
    if (isLimitReached || !hasSubscription) {
      return {
        title: isLimitReached
          ? "Limit Reached - Upgrade Now"
          : "Unlock Unlimited Designs",
        subtitle: isLimitReached
          ? "Continue creating with unlimited generations"
          : "Unlimited designs, endless creativity",
        action: () => {
          try {
            router.push("/(paywall)");
          } catch (error) {
            console.error("Error presenting paywall:", error);
            Alert.alert(
              "Error",
              "Unable to open upgrade options. Please try again later.",
              [{ text: "OK", style: "default" }]
            );
          }
        },
      };
    }

    // Logged in with subscription → Go to playground
    return {
      title: "Ready to Create?",
      subtitle: "Jump into the playground and start designing",
      action: () => router.push("/(playground)"),
    };
  };

  const { title, subtitle, action } = getBannerConfig();

  return (
    <PressableScale
      entering={SlideInLeft}
      onPress={action}
      style={[
        {
          position: "relative",
          height: 124,
          borderRadius: 16,
        },
      ]}
    >
      <View style={styles.lavaLampContainer}>
        <LavaLamp />
      </View>
      <View style={styles.container}>
        <Text type="xl" weight="bold">
          {title}
        </Text>
        <Text
          type="base"
          weight="light"
          style={{ textAlign: "center", opacity: 0.8 }}
        >
          {subtitle}
        </Text>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    flex: 1,
    borderRadius: 16,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    experimental_backgroundImage: `linear-gradient(to bottom, transparent, ${Color.grayscale[50]})`,
    boxShadow: `0 0 0 1px ${Color.yellow[500] + "20"}, 0 0 20px 1px ${
      Color.yellow[400] + "20"
    }`,
  },
  lavaLampContainer: {
    position: "absolute",
    overflow: "hidden",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
});
