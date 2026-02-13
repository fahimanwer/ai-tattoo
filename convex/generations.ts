import { query, action, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

/**
 * Get the count of cloud-stored generations for the authenticated user.
 */
export const getCloudCount = query({
  args: {},
  returns: v.number(),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return 0;
    }

    const generations = await ctx.db
      .query("generations")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .collect();

    return generations.length;
  },
});

/**
 * Internal query to get all generations with storageIds for a user.
 * Used by the getRestoreData action.
 */
export const listStorageIdsByUser = internalQuery({
  args: { userId: v.string() },
  returns: v.array(
    v.object({
      storageId: v.id("_storage"),
      prompt: v.string(),
      generationType: v.union(
        v.literal("text_to_image"),
        v.literal("text_and_image_to_image")
      ),
      createdAt: v.number(),
    })
  ),
  handler: async (ctx, args) => {
    const generations = await ctx.db
      .query("generations")
      .withIndex("by_userId_createdAt", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    return generations.map((gen) => ({
      storageId: gen.storageId,
      prompt: gen.prompt,
      generationType: gen.generationType,
      createdAt: gen.createdAt,
    }));
  },
});

/**
 * Get all generation image URLs for the authenticated user (for restore).
 * Returns downloadable URLs for each stored generation.
 */
export const getRestoreData = action({
  args: {},
  returns: v.array(
    v.object({
      prompt: v.string(),
      generationType: v.union(
        v.literal("text_to_image"),
        v.literal("text_and_image_to_image")
      ),
      createdAt: v.number(),
      imageUrl: v.union(v.string(), v.null()),
    })
  ),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    const generations = await ctx.runQuery(
      internal.generations.listStorageIdsByUser,
      { userId: identity.subject }
    );

    const results = await Promise.all(
      generations.map(async (gen) => {
        const url = await ctx.storage.getUrl(gen.storageId);
        return {
          prompt: gen.prompt,
          generationType: gen.generationType,
          createdAt: gen.createdAt,
          imageUrl: url,
        };
      })
    );

    return results;
  },
});
