import { mutation } from "./_generated/server";
import { v } from "convex/values";
import {
  getLimitForProduct,
  getMonthlyLimit,
  type PlanTier,
} from "./planLimits";

/**
 * Sync the client's RevenueCat subscription status with the server.
 * Call this after:
 * - Purchases.logIn() + Purchases.restorePurchases()
 * - Any time the RC customer info changes
 *
 * This handles the case where the user's RC anonymous ID changes after login,
 * but they still have valid entitlements from a previous purchase.
 *
 * Ported from src/app/api/user/sync-subscription+api.ts
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

    // If user doesn't have an active subscription, nothing to sync
    if (!hasActiveSubscription || activeEntitlements.length === 0) {
      return {
        success: true,
        message: "No active subscription to sync",
        synced: false,
      };
    }

    const now = Date.now();
    const searchWindow = now + 5 * 60 * 1000; // 5 minutes ahead

    // Check for existing records by revenuecatUserId
    const existingByRcId = await ctx.db
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

    // Check for existing records by userId
    const existingByUserId = await ctx.db
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

    // If we found a record by userId but not RC ID, update it to include the new RC ID
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

    // No existing record found, need to create one
    // Determine the entitlement tier from the active entitlements
    // Priority: pro > premium > plus > starter
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

    // Calculate period dates from subscription info (stored as epoch ms)
    let periodStart: number;
    let periodEnd: number;

    if (subscriptionInfo?.purchaseDate && subscriptionInfo?.expiresDate) {
      periodStart = new Date(subscriptionInfo.purchaseDate).getTime();
      periodEnd = new Date(subscriptionInfo.expiresDate).getTime();
    } else {
      // Default to current time + 1 week
      periodStart = now;
      periodEnd = now + 7 * 24 * 60 * 60 * 1000;
    }

    // Get the limit - use product-specific limit if available
    const productLimit = subscriptionInfo?.productIdentifier
      ? getLimitForProduct(subscriptionInfo.productIdentifier)
      : null;
    const limit = productLimit ?? getMonthlyLimit(entitlement);

    // Manual upsert: check if a record already exists with same userId + entitlement + periodStart
    const existingRecord = await ctx.db
      .query("usage")
      .withIndex("by_userId_entitlement", (q) =>
        q.eq("userId", userId).eq("entitlement", entitlement)
      )
      .filter((q) => q.eq(q.field("periodStart"), periodStart))
      .first();

    if (existingRecord) {
      // Update existing record with RC ID
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
