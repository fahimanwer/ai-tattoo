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

interface UsageResponse {
  usage: UsageRecord[];
  totalUsage: number;
}

export const POST = withAuth(async (request: Request, session: any) => {
  console.log("🌐 server", "=== USAGE API CALLED ===");
  console.log("🌐 server", "fetching usage for user:", session.user.email);
  console.log("🌐 server", "user id:", session.user.id);

  try {
    const userId = session.user.id;

    console.log("🌐 server", "userId:", userId);

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

    console.log("🌐 server", "raw usage records:", usageRecords);

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

    const response: UsageResponse = {
      usage,
      totalUsage,
    };

    console.log("🌐 server", "returning usage data:", {
      recordCount: usage.length,
      totalUsage,
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
