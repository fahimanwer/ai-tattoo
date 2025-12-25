import { authClient } from "@/lib/auth-client";
import { Home } from "@/src/components/screens/Home";
import { useUsageLimit } from "@/src/hooks/useUsageLimit";
import { Stack, useRouter } from "expo-router";
import { useEffect, useRef } from "react";

export default function HomeScreen() {
  const router = useRouter();
  const { isLimitReached, subscriptionTier, isLoading } = useUsageLimit();
  const { data: session } = authClient.useSession();
  const isAuthenticated = session?.user !== undefined;
  const hasSubscription = subscriptionTier !== "free";
  const hasShownPaywall = useRef(false);

  // Auto-show paywall for free users on app open
  useEffect(() => {
    if (
      !isLoading &&
      isAuthenticated &&
      subscriptionTier === "free" &&
      !hasShownPaywall.current
    ) {
      hasShownPaywall.current = true;
      router.push("/(paywall)");
    }
  }, [isLoading, isAuthenticated, subscriptionTier, router]);

  // Determine button label and action based on user state
  const getButtonConfig = () => {
    if (isLoading) {
      return {
        label: "Loading...",
        action: () => {},
      };
    }

    // Not authenticated → Go to playground (or could go to auth, but keeping simple)
    if (!isAuthenticated) {
      return {
        label: "New Tattoo",
        action: () => router.push("/(playground)"),
      };
    }

    // Limit reached or no subscription → Show "Update plan" and go to paywall
    if (isLimitReached || !hasSubscription) {
      return {
        label: "Upgrade plan",
        action: () => router.push("/(paywall)"),
      };
    }

    // Logged in with subscription → Go to playground
    return {
      label: "New Tattoo",
      action: () => router.push("/(playground)"),
    };
  };

  const { label, action } = getButtonConfig();

  return (
    <>
      <Stack.Screen
        options={{
          unstable_headerRightItems: (props) => [
            {
              type: "button",
              label,
              variant: "prominent",
              tintColor: "yellow",
              labelStyle: {
                fontWeight: "bold",
              },
              onPress: action,
            },
          ],
        }}
      />
      <Home />
    </>
  );
}
