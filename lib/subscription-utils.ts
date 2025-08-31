import { PLUS_ENTITLEMENT_IDENTIFIER } from "@/hooks/useSubscription";
import Purchases, { CustomerInfo } from "react-native-purchases";

/**
 * Check if user has plus access using RevenueCat entitlements
 * This is the main function you should use throughout your app
 */
export async function hasPlusAccess(): Promise<boolean> {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    // Using the exact pattern from your example
    return (
      typeof customerInfo.entitlements.active[PLUS_ENTITLEMENT_IDENTIFIER] !==
      "undefined"
    );
  } catch (error) {
    console.error("Error checking plus access:", error);
    return false;
  }
}

/**
 * Check if user has plus access from existing customer info
 * Use this when you already have customerInfo to avoid additional API calls
 */
export function hasPlusAccessSync(customerInfo: CustomerInfo | null): boolean {
  if (!customerInfo) return false;
  return (
    typeof customerInfo.entitlements.active[PLUS_ENTITLEMENT_IDENTIFIER] !==
    "undefined"
  );
}

/**
 * Guard function for plus features
 * Use this to wrap plus-only functionality
 */
export async function requirePlusAccess(): Promise<boolean> {
  const isPlus = await hasPlusAccess();
  if (!isPlus) {
    // You can customize this behavior - show upgrade modal, alert, etc.
    console.warn("Plus access required for this feature");
    return false;
  }
  return true;
}

/**
 * Usage limits for free users
 * Adjust these based on your app's requirements
 */
export const FREE_USER_LIMITS = {
  maxMessages: 50,
  maxTattooGenerations: 5,
  maxDesignSaves: 10,
} as const;

/**
 * Check if free user has reached their limit
 */
export function hasReachedLimit(
  currentUsage: number,
  limitType: keyof typeof FREE_USER_LIMITS
): boolean {
  return currentUsage >= FREE_USER_LIMITS[limitType];
}

/**
 * Example usage patterns:
 *
 * // In a component or function where you need to check plus access
 * const canAccessFeature = await hasPlusAccess();
 * if (canAccessFeature) {
 *   // Grant user "plus" access
 *   // Show plus features
 * } else {
 *   // Show upgrade prompt or free tier limitations
 * }
 *
 * // Using the guard function
 * if (await requirePlusAccess()) {
 *   // Execute plus-only code
 * }
 *
 * // Using with existing customerInfo (more efficient)
 * const { customerInfo } = useSubscription();
 * const isPlus = hasPlusAccessSync(customerInfo);
 */
