import React, { createContext, useContext, useEffect, useState } from "react";
import Purchases, { CustomerInfo } from "react-native-purchases";

// Entitlement identifiers
export const STARTER_ENTITLEMENT_IDENTIFIER = "Starter";
export const PRO_ENTITLEMENT_IDENTIFIER = "Pro";
export const PLUS_ENTITLEMENT_IDENTIFIER = "Plus";

export type SubscriptionTier = "free" | "starter" | "pro" | "plus";

export interface SubscriptionStatus {
  isPlusUser: boolean;
  isProUser: boolean;
  isStarterUser: boolean;
  subscriptionTier: SubscriptionTier;
  activeEntitlements: string[];
  customerInfo: CustomerInfo | null;
  isLoading: boolean;
  error: string | null;
  refreshSubscriptionStatus: () => Promise<void>;
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
  const [isPlusUser, setIsPlusUser] = useState(false);
  const [isProUser, setIsProUser] = useState(false);
  const [isStarterUser, setIsStarterUser] = useState(false);
  const [subscriptionTier, setSubscriptionTier] =
    useState<SubscriptionTier>("free");
  const [activeEntitlements, setActiveEntitlements] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCustomerInfo = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if Purchases is configured
      let customerInfo;
      try {
        customerInfo = await Purchases.getCustomerInfo();
      } catch (initError: any) {
        // If RevenueCat isn't initialized, wait a bit and retry once
        if (initError?.message?.includes("singleton instance")) {
          console.log("⏳ RevenueCat not ready, retrying in 500ms...");
          await new Promise((resolve) => setTimeout(resolve, 500));
          customerInfo = await Purchases.getCustomerInfo();
        } else {
          throw initError;
        }
      }

      setCustomerInfo(customerInfo);

      // Get all active entitlements
      const activeEntitlementKeys = Object.keys(
        customerInfo.entitlements.active
      );
      setActiveEntitlements(activeEntitlementKeys);

      // Check for specific entitlements
      const hasStarterAccess =
        typeof customerInfo.entitlements.active[
          STARTER_ENTITLEMENT_IDENTIFIER
        ] !== "undefined";
      const hasProAccess =
        typeof customerInfo.entitlements.active[PRO_ENTITLEMENT_IDENTIFIER] !==
        "undefined";
      const hasPlusAccess =
        typeof customerInfo.entitlements.active[PLUS_ENTITLEMENT_IDENTIFIER] !==
        "undefined";

      // Set individual flags
      setIsStarterUser(hasStarterAccess);
      setIsProUser(hasProAccess);
      setIsPlusUser(hasPlusAccess);

      // Determine subscription tier (highest tier takes precedence)
      // Order: Pro > Plus > Starter > Free
      let tier: SubscriptionTier = "free";
      if (hasProAccess) {
        tier = "pro";
      } else if (hasPlusAccess) {
        tier = "plus";
      } else if (hasStarterAccess) {
        tier = "starter";
      }
      setSubscriptionTier(tier);

      // Log subscription status (only once from the provider)
      if (activeEntitlementKeys.length > 0) {
        console.log(
          `✅ User has ${tier.toUpperCase()} access with entitlements:`,
          activeEntitlementKeys
        );
      } else {
        console.log("🔒 User has FREE access");
      }
    } catch (err) {
      console.error("Error fetching customer info:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch subscription status"
      );
      // Reset all subscription states on error
      setIsPlusUser(false);
      setIsProUser(false);
      setIsStarterUser(false);
      setSubscriptionTier("free");
      setActiveEntitlements([]);
      setCustomerInfo(null);
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

  const value: SubscriptionStatus = {
    isPlusUser,
    isProUser,
    isStarterUser,
    subscriptionTier,
    activeEntitlements,
    customerInfo,
    isLoading,
    error,
    refreshSubscriptionStatus,
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

// Utility functions for checking specific subscription tiers
export function hasStarterAccess(customerInfo: CustomerInfo | null): boolean {
  return hasActiveEntitlement(customerInfo, STARTER_ENTITLEMENT_IDENTIFIER);
}

export function hasProAccess(customerInfo: CustomerInfo | null): boolean {
  return hasActiveEntitlement(customerInfo, PRO_ENTITLEMENT_IDENTIFIER);
}

export function hasPlusAccess(customerInfo: CustomerInfo | null): boolean {
  return hasActiveEntitlement(customerInfo, PLUS_ENTITLEMENT_IDENTIFIER);
}

// Utility function to get the highest subscription tier
// Order: Pro > Plus > Starter > Free
export function getSubscriptionTier(
  customerInfo: CustomerInfo | null
): SubscriptionTier {
  if (!customerInfo) return "free";

  if (hasProAccess(customerInfo)) return "pro";
  if (hasPlusAccess(customerInfo)) return "plus";
  if (hasStarterAccess(customerInfo)) return "starter";

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

  // Get all subscriptions from subscriptionsByProductIdentifier
  const allSubscriptions = customerInfo.subscriptionsByProductIdentifier || {};

  if (Object.keys(allSubscriptions).length === 0) {
    return null;
  }

  // Find the most recent subscription (by expiresDate)
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

  // Calculate days remaining or days since expired
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

  // Determine status
  let status: "active" | "expired" | "cancelled" = "expired";
  if (sub.isActive) {
    status = "active";
  } else if (sub.unsubscribeDetectedAt) {
    status = "cancelled";
  }

  // Map product identifier to friendly name
  const productNameMap: Record<string, string> = {
    main_ai_tattoo_starter: "Starter",
    main_ai_tattoo_plus: "Plus",
    main_ai_tattoo_pro: "Pro",
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
