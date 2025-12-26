import { slog } from "@/lib/log";
import { PrismaClient } from "@/prisma/generated/client/edge";
import { withAuth } from "@/server-utils/auth-middleware";
import {
  entitlementToTier,
  getMonthlyLimit,
  getPlanConfig,
  type PlanTier,
} from "@/src/constants/plan-limits";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate());

interface UsageResponse {
  used: number;
  limit: number;
  remaining: number;
  periodStart: string;
  periodEnd: string;
  isLimitReached: boolean;
  subscriptionTier: PlanTier;
  planInfo: {
    displayName: string;
    color: string;
    features: string[];
  };
}

export const POST = withAuth(async (request: Request, session: any) => {
  try {
    // Parse request body for optional revenuecatUserId (new clients)
    // Fallback to session.user.id for backwards compatibility (old clients)
    const body = await request.json().catch(() => ({}));
    const { revenuecatUserId } = body as { revenuecatUserId?: string };

    // New clients: query by revenuecatUserId
    // Old clients: fallback to userId from session
    const useRevenuecatId = !!revenuecatUserId;
    const queryValue = revenuecatUserId || session.user.id;

    slog("usage+api", "🔍 Querying usage", {
      betterAuthUserId: session.user.id,
      revenuecatUserId: revenuecatUserId || "(not provided)",
      queryMode: useRevenuecatId ? "revenuecatUserId" : "userId",
      queryValue: queryValue.slice(0, 20) + "...",
    });

    const now = new Date();
    // Allow for slight timing differences (webhook might create record with future periodStart)
    const searchWindow = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes ahead

    // Build the OR condition to search by BOTH revenuecatUserId AND userId
    // This handles the case where the webhook created a record with a different ID
    const idConditions = useRevenuecatId
      ? {
          OR: [{ revenuecatUserId: queryValue }, { userId: session.user.id }],
        }
      : { userId: queryValue };

    // First, check for free tier record (one-time credits, ignore period dates)
    const freeRecord = await prisma.usage.findFirst({
      where: {
        ...idConditions,
        entitlement: "free",
      },
      select: {
        entitlement: true,
        periodStart: true,
        periodEnd: true,
        count: true,
        limit: true,
      },
    });

    // Then check for active paid tier records
    // Allow periodStart up to 5 minutes in the future (webhook timing)
    const paidRecord = await prisma.usage.findFirst({
      where: {
        ...idConditions,
        periodStart: { lte: searchWindow },
        periodEnd: { gte: now },
        entitlement: { not: "free" },
      },
      orderBy: { periodStart: "desc" },
      select: {
        entitlement: true,
        periodStart: true,
        periodEnd: true,
        count: true,
        limit: true,
      },
    });

    // Priority: paid tier > free tier
    const activePeriodRecord: {
      entitlement: string;
      periodStart: Date;
      periodEnd: Date;
      count: number;
      limit: number;
    } | null = paidRecord || freeRecord || null;

    slog("usage+api", "📊 Found records", {
      hasFreeRecord: !!freeRecord,
      hasPaidRecord: !!paidRecord,
      selectedRecord: activePeriodRecord?.entitlement || "none",
      freeRecordEntitlement: freeRecord?.entitlement,
      paidRecordEntitlement: paidRecord?.entitlement,
    });

    // Determine subscription tier
    let subscriptionTier: PlanTier = "free";

    if (activePeriodRecord) {
      subscriptionTier = entitlementToTier(activePeriodRecord.entitlement);
    }

    const planConfig = getPlanConfig(subscriptionTier);

    // Calculate current period usage
    // Use the actual limit from the database record (set by webhook based on product)
    // Fall back to tier default only if no record exists
    const used = activePeriodRecord?.count || 0;
    const limit =
      activePeriodRecord?.limit || getMonthlyLimit(subscriptionTier);
    const remaining = Math.max(0, limit - used);
    const isLimitReached = used >= limit;

    // Set period dates based on active period
    let periodStart: Date;
    let periodEnd: Date;

    if (activePeriodRecord) {
      // Use active period dates
      periodStart = new Date(activePeriodRecord.periodStart);
      periodEnd = new Date(activePeriodRecord.periodEnd);
    } else {
      // No record found - use placeholder dates
      periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
      periodEnd = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59
      );
    }

    const response: UsageResponse = {
      used,
      limit,
      remaining,
      periodStart: periodStart.toISOString(),
      periodEnd: periodEnd.toISOString(),
      isLimitReached,
      subscriptionTier,
      planInfo: {
        displayName: planConfig.displayName,
        color: planConfig.color,
        features: planConfig.features,
      },
    };

    slog("usage+api", "fetched usage", { used, limit });

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("server", "usage api error", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch usage data",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});
