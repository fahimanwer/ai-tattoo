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
