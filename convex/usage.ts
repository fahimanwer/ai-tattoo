import { query, internalQuery, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import type { QueryCtx, MutationCtx } from "./_generated/server";
import {
  FREE_TIER_LIMIT,
  PRO_ENTITLEMENT,
  FREE_ENTITLEMENT,
  entitlementToTier,
  getPeriodLimit,
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
      .withIndex("by_revenuecatUserId_and_entitlement_and_periodEnd", (q) =>
        q
          .eq("revenuecatUserId", revenuecatUserId)
          .eq("entitlement", PRO_ENTITLEMENT)
          .gte("periodEnd", now)
      )
      .order("desc")
      .first();

    // Post-query check: periodStart must be <= now + 5min grace
    if (paidUsage && paidUsage.periodStart > now + 5 * 60 * 1000) {
      paidUsage = null;
    }
  }

  if (!paidUsage) {
    paidUsage = await ctx.db
      .query("usage")
      .withIndex("by_userId_and_entitlement_and_periodEnd", (q) =>
        q
          .eq("userId", userId)
          .eq("entitlement", PRO_ENTITLEMENT)
          .gte("periodEnd", now)
      )
      .order("desc")
      .first();

    // Post-query check: periodStart must be <= now + 5min grace
    if (paidUsage && paidUsage.periodStart > now + 5 * 60 * 1000) {
      paidUsage = null;
    }
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
      .withIndex("by_revenuecatUserId_and_entitlement", (q) =>
        q.eq("revenuecatUserId", revenuecatUserId).eq("entitlement", FREE_ENTITLEMENT)
      )
      .first();
  }

  if (!freeUsage) {
    freeUsage = await ctx.db
      .query("usage")
      .withIndex("by_userId_and_entitlement", (q) =>
        q.eq("userId", userId).eq("entitlement", FREE_ENTITLEMENT)
      )
      .first();
  }

  return freeUsage;
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
  if (paidUsage) return PRO_ENTITLEMENT;

  const freeUsage = await findFreeRecord(ctx, userId, revenuecatUserId);
  if (freeUsage) return FREE_ENTITLEMENT;

  return FREE_ENTITLEMENT;
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
    let subscriptionTier: PlanTier = FREE_ENTITLEMENT;
    if (activePeriodRecord) {
      subscriptionTier = entitlementToTier(activePeriodRecord.entitlement);
    }

    const planConfig = getPlanConfig(subscriptionTier);

    const used = activePeriodRecord?.count || 0;
    const limit =
      activePeriodRecord?.limit || getPeriodLimit(subscriptionTier);
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
    const isFreeTier = entitlement === FREE_ENTITLEMENT;

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
      entitlement: FREE_ENTITLEMENT,
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

// ============================================================================
// Internal: resetUsageForTesting (dev only — reset credits for a user)
// ============================================================================

/**
 * Reset a user's usage count to 0 for testing purposes.
 * Run from the Convex dashboard: usage:resetUsageForTesting
 */
export const resetUsageForTesting = internalMutation({
  args: {
    userId: v.string(),
    revenuecatUserId: v.optional(v.string()),
  },
  returns: v.string(),
  handler: async (ctx, args) => {
    const { userId, revenuecatUserId } = args;
    const now = Date.now();

    // Reset paid record if exists
    const paidRecord = await findActivePaidRecord(
      ctx,
      userId,
      revenuecatUserId,
      now
    );
    if (paidRecord) {
      await ctx.db.patch(paidRecord._id, { count: 0 });
      return `Reset paid usage for ${userId} (was ${paidRecord.count})`;
    }

    // Reset free record if exists
    const freeRecord = await findFreeRecord(ctx, userId, revenuecatUserId);
    if (freeRecord) {
      await ctx.db.patch(freeRecord._id, { count: 0 });
      return `Reset free usage for ${userId} (was ${freeRecord.count})`;
    }

    return `No usage record found for ${userId}`;
  },
});

/**
 * List all usage records for debugging/testing.
 * Run from CLI: bunx convex run --no-push usage:listAllUsage
 */
export const listAllUsage = internalQuery({
  args: {},
  handler: async (ctx) => {
    const records = await ctx.db.query("usage").collect();
    return records.map((r) => ({
      _id: r._id,
      userId: r.userId,
      entitlement: r.entitlement,
      count: r.count,
      limit: r.limit,
      revenuecatUserId: r.revenuecatUserId,
    }));
  },
});

/**
 * Reset ALL usage records to 0 for testing.
 */
export const resetAllUsageForTesting = internalMutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    const records = await ctx.db.query("usage").collect();
    let resetCount = 0;
    for (const record of records) {
      if (record.count > 0) {
        await ctx.db.patch(record._id, { count: 0 });
        resetCount++;
      }
    }
    return `Reset ${resetCount} of ${records.length} usage records to 0`;
  },
});

/**
 * Normalizes any non-canonical entitlement value to PRO_ENTITLEMENT or FREE_ENTITLEMENT.
 */
export const fixLegacyEntitlements = internalMutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    const records = await ctx.db.query("usage").collect();
    let fixedCount = 0;
    const fixed: string[] = [];
    for (const record of records) {
      if (record.entitlement !== PRO_ENTITLEMENT && record.entitlement !== FREE_ENTITLEMENT) {
        await ctx.db.patch(record._id, { entitlement: PRO_ENTITLEMENT });
        fixed.push(record.entitlement);
        fixedCount++;
      }
    }
    return fixedCount > 0
      ? `Fixed ${fixedCount} records (was: ${Array.from(new Set(fixed)).join(", ")})`
      : "No non-canonical entitlements found";
  },
});
