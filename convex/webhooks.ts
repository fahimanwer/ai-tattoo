import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

// Product ID to entitlement mapping
const PRODUCT_ENTITLEMENT_MAP: Record<string, string> = {
  // Legacy products (keep for existing subscribers)
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

// Product ID to generation limit mapping
const PRODUCT_LIMITS: Record<string, number> = {
  main_ai_tattoo_starter: 75,
  main_ai_tattoo_plus: 200,
  main_ai_tattoo_pro: 600,
  inkigo_weekly: 35,
  inkigo_monthly: 80,
  // Test store products
  weekly: 35,
  monthly: 80,
};

// Tier-based monthly limits (fallback)
const TIER_LIMITS: Record<string, number> = {
  free: 1,
  starter: 75,
  plus: 200,
  pro: 600,
  premium: 80,
};

function getEntitlementFromProductId(productId: string): string | null {
  return PRODUCT_ENTITLEMENT_MAP[productId] || null;
}

function entitlementToTier(entitlement: string): string {
  const normalized = entitlement.toLowerCase();
  if (normalized === "premium") return "premium";
  if (normalized === "starter") return "starter";
  if (normalized === "plus") return "plus";
  if (normalized === "pro") return "pro";
  return "free";
}

function getLimitForEvent(productId: string, entitlementId: string): number {
  const productLimit = PRODUCT_LIMITS[productId];
  if (productLimit !== undefined) {
    return productLimit;
  }
  const tier = entitlementToTier(entitlementId);
  return TIER_LIMITS[tier] ?? 1;
}

// Default period: 30 days in ms
const DEFAULT_PERIOD_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Expire all non-free usage records for a given revenuecatUserId
 * that haven't already expired. Sets periodEnd to the given timestamp.
 */
async function expireNonFreeRecords(
  ctx: any,
  revenuecatUserId: string,
  expireAt: number,
  onlyActive: boolean
) {
  const records = await ctx.db
    .query("usage")
    .withIndex("by_revenuecatUserId", (q: any) =>
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
 * Upsert a usage record. Looks for existing record matching
 * userId + entitlement + periodStart. If found, patches it; otherwise inserts.
 */
async function upsertUsageRecord(
  ctx: any,
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
  // Look for existing record with same userId, entitlement, and periodStart
  const existing = await ctx.db
    .query("usage")
    .withIndex("by_userId_entitlement", (q: any) =>
      q.eq("userId", data.userId).eq("entitlement", data.entitlement)
    )
    .filter((q: any) => q.eq(q.field("periodStart"), data.periodStart))
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

// ---- Handlers ----

async function handleInitialPurchase(
  ctx: any,
  event: {
    app_user_id: string;
    original_app_user_id: string;
    entitlement_ids: string[];
    product_id: string;
    purchased_at_ms: number;
    expiration_at_ms?: number;
  }
) {
  const userId = event.app_user_id;
  const revenuecatUserId = event.original_app_user_id;
  const entitlementIds = event.entitlement_ids;

  if (entitlementIds.length === 0) {
    console.warn("[RC WEBHOOK] No entitlements found for initial purchase");
    return;
  }

  const now = Date.now();

  // Expire non-free records that aren't already expired
  const expireCount = await expireNonFreeRecords(
    ctx,
    revenuecatUserId,
    now,
    true
  );
  if (expireCount > 0) {
    console.log(
      `[RC WEBHOOK] Expired ${expireCount} non-free records for user ${userId}`
    );
  }

  for (const entitlementId of entitlementIds) {
    const periodStart = event.purchased_at_ms || now;
    const periodEnd =
      event.expiration_at_ms || now + DEFAULT_PERIOD_MS;
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
  ctx: any,
  event: {
    app_user_id: string;
    original_app_user_id: string;
    entitlement_ids: string[];
    product_id: string;
    purchased_at_ms: number;
    expiration_at_ms?: number;
  }
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
  const periodEnd =
    event.expiration_at_ms || now + DEFAULT_PERIOD_MS;

  // Check if this webhook is for a period in the past (out-of-order webhook)
  if (periodEnd < now) {
    console.warn(
      "[RC WEBHOOK] SKIPPING: Renewal period already expired (out-of-order webhook)"
    );
    return;
  }

  // Check for newer records (out-of-order webhook protection)
  const newerRecord = await ctx.db
    .query("usage")
    .withIndex("by_revenuecatUserId", (q: any) =>
      q.eq("revenuecatUserId", revenuecatUserId)
    )
    .filter((q: any) =>
      q.and(
        q.neq(q.field("entitlement"), "free"),
        q.gt(q.field("periodStart"), periodStart)
      )
    )
    .first();

  if (newerRecord) {
    console.warn(
      "[RC WEBHOOK] SKIPPING: Already have a newer period (out-of-order webhook)"
    );
    return;
  }

  // Expire non-free records that aren't already expired
  const expireCount = await expireNonFreeRecords(
    ctx,
    revenuecatUserId,
    now,
    true
  );
  if (expireCount > 0) {
    console.log(
      `[RC WEBHOOK] Expired ${expireCount} non-free records for user ${userId}`
    );
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

async function handleCancellation(event: { app_user_id: string; expiration_at_ms?: number }) {
  console.log(
    `[RC WEBHOOK] CANCELLATION: Subscription cancelled for user ${event.app_user_id}. Expiration: ${
      event.expiration_at_ms
        ? new Date(event.expiration_at_ms).toISOString()
        : "immediate"
    }`
  );
  // User retains access until expiration - no DB changes needed
}

async function handleUncancellation(event: { app_user_id: string }) {
  console.log(
    `[RC WEBHOOK] UNCANCELLATION: Subscription uncancelled for user ${event.app_user_id}`
  );
}

async function handleBillingIssue(event: {
  app_user_id: string;
  grace_period_expiration_at_ms?: number;
}) {
  console.log(
    `[RC WEBHOOK] BILLING_ISSUE: Billing issue for user ${event.app_user_id}. Grace period ends: ${
      event.grace_period_expiration_at_ms
        ? new Date(event.grace_period_expiration_at_ms).toISOString()
        : "N/A"
    }`
  );
}

async function handleProductChange(
  ctx: any,
  event: {
    app_user_id: string;
    original_app_user_id: string;
    product_id: string;
    new_product_id?: string;
    purchased_at_ms: number;
    expiration_at_ms?: number;
  }
) {
  const userId = event.app_user_id;
  const revenuecatUserId = event.original_app_user_id;
  const newProductId = event.new_product_id;

  if (!newProductId) {
    console.error("[RC WEBHOOK] PRODUCT_CHANGE: Missing new_product_id field");
    return;
  }

  const newEntitlement = getEntitlementFromProductId(newProductId);
  if (!newEntitlement) {
    console.error(
      `[RC WEBHOOK] PRODUCT_CHANGE: Unknown product ID: ${newProductId}`
    );
    return;
  }

  console.log(
    `[RC WEBHOOK] PRODUCT_CHANGE: ${event.product_id} -> ${newProductId} (${newEntitlement}) for user ${userId}`
  );

  const now = Date.now();

  // Expire non-free records that aren't already expired
  const expireCount = await expireNonFreeRecords(
    ctx,
    revenuecatUserId,
    now,
    true
  );
  if (expireCount > 0) {
    console.log(
      `[RC WEBHOOK] Expired ${expireCount} non-free records before creating new ones`
    );
  }

  // Use new_product_id for the limit
  const productId = newProductId;
  const periodStart = event.purchased_at_ms;
  const periodEnd =
    event.expiration_at_ms || Date.now() + DEFAULT_PERIOD_MS;
  const limit = getLimitForEvent(productId, newEntitlement);

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
  ctx: any,
  event: {
    app_user_id: string;
    original_app_user_id: string;
    expiration_at_ms?: number;
  }
) {
  const userId = event.app_user_id;
  const revenuecatUserId = event.original_app_user_id;
  const expirationDate = event.expiration_at_ms || Date.now();

  console.log(
    `[RC WEBHOOK] EXPIRATION: Subscription expired for user ${userId}`
  );

  // Close ALL non-free usage periods for this user (regardless of period dates)
  const count = await expireNonFreeRecords(
    ctx,
    revenuecatUserId,
    expirationDate,
    false
  );
  console.log(
    `[RC WEBHOOK] Closed ${count} non-free usage period(s) for user ${userId}`
  );
}

async function handleSubscriptionPaused(event: {
  app_user_id: string;
  auto_resume_at_ms?: number;
}) {
  console.log(
    `[RC WEBHOOK] SUBSCRIPTION_PAUSED: for user ${event.app_user_id}. Auto-resume: ${
      event.auto_resume_at_ms
        ? new Date(event.auto_resume_at_ms).toISOString()
        : "N/A"
    }`
  );
}

async function handleSubscriptionResumed(event: { app_user_id: string }) {
  console.log(
    `[RC WEBHOOK] SUBSCRIPTION_RESUMED: for user ${event.app_user_id}`
  );
}

async function handleRefund(event: { app_user_id: string }) {
  console.log(`[RC WEBHOOK] REFUND: Refund processed for user ${event.app_user_id}`);
}

async function handleTransfer(
  ctx: any,
  event: {
    transferred_from: string[];
    transferred_to: string[];
    id: string;
  }
) {
  const newUserId = event.transferred_to?.[0];
  const originalUserId = event.transferred_from?.[0];

  if (!newUserId || !originalUserId) {
    console.error(
      "[RC WEBHOOK] TRANSFER: new user or original user to transfer from is missing"
    );
    return;
  }

  // Find all records that match any of the transferred_from IDs
  const allUpdated: string[] = [];
  for (const fromId of event.transferred_from) {
    const records = await ctx.db
      .query("usage")
      .withIndex("by_revenuecatUserId", (q: any) =>
        q.eq("revenuecatUserId", fromId)
      )
      .collect();

    for (const record of records) {
      await ctx.db.patch(record._id, { revenuecatUserId: newUserId });
      allUpdated.push(record._id);
    }
  }

  console.log(
    `[RC WEBHOOK] TRANSFER: Updated ${allUpdated.length} records from ${originalUserId} to ${newUserId}`
  );
}

async function handleNonRenewingPurchase(
  ctx: any,
  event: {
    app_user_id: string;
    original_app_user_id: string;
    entitlement_ids: string[];
    product_id: string;
    purchased_at_ms: number;
    expiration_at_ms?: number;
  }
) {
  console.log(
    `[RC WEBHOOK] NON_RENEWING_PURCHASE: for user ${event.app_user_id}`
  );
  await handleInitialPurchase(ctx, event);
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
    purchasedAtMs: v.optional(v.float64()),
    expirationAtMs: v.optional(v.float64()),
    gracePeriodExpirationAtMs: v.optional(v.float64()),
    autoResumeAtMs: v.optional(v.float64()),
    // Transfer-specific fields
    transferredFrom: v.optional(v.array(v.string())),
    transferredTo: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const eventType = args.eventType;

    console.log(`[RC WEBHOOK] Processing event: ${eventType}`);

    if (eventType === "TEST") {
      console.log("[RC WEBHOOK] Skipping test event");
      return;
    }

    const baseEvent = {
      app_user_id: args.appUserId,
      original_app_user_id: args.originalAppUserId,
      entitlement_ids: args.entitlementIds || [],
      product_id: args.productId || "",
      new_product_id: args.newProductId,
      purchased_at_ms: args.purchasedAtMs || Date.now(),
      expiration_at_ms: args.expirationAtMs,
      grace_period_expiration_at_ms: args.gracePeriodExpirationAtMs,
      auto_resume_at_ms: args.autoResumeAtMs,
    };

    switch (eventType) {
      case "INITIAL_PURCHASE":
        await handleInitialPurchase(ctx, baseEvent);
        break;
      case "RENEWAL":
        await handleRenewal(ctx, baseEvent);
        break;
      case "CANCELLATION":
        await handleCancellation(baseEvent);
        break;
      case "UNCANCELLATION":
        await handleUncancellation(baseEvent);
        break;
      case "BILLING_ISSUE":
        await handleBillingIssue(baseEvent);
        break;
      case "PRODUCT_CHANGE":
        await handleProductChange(ctx, baseEvent);
        break;
      case "EXPIRATION":
        await handleExpiration(ctx, baseEvent);
        break;
      case "SUBSCRIPTION_PAUSED":
        await handleSubscriptionPaused(baseEvent);
        break;
      case "SUBSCRIPTION_RESUMED":
        await handleSubscriptionResumed(baseEvent);
        break;
      case "REFUND":
        await handleRefund(baseEvent);
        break;
      case "TRANSFER":
        await handleTransfer(ctx, {
          transferred_from: args.transferredFrom || [],
          transferred_to: args.transferredTo || [],
          id: args.eventId,
        });
        break;
      case "NON_RENEWING_PURCHASE":
        await handleNonRenewingPurchase(ctx, baseEvent);
        break;
      default:
        console.log(`[RC WEBHOOK] Unhandled event type: ${eventType}`);
    }

    console.log(
      `[RC WEBHOOK] Successfully processed ${eventType} event for user ${args.appUserId}`
    );
  },
});
