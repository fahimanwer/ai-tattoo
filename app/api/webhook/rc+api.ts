import { PrismaClient } from "@/prisma/generated/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate());

// RevenueCat webhook event types
type RevenueCatEventType =
  | "INITIAL_PURCHASE"
  | "RENEWAL"
  | "CANCELLATION"
  | "BILLING_ISSUE"
  | "PRODUCT_CHANGE"
  | "TRANSFER"
  | "NON_RENEWING_PURCHASE"
  | "EXPIRATION"
  | "SUBSCRIPTION_PAUSED"
  | "SUBSCRIPTION_RESUMED"
  | "REFUND"
  | "UNCANCELLATION"
  | "TEST";

interface RevenueCatWebhookEvent {
  api_version: string;
  event: {
    type: RevenueCatEventType;
    id: string;
    event_timestamp_ms: number;
    app_id: string;
    app_user_id: string;
    original_app_user_id: string;
    aliases?: string[];
    product_id: string;
    period_type: "NORMAL" | "TRIAL" | "INTRO";
    purchased_at_ms: number;
    expiration_at_ms?: number;
    environment: "SANDBOX" | "PRODUCTION";
    entitlement_id?: string;
    entitlement_ids?: string[];
    presented_offering_id?: string;
    transaction_id: string;
    original_transaction_id: string;
    is_family_share?: boolean;
    country_code?: string;
    app_version?: string;
    currency?: string;
    price?: number;
    price_in_purchased_currency?: number;
    subscriber_attributes?: Record<string, any>;
    store?: "APP_STORE" | "PLAY_STORE" | "AMAZON" | "STRIPE" | "PROMOTIONAL";
    takehome_percentage?: number;
    offer_code?: string;
    tax_percentage?: number;
    commission_percentage?: number;
    renewal_number?: number;
    cancel_reason?: string;
    grace_period_expiration_at_ms?: number;
    auto_resume_at_ms?: number;
  };
}

