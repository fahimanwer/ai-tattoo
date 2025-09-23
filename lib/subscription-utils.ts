import { canUpgradeTo } from "@/constants/SubscriptionLimits";
import { PLUS_ENTITLEMENT_IDENTIFIER, SubscriptionTier } from "@/hooks/useSubscription";
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
 * Get the entitlement identifier for a subscription tier
 */
export function getEntitlementForTier(tier: SubscriptionTier): string {
  switch (tier) {
    case "starter":
      return "Starter";
    case "pro":
      return "Pro";
    case "plus":
      return "Plus";
    default:
      return "free";
  }
}

/**
 * Check if user can upgrade to a specific tier
 */
export function canUserUpgradeTo(
  currentTier: SubscriptionTier,
  targetTier: SubscriptionTier
): boolean {
  return canUpgradeTo(currentTier, targetTier);
}

/**
 * Get upgrade options for current tier
 */
export function getAvailableUpgrades(currentTier: SubscriptionTier): SubscriptionTier[] {
  const allTiers: SubscriptionTier[] = ["starter", "plus", "pro"];
  return allTiers.filter(tier => canUpgradeTo(currentTier, tier));
}

/**
 * Get subscription tier from entitlement
 */
export function getTierFromEntitlement(entitlement: string): SubscriptionTier {
  switch (entitlement) {
    case "Starter":
      return "starter";
    case "Pro":
      return "pro";
    case "Plus":
      return "plus";
    default:
      return "free";
  }
}
