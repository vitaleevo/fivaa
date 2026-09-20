import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import {
  requireAdmin,
  sanitizeText,
  validateRequiredLength,
} from "./security";

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
    await requireAdmin(ctx);

    const name = sanitizeText(args.name);
    const role = sanitizeText(args.role);
    const location = sanitizeText(args.location);
    const quote = sanitizeText(args.quote);

    validateRequiredLength("Nome", name, 2, 80);
    validateRequiredLength("Função", role, 2, 120);
    validateRequiredLength("Localização", location, 2, 80);
    validateRequiredLength("Testemunho", quote, 10, 600);

    return await ctx.db.insert("testimonials", { name, role, location, quote });
  },
});

export const remove = mutation({
  args: { id: v.id("testimonials") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id("testimonials"),
    name: v.string(),
    role: v.string(),
    location: v.string(),
    quote: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const name = sanitizeText(args.name);
    const role = sanitizeText(args.role);
    const location = sanitizeText(args.location);
    const quote = sanitizeText(args.quote);

    validateRequiredLength("Nome", name, 2, 80);
    validateRequiredLength("Função", role, 2, 120);
    validateRequiredLength("Localização", location, 2, 80);
    validateRequiredLength("Testemunho", quote, 10, 600);

    return await ctx.db.patch(args.id, { name, role, location, quote });
  },
});
