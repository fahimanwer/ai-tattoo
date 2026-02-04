import { authClient } from "@/lib/auth-client";
import { Home } from "@/src/components/screens/Home";
import { useSubscription } from "@/src/hooks/useSubscription";
import { useUsageLimit } from "@/src/hooks/useUsageLimit";
import { Stack, useRouter } from "expo-router";
import { useEffect, useRef } from "react";

export default function HomeScreen() {
  const router = useRouter();
  // Use useUsageLimit for generation limits only
  const { isLimitReached, isLoading: isUsageLoading } = useUsageLimit();
  // Use useSubscription for subscription status (RevenueCat as source of truth)
  const { hasActiveSubscription, isLoading: isSubLoading } = useSubscription();
  const { data: session } = authClient.useSession();
  const isAuthenticated = session?.user !== undefined;
  const isLoading = isUsageLoading || isSubLoading;
  const hasShownPaywall = useRef(false);

  // Auto-show paywall for free users on app open
  useEffect(() => {
    if (
      !isLoading &&
      isAuthenticated &&
      !hasActiveSubscription &&
      !hasShownPaywall.current
    ) {
      hasShownPaywall.current = true;
      router.push("/(paywall)");
    }
  }, [isLoading, isAuthenticated, hasActiveSubscription, router]);

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
    // Uses hasActiveSubscription from RevenueCat (source of truth)
    if (isLimitReached || !hasActiveSubscription) {
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
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          tintColor="yellow"
          variant="prominent"
          style={{ fontWeight: "bold" }}
          onPress={action}
        >
          {label}
        </Stack.Toolbar.Button>
      </Stack.Toolbar>
      <Home />
    </>
  );
}
