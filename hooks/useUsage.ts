import { fetchUserUsage, UsageResponse } from "@/lib/nano";
import { useQuery } from "@tanstack/react-query";

export const useUsage = () => {
  return useQuery<UsageResponse>({
    queryKey: ["user", "usage"],
    queryFn: fetchUserUsage,
    staleTime: 5 * 60 * 1000, // 5 minutes - match useUsageLimit
    retry: (failureCount, error: any) => {
      // Don't retry on 405 Method Not Allowed errors - it's a deployment issue
      if (error?.status === 405) {
        console.warn(
          "⚠️ API endpoint not properly deployed - skipping retries"
        );
        return false;
      }
      return failureCount < 1; // Only retry once for other errors
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
};

// Hook to get current period usage for a specific entitlement
export const useCurrentPeriodUsage = (entitlementId: string) => {
  const { data: usageData, ...rest } = useUsage();

  const currentPeriodUsage = usageData?.usage.find((usage) => {
    const now = new Date();
    const periodStart = new Date(usage.periodStart);
    const periodEnd = new Date(usage.periodEnd);

    return (
      usage.entitlement === entitlementId &&
      now >= periodStart &&
      now <= periodEnd
    );
  });

  return {
    data: currentPeriodUsage,
    currentCount: currentPeriodUsage?.count || 0,
    ...rest,
  };
};

// Hook to check if user has active entitlement
export const useHasActiveEntitlement = (entitlementId: string) => {
  const { data: usageData, ...rest } = useUsage();

  const hasActiveEntitlement =
    usageData?.usage.some((usage) => {
      const now = new Date();
      const periodEnd = new Date(usage.periodEnd);

      return usage.entitlement === entitlementId && now <= periodEnd;
    }) || false;

  return {
    data: hasActiveEntitlement,
    hasActiveEntitlement,
    ...rest,
  };
};
