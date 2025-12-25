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
    const now = new Date();

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

    if (paidUsage) {
      switch (paidUsage.entitlement.toLowerCase()) {
        // New premium tier (v2 pricing)
        case "premium":
          return "Premium";
        // Legacy tiers (keep for existing subscribers)
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
        `✅ entitlement: free (${freeUsage.count}/${
          freeUsage.limit
        } used) for ${userId.slice(0, 8)}…`
      );
      return "free";
    }

    console.log(
      `⚠️ entitlement: no active record for ${userId.slice(
        0,
        8
      )}…, defaulting to free`
    );
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
