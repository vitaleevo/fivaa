import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Public: anyone can send a message (contact form)
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", { ...args, read: false });
  },
});

// Protected: only authenticated admins can read, delete, or mark messages
export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: must be logged in to view messages.");
    }
    return await ctx.db.query("messages").collect();
  },
});

export const remove = mutation({
  args: { id: v.id("messages") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: must be logged in to delete messages.");
    }
    await ctx.db.delete(args.id);
  },
});

export const markRead = mutation({
  args: { id: v.id("messages") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: must be logged in to update messages.");
    }
    await ctx.db.patch(args.id, { read: true });
  },
});
