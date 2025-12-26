import { authClient } from "@/lib/auth-client";
import { syncSubscription } from "@/lib/nano";
import { getLastSubscription } from "@/src/context/SubscriptionContext";
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

  /** Refresh all user data (subscription and usage). */
  refresh: () => Promise<void>;

  /**
   * Call after successful authentication to link RevenueCat with the user.
   * This ensures stable ID across reinstalls and syncs App Store purchases.
   * @param userId - The Better Auth user ID
   */
  syncAfterAuth: (userId: string) => Promise<void>;
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
    loginToRevenueCat,
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

  /** Refresh all user data (subscription from RevenueCat, usage from server). */
  const refresh = async () => {
    console.log("🔄 Refreshing user data...");

    // Refresh subscription status from RevenueCat
    await refreshSubscriptionStatus();

    // Refresh server-side usage data
    await refetchUsage();

    console.log("✅ User data refreshed");
  };

  /**
   * Call after successful authentication to link RevenueCat with the user.
   * This:
   * 1. Logs into RevenueCat with the Better Auth user ID
   * 2. Restores purchases from App Store (handles reinstall case)
   * 3. Syncs subscription with server (creates usage record if needed)
   * 4. Refreshes server-side usage data
   */
  const syncAfterAuth = async (userId: string) => {
    console.log("🔗 Syncing after auth for user:", userId);

    // Login to RevenueCat with Better Auth user ID
    // This also restores purchases internally
    const restoredInfo = await loginToRevenueCat(userId);

    // If we have active entitlements, sync with server to ensure usage record exists
    if (restoredInfo) {
      const activeEntitlements = Object.keys(restoredInfo.entitlements.active);
      const lastSub = getLastSubscription(restoredInfo);
      const hasActiveSubscription = lastSub?.isActive === true;

      if (hasActiveSubscription && activeEntitlements.length > 0) {
        console.log("🔄 Syncing subscription with server...");
        try {
          // Get the most recent active subscription for period info
          const allSubs = restoredInfo.subscriptionsByProductIdentifier || {};
          const activeSub = Object.values(allSubs).find(
            (sub: any) => sub.isActive
          ) as any;

          const syncResult = await syncSubscription({
            revenuecatUserId: restoredInfo.originalAppUserId,
            activeEntitlements,
            hasActiveSubscription,
            subscriptionInfo: activeSub
              ? {
                  productIdentifier: activeSub.productIdentifier || null,
                  expiresDate: activeSub.expiresDate || null,
                  purchaseDate: activeSub.purchaseDate || null,
                }
              : undefined,
          });

          console.log("✅ Server sync result:", syncResult);
        } catch (syncError) {
          console.error("⚠️ Failed to sync with server:", syncError);
          // Don't fail the whole flow if sync fails - the user can still use the app
          // The sync is just to ensure usage tracking works correctly
        }
      }
    }

    // Refresh server-side usage data
    await refetchUsage();

    console.log("✅ Post-auth sync complete");
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
    syncAfterAuth,
  };
}
