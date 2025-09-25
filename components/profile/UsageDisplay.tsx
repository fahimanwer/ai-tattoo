import { Text } from "@/components/ui/Text";
import { useSubscription } from "@/hooks/useSubscription";
import { useUsage } from "@/hooks/useUsage";
import { DEFAULT_PLAN_LIMITS } from "@/lib/pricing-utils";
import { View } from "react-native";

interface UsageDisplayProps {
  className?: string; // Optional className for styling
}

export function UsageDisplay({ className }: UsageDisplayProps) {
  const {
    data,
    isLoading: isUsageLoading,
    error: usageError,
    // refetch: refetchUsage, // Removed as it's not currently used
  } = useUsage();

  const { subscriptionTier, isLoading: isSubscriptionLoading } =
    useSubscription();

  const totalUsage = data?.totalUsage || 0;
  const usage = data?.usage || [];

  // Calculate current usage based on subscription tier and active period
  const currentLimit =
    DEFAULT_PLAN_LIMITS[subscriptionTier] || DEFAULT_PLAN_LIMITS.free;

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

  const currentUsed = currentPeriodUsage?.count || totalUsage || 0;
  const currentRemaining = Math.max(0, currentLimit - currentUsed);
  const isLimitReached = currentUsed >= currentLimit;

  if (isUsageLoading || isSubscriptionLoading) {
    return <Text type="body">Loading usage data...</Text>;
  }

  if (usageError) {
    return (
      <Text type="body">Error loading usage data: {usageError.message}</Text>
    );
  }

  return (
    <View style={{ marginBottom: 16 }} className={className}>
      <Text type="sm" lightColor="#666" style={{ marginBottom: 4 }}>
        Current Usage
      </Text>

      <Text
        type="body"
        weight="bold"
        style={{
          color: isLimitReached
            ? "#ef4444"
            : subscriptionTier === "plus"
            ? "#10b981"
            : subscriptionTier === "pro"
            ? "#3b82f6"
            : subscriptionTier === "starter"
            ? "#f59e0b"
            : "#6b7280",
          marginBottom: 4,
        }}
      >
        {`${currentUsed}/${currentLimit} used`}
      </Text>
      <Text
        type="xs"
        style={{
          color: isLimitReached ? "#ef4444" : "#666",
        }}
      >
        {isLimitReached
          ? subscriptionTier === "free"
            ? "Monthly limit reached. Upgrade to get more generations."
            : "Monthly limit reached. Your plan resets next month."
          : `${currentRemaining} generations remaining this period`}
      </Text>
    </View>
  );
}
