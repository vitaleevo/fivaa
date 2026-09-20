import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import {
  requireAdmin,
  sanitizeText,
  validateRequiredLength,
  validateOptionalLength,
} from "./security";

export const SPEAKER_CATEGORIES = [
  "Orador",
  "Palestrante",
  "Artista",
  "Moderador",
  "Convidado",
  "Outro",
] as const;

function normalizeCategory(value: string | undefined) {
  const cleaned = sanitizeText(value ?? "");
  if (!cleaned) return "";
  if (!(SPEAKER_CATEGORIES as readonly string[]).includes(cleaned)) {
    throw new Error("Categoria inválida.");
  }
  return cleaned;
}

function normalizeBio(value: string | undefined) {
  const cleaned = sanitizeText(value ?? "");
  validateOptionalLength("Biografia", cleaned, 500);
  return cleaned;
}

// Public: anyone can read speakers (displayed on public site)
export const get = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("speakers").collect();
    return await Promise.all(
      rows.map(async (s) => ({
        ...s,
        resolvedPhotoUrl: s.photoStorageId
          ? await ctx.storage.getUrl(s.photoStorageId)
          : null,
      })),
    );
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

// Protected: only authenticated admins can create or delete speakers
export const create = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    country: v.string(),
    color: v.string(),
    bio: v.optional(v.string()),
    category: v.optional(v.string()),
    photoStorageId: v.optional(v.id("_storage")),
    photoUrl: v.optional(v.string()),
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

    return await ctx.db.insert("speakers", {
      name,
      role,
      country,
      color,
      bio: normalizeBio(args.bio),
      category: normalizeCategory(args.category) || "Orador",
      photoStorageId: args.photoStorageId,
      photoUrl: args.photoUrl ? sanitizeText(args.photoUrl) : undefined,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("speakers") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const existing = await ctx.db.get(args.id);
    if (existing?.photoStorageId) {
      try {
        await ctx.storage.delete(existing.photoStorageId);
      } catch {
        // best-effort: não bloquear remoção se ficheiro já sumiu
      }
    }
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
    bio: v.optional(v.string()),
    category: v.optional(v.string()),
    photoStorageId: v.optional(v.id("_storage")),
    photoUrl: v.optional(v.string()),
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

    return await ctx.db.patch(args.id, {
      name,
      role,
      country,
      color,
      bio: normalizeBio(args.bio),
      category: normalizeCategory(args.category) || "Orador",
      photoStorageId: args.photoStorageId,
      photoUrl: args.photoUrl ? sanitizeText(args.photoUrl) : undefined,
    });
  },
});
