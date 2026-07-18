import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Public: anyone can read speakers (displayed on public site)
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("speakers").collect();
  },
});

// Protected: only authenticated admins can create or delete speakers
export const create = mutation({
  args: { name: v.string(), role: v.string(), country: v.string(), color: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: must be logged in to add speakers.");
    }
    return await ctx.db.insert("speakers", args);
  },
});

export const remove = mutation({
  args: { id: v.id("speakers") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: must be logged in to delete speakers.");
    }
    await ctx.db.delete(args.id);
  },
});
