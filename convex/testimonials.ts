import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Public: anyone can read testimonials (displayed on public site)
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("testimonials").collect();
  },
});

// Protected: only authenticated admins can create or delete testimonials
export const create = mutation({
  args: { name: v.string(), role: v.string(), location: v.string(), quote: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: must be logged in to add testimonials.");
    }
    return await ctx.db.insert("testimonials", args);
  },
});

export const remove = mutation({
  args: { id: v.id("testimonials") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: must be logged in to delete testimonials.");
    }
    await ctx.db.delete(args.id);
  },
});