export async function POST(request: Request) {
  try {
    // Verify RevenueCat webhook authorization
    // RevenueCat sends a simple Bearer token in the Authorization header
    // Using the same secret as Better Auth for simplicity
    const authHeader = request.headers.get("authorization");
    const betterAuthSecret = process.env.BETTER_AUTH_SECRET;

    if (betterAuthSecret && authHeader) {
      const token = authHeader.replace("Bearer ", "");
      // Simple string comparison for RevenueCat's authorization token
      if (token !== betterAuthSecret) {
        console.error("Invalid RevenueCat webhook authorization token");
        return new Response("Unauthorized", { status: 401 });
      }
    } else if (betterAuthSecret) {
      console.error("Missing authorization header for RevenueCat webhook");
      return new Response("Unauthorized", { status: 401 });
    }

    const body: RevenueCatWebhookEvent = await request.json();
    const { event } = body;

    // Validate required fields
    if (!event || !event.type || !event.id) {
      console.error("Invalid webhook payload:", body);
      return new Response("Invalid payload", { status: 400 });
    }

    console.log(
      `Processing RevenueCat webhook event: ${event.type} for user: ${event.app_user_id}`
    );

    // Process event based on type
    await processRevenueCatEvent(event, body.api_version);

    // Acknowledge receipt
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Error processing RevenueCat webhook:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

async function processRevenueCatEvent(
  event: RevenueCatWebhookEvent["event"],
  apiVersion: string
) {
  const userId = event.app_user_id;
  const eventType = event.type;

  // Skip test events in production
  if (eventType === "TEST") {
    console.log("Skipping test event");
    return;
  }

  try {
    switch (eventType) {
      case "INITIAL_PURCHASE":
        await handleInitialPurchase(event);
        break;

      case "RENEWAL":
        await handleRenewal(event);
        break;

      case "CANCELLATION":
        await handleCancellation(event);
        break;

      case "UNCANCELLATION":
        await handleUncancellation(event);
        break;

      case "BILLING_ISSUE":
        await handleBillingIssue(event);
        break;

      case "PRODUCT_CHANGE":
        await handleProductChange(event);
        break;

      case "EXPIRATION":
        await handleExpiration(event);
        break;

      case "SUBSCRIPTION_PAUSED":
        await handleSubscriptionPaused(event);
        break;

      case "SUBSCRIPTION_RESUMED":
        await handleSubscriptionResumed(event);
        break;

      case "REFUND":
        await handleRefund(event);
        break;

      case "TRANSFER":
        await handleTransfer(event);
        break;

      case "NON_RENEWING_PURCHASE":
        await handleNonRenewingPurchase(event);
        break;

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    console.log(`Successfully processed ${eventType} event for user ${userId}`);
  } catch (error) {
    console.error(
      `Error processing ${eventType} event for user ${userId}:`,
      error
    );
    throw error;
  }
}

/**
 * Get generation limit based on entitlement ID
 * Maps RevenueCat entitlements to their respective generation limits
 */
function getLimitForEntitlement(entitlementId: string): number {
  const normalizedEntitlement = entitlementId.toLowerCase();

  switch (normalizedEntitlement) {
    case "pro":
      return 1000;
    case "plus":
      return 300;
    case "starter":
      return 125;
    case "free":
    default:
      return 5;
  }
}

async function handleInitialPurchase(event: RevenueCatWebhookEvent["event"]) {
  const userId = event.app_user_id;
  const revenuecatUserId = event.original_app_user_id;
  const entitlementIds = event.entitlement_ids || [];

  if (entitlementIds.length === 0) {
    console.warn("No entitlements found for initial purchase");
    return;
  }

  // Find the existing usage record by revenuecatUserId (consistent across devices)
  const existingFreeRecord = await prisma.usage.findFirst({
    where: {
      revenuecatUserId: revenuecatUserId,
    },
  });

  if (!existingFreeRecord) {
    console.warn(
      `No existing free usage record found for user ${userId} with revenuecatUserId ${revenuecatUserId}`
    );
    return;
  }

  // Update the existing free record with the new entitlement
  for (const entitlementId of entitlementIds) {
    const periodEnd = event.expiration_at_ms
      ? new Date(event.expiration_at_ms)
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Default 30 days

    const limit = getLimitForEntitlement(entitlementId);

    await prisma.usage.update({
      where: {
        userId_entitlement_periodStart: {
          userId: existingFreeRecord.userId,
          entitlement: existingFreeRecord.entitlement,
          periodStart: existingFreeRecord.periodStart,
        },
      },
      data: {
        userId: userId, // Update to current device's userId
        entitlement: entitlementId,
        periodEnd,
        count: 0, // Reset count for new subscription
        limit,
        revenuecatUserId: revenuecatUserId,
      },
    });

    console.log(
      `Updated existing free record to ${entitlementId} for user ${userId}`
    );
  }
}

async function handleRenewal(event: RevenueCatWebhookEvent["event"]) {
  const userId = event.app_user_id;
  const revenuecatUserId = event.original_app_user_id;
  const entitlementIds = event.entitlement_ids || [];

  if (entitlementIds.length === 0) {
    console.warn("No entitlements found for renewal");
    return;
  }

  // Find the existing usage record by revenuecatUserId (consistent across devices)
  const existingRecord = await prisma.usage.findFirst({
    where: {
      revenuecatUserId: revenuecatUserId,
    },
  });

  if (!existingRecord) {
    console.warn(
      `No existing usage record found for user ${userId} with revenuecatUserId ${revenuecatUserId}`
    );
    return;
  }

  // Update the existing record with renewed period
  for (const entitlementId of entitlementIds) {
    const periodEnd = event.expiration_at_ms
      ? new Date(event.expiration_at_ms)
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const limit = getLimitForEntitlement(entitlementId);

    await prisma.usage.update({
      where: {
        userId_entitlement_periodStart: {
          userId: existingRecord.userId,
          entitlement: existingRecord.entitlement,
          periodStart: existingRecord.periodStart,
        },
      },
      data: {
        userId: userId, // Update to current device's userId
        periodEnd,
        count: 0, // Reset count for renewal
        limit,
        revenuecatUserId: revenuecatUserId,
      },
    });

    console.log(
      `Updated existing record for renewal: ${entitlementId} for user ${userId}`
    );
  }
}

async function handleCancellation(event: RevenueCatWebhookEvent["event"]) {
  const userId = event.app_user_id;
  console.log(
    `Subscription cancelled for user ${userId}. Expiration: ${
      event.expiration_at_ms
        ? new Date(event.expiration_at_ms).toISOString()
        : "immediate"
    }`
  );

  // Note: We don't delete usage records on cancellation as the user retains access until expiration
  // The expiration_at_ms field indicates when access will actually end
}

async function handleUncancellation(event: RevenueCatWebhookEvent["event"]) {
  const userId = event.app_user_id;
  console.log(`Subscription uncancelled for user ${userId}`);

  // Subscription has been uncancelled, it will continue to renew
  // No immediate action needed as renewal events will handle usage record creation
}

async function handleBillingIssue(event: RevenueCatWebhookEvent["event"]) {
  const userId = event.app_user_id;
  console.log(
    `Billing issue for user ${userId}. Grace period ends: ${
      event.grace_period_expiration_at_ms
        ? new Date(event.grace_period_expiration_at_ms).toISOString()
        : "N/A"
    }`
  );

  // You might want to notify the user about the billing issue
  // Access continues during grace period
}

async function handleProductChange(event: RevenueCatWebhookEvent["event"]) {
  const userId = event.app_user_id;
  const entitlementIds = event.entitlement_ids || [];

  console.log(
    `Product change for user ${userId} to entitlements: ${entitlementIds.join(
      ", "
    )}`
  );

  // Handle upgrade/downgrade - reset current period and create new usage records
  await resetCurrentPeriodAndCreateNew(userId, entitlementIds, event);
}

async function resetCurrentPeriodAndCreateNew(
  userId: string,
  entitlementIds: string[],
  event: RevenueCatWebhookEvent["event"]
) {
  const now = new Date();

  // 1. Mark current active period as ended
  await prisma.usage.updateMany({
    where: {
      userId,
      periodStart: { lte: now },
      periodEnd: { gte: now },
    },
    data: {
      periodEnd: now,
    },
  });

  // 2. Create new usage records for each new entitlement
  for (const entitlementId of entitlementIds) {
    const periodStart = new Date(event.purchased_at_ms);
    const periodEnd = event.expiration_at_ms
      ? new Date(event.expiration_at_ms)
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Default 30 days

    // Get appropriate limit based on entitlement
    const limit = getLimitForEntitlement(entitlementId);

    await prisma.usage.upsert({
      where: {
        userId_entitlement_periodStart: {
          userId,
          entitlement: entitlementId,
          periodStart,
        },
      },
      update: {
        periodEnd,
        revenuecatUserId: event.original_app_user_id,
        count: 0, // Reset count for new period
        limit,
      },
      create: {
        userId,
        entitlement: entitlementId,
        periodStart,
        periodEnd,
        count: 0,
        limit,
        revenuecatUserId: event.original_app_user_id,
      },
    });
  }

  console.log(
    `Reset period and created new usage records for entitlements: ${entitlementIds.join(
      ", "
    )}`
  );
}

async function handleExpiration(event: RevenueCatWebhookEvent["event"]) {
  const userId = event.app_user_id;
  console.log(`Subscription expired for user ${userId}`);

  // Subscription has expired, user no longer has access
  // Usage records remain for historical purposes
}

async function handleSubscriptionPaused(
  event: RevenueCatWebhookEvent["event"]
) {
  const userId = event.app_user_id;
  console.log(
    `Subscription paused for user ${userId}. Auto-resume: ${
      event.auto_resume_at_ms
        ? new Date(event.auto_resume_at_ms).toISOString()
        : "N/A"
    }`
  );

  // Subscription is paused but user retains access
}

async function handleSubscriptionResumed(
  event: RevenueCatWebhookEvent["event"]
) {
  const userId = event.app_user_id;
  console.log(`Subscription resumed for user ${userId}`);

  // Subscription has been resumed from paused state
}

async function handleRefund(event: RevenueCatWebhookEvent["event"]) {
  const userId = event.app_user_id;
  console.log(`Refund processed for user ${userId}`);

  // Handle refund - user loses access immediately
  // You might want to clean up or mark usage records accordingly
}

async function handleTransfer(event: RevenueCatWebhookEvent["event"]) {
  const newUserId = event.app_user_id; // User 2 (receiving the entitlements)
  const originalUserId = event.original_app_user_id; // User 1 (losing the entitlements)
  const revenuecatUserId = event.original_app_user_id; // This stays consistent
  const entitlementIds = event.entitlement_ids || [];

  console.log(
    `Subscription transferred from ${originalUserId} to ${newUserId}. Entitlements: ${entitlementIds.join(
      ", "
    )}`
  );

  if (entitlementIds.length === 0) {
    console.warn("No entitlements found for transfer");
    return;
  }

  const now = new Date();

  // Step 1: Find and expire all active usage records for the original user (user 1)
  const originalUserRecords = await prisma.usage.findMany({
    where: {
      revenuecatUserId: revenuecatUserId,
      periodStart: { lte: now },
      periodEnd: { gte: now },
    },
  });

  if (originalUserRecords.length > 0) {
    // Expire the original user's active records
    await prisma.usage.updateMany({
      where: {
        revenuecatUserId: revenuecatUserId,
        periodStart: { lte: now },
        periodEnd: { gte: now },
      },
      data: {
        periodEnd: now,
      },
    });

    console.log(
      `Expired ${originalUserRecords.length} active records for original user ${originalUserId}`
    );
  }

  // Step 2: Create new usage records for the new user (user 2) with transferred entitlements
  for (const entitlementId of entitlementIds) {
    const periodStart = event.purchased_at_ms
      ? new Date(event.purchased_at_ms)
      : now;
    const periodEnd = event.expiration_at_ms
      ? new Date(event.expiration_at_ms)
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Default 30 days

    const limit = getLimitForEntitlement(entitlementId);

    // Find if there was a previous record to preserve usage count
    const previousRecord = originalUserRecords.find(
      (record) => record.entitlement === entitlementId
    );
    const preservedCount = previousRecord ? previousRecord.count : 0;

    await prisma.usage.upsert({
      where: {
        userId_entitlement_periodStart: {
          userId: newUserId,
          entitlement: entitlementId,
          periodStart,
        },
      },
      update: {
        periodEnd,
        count: preservedCount, // Preserve usage count from original user
        limit,
        revenuecatUserId: revenuecatUserId,
      },
      create: {
        userId: newUserId,
        entitlement: entitlementId,
        periodStart,
        periodEnd,
        count: preservedCount, // Preserve usage count from original user
        limit,
        revenuecatUserId: revenuecatUserId,
      },
    });

    console.log(
      `Created/updated ${entitlementId} record for new user ${newUserId} with preserved count: ${preservedCount}`
    );
  }

  console.log(
    `Successfully transferred entitlements from ${originalUserId} to ${newUserId}`
  );
}

async function handleNonRenewingPurchase(
  event: RevenueCatWebhookEvent["event"]
) {
  const userId = event.app_user_id;
  const entitlementIds = event.entitlement_ids || [];

  console.log(
    `Non-renewing purchase for user ${userId}: ${entitlementIds.join(", ")}`
  );

  // Handle one-time purchase - similar to initial purchase but won't renew
  await handleInitialPurchase(event);
}
