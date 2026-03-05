import { action, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v, ConvexError } from "convex/values";
import {
  FREE_TIER_LIMIT,
  PRO_ENTITLEMENT,
  FREE_ENTITLEMENT,
  PRODUCT_PERIOD_MS,
  getLimitForProduct,
  getPeriodLimit,
} from "./planLimits";

// ============================================================================
// RevenueCat API verification
// ============================================================================

interface RCSubscriberResponse {
  subscriber: {
    entitlements: Record<
      string,
      {
        expires_date: string | null;
        purchase_date: string;
        product_identifier: string;
      }
    >;
    subscriptions: Record<
      string,
      {
        expires_date: string | null;
        purchase_date: string;
        is_sandbox: boolean;
        unsubscribe_detected_at: string | null;
        billing_issues_detected_at: string | null;
      }
    >;
    non_subscriptions: Record<string, unknown[]>;
  };
}

/**
 * Verify subscription status directly with RevenueCat's API.
 * This prevents client-side spoofing of entitlement data.
 */
async function verifyWithRevenueCat(
  revenuecatUserId: string
): Promise<{
  hasProEntitlement: boolean;
  entitlements: string[];
  productIdentifier: string | null;
  expiresDate: string | null;
  purchaseDate: string | null;
}> {
  const apiKey = process.env.REVENUECAT_SECRET_API_KEY;
  if (!apiKey) {
    console.warn(
      "subscription: REVENUECAT_SECRET_API_KEY not configured, skipping verification"
    );
    // Graceful fallback: if no secret key configured, skip verification
    // This allows development/testing without the key
    return {
      hasProEntitlement: false,
      entitlements: [],
      productIdentifier: null,
      expiresDate: null,
      purchaseDate: null,
    };
  }

  const response = await fetch(
    `https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(revenuecatUserId)}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.error(
      "subscription: RevenueCat API error",
      response.status,
      await response.text()
    );
    throw new ConvexError({
      code: "RC_API_ERROR",
      message: "Failed to verify subscription status",
    });
  }

  const data: RCSubscriberResponse = await response.json();
  const entitlements = data.subscriber.entitlements;
  const activeEntitlements: string[] = [];
  let productIdentifier: string | null = null;
  let expiresDate: string | null = null;
  let purchaseDate: string | null = null;

  const now = new Date();

  for (const [key, ent] of Object.entries(entitlements)) {
    // Check if entitlement is active (no expiry or expiry in the future)
    if (!ent.expires_date || new Date(ent.expires_date) > now) {
      activeEntitlements.push(key);
      productIdentifier = ent.product_identifier;
      expiresDate = ent.expires_date;
      purchaseDate = ent.purchase_date;
    }
  }

  const hasProEntitlement = activeEntitlements.some(
    (e) => e.toLowerCase() === PRO_ENTITLEMENT
  );

  return {
    hasProEntitlement,
    entitlements: activeEntitlements,
    productIdentifier,
    expiresDate,
    purchaseDate,
  };
}

// ============================================================================
// Internal mutation: upsert usage record (called by the action after verification)
// ============================================================================

export const upsertVerifiedSubscription = internalMutation({
  args: {
    userId: v.string(),
    revenuecatUserId: v.string(),
    entitlement: v.string(),
    periodStart: v.number(),
    periodEnd: v.number(),
    count: v.number(),
    limit: v.number(),
  },
  returns: v.object({
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
  }),
  handler: async (ctx, args) => {
    const {
      userId,
      revenuecatUserId,
      entitlement,
      periodStart,
      periodEnd,
      count,
      limit,
    } = args;
    const now = Date.now();

    const existingByRcId = await ctx.db
      .query("usage")
      .withIndex("by_revenuecatUserId_and_entitlement_and_periodEnd", (q) =>
        q
          .eq("revenuecatUserId", revenuecatUserId)
          .eq("entitlement", PRO_ENTITLEMENT)
          .gte("periodEnd", now)
      )
      .order("desc")
      .first();

    if (existingByRcId && existingByRcId.periodStart <= now + 5 * 60 * 1000) {
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

    const existingByUserId = await ctx.db
      .query("usage")
      .withIndex("by_userId_and_entitlement_and_periodEnd", (q) =>
        q
          .eq("userId", userId)
          .eq("entitlement", PRO_ENTITLEMENT)
          .gte("periodEnd", now)
      )
      .order("desc")
      .first();

    if (
      existingByUserId &&
      existingByUserId.periodStart <= now + 5 * 60 * 1000
    ) {
      // Update RC ID on existing record
      await ctx.db.patch(existingByUserId._id, { revenuecatUserId });

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

    const expiredRecord = await ctx.db
      .query("usage")
      .withIndex("by_revenuecatUserId_and_entitlement_and_periodEnd", (q) =>
        q
          .eq("revenuecatUserId", revenuecatUserId)
          .eq("entitlement", PRO_ENTITLEMENT)
      )
      .order("desc")
      .first();

    if (
      expiredRecord &&
      expiredRecord.periodEnd < now &&
      periodEnd > now
    ) {
      // Subscription still active but period expired — create new period
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
        message: "Auto-renewed monthly period for active subscription",
        synced: true,
        record: {
          entitlement,
          count: 0,
          limit,
          periodStart: new Date(periodStart).toISOString(),
          periodEnd: new Date(periodEnd).toISOString(),
        },
      };
    }

    // Upsert: check for existing record with same userId + entitlement + periodStart
    const existingRecord = await ctx.db
      .query("usage")
      .withIndex("by_userId_and_entitlement_and_periodStart", (q) =>
        q
          .eq("userId", userId)
          .eq("entitlement", entitlement)
          .eq("periodStart", periodStart)
      )
      .first();

    if (existingRecord) {
      await ctx.db.patch(existingRecord._id, { revenuecatUserId });

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
      count,
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

// ============================================================================
// Internal mutation: ensure free tier record
// ============================================================================

export const ensureFreeTierRecord = internalMutation({
  args: {
    userId: v.string(),
    revenuecatUserId: v.string(),
  },
  returns: v.object({
    success: v.boolean(),
    message: v.string(),
    synced: v.boolean(),
  }),
  handler: async (ctx, args) => {
    const { userId, revenuecatUserId } = args;

    const existingFree = await ctx.db
      .query("usage")
      .withIndex("by_userId_and_entitlement", (q) =>
        q.eq("userId", userId).eq("entitlement", FREE_ENTITLEMENT)
      )
      .first();

    if (!existingFree) {
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
        entitlement: FREE_ENTITLEMENT,
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
  },
});

// ============================================================================
// Public: syncSubscription (action — verifies with RevenueCat API)
// ============================================================================

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
 * Sync subscription status with server.
 * Verifies with RevenueCat API server-side to prevent client spoofing.
 */
export const syncSubscription = action({
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
      throw new ConvexError("Not authenticated");
    }

    const userId = identity.subject;
    const { revenuecatUserId } = args;

    // Verify with RevenueCat API (server-side truth)
    const rcVerification = await verifyWithRevenueCat(revenuecatUserId);

    // If RC says no pro entitlement, ensure free tier only
    if (!rcVerification.hasProEntitlement) {
      const freeResult: {
        success: boolean;
        message: string;
        synced: boolean;
      } = await ctx.runMutation(
        internal.subscription.ensureFreeTierRecord,
        { userId, revenuecatUserId }
      );
      return freeResult;
    }

    const now = Date.now();
    let periodStart: number;
    let periodEnd: number;

    if (rcVerification.purchaseDate && rcVerification.expiresDate) {
      periodStart = new Date(rcVerification.purchaseDate).getTime();
      periodEnd = new Date(rcVerification.expiresDate).getTime();
    } else {
      periodStart = now;
      periodEnd = now + 7 * 24 * 60 * 60 * 1000;
    }

    // Annual products use 30-day generation windows, not full subscription length
    if (rcVerification.productIdentifier) {
      const periodOverride = PRODUCT_PERIOD_MS[rcVerification.productIdentifier];
      if (periodOverride) {
        periodEnd = Math.min(periodEnd, periodStart + periodOverride);
      }
    }

    const productLimit = rcVerification.productIdentifier
      ? getLimitForProduct(rcVerification.productIdentifier)
      : null;
    const limit = productLimit ?? getPeriodLimit(PRO_ENTITLEMENT);

    const proResult: {
      success: boolean;
      message: string;
      synced: boolean;
      existingRecord?: {
        entitlement: string;
        count: number;
        limit: number;
      };
      record?: {
        entitlement: string;
        count: number;
        limit: number;
        periodStart: string;
        periodEnd: string;
      };
    } = await ctx.runMutation(
      internal.subscription.upsertVerifiedSubscription,
      {
        userId,
        revenuecatUserId,
        entitlement: PRO_ENTITLEMENT,
        periodStart,
        periodEnd,
        count: 0,
        limit,
      }
    );

    return proResult;
  },
});
