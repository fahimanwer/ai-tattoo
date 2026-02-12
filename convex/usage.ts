import { query, internalQuery, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import {
  entitlementToTier,
  getMonthlyLimit,
  getPlanConfig,
  type PlanTier,
} from "./planLimits";

// ============================================================================
// Internal: getCurrentUserEntitlement
// ============================================================================

/**
 * Get the current active entitlement for a user.
 * Returns the highest tier entitlement that is currently active.
 *
 * Ported from lib/entitlement-utils.ts
 */
export const getCurrentUserEntitlement = internalQuery({
  args: {
    userId: v.string(),
    revenuecatUserId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, revenuecatUserId } = args;
    const now = Date.now();
    const searchWindow = now + 5 * 60 * 1000; // 5 minutes ahead

    // Try to find paid tier records by revenuecatUserId first, then by userId
    let paidUsage = null;

    if (revenuecatUserId) {
      // Search by revenuecatUserId - active paid period
      paidUsage = await ctx.db
        .query("usage")
        .withIndex("by_revenuecatUserId", (q) =>
          q.eq("revenuecatUserId", revenuecatUserId)
        )
        .filter((q) =>
          q.and(
            q.lte(q.field("periodStart"), searchWindow),
            q.gte(q.field("periodEnd"), now),
            q.neq(q.field("entitlement"), "free")
          )
        )
        .order("desc")
        .first();
    }

    if (!paidUsage) {
      // Fallback: search by userId
      paidUsage = await ctx.db
        .query("usage")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .filter((q) =>
          q.and(
            q.lte(q.field("periodStart"), searchWindow),
            q.gte(q.field("periodEnd"), now),
            q.neq(q.field("entitlement"), "free")
          )
        )
        .order("desc")
        .first();
    }

    if (paidUsage) {
      switch (paidUsage.entitlement.toLowerCase()) {
        case "premium":
          return "Premium";
        case "pro":
          return "Pro";
        case "plus":
          return "Plus";
        case "starter":
          return "Starter";
        default:
          return paidUsage.entitlement;
      }
    }

    // No paid tier, check for free tier
    let freeUsage = null;

    if (revenuecatUserId) {
      freeUsage = await ctx.db
        .query("usage")
        .withIndex("by_revenuecatUserId_entitlement", (q) =>
          q.eq("revenuecatUserId", revenuecatUserId).eq("entitlement", "free")
        )
        .first();
    }

    if (!freeUsage) {
      freeUsage = await ctx.db
        .query("usage")
        .withIndex("by_userId_entitlement", (q) =>
          q.eq("userId", userId).eq("entitlement", "free")
        )
        .first();
    }

    if (freeUsage) {
      return "free";
    }

    return "free";
  },
});

// ============================================================================
// Public: getUserUsage (reactive query - replaces POST /api/user/usage)
// ============================================================================

/**
 * Get usage info for the current authenticated user.
 * This is a reactive Convex query - it auto-updates on all clients when data changes.
 */
