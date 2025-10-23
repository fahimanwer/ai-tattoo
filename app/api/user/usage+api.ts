import {
  entitlementToTier,
  getMonthlyLimit,
  getPlanConfig,
  type PlanTier,
} from "@/constants/plan-limits";
import { PrismaClient } from "@/prisma/generated/client/edge";
import { withAuth } from "@/server-utils/auth-middleware";
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

    // First, try to find current period records (where now is between periodStart and periodEnd)
    const currentPeriodRecords = await prisma.usage.findMany({
      where: {
        userId: userId,
        periodStart: { lte: now },
        periodEnd: { gte: now },
      },
      orderBy: { periodStart: "desc" },
      select: {
        entitlement: true,
        periodStart: true,
        periodEnd: true,
        count: true,
        limit: true,
      },
      take: 1, // Only get the most recent one
    });

    let currentPeriodRecord: {
      entitlement: string;
      periodStart: Date;
      periodEnd: Date;
      count: number;
      limit: number;
    } | null = currentPeriodRecords[0] || null;

    // If no active period found, fall back to the most recent record (for expired subscriptions)
    if (!currentPeriodRecord) {
      currentPeriodRecord = await prisma.usage.findFirst({
        where: { userId: userId },
        orderBy: { periodStart: "desc" },
        select: {
          entitlement: true,
          periodStart: true,
          periodEnd: true,
          count: true,
          limit: true,
        },
      });
    }

    // Determine subscription tier from current period or default to free
    let subscriptionTier: PlanTier = "free";
    if (currentPeriodRecord?.entitlement) {
      subscriptionTier = entitlementToTier(currentPeriodRecord.entitlement);
    }

    // Get the correct limit for the user's tier
    const tierLimit = getMonthlyLimit(subscriptionTier);
    const planConfig = getPlanConfig(subscriptionTier);

    // Calculate current period usage
    const used = currentPeriodRecord?.count || 0;
    const limit = tierLimit;
    const remaining = Math.max(0, limit - used);
    const isLimitReached = used >= limit;

    // If we have a current period, use its dates, otherwise create a default period
    let periodStart: Date;
    let periodEnd: Date;

    if (currentPeriodRecord) {
      periodStart = new Date(currentPeriodRecord.periodStart);
      periodEnd = new Date(currentPeriodRecord.periodEnd);
    } else {
      // Create a default current period (start of month to end of month)
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
