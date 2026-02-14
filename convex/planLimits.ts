/**
 * Plan Limits Configuration (Convex-side copy)
 *
 * This file mirrors src/constants/plan-limits.ts so that Convex functions
 * can import these constants directly without reaching outside the convex/ dir.
 */

export const FREE_TIER_LIMIT = 1;

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
    color: "#6b7280",
    features: [
      `${FREE_TIER_LIMIT} one-time generations`,
      "Basic tattoo styles",
    ],
  },
  starter: {
    tier: "starter",
    displayName: "Starter",
    monthlyLimit: 75,
    color: "#f59e0b",
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
    color: "#10b981",
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
    color: "#3b82f6",
    features: [
      "600 generations per month",
      "All tattoo styles",
      "Ultra quality output",
      "Priority support",
      "Early access to new features",
    ],
  },
  premium: {
    tier: "premium",
    displayName: "Premium",
    monthlyLimit: 80,
    color: "yellow",
    features: [
      "Unlimited tattoo designs",
      "All tattoo styles",
      "Premium quality output",
    ],
  },
};

export const PRODUCT_LIMITS: Record<string, number> = {
  main_ai_tattoo_starter: 75,
  main_ai_tattoo_plus: 200,
  main_ai_tattoo_pro: 600,
  tattoodesignai_weekly: 35,
  tattoodesignai_monthly: 80,
  // Test store products
  weekly: 35,
  monthly: 80,
};

export function getLimitForProduct(productId: string): number | null {
  return PRODUCT_LIMITS[productId] ?? null;
}

export function getPlanConfig(tier: PlanTier): PlanConfig {
  return PLAN_LIMITS[tier];
}

export function getMonthlyLimit(tier: PlanTier): number {
  return PLAN_LIMITS[tier].monthlyLimit;
}

export function isValidTier(tier: string): tier is PlanTier {
  return tier in PLAN_LIMITS;
}

export function entitlementToTier(entitlement: string): PlanTier {
  const normalized = entitlement.toLowerCase();
  if (normalized === "premium") return "premium";
  if (normalized === "starter") return "starter";
  if (normalized === "plus") return "plus";
  if (normalized === "pro") return "pro";
  return "free";
}
