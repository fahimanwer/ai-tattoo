import { useSubscription } from "@/hooks/useSubscription";
import { useUsage } from "@/hooks/useUsage";

export interface UsageLimitResult {
  used: number;
  limit: number;
  remaining: number;
  isLimitReached: boolean;
  canCreateTattoo: boolean;
  subscriptionTier: string;
  isLoading: boolean;
  error: Error | null;
  limitMessage: string;
}

/**
 * Hook to check usage limits across all subscription tiers
 * This abstracts the logic from UsageDisplay and can be used
 * anywhere we need to check if user can perform actions
 */
export const useUsageLimit = (): UsageLimitResult => {
  const {
    data: usageData,
    isLoading: isUsageLoading,
    error: usageError,
  } = useUsage();

  const { subscriptionTier, isLoading: isSubscriptionLoading } =
    useSubscription();

  const totalUsage = usageData?.totalUsage || 0;
  const usage = usageData?.usage || [];

  // Calculate current usage based on subscription tier and active period
  const currentLimit = 5;

  // Find current period usage for the subscription tier
  const currentPeriodUsage = usage.find((record) => {
    const now = new Date();
    const periodStart = new Date(record.periodStart);
    const periodEnd = new Date(record.periodEnd);

    // Check if we're in the current period and it matches the subscription tier
    return (
      now >= periodStart &&
      now <= periodEnd &&
      (record.entitlement.toLowerCase() === subscriptionTier ||
        (subscriptionTier === "free" && !record.entitlement))
    );
  });

  const used = currentPeriodUsage?.count || totalUsage || 0;
  const remaining = Math.max(0, currentLimit - used);
  const isLimitReached = used >= currentLimit;
  const canCreateTattoo = !isLimitReached;

  // Generate user-friendly message
  let limitMessage = "";
  if (isLimitReached) {
    limitMessage =
      subscriptionTier === "free"
        ? "Monthly limit reached. Upgrade to get more generations."
        : "Monthly limit reached. Your plan resets next month.";
  } else {
    limitMessage = `${remaining} generations remaining this period`;
  }

  return {
    used,
    limit: currentLimit,
    remaining,
    isLimitReached,
    canCreateTattoo,
    subscriptionTier,
    isLoading: isUsageLoading || isSubscriptionLoading,
    error: usageError,
    limitMessage,
  };
};
