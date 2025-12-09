import { authClient } from "@/lib/auth-client";
import { Home } from "@/src/components/screens/Home";
import { useUsageLimit } from "@/src/hooks/useUsageLimit";
import { Stack, useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const { isLimitReached, subscriptionTier, isLoading } = useUsageLimit();
  const { data: session } = authClient.useSession();
  const isAuthenticated = session?.user !== undefined;
  const hasSubscription = subscriptionTier !== "free";

  // Determine button label and action based on user state
  const getButtonConfig = () => {
    if (isLoading) {
      return {
        label: "New Tattoo",
        action: () => router.push("/(playground)"),
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
        label: "Update plan",
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
