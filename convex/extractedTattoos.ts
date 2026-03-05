import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Generate an upload URL for the client to POST a file to.
 */
export const generateUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

/**
 * Store a user-extracted transparent tattoo PNG for community reuse.
 * Called after the client uploads the file and gets a storageId.
 */
export const store = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    await ctx.db.insert("extractedTattoos", {
      storageId: args.storageId,
      createdAt: Date.now(),
    });

    return null;
  },
});

/**
 * List community-extracted tattoos (newest first) with download URLs.
 * Returns up to 50 most recent tattoos for the gallery.
 */
export const list = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("extractedTattoos"),
      url: v.union(v.string(), v.null()),
      createdAt: v.number(),
    })
  ),
  handler: async (ctx) => {
    const tattoos = await ctx.db
      .query("extractedTattoos")
      .withIndex("by_createdAt")
      .order("desc")
      .take(50);

    const results = await Promise.all(
      tattoos.map(async (t) => ({
        _id: t._id,
        url: await ctx.storage.getUrl(t.storageId),
        createdAt: t.createdAt,
      }))
    );

    return results;
  },
});
