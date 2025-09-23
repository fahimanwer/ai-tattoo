import { fetchUserUsage } from "@/lib/nano";
import { useQuery } from "@tanstack/react-query";

export const useUsageLimit = () => {
  const { data: usageData, isLoading, error } = useQuery({
    queryKey: ["user", "usage"],
    queryFn: fetchUserUsage,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });

  // Get current month usage for "free" entitlement
  const currentMonthUsage = usageData?.usage.find((usage) => {
    const now = new Date();
    const periodStart = new Date(usage.periodStart);
    const periodEnd = new Date(usage.periodEnd);

    return (
      usage.entitlement === "free" &&
      now >= periodStart &&
      now <= periodEnd
    );
  });

  const used = currentMonthUsage?.count || 0;
  const limit = 5; // Fixed limit for free users
  const remaining = Math.max(0, limit - used);
  const isLimitReached = used >= limit;

  return {
    used,
    limit,
    remaining,
    isLimitReached,
    isLoading,
    error,
  };
};
