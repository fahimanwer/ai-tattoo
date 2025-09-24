import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { SubscriptionTier, useSubscription } from "./useSubscription";
import { useUsage } from "./useUsage";

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
    totalUsage: number;
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

  // Get usage data
  const {
    data: usageData,
    isLoading: isUsageLoading,
    error: usageError,
    refetch: refetchUsage,
  } = useUsage();

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

  // Get current period usage
  const currentPeriodUsage = usageData?.usage.find((usage) => {
    const now = new Date();
    const periodStart = new Date(usage.periodStart);
    const periodEnd = new Date(usage.periodEnd);

    return now >= periodStart && now <= periodEnd;
  });

  // Check if user has any active entitlement
  const hasActiveEntitlement = usageData?.usage.some((usage) => {
    const now = new Date();
    const periodEnd = new Date(usage.periodEnd);
    return now <= periodEnd;
  }) || false;

  // Get session data
  const { data: session, isPending: isSessionPending } = authClient.useSession();

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
    await Promise.all([
      refetchUsage(),
      refreshSubscriptionStatus(),
    ]);
    console.log("✅ User data refreshed");
  };

  // Combined loading state
  const isLoading = isUserLoading || isUsageLoading || isSubscriptionLoading;

  // Combined error state
  const error = userError || usageError?.message || subscriptionError;

  return {
    user: user ? {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      emailVerified: user.emailVerified,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
    } : null,
    
    usage: {
      totalUsage: usageData?.totalUsage || 0,
      currentPeriodUsage: currentPeriodUsage ? {
        count: currentPeriodUsage.count,
        limit: currentPeriodUsage.limit,
        entitlement: currentPeriodUsage.entitlement,
        periodStart: currentPeriodUsage.periodStart,
        periodEnd: currentPeriodUsage.periodEnd,
      } : null,
      hasActiveEntitlement,
      isLoading: isUsageLoading,
      error: usageError?.message || null,
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
