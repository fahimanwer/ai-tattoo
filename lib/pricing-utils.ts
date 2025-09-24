import { PlanPricing } from "@/hooks/usePricing";

// Default limits as fallback when RevenueCat data is not available
export const DEFAULT_PLAN_LIMITS = {
  free: 5,
  starter: 125,
  plus: 300,
  pro: 1000,
} as const;

// Default pricing as fallback when RevenueCat data is not available
export const DEFAULT_PLAN_PRICING = {
  free: {
    price: 0,
    priceString: "Free",
    currencyCode: "USD",
  },
  starter: {
    price: 4.99,
    priceString: "$4.99/month",
    currencyCode: "USD",
  },
  plus: {
    price: 9.99,
    priceString: "$9.99/month",
    currencyCode: "USD",
  },
  pro: {
    price: 29.99,
    priceString: "$29.99/month",
    currencyCode: "USD",
  },
} as const;

/**
 * Get plan limit for a given tier
 * Uses RevenueCat data if available, falls back to defaults
 */
export function getPlanLimit(tier: string, pricingData?: PlanPricing[]): number {
  if (pricingData) {
    const plan = pricingData.find(p => p.identifier.toLowerCase() === tier.toLowerCase());
    if (plan) return plan.limit;
  }
  
  return DEFAULT_PLAN_LIMITS[tier.toLowerCase() as keyof typeof DEFAULT_PLAN_LIMITS] || 5;
}

/**
 * Get plan pricing for a given tier
 * Uses RevenueCat data if available, falls back to defaults
 */
export function getPlanPricing(tier: string, pricingData?: PlanPricing[]): {
  price: number;
  priceString: string;
  currencyCode: string;
} {
  if (pricingData) {
    const plan = pricingData.find(p => p.identifier.toLowerCase() === tier.toLowerCase());
    if (plan) {
      return {
        price: plan.price,
        priceString: plan.priceString,
        currencyCode: plan.currencyCode,
      };
    }
  }
  
  return DEFAULT_PLAN_PRICING[tier.toLowerCase() as keyof typeof DEFAULT_PLAN_PRICING] || DEFAULT_PLAN_PRICING.free;
}

/**
 * Get all available plans with pricing and limits
 * Uses RevenueCat data if available, falls back to defaults
 */
export function getAllPlansWithPricing(pricingData?: PlanPricing[]): Array<{
  tier: string;
  limit: number;
  price: number;
  priceString: string;
  currencyCode: string;
}> {
  const tiers = ['free', 'starter', 'plus', 'pro'];
  
  return tiers.map(tier => ({
    tier,
    limit: getPlanLimit(tier, pricingData),
    ...getPlanPricing(tier, pricingData),
  }));
}

/**
 * Map entitlement identifier to internal tier
 */
export function mapEntitlementToTier(entitlement: string): string {
  switch (entitlement.toLowerCase()) {
    case "starter":
      return "starter";
    case "plus":
      return "plus";
    case "pro":
      return "pro";
    case "free":
    default:
      return "free";
  }
}

/**
 * Map internal tier to entitlement identifier
 */
export function mapTierToEntitlement(tier: string): string {
  switch (tier.toLowerCase()) {
    case "starter":
      return "Starter";
    case "plus":
      return "Plus";
    case "pro":
      return "Pro";
    case "free":
    default:
      return "free";
  }
}
