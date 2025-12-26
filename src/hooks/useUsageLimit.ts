import { authClient } from "@/lib/auth-client";
import { fetchUserUsage, type UsageResponse } from "@/lib/nano";
import { FREE_TIER_LIMIT, type PlanTier } from "@/src/constants/plan-limits";
import { useQuery } from "@tanstack/react-query";
import Purchases from "react-native-purchases";

/**
 * Enhanced Usage Limit Hook
 *
 * This consolidated hook provides all usage-related data and utilities.
 * It replaces the previous useUsage and useUsageLimit hooks.
 */

export interface UsageLimitResult {
  // Current period data
  used: number;
  limit: number;
  remaining: number;
  isLimitReached: boolean;
  canCreateTattoo: boolean;
  periodStart: string | null;
  periodEnd: string | null;

  // Subscription data
  subscriptionTier: PlanTier;
  planDisplayName: string;
  planColor: string;
  planFeatures: string[];

  // UI helpers
  limitMessage: string;
  usagePercentage: number;

  // Query state
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<any>;

  // Raw data
  data: UsageResponse | undefined;
}

/**
 * Query Configuration
 */
const USAGE_QUERY_CONFIG = {
  staleTime: 5 * 60 * 1000, // 5 minutes - data doesn't change often
  gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache
  retry: (failureCount: number, error: any) => {
    // Don't retry on 405 Method Not Allowed errors
    if (error?.status === 405) {
      console.warn("⚠️ API endpoint not properly deployed - skipping retries");
      return false;
    }
    return failureCount < 1; // Retry twice for other errors
  },
  retryDelay: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 5000),
};

/**
 * Main hook for usage limits and subscription data
 */
export const useUsageLimit = (): UsageLimitResult => {
  const { data: session } = authClient.useSession();
  const isAuthenticated = session?.user !== undefined;

  const { data, isLoading, error, refetch } = useQuery<UsageResponse>({
    queryKey: ["user", "usage"],
    enabled: isAuthenticated,
    queryFn: async () => {
      // Get RevenueCat user ID for accurate usage lookup
      // This handles the case where purchases were made before authentication
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        const revenuecatUserId = customerInfo.originalAppUserId;
        return fetchUserUsage(revenuecatUserId);
      } catch {
        // Fallback to fetching without RC ID (backwards compatibility)
        return fetchUserUsage();
      }
    },
    ...USAGE_QUERY_CONFIG,
  });

  // For unauthenticated users, return free tier defaults immediately
  if (!isAuthenticated) {
    return {
      used: 0,
      limit: FREE_TIER_LIMIT,
      remaining: FREE_TIER_LIMIT,
      isLimitReached: false,
      canCreateTattoo: true,
      periodStart: null,
      periodEnd: null,
      subscriptionTier: "free",
      planDisplayName: "Free",
      planColor: "#6b7280",
      planFeatures: [],
      limitMessage: "Sign in to track your usage",
      usagePercentage: 0,
      isLoading: false, // ✅ Not loading for unauthenticated users
      error: null,
      refetch,
      data: undefined,
    };
  }

  // Default values when loading or no data
  if (isLoading || !data) {
    return {
      used: 0,
      limit: FREE_TIER_LIMIT,
      remaining: FREE_TIER_LIMIT,
      isLimitReached: false,
      canCreateTattoo: true,
      periodStart: null,
      periodEnd: null,
      subscriptionTier: "free",
      planDisplayName: "Free",
      planColor: "#6b7280",
      planFeatures: [],
      limitMessage: "Loading...",
      usagePercentage: 0,
      isLoading: true,
      error: error as Error | null,
      refetch,
      data: undefined,
    };
  }

  const {
    used,
    limit,
    remaining,
    isLimitReached,
    periodStart,
    periodEnd,
    subscriptionTier,
    planInfo,
  } = data;

  // Calculate usage percentage
  const usagePercentage = limit > 0 ? Math.round((used / limit) * 100) : 0;

  // Generate user-friendly message
  let limitMessage = "";
  if (isLimitReached) {
    limitMessage =
      subscriptionTier === "free"
        ? "Monthly limit reached. Upgrade to get more generations."
        : "Monthly limit reached. Your plan resets next period.";
  } else if (remaining <= 5 && subscriptionTier !== "free") {
    limitMessage = `Only ${remaining} generations remaining!`;
  } else {
    limitMessage = `${remaining} of ${limit} generations remaining`;
  }

  return {
    // Current period data
    used,
    limit,
    remaining,
    isLimitReached,
    canCreateTattoo: !isLimitReached,
    periodStart,
    periodEnd,

    // Subscription data
    subscriptionTier,
    planDisplayName: planInfo.displayName,
    planColor: planInfo.color,
    planFeatures: planInfo.features,

    // UI helpers
    limitMessage,
    usagePercentage,

    // Query state
    isLoading: false,
    error: null,
    refetch,

    // Raw data
    data,
  };
};

/**
 * Legacy export for backward compatibility
 * @deprecated Use useUsageLimit instead
 */
export const useUsage = () => {
  const result = useUsageLimit();
  return {
    data: result.data,
    isLoading: result.isLoading,
    error: result.error,
    refetch: result.refetch,
  };
};
