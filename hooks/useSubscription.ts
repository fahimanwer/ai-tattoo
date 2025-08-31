import { useEffect, useState } from "react";
import Purchases, { CustomerInfo } from "react-native-purchases";

export const PLUS_ENTITLEMENT_IDENTIFIER = "Plus";

export interface SubscriptionStatus {
  isPlusUser: boolean;
  customerInfo: CustomerInfo | null;
  isLoading: boolean;
  error: string | null;
  refreshSubscriptionStatus: () => Promise<void>;
}

export function useSubscription(): SubscriptionStatus {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [isPlusUser, setIsPlusUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCustomerInfo = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const customerInfo = await Purchases.getCustomerInfo();
      setCustomerInfo(customerInfo);

      // Check if user has active pro entitlement using the exact pattern from your example
      const hasProAccess =
        typeof customerInfo.entitlements.active[PLUS_ENTITLEMENT_IDENTIFIER] !==
        "undefined";
      setIsPlusUser(hasProAccess);

      if (hasProAccess) {
        // Grant user "pro" access
        console.log("✅ User has PRO access");
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
      setIsPlusUser(false);
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

  return {
    isPlusUser,
    customerInfo,
    isLoading,
    error,
    refreshSubscriptionStatus,
  };
}

// Utility function to check specific entitlements
export function hasActiveEntitlement(
  customerInfo: CustomerInfo | null,
  entitlementId: string
): boolean {
  if (!customerInfo) return false;
  return typeof customerInfo.entitlements.active[entitlementId] !== "undefined";
}
