import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  usage: defineTable({
    userId: v.string(),
    entitlement: v.string(),
    periodStart: v.float64(),
    periodEnd: v.float64(),
    count: v.number(),
    limit: v.number(),
    revenuecatUserId: v.string(),
  })
    .index("by_userId", ["userId"])
    .index("by_revenuecatUserId", ["revenuecatUserId"])
    .index("by_userId_entitlement", ["userId", "entitlement"])
    .index("by_revenuecatUserId_entitlement", ["revenuecatUserId", "entitlement"])
    .index("by_userId_periodStart", ["userId", "periodStart"]),
});
