import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import {
  requireAdmin,
  sanitizeText,
  validateRequiredLength,
} from "./security";

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
    await requireAdmin(ctx);

    const name = sanitizeText(args.name);
    const price = sanitizeText(args.price);
    const desc = sanitizeText(args.desc);
    const features = args.features.map((feature) => sanitizeText(feature));

    validateRequiredLength("Nome do bilhete", name, 2, 60);
    validateRequiredLength("Preço", price, 1, 40);
    validateRequiredLength("Descrição", desc, 10, 240);

    for (const feature of features) {
      validateRequiredLength("Característica", feature, 2, 120);
    }

    return await ctx.db.insert("tickets", { name, price, desc, features });
  },
});

export const remove = mutation({
  args: { id: v.id("tickets") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id("tickets"),
    name: v.string(),
    price: v.string(),
    desc: v.string(),
    features: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const name = sanitizeText(args.name);
    const price = sanitizeText(args.price);
    const desc = sanitizeText(args.desc);
    const features = args.features.map((feature) => sanitizeText(feature));

    validateRequiredLength("Nome do bilhete", name, 2, 60);
    validateRequiredLength("Preço", price, 1, 40);
    validateRequiredLength("Descrição", desc, 10, 240);

    for (const feature of features) {
      validateRequiredLength("Característica", feature, 2, 120);
    }

    return await ctx.db.patch(args.id, { name, price, desc, features });
  },
});
