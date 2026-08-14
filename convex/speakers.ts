import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import {
  requireAdmin,
  sanitizeText,
  validateRequiredLength,
} from "./security";

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
    await requireAdmin(ctx);

    const name = sanitizeText(args.name);
    const role = sanitizeText(args.role);
    const country = sanitizeText(args.country);
    const color = sanitizeText(args.color);

    validateRequiredLength("Nome", name, 2, 80);
    validateRequiredLength("Função", role, 2, 120);
    validateRequiredLength("País", country, 2, 60);
    validateRequiredLength("Cor", color, 2, 80);

    return await ctx.db.insert("speakers", { name, role, country, color });
  },
});

export const remove = mutation({
  args: { id: v.id("speakers") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id("speakers"),
    name: v.string(),
    role: v.string(),
    country: v.string(),
    color: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const name = sanitizeText(args.name);
    const role = sanitizeText(args.role);
    const country = sanitizeText(args.country);
    const color = sanitizeText(args.color);

    validateRequiredLength("Nome", name, 2, 80);
    validateRequiredLength("Função", role, 2, 120);
    validateRequiredLength("País", country, 2, 60);
    validateRequiredLength("Cor", color, 2, 80);

    return await ctx.db.patch(args.id, { name, role, country, color });
  },
});
