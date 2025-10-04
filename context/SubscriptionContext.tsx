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

      // Check if RevenueCat is configured before making API calls
      try {
        await Purchases.getCustomerInfo();
      } catch {
        // If RevenueCat is not configured, return free tier
        console.log("🔒 RevenueCat not configured, using free tier");
        setIsPlusUser(false);
        setIsProUser(false);
        setIsStarterUser(false);
        setSubscriptionTier("free");
        setActiveEntitlements([]);
        setCustomerInfo(null);
        setIsLoading(false);
        return;
      }

      const customerInfo = await Purchases.getCustomerInfo();
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
      let tier: SubscriptionTier = "free";
      if (hasPlusAccess) {
        tier = "plus";
      } else if (hasProAccess) {
        tier = "pro";
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
export function getSubscriptionTier(
  customerInfo: CustomerInfo | null
): SubscriptionTier {
  if (!customerInfo) return "free";

  if (hasPlusAccess(customerInfo)) return "plus";
  if (hasProAccess(customerInfo)) return "pro";
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
