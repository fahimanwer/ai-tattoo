import { internalMutation } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import {
  getLimitForProduct,
  getMonthlyLimit,
  entitlementToTier,
} from "./planLimits";

// Product ID to entitlement mapping
const PRODUCT_ENTITLEMENT_MAP: Record<string, string> = {
  // Legacy products
  main_ai_tattoo_starter: "Starter",
  main_ai_tattoo_plus: "Plus",
  main_ai_tattoo_pro: "Pro",
  // New premium products (v2 pricing)
  inkigo_weekly: "Premium",
  inkigo_monthly: "Premium",
  // Test store products
  weekly: "Premium",
  monthly: "Premium",
};

// Default period: 30 days in ms
const DEFAULT_PERIOD_MS = 30 * 24 * 60 * 60 * 1000;

function getEntitlementFromProductId(productId: string): string | null {
  return PRODUCT_ENTITLEMENT_MAP[productId] || null;
}

function getLimitForEvent(productId: string, entitlementId: string): number {
  const productLimit = getLimitForProduct(productId);
  if (productLimit !== null) {
    return productLimit;
  }
  const tier = entitlementToTier(entitlementId);
  return getMonthlyLimit(tier);
}

/**
 * Expire all non-free usage records for a given revenuecatUserId.
 */
async function expireNonFreeRecords(
  ctx: { db: MutationCtx["db"] },
  revenuecatUserId: string,
  expireAt: number,
  onlyActive: boolean
) {
  const records = await ctx.db
    .query("usage")
    .withIndex("by_revenuecatUserId", (q) =>
      q.eq("revenuecatUserId", revenuecatUserId)
    )
    .collect();

  let count = 0;
  for (const record of records) {
    if (record.entitlement === "free") continue;
    if (onlyActive && record.periodEnd < expireAt) continue;
    await ctx.db.patch(record._id, { periodEnd: expireAt });
    count++;
  }
  return count;
}

/**
 * Upsert a usage record.
 */
async function upsertUsageRecord(
  ctx: { db: MutationCtx["db"] },
  data: {
    userId: string;
    entitlement: string;
    periodStart: number;
    periodEnd: number;
    count: number;
    limit: number;
    revenuecatUserId: string;
  }
) {
  const existing = await ctx.db
    .query("usage")
    .withIndex("by_userId_entitlement", (q) =>
      q.eq("userId", data.userId).eq("entitlement", data.entitlement)
    )
    .filter((q) => q.eq(q.field("periodStart"), data.periodStart))
    .first();

  if (existing) {
    await ctx.db.patch(existing._id, {
      periodEnd: data.periodEnd,
      count: data.count,
      limit: data.limit,
      revenuecatUserId: data.revenuecatUserId,
    });
  } else {
    await ctx.db.insert("usage", data);
  }
}

// ---- Event types ----

interface PurchaseEvent {
  app_user_id: string;
  original_app_user_id: string;
  entitlement_ids: string[];
  product_id: string;
  purchased_at_ms: number;
  expiration_at_ms?: number;
}

interface ProductChangeEvent {
  app_user_id: string;
  original_app_user_id: string;
  product_id: string;
  new_product_id?: string;
  purchased_at_ms: number;
  expiration_at_ms?: number;
}

// ---- Handlers ----

async function handleInitialPurchase(
  ctx: { db: MutationCtx["db"] },
  event: PurchaseEvent
) {
  const userId = event.app_user_id;
  const revenuecatUserId = event.original_app_user_id;
  const entitlementIds = event.entitlement_ids;

  if (entitlementIds.length === 0) {
    console.warn("[RC WEBHOOK] No entitlements found for initial purchase");
    return;
  }

  const now = Date.now();
  const expireCount = await expireNonFreeRecords(ctx, revenuecatUserId, now, true);
  if (expireCount > 0) {
    console.log(`[RC WEBHOOK] Expired ${expireCount} non-free records for user ${userId}`);
  }

  for (const entitlementId of entitlementIds) {
    const periodStart = event.purchased_at_ms || now;
    const periodEnd = event.expiration_at_ms || now + DEFAULT_PERIOD_MS;
    const limit = getLimitForEvent(event.product_id, entitlementId);

    console.log(`[RC WEBHOOK] Creating new usage record:`, {
      entitlement: entitlementId,
      productId: event.product_id,
      limit,
    });

    await upsertUsageRecord(ctx, {
      userId,
      entitlement: entitlementId,
      periodStart,
      periodEnd,
      count: 0,
      limit,
      revenuecatUserId,
    });
  }
}

