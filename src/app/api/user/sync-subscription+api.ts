import { slog } from "@/lib/log";
import { PrismaClient } from "@/prisma/generated/client/edge";
import { withAuth } from "@/server-utils/auth-middleware";
import {
  getLimitForProduct,
  getMonthlyLimit,
  type PlanTier,
} from "@/src/constants/plan-limits";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate());

/**
 * Request schema for subscription sync
 * The client sends its current RevenueCat customer info after restore
 */
const syncRequestSchema = z.object({
  revenuecatUserId: z.string().min(1, "RevenueCat user ID is required"),
  activeEntitlements: z.array(z.string()),
  hasActiveSubscription: z.boolean(),
  // Optional: subscription details for creating the usage record
  subscriptionInfo: z
    .object({
      productIdentifier: z.string().nullable(),
      expiresDate: z.string().nullable(),
      purchaseDate: z.string().nullable(),
    })
    .optional(),
});

/**
 * POST /api/user/sync-subscription
 *
 * Syncs the client's RevenueCat subscription status with the server.
 * Call this after:
 * - Purchases.logIn() + Purchases.restorePurchases()
 * - Any time the RC customer info changes
 *
 * This handles the case where the user's RC anonymous ID changes after login,
 * but they still have valid entitlements from a previous purchase.
 */
export const POST = withAuth(async (request: Request, session: any) => {
  try {
    const body = await request.json();
    const {
      revenuecatUserId,
      activeEntitlements,
      hasActiveSubscription,
      subscriptionInfo,
    } = syncRequestSchema.parse(body);

    slog("sync-subscription+api", "🔄 Syncing subscription", {
      betterAuthUserId: session.user.id,
      revenuecatUserId: revenuecatUserId.slice(0, 30) + "...",
      activeEntitlements,
      hasActiveSubscription,
      productIdentifier: subscriptionInfo?.productIdentifier,
    });

    // If user doesn't have an active subscription, nothing to sync
    if (!hasActiveSubscription || activeEntitlements.length === 0) {
      slog("sync-subscription+api", "⏭️ No active subscription to sync");
      return Response.json({
        success: true,
        message: "No active subscription to sync",
        synced: false,
      });
    }

    const now = new Date();
    // Allow for slight timing differences (webhook might create record with future periodStart)
    const searchWindow = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes ahead

    // Check for existing records by BOTH userId AND revenuecatUserId
    // Also check for records with periodStart up to 5 minutes in the future (webhook timing)
    const [existingByRcId, existingByUserId] = await Promise.all([
      // Check by revenuecatUserId (current RC ID)
      prisma.usage.findFirst({
        where: {
          revenuecatUserId,
          periodStart: { lte: searchWindow },
          periodEnd: { gte: now },
          entitlement: { not: "free" },
        },
        orderBy: { periodStart: "desc" },
      }),
      // Check by userId (Better Auth ID) - webhook might have created with this
      prisma.usage.findFirst({
        where: {
          userId: session.user.id,
          periodStart: { lte: searchWindow },
          periodEnd: { gte: now },
          entitlement: { not: "free" },
        },
        orderBy: { periodStart: "desc" },
      }),
    ]);

    slog("sync-subscription+api", "🔍 Checking existing records", {
      existingByRcId: existingByRcId?.entitlement || "none",
      existingByUserId: existingByUserId?.entitlement || "none",
    });

    // If we found a record by RC ID, we're good
    if (existingByRcId) {
      slog("sync-subscription+api", "✅ Found record by RC ID", {
        entitlement: existingByRcId.entitlement,
        count: existingByRcId.count,
        limit: existingByRcId.limit,
      });
      return Response.json({
        success: true,
        message: "Already synced (by RC ID)",
        synced: false,
        existingRecord: {
          entitlement: existingByRcId.entitlement,
          count: existingByRcId.count,
          limit: existingByRcId.limit,
        },
      });
    }

    // If we found a record by userId but not RC ID, update it to include the new RC ID
    if (existingByUserId) {
      slog(
        "sync-subscription+api",
        "🔄 Found record by userId, updating RC ID",
        {
          oldRcId: existingByUserId.revenuecatUserId,
          newRcId: revenuecatUserId,
        }
      );

      const updated = await prisma.usage.update({
        where: {
          userId_entitlement_periodStart: {
            userId: existingByUserId.userId,
            entitlement: existingByUserId.entitlement,
            periodStart: existingByUserId.periodStart,
          },
        },
        data: {
          revenuecatUserId,
        },
      });

      return Response.json({
        success: true,
        message: "Updated RC ID on existing record",
        synced: true,
        existingRecord: {
          entitlement: updated.entitlement,
          count: updated.count,
          limit: updated.limit,
        },
      });
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
      slog(
        "sync-subscription+api",
        "⚠️ No recognized entitlement in active list",
        { activeEntitlements }
      );
      return Response.json({
        success: false,
        message: "No recognized paid entitlement",
        synced: false,
      });
    }

    // Calculate period dates from subscription info
    let periodStart: Date;
    let periodEnd: Date;

    if (subscriptionInfo?.purchaseDate && subscriptionInfo?.expiresDate) {
      periodStart = new Date(subscriptionInfo.purchaseDate);
      periodEnd = new Date(subscriptionInfo.expiresDate);
    } else {
      // Default to current time + 1 week (most common subscription period)
      periodStart = now;
      periodEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    }

    // Get the limit - use product-specific limit if available
    const productLimit = subscriptionInfo?.productIdentifier
      ? getLimitForProduct(subscriptionInfo.productIdentifier)
      : null;
    const limit = productLimit ?? getMonthlyLimit(entitlement);

    // Use upsert to handle race conditions with webhooks
    const newRecord = await prisma.usage.upsert({
      where: {
        userId_entitlement_periodStart: {
          userId: session.user.id,
          entitlement,
          periodStart,
        },
      },
      update: {
        // If record exists, just update the RC ID
        revenuecatUserId,
      },
      create: {
        userId: session.user.id,
        revenuecatUserId,
        entitlement,
        count: 0,
        limit,
        periodStart,
        periodEnd,
      },
    });

    slog("sync-subscription+api", "✅ Created/updated usage record", {
      entitlement: newRecord.entitlement,
      limit: newRecord.limit,
      periodStart: periodStart.toISOString(),
      periodEnd: periodEnd.toISOString(),
    });

    return Response.json({
      success: true,
      message: "Subscription synced successfully",
      synced: true,
      record: {
        entitlement: newRecord.entitlement,
        count: newRecord.count,
        limit: newRecord.limit,
        periodStart: periodStart.toISOString(),
        periodEnd: periodEnd.toISOString(),
      },
    });
  } catch (error) {
    console.error(
      "sync-subscription+api",
      "❌ Error syncing subscription",
      error
    );

    if (error instanceof z.ZodError) {
      return Response.json(
        {
          success: false,
          message: "Invalid request data",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: false,
        message: "Failed to sync subscription",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
});
