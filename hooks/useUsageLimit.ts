import { fetchUserUsage } from "@/lib/nano";
import { useQuery } from "@tanstack/react-query";

export const useUsageLimit = () => {
  const {
    data: usageData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", "usage"],
    queryFn: fetchUserUsage,
    staleTime: 5 * 60 * 1000, // 5 minutes - data is fresh for 5 minutes
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

  // Get current month usage for "free" entitlement
  const currentMonthUsage = usageData?.usage?.find((usage) => {
    const now = new Date();
    const periodStart = new Date(usage.periodStart);
    const periodEnd = new Date(usage.periodEnd);

    return (
      usage.entitlement === "free" && now >= periodStart && now <= periodEnd
    );
  });

  const used = currentMonthUsage?.count || 0;
  const remaining = currentMonthUsage?.limit || 5;
  const limit = 5;
  const isLimitReached = remaining <= 0;

  return {
    used,
    limit,
    remaining,
    isLimitReached,
    isLoading,
    error,
  };
};
