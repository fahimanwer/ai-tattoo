import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { SubscriptionTier, useSubscription } from "./useSubscription";
import { useUsageLimit } from "./useUsageLimit";

export interface UserData {
  // User info from Better Auth
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  } | null;

  // Usage data
  usage: {
    currentPeriodUsage: {
      count: number;
      limit: number;
      entitlement: string;
      periodStart: string;
      periodEnd: string;
    } | null;
    hasActiveEntitlement: boolean;
    isLoading: boolean;
    error: string | null;
  };

  // Subscription data
  subscription: {
    tier: SubscriptionTier;
    isProUser: boolean;
    isStarterUser: boolean;
    isPlusUser: boolean;
    activeEntitlements: string[];
    customerInfo: any;
    isLoading: boolean;
    error: string | null;
  };

  // Combined loading state
  isLoading: boolean;

  // Combined error state
  error: string | null;

  // Refresh function
  refresh: () => Promise<void>;
}

export function useUserData(): UserData {
  const [user, setUser] = useState<any>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [userError, setUserError] = useState<string | null>(null);

  // Get usage data from consolidated hook
  const {
    used,
    limit,
    periodStart,
    periodEnd,
    subscriptionTier: usageTier,
    isLoading: isUsageLoading,
    error: usageError,
    refetch: refetchUsage,
  } = useUsageLimit();

  // Get subscription data
  const {
    subscriptionTier,
    isProUser,
    isStarterUser,
    isPlusUser,
    activeEntitlements,
    customerInfo,
    isLoading: isSubscriptionLoading,
    error: subscriptionError,
    refreshSubscriptionStatus,
  } = useSubscription();

  // Get current period usage from the hook data
  const currentPeriodUsage =
    periodStart && periodEnd
      ? {
          count: used,
          limit: limit,
          entitlement: usageTier,
          periodStart: periodStart,
          periodEnd: periodEnd,
        }
      : null;

  // Check if user has any active entitlement based on current period
  const hasActiveEntitlement = currentPeriodUsage !== null;

  // Get session data
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();

  // Update user data when session changes
  useEffect(() => {
    if (!isSessionPending) {
      if (session?.user) {
        setUser(session.user);
        console.log("✅ User data loaded:", {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
        });
      } else {
        setUser(null);
        console.log("❌ No user session found");
      }
      setIsUserLoading(false);
    }
  }, [session, isSessionPending]);

  // Refresh all data
  const refresh = async () => {
    console.log("🔄 Refreshing user data...");
    await Promise.all([refetchUsage(), refreshSubscriptionStatus()]);
    console.log("✅ User data refreshed");
  };

  // Combined loading state
  const isLoading = isUserLoading || isUsageLoading || isSubscriptionLoading;

  // Combined error state
  const error =
    userError || (usageError ? usageError.message : null) || subscriptionError;

  return {
    user: user
      ? {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          emailVerified: user.emailVerified,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
        }
      : null,

    usage: {
      currentPeriodUsage: currentPeriodUsage,
      hasActiveEntitlement,
      isLoading: isUsageLoading,
      error: usageError ? usageError.message : null,
    },

    subscription: {
      tier: subscriptionTier,
      isProUser,
      isStarterUser,
      isPlusUser,
      activeEntitlements,
      customerInfo,
      isLoading: isSubscriptionLoading,
      error: subscriptionError,
    },

    isLoading,
    error,
    refresh,
  };
}
