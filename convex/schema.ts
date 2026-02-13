import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  usage: defineTable({
    userId: v.string(),
    entitlement: v.string(),
    periodStart: v.number(),
    periodEnd: v.number(),
    count: v.number(),
    limit: v.number(),
    revenuecatUserId: v.string(),
  })
    .index("by_userId", ["userId"])
    .index("by_revenuecatUserId", ["revenuecatUserId"])
    .index("by_userId_entitlement", ["userId", "entitlement"])
    .index("by_revenuecatUserId_entitlement", [
      "revenuecatUserId",
      "entitlement",
    ])
    .index("by_userId_periodStart", ["userId", "periodStart"])
    .index("by_userId_periodEnd", ["userId", "periodEnd"])
    .index("by_revenuecatUserId_periodEnd", [
      "revenuecatUserId",
      "periodEnd",
    ]),

  generations: defineTable({
    userId: v.string(),
    storageId: v.id("_storage"),
    prompt: v.string(),
    generationType: v.union(
      v.literal("text_to_image"),
      v.literal("text_and_image_to_image")
    ),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_createdAt", ["userId", "createdAt"]),
});
