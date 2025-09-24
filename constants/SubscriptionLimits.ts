import { SubscriptionTier } from "@/hooks/useSubscription";
import { getPlanLimit } from "@/lib/pricing-utils";

// Default limits as fallback when RevenueCat data is not available
export const SUBSCRIPTION_LIMITS = {
  free: { generations: 5, saves: 10 },
  starter: { generations: 125, saves: 50 },
  pro: { generations: 1000, saves: 200 },
  plus: { generations: 300, saves: 100 }
} as const;

export function getLimitForTier(tier: SubscriptionTier, type: 'generations' | 'saves', pricingData?: any): number {
  // For generations, use dynamic pricing data if available
  if (type === 'generations' && pricingData) {
    return getPlanLimit(tier, pricingData);
  }
  
  // Fallback to static limits
  return SUBSCRIPTION_LIMITS[tier][type];
}

export function canUpgradeTo(from: SubscriptionTier, to: SubscriptionTier): boolean {
  const tierHierarchy = ['free', 'starter', 'plus', 'pro'];
  const fromIndex = tierHierarchy.indexOf(from);
  const toIndex = tierHierarchy.indexOf(to);
  
  return toIndex > fromIndex;
}

export function getUpgradeOptions(currentTier: SubscriptionTier): SubscriptionTier[] {
  const allTiers: SubscriptionTier[] = ['free', 'starter', 'plus', 'pro'];
  return allTiers.filter(tier => canUpgradeTo(currentTier, tier));
}
