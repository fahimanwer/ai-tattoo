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
    .index("by_revenuecatUserId", ["revenuecatUserId"])
    .index("by_userId_and_entitlement", ["userId", "entitlement"])
    .index("by_revenuecatUserId_and_entitlement", [
      "revenuecatUserId",
      "entitlement",
    ])
    .index("by_userId_and_entitlement_and_periodEnd", [
      "userId",
      "entitlement",
      "periodEnd",
    ])
    .index("by_revenuecatUserId_and_entitlement_and_periodEnd", [
      "revenuecatUserId",
      "entitlement",
      "periodEnd",
    ])
    .index("by_userId_and_entitlement_and_periodStart", [
      "userId",
      "entitlement",
      "periodStart",
    ])
    .index("by_revenuecatUserId_and_entitlement_and_periodStart", [
      "revenuecatUserId",
      "entitlement",
      "periodStart",
    ]),

  extractedTattoos: defineTable({
    storageId: v.id("_storage"),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),

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
    .index("by_userId_and_createdAt", ["userId", "createdAt"]),
});