async function handleRenewal(
  ctx: { db: MutationCtx["db"] },
  event: PurchaseEvent
) {
  const userId = event.app_user_id;
  const revenuecatUserId = event.original_app_user_id;
  const entitlementIds = event.entitlement_ids;

  if (entitlementIds.length === 0) {
    console.warn("[RC WEBHOOK] No entitlements found for renewal");
    return;
  }

  const now = Date.now();
  const periodStart = event.purchased_at_ms || now;
  const periodEnd = event.expiration_at_ms || now + DEFAULT_PERIOD_MS;

  if (periodEnd < now) {
    console.warn("[RC WEBHOOK] SKIPPING: Renewal period already expired");
    return;
  }

  // Out-of-order webhook protection
  const newerRecord = await ctx.db
    .query("usage")
    .withIndex("by_revenuecatUserId", (q) =>
      q.eq("revenuecatUserId", revenuecatUserId)
    )
    .filter((q) =>
      q.and(
        q.neq(q.field("entitlement"), "free"),
        q.gt(q.field("periodStart"), periodStart)
      )
    )
    .first();

  if (newerRecord) {
    console.warn("[RC WEBHOOK] SKIPPING: Already have a newer period");
    return;
  }

  const expireCount = await expireNonFreeRecords(ctx, revenuecatUserId, now, true);
  if (expireCount > 0) {
    console.log(`[RC WEBHOOK] Expired ${expireCount} non-free records for user ${userId}`);
  }

  for (const entitlementId of entitlementIds) {
    const limit = getLimitForEvent(event.product_id, entitlementId);
    await upsertUsageRecord(ctx, {
      userId,
      entitlement: entitlementId,
      periodStart,
      periodEnd,
      count: 0,
      limit,
      revenuecatUserId,
    });
  }
}

async function handleProductChange(
  ctx: { db: MutationCtx["db"] },
  event: ProductChangeEvent
) {
  const userId = event.app_user_id;
  const revenuecatUserId = event.original_app_user_id;
  const newProductId = event.new_product_id;

  if (!newProductId) {
    console.error("[RC WEBHOOK] PRODUCT_CHANGE: Missing new_product_id");
    return;
  }

  const newEntitlement = getEntitlementFromProductId(newProductId);
  if (!newEntitlement) {
    console.error(`[RC WEBHOOK] PRODUCT_CHANGE: Unknown product: ${newProductId}`);
    return;
  }

  console.log(`[RC WEBHOOK] PRODUCT_CHANGE: ${event.product_id} -> ${newProductId}`);

  const now = Date.now();
  const expireCount = await expireNonFreeRecords(ctx, revenuecatUserId, now, true);
  if (expireCount > 0) {
    console.log(`[RC WEBHOOK] Expired ${expireCount} non-free records`);
  }

  const periodStart = event.purchased_at_ms;
  const periodEnd = event.expiration_at_ms || now + DEFAULT_PERIOD_MS;
  const limit = getLimitForEvent(newProductId, newEntitlement);

  await upsertUsageRecord(ctx, {
    userId,
    entitlement: newEntitlement,
    periodStart,
    periodEnd,
    count: 0,
    limit,
    revenuecatUserId,
  });
}

async function handleExpiration(
  ctx: { db: MutationCtx["db"] },
  event: { app_user_id: string; original_app_user_id: string; expiration_at_ms?: number }
) {
  const expirationDate = event.expiration_at_ms || Date.now();
  console.log(`[RC WEBHOOK] EXPIRATION: for user ${event.app_user_id}`);

  const count = await expireNonFreeRecords(ctx, event.original_app_user_id, expirationDate, false);
  console.log(`[RC WEBHOOK] Closed ${count} non-free usage period(s)`);
}

