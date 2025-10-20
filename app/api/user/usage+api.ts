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

interface UsageRecord {
  entitlement: string;
  periodStart: string;
  periodEnd: string;
  count: number;
  limit: number;
  revenuecatUserId: string;
}

interface CurrentPeriodUsage {
  used: number;
  limit: number;
  remaining: number;
  periodStart: string;
  periodEnd: string;
  isLimitReached: boolean;
}

interface UsageResponse {
  usage: UsageRecord[];
  totalUsage: number;
  currentPeriod: CurrentPeriodUsage;
  subscriptionTier: PlanTier;
  planInfo: {
    displayName: string;
    color: string;
    features: string[];
  };
}

export const POST = withAuth(async (request: Request, session: any) => {
  console.log("🌐 server", "=== USAGE API CALLED ===");
  console.log("🌐 server", "fetching usage for user:", session.user.email);
  console.log("🌐 server", "user id:", session.user.id);

  try {
    const userId = session.user.id;

    // Fetch all usage records for the user
    const usageRecords = await prisma.usage.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        periodStart: "desc",
      },
      select: {
        userId: true,
        entitlement: true,
        periodStart: true,
        periodEnd: true,
        count: true,
        limit: true,
        revenuecatUserId: true,
      },
    });

    console.log("🌐 server", "raw usage records:", usageRecords.length);

    // Calculate total usage across all entitlements and periods
    const totalUsage = usageRecords.reduce(
      (sum, record) => sum + record.count,
      0
    );

    // Transform the data for the response
    const usage: UsageRecord[] = usageRecords.map((record) => ({
      entitlement: record.entitlement,
      periodStart: record.periodStart.toISOString(),
      periodEnd: record.periodEnd.toISOString(),
      count: record.count,
      limit: record.limit,
      revenuecatUserId: record.revenuecatUserId,
    }));

    // Find current period usage
    const now = new Date();
    const currentPeriodRecord = usageRecords.find((record) => {
      const periodStart = new Date(record.periodStart);
      const periodEnd = new Date(record.periodEnd);
      return now >= periodStart && now <= periodEnd;
    });

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

    const currentPeriod: CurrentPeriodUsage = {
      used,
      limit,
      remaining,
      periodStart: periodStart.toISOString(),
      periodEnd: periodEnd.toISOString(),
      isLimitReached,
    };

    const response: UsageResponse = {
      usage,
      totalUsage,
      currentPeriod,
      subscriptionTier,
      planInfo: {
        displayName: planConfig.displayName,
        color: planConfig.color,
        features: planConfig.features,
      },
    };

    console.log("🌐 server", "returning usage data:", {
      recordCount: usage.length,
      totalUsage,
      currentPeriod: {
        used: currentPeriod.used,
        limit: currentPeriod.limit,
        tier: subscriptionTier,
      },
    });

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
