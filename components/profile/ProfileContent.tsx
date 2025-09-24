import { usePricing } from "@/hooks/usePricing";
import { useUserData } from "@/hooks/useUserData";
import { View } from "react-native";
import { PlanInfo } from "./PlanInfo";
import { ProfileHeader } from "./ProfileHeader";
import { SubscriptionActions } from "./SubscriptionActions";
import { UpgradeOptions } from "./UpgradeOptions";
import { UsageDisplay } from "./UsageDisplay";

interface ProfileContentProps {
  user: {
    name?: string;
    email?: string;
  };
}

export function ProfileContent({ user }: ProfileContentProps) {
  const { usage, subscription, isLoading, refresh } = useUserData();
  const { getPlanPricing, isLoading: isPricingLoading } = usePricing();

  // Get pricing data for current plan
  const planPricing = getPlanPricing(subscription.tier);
  const planPrice = planPricing?.priceString || "Free";
  const planLimit = planPricing?.limit || 5;

  // Calculate usage stats from usage data
  const currentLimit = usage.currentPeriodUsage?.limit || planLimit;
  const currentUsed = usage.currentPeriodUsage?.count || 0;
  const currentRemaining = currentLimit - currentUsed;
  const isLimitReached = currentRemaining <= 0;

  return (
    <View style={{ padding: 20 }}>
      <ProfileHeader user={user} />

      <PlanInfo
        subscriptionTier={subscription.tier}
        subscriptionLoading={isLoading || isPricingLoading}
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
          subscriptionTier={subscription.tier}
          currentUsed={currentUsed}
          currentLimit={currentLimit}
          currentRemaining={currentRemaining}
          isLimitReached={isLimitReached}
        />

        <SubscriptionActions
          subscriptionTier={subscription.tier}
          onSubscriptionChange={refresh}
        />

        <UpgradeOptions
          subscriptionTier={subscription.tier}
          onSubscriptionChange={refresh}
        />
      </View>
    </View>
  );
}
