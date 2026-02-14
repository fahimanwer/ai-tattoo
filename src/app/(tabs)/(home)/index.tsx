import { authClient } from "@/lib/auth-client";
import { Home } from "@/src/components/screens/Home";
import { useSubscription } from "@/src/hooks/useSubscription";
import { useUsageLimit } from "@/src/hooks/useUsageLimit";
import { Stack, useRouter } from "expo-router";
import { useEffect, useRef } from "react";

export default function HomeScreen() {
  const router = useRouter();
  const { isLimitReached, isLoading: isUsageLoading } = useUsageLimit();
  const { hasActiveSubscription, isLoading: isSubLoading } = useSubscription();
  const { data: session } = authClient.useSession();
  const isAuthenticated = session?.user !== undefined;
  const isLoading = isUsageLoading || isSubLoading;
  const hasShownPaywall = useRef(false);

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

  const getButtonConfig = () => {
    if (isLoading) {
      return { label: "Loading...", action: () => {} };
    }
    if (!isAuthenticated) {
      return { label: "New Tattoo", action: () => router.push("/(playground)") };
    }
    if (isLimitReached || !hasActiveSubscription) {
      return { label: "Upgrade plan", action: () => router.push("/(paywall)") };
    }
    return { label: "New Tattoo", action: () => router.push("/(playground)") };
  };

  const { label, action } = getButtonConfig();

  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          tintColor="#3563E9"
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
