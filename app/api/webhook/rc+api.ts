import { PrismaClient } from "@/prisma/generated/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import * as jose from "jose";

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
    // Verify JWT token using BETTER_AUTH_SECRET
    const authHeader = request.headers.get("authorization");
    const betterAuthSecret = process.env.BETTER_AUTH_SECRET;

    if (betterAuthSecret && authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const isValidToken = await jose.jwtVerify(
        token,
        new TextEncoder().encode(betterAuthSecret),
        {
          algorithms: ["HS256"],
        }
      );

      if (!isValidToken) {
        console.error("Invalid JWT token");
        return new Response("Unauthorized", { status: 401 });
      }
    } else if (betterAuthSecret) {
      console.error("Missing authorization header");
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

async function handleInitialPurchase(event: RevenueCatWebhookEvent["event"]) {
  const userId = event.app_user_id;
  const entitlementIds = event.entitlement_ids || [];

  if (entitlementIds.length === 0) {
    console.warn("No entitlements found for initial purchase");
    return;
  }

  // Create usage records for each entitlement
  for (const entitlementId of entitlementIds) {
    const periodStart = new Date(event.purchased_at_ms);
    const periodEnd = event.expiration_at_ms
      ? new Date(event.expiration_at_ms)
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Default 30 days

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
      },
      create: {
        userId,
        entitlement: entitlementId,
        periodStart,
        periodEnd,
        count: 0,
        revenuecatUserId: event.original_app_user_id,
      },
    });
  }

  console.log(
    `Created usage records for initial purchase: ${entitlementIds.join(", ")}`
  );
}

async function handleRenewal(event: RevenueCatWebhookEvent["event"]) {
  const userId = event.app_user_id;
  const entitlementIds = event.entitlement_ids || [];

  if (entitlementIds.length === 0) {
    console.warn("No entitlements found for renewal");
    return;
  }

  // Create new usage records for the renewed period
  for (const entitlementId of entitlementIds) {
    const periodStart = new Date(event.purchased_at_ms);
    const periodEnd = event.expiration_at_ms
      ? new Date(event.expiration_at_ms)
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

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
      },
      create: {
        userId,
        entitlement: entitlementId,
        periodStart,
        periodEnd,
        count: 0,
        revenuecatUserId: event.original_app_user_id,
      },
    });
  }

  console.log(
    `Processed renewal for entitlements: ${entitlementIds.join(", ")}`
  );
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
      periodEnd: { gte: now }
    },
    data: {
      periodEnd: now
    }
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
    `Reset period and created new usage records for entitlements: ${entitlementIds.join(", ")}`
  );
}

function getLimitForEntitlement(entitlement: string): number {
  switch (entitlement) {
    case "Starter":
      return 125;
    case "Plus":
      return 300;
    case "Pro":
      return 1000;
    default:
      return 5; // Free tier
  }
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
  const userId = event.app_user_id;
  const originalUserId = event.original_app_user_id;

  console.log(`Subscription transferred from ${originalUserId} to ${userId}`);

  // Handle subscription transfer between users
  // You might need to update usage records or user associations
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
