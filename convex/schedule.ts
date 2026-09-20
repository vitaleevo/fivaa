import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import {
  requireAdmin,
  sanitizeText,
  validateRequiredLength,
} from "./security";

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
    await requireAdmin(ctx);

    const day = sanitizeText(args.day);
    const time = sanitizeText(args.time);
    const title = sanitizeText(args.title);
    const type = sanitizeText(args.type);

    validateRequiredLength("Dia", day, 3, 40);
    validateRequiredLength("Hora", time, 3, 10);
    validateRequiredLength("Título", title, 3, 140);
    validateRequiredLength("Tipo", type, 2, 40);

    return await ctx.db.insert("schedule", { day, time, title, type });
  },
});

export const remove = mutation({
  args: { id: v.id("schedule") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id("schedule"),
    day: v.string(),
    time: v.string(),
    title: v.string(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const day = sanitizeText(args.day);
    const time = sanitizeText(args.time);
    const title = sanitizeText(args.title);
    const type = sanitizeText(args.type);

    validateRequiredLength("Dia", day, 3, 40);
    validateRequiredLength("Hora", time, 3, 10);
    validateRequiredLength("Título", title, 3, 140);
    validateRequiredLength("Tipo", type, 2, 40);

    return await ctx.db.patch(args.id, { day, time, title, type });
  },
});
