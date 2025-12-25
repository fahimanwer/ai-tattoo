/**
 * Plan Limits Configuration
 *
 * This file defines the usage limits for each subscription tier.
 * It's shared between client and server for consistent validation.
 */

/**
 * Free tier limit - single source of truth
 * Change this value to update the free tier limit across the entire codebase
 */
export const FREE_TIER_LIMIT = 2;

export type PlanTier = "free" | "starter" | "plus" | "pro" | "premium";

export interface PlanConfig {
  tier: PlanTier;
  displayName: string;
  monthlyLimit: number;
  color: string;
  features: string[];
}

export const PLAN_LIMITS: Record<PlanTier, PlanConfig> = {
  free: {
    tier: "free",
    displayName: "Free",
    monthlyLimit: FREE_TIER_LIMIT,
    color: "#6b7280", // gray
    features: [
      `${FREE_TIER_LIMIT} one-time generations`,
      "Basic tattoo styles",
    ],
  },
  starter: {
    tier: "starter",
    displayName: "Starter",
    monthlyLimit: 75,
    color: "#f59e0b", // orange
    features: [
      "75 generations per month",
      "All tattoo styles",
      "High quality output",
    ],
  },
  plus: {
    tier: "plus",
    displayName: "Plus",
    monthlyLimit: 200,
    color: "#10b981", // green
    features: [
      "200 generations per month",
      "All tattoo styles",
      "Premium quality output",
      "Priority support",
    ],
  },
  pro: {
    tier: "pro",
    displayName: "Pro",
    monthlyLimit: 600,
    color: "#3b82f6", // blue
    features: [
      "600 generations per month",
      "All tattoo styles",
      "Ultra quality output",
      "Priority support",
      "Early access to new features",
    ],
  },
  // New premium tier (v2 pricing model)
  premium: {
    tier: "premium",
    displayName: "Premium",
    monthlyLimit: 80, // Default for monthly; weekly uses PRODUCT_LIMITS
    color: "yellow", // purple
    features: [
      "Unlimited tattoo designs",
      "All tattoo styles",
      "Premium quality output",
    ],
  },
};

/**
 * Product ID to generation limit mapping
 * Used by webhooks to set the correct limit based on the specific product purchased
 * This is separate from tier limits because weekly vs monthly have different caps
 */
export const PRODUCT_LIMITS: Record<string, number> = {
  // Legacy products (keep for existing subscribers - can be removed after migration)
  main_ai_tattoo_starter: 75,
  main_ai_tattoo_plus: 200,
  main_ai_tattoo_pro: 600,
  // New premium products (v2 pricing)
  inkigo_weekly: 35,
  inkigo_monthly: 80,
};

/**
 * Get the generation limit for a specific product ID
 * Returns null if product ID is not recognized
 */
export function getLimitForProduct(productId: string): number | null {
  return PRODUCT_LIMITS[productId] ?? null;
}

/**
 * Get plan configuration by tier
 */
export function getPlanConfig(tier: PlanTier): PlanConfig {
  return PLAN_LIMITS[tier];
}

/**
 * Get monthly limit for a specific tier
 */
export function getMonthlyLimit(tier: PlanTier): number {
  return PLAN_LIMITS[tier].monthlyLimit;
}

/**
 * Validate if a tier name is valid
 */
export function isValidTier(tier: string): tier is PlanTier {
  return tier in PLAN_LIMITS;
}

/**
 * Normalize entitlement identifier to tier
 * Maps RevenueCat entitlement names to our tier system
 */
export function entitlementToTier(entitlement: string): PlanTier {
  const normalized = entitlement.toLowerCase();
  // New premium tier (v2 pricing)
  if (normalized === "premium") return "premium";
  // Legacy tiers (keep for existing subscribers)
  if (normalized === "starter") return "starter";
  if (normalized === "plus") return "plus";
  if (normalized === "pro") return "pro";
  return "free";
}