export const getUserUsage = query({
  args: {
    revenuecatUserId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    const { revenuecatUserId } = args;

    const now = Date.now();
    const searchWindow = now + 5 * 60 * 1000; // 5 minutes ahead

    // Find free tier record (one-time credits, ignore period dates)
    let freeRecord = null;

    if (revenuecatUserId) {
      freeRecord = await ctx.db
        .query("usage")
        .withIndex("by_revenuecatUserId_entitlement", (q) =>
          q.eq("revenuecatUserId", revenuecatUserId).eq("entitlement", "free")
        )
        .first();
    }

    if (!freeRecord) {
      freeRecord = await ctx.db
        .query("usage")
        .withIndex("by_userId_entitlement", (q) =>
          q.eq("userId", userId).eq("entitlement", "free")
        )
        .first();
    }

    // Find active paid tier records
    let paidRecord = null;

    if (revenuecatUserId) {
      paidRecord = await ctx.db
        .query("usage")
        .withIndex("by_revenuecatUserId", (q) =>
          q.eq("revenuecatUserId", revenuecatUserId)
        )
        .filter((q) =>
          q.and(
            q.lte(q.field("periodStart"), searchWindow),
            q.gte(q.field("periodEnd"), now),
            q.neq(q.field("entitlement"), "free")
          )
        )
        .order("desc")
        .first();
    }

    if (!paidRecord) {
      paidRecord = await ctx.db
        .query("usage")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .filter((q) =>
          q.and(
            q.lte(q.field("periodStart"), searchWindow),
            q.gte(q.field("periodEnd"), now),
            q.neq(q.field("entitlement"), "free")
          )
        )
        .order("desc")
        .first();
    }

    // Priority: paid tier > free tier
    const activePeriodRecord = paidRecord || freeRecord || null;

    // Determine subscription tier
    let subscriptionTier: PlanTier = "free";
    if (activePeriodRecord) {
      subscriptionTier = entitlementToTier(activePeriodRecord.entitlement);
    }

    const planConfig = getPlanConfig(subscriptionTier);

    const used = activePeriodRecord?.count || 0;
    const limit =
      activePeriodRecord?.limit || getMonthlyLimit(subscriptionTier);
    const remaining = Math.max(0, limit - used);
    const isLimitReached = used >= limit;

    let periodStart: number;
    let periodEnd: number;

    if (activePeriodRecord) {
      periodStart = activePeriodRecord.periodStart;
      periodEnd = activePeriodRecord.periodEnd;
    } else {
      // No record found - use placeholder dates
      const nowDate = new Date();
      periodStart = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth(),
        1
      ).getTime();
      periodEnd = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();
    }

    return {
      used,
      limit,
      remaining,
      periodStart: new Date(periodStart).toISOString(),
      periodEnd: new Date(periodEnd).toISOString(),
      isLimitReached,
      subscriptionTier,
      planInfo: {
        displayName: planConfig.displayName,
        color: planConfig.color,
        features: planConfig.features,
      },
    };
  },
});

// ============================================================================
// Internal: checkUsage (used by generation actions before generating)
// ============================================================================

/**
 * Check if a user can generate. Returns the usage record if valid,
 * or an error status if not.
 *
 * Ported from server-utils/generation-utils.ts checkUserUsage()
 */
export const checkUsage = internalQuery({
  args: {
    userId: v.string(),
    revenuecatUserId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, revenuecatUserId } = args;
    const now = Date.now();
    const searchWindow = now + 5 * 60 * 1000;

    // Determine the user's current entitlement
    const entitlement = await getCurrentUserEntitlementHelper(
      ctx,
      userId,
      revenuecatUserId
    );
    const isFreeTier = entitlement === "free";

    // Find usage record based on entitlement type
    let usage = null;

    if (isFreeTier) {
      // For free tier, ignore period dates (one-time credits)
      if (revenuecatUserId) {
        usage = await ctx.db
          .query("usage")
          .withIndex("by_revenuecatUserId_entitlement", (q) =>
            q
              .eq("revenuecatUserId", revenuecatUserId)
              .eq("entitlement", "free")
          )
          .first();
      }
      if (!usage) {
        usage = await ctx.db
          .query("usage")
          .withIndex("by_userId_entitlement", (q) =>
            q.eq("userId", userId).eq("entitlement", "free")
          )
          .first();
      }
    } else {
      // For paid tiers, check active period
      if (revenuecatUserId) {
        usage = await ctx.db
          .query("usage")
          .withIndex("by_revenuecatUserId", (q) =>
            q.eq("revenuecatUserId", revenuecatUserId)
          )
          .filter((q) =>
            q.and(
              q.lte(q.field("periodStart"), searchWindow),
              q.gte(q.field("periodEnd"), now)
            )
          )
          .order("desc")
          .first();
      }
      if (!usage) {
        usage = await ctx.db
          .query("usage")
          .withIndex("by_userId", (q) => q.eq("userId", userId))
          .filter((q) =>
            q.and(
              q.lte(q.field("periodStart"), searchWindow),
              q.gte(q.field("periodEnd"), now)
            )
          )
          .order("desc")
          .first();
      }
    }

    if (!usage) {
      return {
        success: false as const,
        error: "NO_USAGE_RECORD",
        message: "Usage record not found. Please contact support.",
      };
    }

    if (usage.count >= usage.limit) {
      return {
        success: false as const,
        error: "LIMIT_REACHED",
        message:
          "Generation limit reached for current period. Please upgrade your plan or wait for the next period.",
      };
    }

    return {
      success: true as const,
      usage: {
        _id: usage._id,
        userId: usage.userId,
        entitlement: usage.entitlement,
        count: usage.count,
        limit: usage.limit,
        periodStart: usage.periodStart,
        periodEnd: usage.periodEnd,
        revenuecatUserId: usage.revenuecatUserId,
      },
      isFreeTier,
    };
  },
});

