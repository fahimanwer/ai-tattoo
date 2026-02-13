import { query, internalQuery, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import type { QueryCtx, MutationCtx } from "./_generated/server";
import {
  FREE_TIER_LIMIT,
  entitlementToTier,
  getMonthlyLimit,
  getPlanConfig,
  type PlanTier,
} from "./planLimits";

// ============================================================================
// Helper: find active paid usage record
// ============================================================================

async function findActivePaidRecord(
  ctx: { db: QueryCtx["db"] | MutationCtx["db"] },
  userId: string,
  revenuecatUserId: string | undefined,
  now: number
) {
  let paidUsage = null;

  if (revenuecatUserId) {
    paidUsage = await ctx.db
      .query("usage")
      .withIndex("by_revenuecatUserId_periodEnd", (q) =>
        q.eq("revenuecatUserId", revenuecatUserId).gte("periodEnd", now)
      )
      .filter((q) =>
        q.and(
          q.lte(q.field("periodStart"), now + 5 * 60 * 1000),
          q.neq(q.field("entitlement"), "free")
        )
      )
      .order("desc")
      .first();
  }

  if (!paidUsage) {
    paidUsage = await ctx.db
      .query("usage")
      .withIndex("by_userId_periodEnd", (q) =>
        q.eq("userId", userId).gte("periodEnd", now)
      )
      .filter((q) =>
        q.and(
          q.lte(q.field("periodStart"), now + 5 * 60 * 1000),
          q.neq(q.field("entitlement"), "free")
        )
      )
      .order("desc")
      .first();
  }

  return paidUsage;
}

// ============================================================================
// Helper: find free tier record
// ============================================================================

async function findFreeRecord(
  ctx: { db: QueryCtx["db"] | MutationCtx["db"] },
  userId: string,
  revenuecatUserId: string | undefined
) {
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

  return freeUsage;
}

// ============================================================================
// Helper: determine entitlement string from paid record
// ============================================================================

function entitlementDisplayName(entitlement: string): string {
  switch (entitlement.toLowerCase()) {
    case "premium":
      return "Premium";
    case "pro":
      return "Pro";
    case "plus":
      return "Plus";
    case "starter":
      return "Starter";
    default:
      return entitlement;
  }
}

// ============================================================================
// Helper: inline entitlement lookup (avoids calling another query from a query)
// ============================================================================

async function getCurrentUserEntitlementHelper(
  ctx: { db: QueryCtx["db"] | MutationCtx["db"] },
  userId: string,
  revenuecatUserId?: string
): Promise<string> {
  const now = Date.now();

  const paidUsage = await findActivePaidRecord(
    ctx,
    userId,
    revenuecatUserId,
    now
  );
  if (paidUsage) {
    return entitlementDisplayName(paidUsage.entitlement);
  }

  const freeUsage = await findFreeRecord(ctx, userId, revenuecatUserId);
  if (freeUsage) {
    return "free";
  }

  return "free";
}

// ============================================================================
// Public: getUserUsage (reactive query - replaces POST /api/user/usage)
// ============================================================================

const usageResponseValidator = v.object({
  used: v.number(),
  limit: v.number(),
  remaining: v.number(),
  periodStart: v.string(),
  periodEnd: v.string(),
  isLimitReached: v.boolean(),
  subscriptionTier: v.string(),
  planInfo: v.object({
    displayName: v.string(),
    color: v.string(),
    features: v.array(v.string()),
  }),
});

/**
 * Get usage info for the current authenticated user.
 * This is a reactive Convex query - it auto-updates on all clients when data changes.
 */
export const getUserUsage = query({
  args: {
    revenuecatUserId: v.optional(v.string()),
  },
  returns: usageResponseValidator,
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    const { revenuecatUserId } = args;
    const now = Date.now();

    // Find free tier record (one-time credits, ignore period dates)
    const freeRecord = await findFreeRecord(ctx, userId, revenuecatUserId);

    // Find active paid tier records
    const paidRecord = await findActivePaidRecord(
      ctx,
      userId,
      revenuecatUserId,
      now
    );

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

const checkUsageResultValidator = v.union(
  v.object({
    success: v.literal(false),
    error: v.string(),
    message: v.string(),
  }),
  v.object({
    success: v.literal(true),
    usage: v.object({
      _id: v.id("usage"),
      userId: v.string(),
      entitlement: v.string(),
      count: v.number(),
      limit: v.number(),
      periodStart: v.number(),
      periodEnd: v.number(),
      revenuecatUserId: v.string(),
    }),
    isFreeTier: v.boolean(),
  })
);

/**
 * Check if a user can generate. Returns the usage record if valid,
 * or an error status if not.
 */
export const checkUsage = internalQuery({
  args: {
    userId: v.string(),
    revenuecatUserId: v.optional(v.string()),
  },
  returns: checkUsageResultValidator,
  handler: async (ctx, args) => {
    const { userId, revenuecatUserId } = args;
    const now = Date.now();

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
      usage = await findFreeRecord(ctx, userId, revenuecatUserId);
    } else {
      // For paid tiers, check active period
      usage = await findActivePaidRecord(ctx, userId, revenuecatUserId, now);
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
 */
export const incrementUsage = internalMutation({
  args: {
    usageId: v.id("usage"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const usage = await ctx.db.get(args.usageId);
    if (!usage) {
      throw new Error("Usage record not found");
    }

    await ctx.db.patch(args.usageId, {
      count: usage.count + 1,
    });
    return null;
  },
});

// ============================================================================
// Internal: ensureUsageRecord (auto-provisions free tier if no record exists)
// ============================================================================

/**
 * Ensures a usage record exists for the given user.
 * If no record (paid or free) exists, creates a free-tier record.
 * Idempotent — safe to call multiple times.
 */
export const ensureUsageRecord = internalMutation({
  args: {
    userId: v.string(),
    revenuecatUserId: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const { userId, revenuecatUserId } = args;
    const now = Date.now();

    // Check for existing paid record
    const paidRecord = await findActivePaidRecord(
      ctx,
      userId,
      revenuecatUserId,
      now
    );
    if (paidRecord) return null;

    // Check for existing free record
    const freeRecord = await findFreeRecord(ctx, userId, revenuecatUserId);
    if (freeRecord) return null;

    // No record at all — create a free-tier record
    const nowDate = new Date();
    const periodStart = new Date(
      nowDate.getFullYear(),
      nowDate.getMonth(),
      1
    ).getTime();
    const periodEnd = new Date(
      nowDate.getFullYear(),
      nowDate.getMonth() + 1,
      0,
      23,
      59,
      59
    ).getTime();

    await ctx.db.insert("usage", {
      userId,
      entitlement: "free",
      count: 0,
      limit: FREE_TIER_LIMIT,
      periodStart,
      periodEnd,
      revenuecatUserId: revenuecatUserId || userId,
    });

    console.log("usage: auto-provisioned free-tier record", { userId });
    return null;
  },
});
