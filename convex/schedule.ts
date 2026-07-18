import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Public: anyone can read the schedule (displayed on public site)
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("schedule").collect();
  },
});

// Protected: only authenticated admins can create or delete schedule items
export const create = mutation({
  args: {
    day: v.string(),
    time: v.string(),
    title: v.string(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: must be logged in to add schedule items.");
    }
    return await ctx.db.insert("schedule", args);
  },
});

export const remove = mutation({
  args: { id: v.id("schedule") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: must be logged in to delete schedule items.");
    }
    await ctx.db.delete(args.id);
  },
});
