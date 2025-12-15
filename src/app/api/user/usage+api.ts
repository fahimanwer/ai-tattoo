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
    const userId = session.user.id;
    const now = new Date();

    // First, check for free tier record (one-time credits, ignore period dates)
    const freeRecord = await prisma.usage.findFirst({
      where: {
        userId: userId,
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
    const paidRecord = await prisma.usage.findFirst({
      where: {
        userId: userId,
        periodStart: { lte: now },
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

    // Determine subscription tier
    let subscriptionTier: PlanTier = "free";

    if (activePeriodRecord) {
      subscriptionTier = entitlementToTier(activePeriodRecord.entitlement);
    }

    // Get the correct limit for the user's tier
    const tierLimit = getMonthlyLimit(subscriptionTier);
    const planConfig = getPlanConfig(subscriptionTier);

    // Calculate current period usage
    const used = activePeriodRecord?.count || 0;
    const limit = tierLimit;
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

    console.log("[server]", "usage response", response);

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
