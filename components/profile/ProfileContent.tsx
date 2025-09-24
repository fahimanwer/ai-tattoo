import { useSubscription } from "@/hooks/useSubscription";
import { useCurrentPeriodUsage } from "@/hooks/useUsage";
import { useUsageLimit } from "@/hooks/useUsageLimit";
import { ScrollView, View } from "react-native";
import { PlanInfo } from "./PlanInfo";
import { ProfileHeader } from "./ProfileHeader";
import { SubscriptionActions } from "./SubscriptionActions";
import { UpgradeOptions } from "./UpgradeOptions";
import { UsageDisplay } from "./UsageDisplay";

// Helper function to get entitlement ID from subscription tier
const getEntitlementId = (tier: string): string => {
  switch (tier) {
    case "starter":
      return "Starter";
    case "pro":
      return "Pro";
    case "plus":
      return "Plus";
    case "free":
    default:
      return "free";
  }
};

// Helper function to get plan limits
const getPlanLimits = (tier: string): { limit: number; price: string } => {
  switch (tier) {
    case "starter":
      return { limit: 125, price: "$4.99/month" };
    case "plus":
      return { limit: 300, price: "$9.99/month" };
    case "pro":
      return { limit: 1000, price: "$29.99/month" };
    case "free":
    default:
      return { limit: 5, price: "Free" };
  }
};

interface ProfileContentProps {
  user: {
    name?: string;
    email?: string;
  };
}

export function ProfileContent({ user }: ProfileContentProps) {
  const {
    subscriptionTier,
    isLoading: subscriptionLoading,
    refreshSubscriptionStatus,
  } = useSubscription();

  // Usage data for current plan
  const entitlementId = getEntitlementId(subscriptionTier);
  const { currentCount, data: currentUsageData } =
    useCurrentPeriodUsage(entitlementId);
  const { limit: planLimit, price: planPrice } =
    getPlanLimits(subscriptionTier);

  // For free tier, also use the existing useUsageLimit hook for backwards compatibility
  const { limit: freeLimit, remaining: freeRemaining } = useUsageLimit();

  // Calculate usage stats based on subscription tier
  const currentLimit =
    subscriptionTier === "free"
      ? freeLimit
      : currentUsageData?.limit || planLimit;
  const currentUsed =
    subscriptionTier === "free" ? freeLimit - freeRemaining : currentCount;
  const currentRemaining = currentLimit - currentUsed;
  const isLimitReached = currentRemaining <= 0;

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <ProfileHeader user={user} />

        <PlanInfo
          subscriptionTier={subscriptionTier}
          subscriptionLoading={subscriptionLoading}
          planPrice={planPrice}
          planLimit={planLimit}
        />

        <View
          style={{
            backgroundColor: "#FFFFFF10",
            padding: 20,
            borderRadius: 12,
            marginBottom: 16,
          }}
        >
          <UsageDisplay
            subscriptionTier={subscriptionTier}
            currentUsed={currentUsed}
            currentLimit={currentLimit}
            currentRemaining={currentRemaining}
            isLimitReached={isLimitReached}
          />

          <SubscriptionActions
            subscriptionTier={subscriptionTier}
            onSubscriptionChange={refreshSubscriptionStatus}
          />

          <UpgradeOptions
            subscriptionTier={subscriptionTier}
            onSubscriptionChange={refreshSubscriptionStatus}
          />
        </View>
      </View>
    </ScrollView>
  );
}