async function handleTransfer(
  ctx: { db: MutationCtx["db"] },
  event: { transferred_from: string[]; transferred_to: string[] }
) {
  const newUserId = event.transferred_to?.[0];
  const originalUserId = event.transferred_from?.[0];

  if (!newUserId || !originalUserId) {
    console.error("[RC WEBHOOK] TRANSFER: Missing user IDs");
    return;
  }

  const allUpdated: string[] = [];
  for (const fromId of event.transferred_from) {
    const records = await ctx.db
      .query("usage")
      .withIndex("by_revenuecatUserId", (q) => q.eq("revenuecatUserId", fromId))
      .collect();

    for (const record of records) {
      await ctx.db.patch(record._id, { revenuecatUserId: newUserId });
      allUpdated.push(record._id);
    }
  }

  console.log(`[RC WEBHOOK] TRANSFER: Updated ${allUpdated.length} records`);
}

// ---- Main internal mutation ----

export const processRevenueCatEvent = internalMutation({
  args: {
    eventType: v.string(),
    eventId: v.string(),
    appUserId: v.string(),
    originalAppUserId: v.string(),
    entitlementIds: v.optional(v.array(v.string())),
    productId: v.optional(v.string()),
    newProductId: v.optional(v.string()),
    purchasedAtMs: v.optional(v.number()),
    expirationAtMs: v.optional(v.number()),
    gracePeriodExpirationAtMs: v.optional(v.number()),
    autoResumeAtMs: v.optional(v.number()),
    transferredFrom: v.optional(v.array(v.string())),
    transferredTo: v.optional(v.array(v.string())),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const eventType = args.eventType;
    console.log(`[RC WEBHOOK] Processing event: ${eventType}`);

    if (eventType === "TEST") {
      console.log("[RC WEBHOOK] Skipping test event");
      return null;
    }

    const baseEvent = {
      app_user_id: args.appUserId,
      original_app_user_id: args.originalAppUserId,
      entitlement_ids: args.entitlementIds || [],
      product_id: args.productId || "",
      new_product_id: args.newProductId,
      purchased_at_ms: args.purchasedAtMs || Date.now(),
      expiration_at_ms: args.expirationAtMs,
    };

    switch (eventType) {
      case "INITIAL_PURCHASE":
        await handleInitialPurchase(ctx, baseEvent);
        break;
      case "RENEWAL":
        await handleRenewal(ctx, baseEvent);
        break;
      case "CANCELLATION":
        console.log(`[RC WEBHOOK] CANCELLATION: for user ${args.appUserId}`);
        break;
      case "UNCANCELLATION":
        console.log(`[RC WEBHOOK] UNCANCELLATION: for user ${args.appUserId}`);
        break;
      case "BILLING_ISSUE":
        console.log(`[RC WEBHOOK] BILLING_ISSUE: for user ${args.appUserId}`);
        break;
      case "PRODUCT_CHANGE":
        await handleProductChange(ctx, baseEvent);
        break;
      case "EXPIRATION":
        await handleExpiration(ctx, {
          app_user_id: args.appUserId,
          original_app_user_id: args.originalAppUserId,
          expiration_at_ms: args.expirationAtMs,
        });
        break;
      case "SUBSCRIPTION_PAUSED":
        console.log(`[RC WEBHOOK] SUBSCRIPTION_PAUSED: for user ${args.appUserId}`);
        break;
      case "SUBSCRIPTION_RESUMED":
        console.log(`[RC WEBHOOK] SUBSCRIPTION_RESUMED: for user ${args.appUserId}`);
        break;
      case "REFUND":
        console.log(`[RC WEBHOOK] REFUND: for user ${args.appUserId}`);
        break;
      case "TRANSFER":
        await handleTransfer(ctx, {
          transferred_from: args.transferredFrom || [],
          transferred_to: args.transferredTo || [],
        });
        break;
      case "NON_RENEWING_PURCHASE":
        console.log(`[RC WEBHOOK] NON_RENEWING_PURCHASE: for user ${args.appUserId}`);
        await handleInitialPurchase(ctx, baseEvent);
        break;
      default:
        console.log(`[RC WEBHOOK] Unhandled event type: ${eventType}`);
    }

    console.log(`[RC WEBHOOK] Successfully processed ${eventType} for user ${args.appUserId}`);
    return null;
  },
});
