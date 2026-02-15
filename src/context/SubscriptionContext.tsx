import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Purchases, { CustomerInfo } from "react-native-purchases";

// Entitlement identifier — only "pro" now
export const PRO_ENTITLEMENT_IDENTIFIER = "pro";

export type SubscriptionTier = "free" | "pro";

export interface SubscriptionStatus {
  isProUser: boolean;
  subscriptionTier: SubscriptionTier;
  activeEntitlements: string[];
  customerInfo: CustomerInfo | null;
  isLoading: boolean;
  error: string | null;
  /** Whether the user has an active subscription (based on RevenueCat data) */
  hasActiveSubscription: boolean;
  refreshSubscriptionStatus: () => Promise<void>;
  /**
   * Login to RevenueCat with a custom App User ID.
   * Call this after authentication to link purchases to the user.
   * This ensures stable ID across reinstalls.
   */
  loginToRevenueCat: (userId: string) => Promise<CustomerInfo | null>;
  /**
   * Logout from RevenueCat (resets to anonymous).
   * Call this when user signs out.
   */
  logoutFromRevenueCat: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionStatus | undefined>(
  undefined
);

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [isProUser, setIsProUser] = useState(false);
  const [subscriptionTier, setSubscriptionTier] =
    useState<SubscriptionTier>("free");
  const [activeEntitlements, setActiveEntitlements] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Compute hasActiveSubscription from customerInfo using getLastSubscription
  const hasActiveSubscription = useMemo(() => {
    const lastSub = getLastSubscription(customerInfo);
    return lastSub?.isActive === true;
  }, [customerInfo]);

  // Helper function to update all state from customerInfo
  const updateStateFromCustomerInfo = (info: CustomerInfo) => {
    setCustomerInfo(info);

    // Get all active entitlements
    const activeEntitlementKeys = Object.keys(info.entitlements.active);
    setActiveEntitlements(activeEntitlementKeys);

    const hasProAccess =
      typeof info.entitlements.active[PRO_ENTITLEMENT_IDENTIFIER] !== "undefined";

    setIsProUser(hasProAccess);

    const tier: SubscriptionTier = hasProAccess ? "pro" : "free";
    setSubscriptionTier(tier);

    // Log subscription status
    if (activeEntitlementKeys.length > 0) {
      console.log(
        `User has ${tier.toUpperCase()} access with entitlements:`,
        activeEntitlementKeys
      );
    } else {
      console.log("User has FREE access");
    }
  };

  // Reset all state on error
  const resetState = () => {
    setIsProUser(false);
    setSubscriptionTier("free");
    setActiveEntitlements([]);
    setCustomerInfo(null);
  };

  const getCustomerInfo = async () => {
    try {
      setIsLoading(true);
      setError(null);

      let info: CustomerInfo;
      try {
        info = await Purchases.getCustomerInfo();
      } catch (initError: any) {
        if (initError?.message?.includes("singleton instance")) {
          console.log("RevenueCat not ready, retrying in 500ms...");
          await new Promise((resolve) => setTimeout(resolve, 500));
          info = await Purchases.getCustomerInfo();
        } else {
          throw initError;
        }
      }

      updateStateFromCustomerInfo(info);
    } catch (err) {
      console.error("Error fetching customer info:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch subscription status"
      );
      resetState();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCustomerInfo();
  }, []);

  const refreshSubscriptionStatus = async () => {
    await getCustomerInfo();
  };

