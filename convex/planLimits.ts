/**
 * Plan Limits Configuration (Convex-side copy)
 *
 * This file mirrors src/constants/plan-limits.ts so that Convex functions
 * can import these constants directly without reaching outside the convex/ dir.
 */

export const FREE_TIER_LIMIT = 1;

export type PlanTier = "free" | "pro";

export interface PlanConfig {
  tier: PlanTier;
  displayName: string;
  periodLimit: number;
  color: string;
  features: string[];
}

export const PLAN_LIMITS: Record<PlanTier, PlanConfig> = {
  free: {
    tier: "free",
    displayName: "Free",
    periodLimit: FREE_TIER_LIMIT,
    color: "#6b7280",
    features: [
      `${FREE_TIER_LIMIT} one-time generations`,
      "Basic tattoo styles",
    ],
  },
  pro: {
    tier: "pro",
    displayName: "Pro",
    periodLimit: 150,
    color: "#3b82f6",
    features: [
      "Up to 150 generations per month",
      "All tattoo styles",
      "Ultra quality output",
      "Priority support",
      "Early access to new features",
    ],
  },
};

/**
 * Product ID to generation limit mapping
 * Weekly products: 35 per week
 * Annual products: 150 per month (period overridden to 30 days)
 */
export const PRODUCT_LIMITS: Record<string, number> = {
  // Pro v3 products (iOS)
  tattoodesignai_pro_weekly: 35,
  tattoodesignai_pro_annual: 150,
  tattoodesignai_offer_weekly: 35,
  tattoodesignai_offer_annual: 150,
  // Pro v3 test store
  pro_weekly: 35,
  pro_annual: 150,
  offer_weekly: 35,
  offer_annual: 150,
  // Pro v3 Android
  "tattoodesignai_pro_weekly:pro-weekly": 35,
  "tattoodesignai_pro_annual:pro-annual": 150,
  "tattoodesignai_offer_weekly:offer-weekly": 35,
  "tattoodesignai_offer_annual:offer-annual": 150,
};

/**
 * Period override for products that need shorter periods than the subscription cycle.
 * e.g., annual subs get monthly generation resets instead of yearly.
 */
export const PRODUCT_PERIOD_MS: Record<string, number> = {
  tattoodesignai_pro_annual: 30 * 24 * 60 * 60 * 1000,
  tattoodesignai_offer_annual: 30 * 24 * 60 * 60 * 1000,
  pro_annual: 30 * 24 * 60 * 60 * 1000,
  offer_annual: 30 * 24 * 60 * 60 * 1000,
  "tattoodesignai_pro_annual:pro-annual": 30 * 24 * 60 * 60 * 1000,
  "tattoodesignai_offer_annual:offer-annual": 30 * 24 * 60 * 60 * 1000,
};

export function getLimitForProduct(productId: string): number | null {
  return PRODUCT_LIMITS[productId] ?? null;
}

export function getPlanConfig(tier: PlanTier): PlanConfig {
  return PLAN_LIMITS[tier];
}

export function getPeriodLimit(tier: PlanTier): number {
  return PLAN_LIMITS[tier].periodLimit;
}

export function isValidTier(tier: string): tier is PlanTier {
  return tier in PLAN_LIMITS;
}

export function entitlementToTier(entitlement: string): PlanTier {
  const normalized = entitlement.toLowerCase();
  if (normalized === "pro") return "pro";
  return "free";
}
