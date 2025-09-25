import { fetchUserUsage, UsageRecord, UsageResponse } from "@/lib/nano";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook Types
 */
type CurrentPeriodUsageResult = {
  data: UsageRecord | undefined;
  currentCount: number;
} & Omit<ReturnType<typeof useQuery<UsageResponse>>, "data">;

type ActiveEntitlementResult = {
  data: boolean;
  hasActiveEntitlement: boolean;
} & Omit<ReturnType<typeof useQuery<UsageResponse>>, "data">;

/**
 * Query Configuration
 */
const USAGE_QUERY_CONFIG = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  retry: (failureCount: number, error: any) => {
    // Don't retry on 405 Method Not Allowed errors - it's a deployment issue
    if (error?.status === 405) {
      console.warn("⚠️ API endpoint not properly deployed - skipping retries");
      return false;
    }
    return failureCount < 1; // Only retry once for other errors
  },
  retryDelay: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 5000),
};

/**
 * Utility Functions
 */
const isInCurrentPeriod = (
  usage: UsageRecord,
  entitlementId: string
): boolean => {
  const now = new Date();
  const periodStart = new Date(usage.periodStart);
  const periodEnd = new Date(usage.periodEnd);

  return (
    usage.entitlement === entitlementId &&
    now >= periodStart &&
    now <= periodEnd
  );
};

const hasActiveEntitlement = (
  usage: UsageRecord[],
  entitlementId: string
): boolean => {
  const now = new Date();

  return usage.some((record) => {
    const periodEnd = new Date(record.periodEnd);
    return record.entitlement === entitlementId && now <= periodEnd;
  });
};

/**
 * Usage Hooks
 */
export const useUsage = () => {
  return useQuery<UsageResponse>({
    queryKey: ["user", "usage"],
    queryFn: fetchUserUsage,
    ...USAGE_QUERY_CONFIG,
  });
};

export const useCurrentPeriodUsage = (
  entitlementId: string
): CurrentPeriodUsageResult => {
  const { data: usageData, ...rest } = useUsage();

  const currentPeriodUsage = usageData?.usage.find((usage) =>
    isInCurrentPeriod(usage, entitlementId)
  );

  return {
    data: currentPeriodUsage,
    currentCount: currentPeriodUsage?.count || 0,
    ...rest,
  };
};

export const useHasActiveEntitlement = (
  entitlementId: string
): ActiveEntitlementResult => {
  const { data: usageData, ...rest } = useUsage();

  const activeEntitlement = hasActiveEntitlement(
    usageData?.usage || [],
    entitlementId
  );

  return {
    data: activeEntitlement,
    hasActiveEntitlement: activeEntitlement,
    ...rest,
  };
};
