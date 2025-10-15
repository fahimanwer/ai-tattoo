import { Text } from "@/components/ui/Text";
import { Color } from "@/constants/TWPalette";
import { useUsageLimit } from "@/hooks/useUsageLimit";
import { BlurView } from "expo-blur";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { Image } from "expo-image";
import { Alert, Pressable } from "react-native";

export function Banner() {
  const { isLimitReached, subscriptionTier } = useUsageLimit();

  // Only show banner if user is on free tier or has reached their limit
  const shouldShowBanner = subscriptionTier === "free" || isLimitReached;

  // Dynamic banner text based on user status
  const bannerTitle = isLimitReached
    ? "Limit Reached - Upgrade Now"
    : "Unlock Premium Tattoos";
  const bannerSubtitle = isLimitReached
    ? "Continue creating with unlimited generations"
    : "Unlimited designs, exclusive styles & HD downloads";

  const handlePress = async () => {
    try {
      const success = true;
      if (success) {
        Alert.alert(
          "Success! 🎉",
          "Purchase successful. Thank you for supporting us!",
          [{ text: "Awesome!", style: "default" }]
        );
      }
    } catch (error) {
      console.error("Error presenting paywall:", error);
      Alert.alert(
        "Error",
        "Unable to open upgrade options. Please try again later.",
        [{ text: "OK", style: "default" }]
      );
    }
  };

  // Don't render banner if user doesn't need to upgrade
  if (!shouldShowBanner) {
    return null;
  }

  return (
    <Pressable
      onPress={handlePress}
      android_ripple={{ color: "rgba(0,0,0,0.1)" }}
      unstable_pressDelay={0}
      style={({ pressed }) => [
        {
          position: "relative",
          height: 198,
          borderRadius: 16,
          transform: [{ scale: pressed ? 0.99 : 1 }],
        },
      ]}
    >
      {/*   <GlassView
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 16,
          height: "100%",
          width: "100%",
          zIndex: 1,
        }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={{ height: "100%", width: "100%", borderRadius: 16 }}
        />
        <GlassView
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            height: "100%",
            width: "100%",
          }}
          glassEffectStyle="clear"
        />
      </GlassView> */}
      {isLiquidGlassAvailable() ? (
        <GlassView
          style={{
            position: "absolute",
            width: "98%",
            left: "50%",
            transform: [{ translateX: "-50%" }],
            bottom: 4,
            zIndex: 2,
            flex: 1,
            borderRadius: 16,
            padding: 4,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            experimental_backgroundImage: `linear-gradient(to bottom, transparent, ${Color.grayscale[50]})`,
          }}
          glassEffectStyle="clear"
        >
          <Text type="2xl" weight="bold">
            {bannerTitle}
          </Text>
          <Text
            type="base"
            weight="light"
            style={{ textAlign: "center", opacity: 0.7 }}
          >
            {bannerSubtitle}
          </Text>
        </GlassView>
      ) : (
        <BlurView
          intensity={10}
          style={{
            position: "absolute",
            width: "100%",
            left: "50%",
            transform: [{ translateX: "-50%" }],
            bottom: 0,
            zIndex: 2,
            flex: 1,
            borderRadius: 16,
            paddingVertical: 8,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <Text type="2xl" weight="bold">
            {bannerTitle}
          </Text>
          <Text
            type="base"
            weight="light"
            style={{ textAlign: "center", opacity: 0.7 }}
          >
            {bannerSubtitle}
          </Text>
        </BlurView>
      )}
      <Image
        cachePolicy="memory-disk"
        source={require("@/assets/images/banner-pro.png")}
        style={{ width: "100%", height: "100%", borderRadius: 16 }}
        contentFit="cover"
      />
    </Pressable>
  );
}
