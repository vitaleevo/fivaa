import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Public: anyone can create a registration (form submission)
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    country: v.string(),
    org: v.string(),
    ticketId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("registrations", { ...args, status: "pending" });
  },
});

// Protected: only authenticated users can read or delete registrations
export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: must be logged in to view registrations.");
    }
    return await ctx.db.query("registrations").collect();
  },
});

export const remove = mutation({
  args: { id: v.id("registrations") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: must be logged in to delete registrations.");
    }
    await ctx.db.delete(args.id);
  },
});
