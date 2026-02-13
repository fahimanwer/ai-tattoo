import { mutation } from "./_generated/server";
import { v } from "convex/values";
import {
  FREE_TIER_LIMIT,
  getLimitForProduct,
  getMonthlyLimit,
  type PlanTier,
} from "./planLimits";

const syncResultValidator = v.object({
  success: v.boolean(),
  message: v.string(),
  synced: v.boolean(),
  existingRecord: v.optional(
    v.object({
      entitlement: v.string(),
      count: v.number(),
      limit: v.number(),
    })
  ),
  record: v.optional(
    v.object({
      entitlement: v.string(),
      count: v.number(),
      limit: v.number(),
      periodStart: v.string(),
      periodEnd: v.string(),
    })
  ),
});

/**
 * Sync the client's RevenueCat subscription status with the server.
 */
export const syncSubscription = mutation({
  args: {
    revenuecatUserId: v.string(),
    activeEntitlements: v.array(v.string()),
    hasActiveSubscription: v.boolean(),
    subscriptionInfo: v.optional(
      v.object({
        productIdentifier: v.union(v.string(), v.null()),
        expiresDate: v.union(v.string(), v.null()),
        purchaseDate: v.union(v.string(), v.null()),
      })
    ),
  },
  returns: syncResultValidator,
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    const {
      revenuecatUserId,
      activeEntitlements,
      hasActiveSubscription,
      subscriptionInfo,
    } = args;

    // If user doesn't have an active subscription, ensure free tier record exists
    if (!hasActiveSubscription || activeEntitlements.length === 0) {
      // Check if a free record already exists
      const existingFree = await ctx.db
        .query("usage")
        .withIndex("by_userId_entitlement", (q) =>
          q.eq("userId", userId).eq("entitlement", "free")
        )
        .first();

      if (!existingFree) {
        const now = Date.now();
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
          revenuecatUserId,
          entitlement: "free",
          count: 0,
          limit: FREE_TIER_LIMIT,
          periodStart,
          periodEnd,
        });
      }

      return {
        success: true,
        message: "Free tier record ensured",
        synced: true,
      };
    }

    const now = Date.now();

    // Check for existing records by revenuecatUserId (using new periodEnd index)
    const existingByRcId = await ctx.db
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

    // Check for existing records by userId
    const existingByUserId = await ctx.db
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

    // If we found a record by RC ID, we're good
    if (existingByRcId) {
      return {
        success: true,
        message: "Already synced (by RC ID)",
        synced: false,
        existingRecord: {
          entitlement: existingByRcId.entitlement,
          count: existingByRcId.count,
          limit: existingByRcId.limit,
        },
      };
    }

    // If we found a record by userId but not RC ID, update it
    if (existingByUserId) {
      await ctx.db.patch(existingByUserId._id, {
        revenuecatUserId,
      });

      return {
        success: true,
        message: "Updated RC ID on existing record",
        synced: true,
        existingRecord: {
          entitlement: existingByUserId.entitlement,
          count: existingByUserId.count,
          limit: existingByUserId.limit,
        },
      };
    }

    // Determine the entitlement tier from the active entitlements
    let entitlement: PlanTier = "free";
    if (activeEntitlements.includes("Pro")) {
      entitlement = "pro";
    } else if (activeEntitlements.includes("premium")) {
      entitlement = "premium";
    } else if (activeEntitlements.includes("Plus")) {
      entitlement = "plus";
    } else if (activeEntitlements.includes("Starter")) {
      entitlement = "starter";
    }

    if (entitlement === "free") {
      return {
        success: false,
        message: "No recognized paid entitlement",
        synced: false,
      };
    }

    // Calculate period dates
    let periodStart: number;
    let periodEnd: number;

    if (subscriptionInfo?.purchaseDate && subscriptionInfo?.expiresDate) {
      periodStart = new Date(subscriptionInfo.purchaseDate).getTime();
      periodEnd = new Date(subscriptionInfo.expiresDate).getTime();
    } else {
      periodStart = now;
      periodEnd = now + 7 * 24 * 60 * 60 * 1000;
    }

    // Get the limit
    const productLimit = subscriptionInfo?.productIdentifier
      ? getLimitForProduct(subscriptionInfo.productIdentifier)
      : null;
    const limit = productLimit ?? getMonthlyLimit(entitlement);

    // Upsert: check if a record already exists with same userId + entitlement
    const existingRecord = await ctx.db
      .query("usage")
      .withIndex("by_userId_entitlement", (q) =>
        q.eq("userId", userId).eq("entitlement", entitlement)
      )
      .filter((q) => q.eq(q.field("periodStart"), periodStart))
      .first();

    if (existingRecord) {
      await ctx.db.patch(existingRecord._id, {
        revenuecatUserId,
      });

      return {
        success: true,
        message: "Subscription synced successfully (updated existing)",
        synced: true,
        record: {
          entitlement: existingRecord.entitlement,
          count: existingRecord.count,
          limit: existingRecord.limit,
          periodStart: new Date(existingRecord.periodStart).toISOString(),
          periodEnd: new Date(existingRecord.periodEnd).toISOString(),
        },
      };
    }

    // Create new record
    await ctx.db.insert("usage", {
      userId,
      revenuecatUserId,
      entitlement,
      count: 0,
      limit,
      periodStart,
      periodEnd,
    });

    return {
      success: true,
      message: "Subscription synced successfully",
      synced: true,
      record: {
        entitlement,
        count: 0,
        limit,
        periodStart: new Date(periodStart).toISOString(),
        periodEnd: new Date(periodEnd).toISOString(),
      },
    };
  },
});
