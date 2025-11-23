import { PrismaClient } from "@/prisma/generated/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

/**
 * Get the current active entitlement for a user
 * Returns the highest tier entitlement that is currently active
 */
export async function getCurrentUserEntitlement(
  userId: string
): Promise<string> {
  const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // Get all active usage records for the user
    const now = new Date();
    console.log(
      "🔍 entitlement-utils",
      "checking entitlement for user:",
      userId
    );
    console.log("🔍 entitlement-utils", "current time:", now.toISOString());

    // First, try to find paid tier records (exclude free)
    const paidUsage = await prisma.usage.findFirst({
      where: {
        userId,
        periodStart: { lte: now },
        periodEnd: { gte: now },
        entitlement: { not: "free" },
      },
      orderBy: { periodStart: "desc" },
    });

    // If paid tier exists, use it
    if (paidUsage) {
      console.log(
        "🔍 entitlement-utils",
        "active paid tier found:",
        paidUsage.entitlement
      );
      console.log("🔍 entitlement-utils", "paid usage details:", {
        entitlement: paidUsage.entitlement,
        periodStart: paidUsage.periodStart.toISOString(),
        periodEnd: paidUsage.periodEnd.toISOString(),
        count: paidUsage.count,
        limit: paidUsage.limit,
      });

      console.log(
        "✅ entitlement-utils",
        "active entitlement found:",
        paidUsage.entitlement
      );

      // Map to standard entitlement names
      switch (paidUsage.entitlement.toLowerCase()) {
        case "pro":
          return "Pro";
        case "plus":
          return "Plus";
        case "starter":
          return "Starter";
        default:
          return paidUsage.entitlement;
      }
    }

    // No paid tier, check for free tier
    const freeUsage = await prisma.usage.findFirst({
      where: {
        userId,
        entitlement: "free",
      },
    });

    if (freeUsage) {
      console.log(
        "🔍 entitlement-utils",
        "free tier record found (no active paid tier)"
      );
      console.log("🔍 entitlement-utils", "free usage details:", {
        entitlement: freeUsage.entitlement,
        periodStart: freeUsage.periodStart.toISOString(),
        periodEnd: freeUsage.periodEnd.toISOString(),
        count: freeUsage.count,
        limit: freeUsage.limit,
      });
      console.log("✅ entitlement-utils", "active entitlement found:", "free");
      return "free";
    }

    // No records found at all
    console.log(
      "⚠️ entitlement-utils",
      "no usage records found, returning free tier"
    );

    // Log most recent for debugging
    const mostRecent = await prisma.usage.findFirst({
      where: { userId },
      orderBy: { periodStart: "desc" },
    });

    if (mostRecent) {
      const minutesSinceExpired = Math.floor(
        (now.getTime() - mostRecent.periodEnd.getTime()) / (1000 * 60)
      );
      console.log("🔍 entitlement-utils", "most recent record (expired):", {
        entitlement: mostRecent.entitlement,
        periodEnd: mostRecent.periodEnd.toISOString(),
        expiredMinutesAgo: minutesSinceExpired,
      });
    }

    // Always return free when no active period
    return "free";
  } catch (error) {
    console.error("Error getting user entitlement:", error);
    // Return free as safe fallback
    return "free";
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Check if user has reached their generation limit
 */
export async function hasReachedGenerationLimit(
  userId: string,
  entitlement: string
): Promise<boolean> {
  const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const now = new Date();
    const currentUsage = await prisma.usage.findFirst({
      where: {
        userId,
        entitlement,
        periodStart: { lte: now },
        periodEnd: { gte: now },
      },
    });

    if (!currentUsage) {
      // No usage record found, assume limit reached for safety
      return true;
    }

    // Check if limit is reached (count >= limit means no more generations allowed)
    return currentUsage.count >= currentUsage.limit;
  } catch (error) {
    console.error("Error checking generation limit:", error);
    // Return true for safety (assume limit reached)
    return true;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Get current usage stats for a user
 */
export async function getCurrentUsageStats(
  userId: string,
  entitlement: string
): Promise<{
  count: number;
  limit: number;
  remaining: number;
  isLimitReached: boolean;
} | null> {
  const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const now = new Date();
    const currentUsage = await prisma.usage.findFirst({
      where: {
        userId,
        entitlement,
        periodStart: { lte: now },
        periodEnd: { gte: now },
      },
    });

    if (!currentUsage) {
      return null;
    }

    const remaining = Math.max(0, currentUsage.limit - currentUsage.count);
    const isLimitReached = currentUsage.count >= currentUsage.limit;

    return {
      count: currentUsage.count,
      limit: currentUsage.limit,
      remaining,
      isLimitReached,
    };
  } catch (error) {
    console.error("Error getting usage stats:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
