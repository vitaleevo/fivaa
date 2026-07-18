import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Public: anyone can read tickets (displayed on inscription page)
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tickets").collect();
  },
});

// Protected: only authenticated admins can create or delete ticket types
export const create = mutation({
  args: {
    name: v.string(),
    price: v.string(),
    desc: v.string(),
    features: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: must be logged in to manage tickets.");
    }
    return await ctx.db.insert("tickets", args);
  },
});

export const remove = mutation({
  args: { id: v.id("tickets") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: must be logged in to delete tickets.");
    }
    await ctx.db.delete(args.id);
  },
});
