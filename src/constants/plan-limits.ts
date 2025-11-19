/**
 * Plan Limits Configuration
 *
 * This file defines the usage limits for each subscription tier.
 * It's shared between client and server for consistent validation.
 */

export type PlanTier = "free" | "starter" | "plus" | "pro";

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
    monthlyLimit: 5,
    color: "#6b7280", // gray
    features: ["5 generations per month", "Basic tattoo styles"],
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
};

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
  if (normalized === "starter") return "starter";
  if (normalized === "plus") return "plus";
  if (normalized === "pro") return "pro";
  return "free";
}

/**
 * Get tier hierarchy (higher number = higher tier)
 */
export const TIER_HIERARCHY: Record<PlanTier, number> = {
  free: 0,
  starter: 1,
  plus: 2,
  pro: 3,
};

/**
 * Compare two tiers
 * Returns positive if tier1 > tier2, negative if tier1 < tier2, 0 if equal
 */
export function compareTiers(tier1: PlanTier, tier2: PlanTier): number {
  return TIER_HIERARCHY[tier1] - TIER_HIERARCHY[tier2];
}
