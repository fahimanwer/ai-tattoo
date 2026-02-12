import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/nano";
import type { UsageResponse } from "@/lib/nano";
import { FREE_TIER_LIMIT, type PlanTier } from "@/src/constants/plan-limits";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import Purchases from "react-native-purchases";

/**
 * Enhanced Usage Limit Hook
 *
 * This consolidated hook provides all usage-related data and utilities.
 * It replaces the previous useUsage and useUsageLimit hooks.
 * Now uses Convex reactive queries instead of @tanstack/react-query.
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
 * Main hook for usage limits and subscription data
 * Uses Convex reactive query for real-time updates.
 */
export const useUsageLimit = (): UsageLimitResult => {
  const { data: session } = authClient.useSession();
  const isAuthenticated = session?.user !== undefined;

  // Get RevenueCat user ID for the Convex query
  const [revenuecatUserId, setRevenuecatUserId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (isAuthenticated) {
      Purchases.getCustomerInfo()
        .then((info) => setRevenuecatUserId(info.originalAppUserId))
        .catch(() => setRevenuecatUserId(undefined));
    }
  }, [isAuthenticated]);

  // Convex reactive query - auto-updates when data changes
  const data = useQuery(
    api.usage.getUserUsage,
    isAuthenticated ? { revenuecatUserId } : "skip"
  );

  const isLoading = isAuthenticated && data === undefined;

  // Stub refetch - Convex queries are reactive and auto-update
  const refetch = async () => {
    // Convex queries are reactive, no manual refetch needed.
    // This is kept for API compatibility.
  };

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
      isLoading: false,
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
      error: null,
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