  /**
   * Login to RevenueCat with a custom App User ID.
   * This links any anonymous purchases to the authenticated user ID.
   * The userId should be the Better Auth user ID for consistency.
   *
   * IMPORTANT: After login, we ALWAYS restore purchases to ensure
   * any App Store purchases are synced to this user.
   */
  const loginToRevenueCat = async (
    userId: string
  ): Promise<CustomerInfo | null> => {
    try {
      setIsLoading(true);
      setError(null);

      console.log(`[RC] Logging in to RevenueCat with user: ${userId}`);

      const { customerInfo: loginInfo, created } = await Purchases.logIn(
        userId
      );

      console.log("[RC] Login complete:", {
        userId,
        originalAppUserId: loginInfo.originalAppUserId,
        created,
        entitlements: Object.keys(loginInfo.entitlements.active),
      });

      // ALWAYS restore purchases after login to sync App Store purchases
      console.log("[RC] Restoring purchases to sync with App Store...");
      const restoredInfo = await Purchases.restorePurchases();

      console.log("[RC] Restore complete:", {
        entitlements: Object.keys(restoredInfo.entitlements.active),
        hasSubscription: getLastSubscription(restoredInfo)?.isActive === true,
      });

      updateStateFromCustomerInfo(restoredInfo);
      return restoredInfo;
    } catch (err) {
      console.error("[RC] Error logging in:", err);
      setError(
        err instanceof Error ? err.message : "Failed to login to RevenueCat"
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout from RevenueCat (resets to anonymous).
   */
  const logoutFromRevenueCat = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("[RC] Logging out from RevenueCat...");
      const info = await Purchases.logOut();

      console.log("[RC] Logout complete, now anonymous:", {
        originalAppUserId: info.originalAppUserId,
      });

      updateStateFromCustomerInfo(info);
    } catch (err) {
      console.error("[RC] Error logging out:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const value: SubscriptionStatus = {
    isProUser,
    subscriptionTier,
    activeEntitlements,
    customerInfo,
    isLoading,
    error,
    hasActiveSubscription,
    refreshSubscriptionStatus,
    loginToRevenueCat,
    logoutFromRevenueCat,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription(): SubscriptionStatus {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider"
    );
  }
  return context;
}

// Utility function to check specific entitlements
export function hasActiveEntitlement(
  customerInfo: CustomerInfo | null,
  entitlementId: string
): boolean {
  if (!customerInfo) return false;
  return typeof customerInfo.entitlements.active[entitlementId] !== "undefined";
}

// Utility function to check pro access
export function hasProAccess(customerInfo: CustomerInfo | null): boolean {
  return hasActiveEntitlement(customerInfo, PRO_ENTITLEMENT_IDENTIFIER);
}

// Utility function to get the subscription tier
export function getSubscriptionTier(
  customerInfo: CustomerInfo | null
): SubscriptionTier {
  if (!customerInfo) return "free";
  if (hasProAccess(customerInfo)) return "pro";
  return "free";
}

// Utility function to check if user has any paid subscription
export function hasPaidSubscription(
  customerInfo: CustomerInfo | null
): boolean {
  if (!customerInfo) return false;
  return Object.keys(customerInfo.entitlements.active).length > 0;
}

// Utility function to get all active entitlement names
export function getActiveEntitlements(
  customerInfo: CustomerInfo | null
): string[] {
  if (!customerInfo) return [];
  return Object.keys(customerInfo.entitlements.active);
}

// Interface for last subscription info
export interface LastSubscriptionInfo {
  productIdentifier: string | null;
  productName: string | null;
  expiresDate: string | null;
  isActive: boolean;
  willRenew: boolean;
  status: "active" | "expired" | "cancelled";
  daysRemaining: number | null;
  daysSinceExpired: number | null;
  price: { currency: string; amount: number } | null;
  unsubscribeDetectedAt: string | null;
}

// Utility function to get the last subscription (active or most recently expired)
export function getLastSubscription(
  customerInfo: CustomerInfo | null
): LastSubscriptionInfo | null {
  if (!customerInfo) return null;

  const allSubscriptions = customerInfo.subscriptionsByProductIdentifier || {};

  if (Object.keys(allSubscriptions).length === 0) {
    return null;
  }

  let mostRecentSub = null;
  let mostRecentDate: Date | null = null;

  for (const [productId, subscription] of Object.entries(allSubscriptions)) {
    const expiresDate = subscription.expiresDate
      ? new Date(subscription.expiresDate)
      : null;

    if (!mostRecentDate || (expiresDate && expiresDate > mostRecentDate)) {
      mostRecentDate = expiresDate;
      mostRecentSub = { productId, ...subscription };
    }
  }

  if (!mostRecentSub) return null;

  const sub: any = mostRecentSub;
  const expiresDate = sub.expiresDate ? new Date(sub.expiresDate) : null;
  const now = new Date();

  let daysRemaining: number | null = null;
  let daysSinceExpired: number | null = null;

  if (expiresDate) {
    const diffMs = expiresDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      daysRemaining = diffDays;
    } else {
      daysSinceExpired = Math.abs(diffDays);
    }
  }

  let status: "active" | "expired" | "cancelled" = "expired";
  if (sub.isActive) {
    status = "active";
  } else if (sub.unsubscribeDetectedAt) {
    status = "cancelled";
  }

  // Map product identifier to friendly name (pro v3 products only)
  const productNameMap: Record<string, string> = {
    tattoodesignai_pro_weekly: "Pro Weekly",
    tattoodesignai_pro_annual: "Pro Annual",
    tattoodesignai_offer_weekly: "Pro Weekly",
    tattoodesignai_offer_annual: "Pro Annual",
    pro_weekly: "Pro Weekly",
    pro_annual: "Pro Annual",
    offer_weekly: "Pro Weekly",
    offer_annual: "Pro Annual",
  };

  return {
    productIdentifier: sub.productId || null,
    productName: productNameMap[sub.productId] || sub.productId || null,
    expiresDate: sub.expiresDate || null,
    isActive: sub.isActive || false,
    willRenew: sub.willRenew || false,
    status,
    daysRemaining,
    daysSinceExpired,
    price: sub.price || null,
    unsubscribeDetectedAt: sub.unsubscribeDetectedAt || null,
  };
}