// ============================================================================
// Internal: incrementUsage (called after successful generation)
// ============================================================================

/**
 * Increments the usage count after a successful generation.
 *
 * Ported from server-utils/generation-utils.ts incrementUsage()
 */
export const incrementUsage = internalMutation({
  args: {
    usageId: v.id("usage"),
  },
  handler: async (ctx, args) => {
    const usage = await ctx.db.get(args.usageId);
    if (!usage) {
      throw new Error("Usage record not found");
    }

    await ctx.db.patch(args.usageId, {
      count: usage.count + 1,
    });
  },
});

// ============================================================================
// Helper: inline entitlement lookup (avoids calling another query from a query)
// ============================================================================

async function getCurrentUserEntitlementHelper(
  ctx: { db: any },
  userId: string,
  revenuecatUserId?: string
): Promise<string> {
  const now = Date.now();
  const searchWindow = now + 5 * 60 * 1000;

  let paidUsage = null;

  if (revenuecatUserId) {
    paidUsage = await ctx.db
      .query("usage")
      .withIndex("by_revenuecatUserId", (q: any) =>
        q.eq("revenuecatUserId", revenuecatUserId)
      )
      .filter((q: any) =>
        q.and(
          q.lte(q.field("periodStart"), searchWindow),
          q.gte(q.field("periodEnd"), now),
          q.neq(q.field("entitlement"), "free")
        )
      )
      .order("desc")
      .first();
  }

  if (!paidUsage) {
    paidUsage = await ctx.db
      .query("usage")
      .withIndex("by_userId", (q: any) => q.eq("userId", userId))
      .filter((q: any) =>
        q.and(
          q.lte(q.field("periodStart"), searchWindow),
          q.gte(q.field("periodEnd"), now),
          q.neq(q.field("entitlement"), "free")
        )
      )
      .order("desc")
      .first();
  }

  if (paidUsage) {
    switch (paidUsage.entitlement.toLowerCase()) {
      case "premium":
        return "Premium";
      case "pro":
        return "Pro";
      case "plus":
        return "Plus";
      case "starter":
        return "Starter";
      default:
        return paidUsage.entitlement;
    }
  }

  let freeUsage = null;

  if (revenuecatUserId) {
    freeUsage = await ctx.db
      .query("usage")
      .withIndex("by_revenuecatUserId_entitlement", (q: any) =>
        q.eq("revenuecatUserId", revenuecatUserId).eq("entitlement", "free")
      )
      .first();
  }

  if (!freeUsage) {
    freeUsage = await ctx.db
      .query("usage")
      .withIndex("by_userId_entitlement", (q: any) =>
        q.eq("userId", userId).eq("entitlement", "free")
      )
      .first();
  }

  if (freeUsage) {
    return "free";
  }

  return "free";
}
