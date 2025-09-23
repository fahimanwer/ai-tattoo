import { fetchUserUsage } from "@/lib/nano";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useUsageLimit = () => {
  console.log("🔍 useUsageLimit: Starting hook");
  
  const queryClient = useQueryClient();
  
  const { data: usageData, isLoading, error } = useQuery({
    queryKey: ["user", "usage"],
    queryFn: fetchUserUsage,
    staleTime: 0, // Always refetch
    retry: 3,
  });

  // Function to manually refetch usage data
  const refetchUsage = () => {
    console.log("🔍 useUsageLimit: Manually refetching usage data");
    queryClient.invalidateQueries({ queryKey: ["user", "usage"] });
  };

  console.log("🔍 useUsageLimit: Query state", { 
    isLoading, 
    error: error?.message, 
    hasData: !!usageData 
  });

  // Get current month usage for "free" entitlement
  const currentMonthUsage = usageData?.usage?.find((usage) => {
    const now = new Date();
    const periodStart = new Date(usage.periodStart);
    const periodEnd = new Date(usage.periodEnd);

    return (
      usage.entitlement === "free" &&
      now >= periodStart &&
      now <= periodEnd
    );
  });

  console.log("currentMonthUsage", JSON.stringify(usageData, null, 2));

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
    refetchUsage,
  };
};
