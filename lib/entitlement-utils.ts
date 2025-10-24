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

    const activeUsage = await prisma.usage.findMany({
      where: {
        userId,
        periodStart: { lte: now },
        periodEnd: { gte: now },
      },
      orderBy: { entitlement: "desc" },
    });

    console.log(
      "🔍 entitlement-utils",
      "active usage records found:",
      activeUsage.length
    );
    if (activeUsage.length > 0) {
      console.log(
        "🔍 entitlement-utils",
        "active usage records:",
        activeUsage.map((u) => ({
          entitlement: u.entitlement,
          periodStart: u.periodStart.toISOString(),
          periodEnd: u.periodEnd.toISOString(),
          count: u.count,
          limit: u.limit,
        }))
      );
    }

    if (activeUsage.length === 0) {
      // No active entitlements found, check for most recent record as fallback
      console.log(
        "🔍 entitlement-utils",
        "no active records, checking most recent"
      );
      const mostRecent = await prisma.usage.findFirst({
        where: { userId },
        orderBy: { periodStart: "desc" },
      });

      if (mostRecent) {
        console.log("🔍 entitlement-utils", "most recent record:", {
          entitlement: mostRecent.entitlement,
          periodStart: mostRecent.periodStart.toISOString(),
          periodEnd: mostRecent.periodEnd.toISOString(),
          count: mostRecent.count,
          limit: mostRecent.limit,
        });
        console.log(
          "⚠️ entitlement-utils",
          "using most recent entitlement as fallback:",
          mostRecent.entitlement
        );

        // Use the most recent entitlement
        const entitlement = mostRecent.entitlement;
        switch (entitlement.toLowerCase()) {
          case "pro":
            return "Pro";
          case "plus":
            return "Plus";
          case "starter":
            return "Starter";
          case "free":
          default:
            return "free";
        }
      }

      console.log(
        "⚠️ entitlement-utils",
        "no records found at all, returning free"
      );
      return "free";
    }

    // Return the highest priority entitlement
    const entitlement = activeUsage[0].entitlement;
    console.log(
      "✅ entitlement-utils",
      "active entitlement found:",
      entitlement
    );

    // Map to standard entitlement names
    switch (entitlement.toLowerCase()) {
      case "pro":
        return "Pro";
      case "plus":
        return "Plus";
      case "starter":
        return "Starter";
      case "free":
      default:
        return "free";
    }
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
