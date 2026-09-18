import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import {
  enforceSubmissionRateLimit,
  ensureHumanSubmission,
  requireTrustedSubmission,
  requireAdmin,
  sanitizeText,
  validateEmail,
  validateOptionalLength,
  validatePhone,
  validateRequiredLength,
} from "./security";
import { sendNewRegistrationEmail } from "./emails";

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

// Public: browser uploads go straight to Storage (unguessable URLs).
// Abuse is bounded by the 5MB client check and the rate limit on `create`.
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Public: anyone can create a registration (form submission)
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    country: v.string(),
    org: v.string(),
    ticketId: v.string(),
    paymentStorageId: v.id("_storage"),
    photoStorageId: v.id("_storage"),
    submittedAt: v.number(),
    honeypot: v.optional(v.string()),
    clientIp: v.string(),
    submissionSecret: v.string(),
  },
  handler: async (ctx, args) => {
    requireTrustedSubmission(args.submissionSecret);
    ensureHumanSubmission({
      honeypot: args.honeypot,
      submittedAt: args.submittedAt,
    });

    const name = sanitizeText(args.name);
    const email = sanitizeText(args.email);
    const phone = sanitizeText(args.phone);
    const country = sanitizeText(args.country);
    const org = sanitizeText(args.org);
    const ticketId = sanitizeText(args.ticketId);

    validateRequiredLength("Nome", name, 3, 80);
    validateEmail(email);
    validatePhone(phone);
    validateRequiredLength("País", country, 2, 50);
    validateOptionalLength("Organização / Cargo", org, 100);

    const availableTickets = await ctx.db.query("tickets").collect();
    const ticket = availableTickets.find((t) => t._id === ticketId);

    if (!ticket) {
      throw new Error("Bilhete inválido.");
    }

    const paymentMeta = await ctx.storage.getMetadata(args.paymentStorageId);
    if (!paymentMeta) {
      throw new Error("Comprovativo inválido.");
    }
    if (paymentMeta.size > MAX_ATTACHMENT_BYTES) {
      throw new Error("Comprovativo excede 5MB.");
    }
    const photoMeta = await ctx.storage.getMetadata(args.photoStorageId);
    if (!photoMeta) {
      throw new Error("Foto inválida.");
    }
    if (photoMeta.size > MAX_ATTACHMENT_BYTES) {
      throw new Error("Foto excede 5MB.");
    }

    await enforceSubmissionRateLimit(ctx, {
      scope: "registration",
      clientIp: args.clientIp,
      identity: email,
      maxAttempts: 3,
      windowMs: 1000 * 60 * 30,
      blockMs: 1000 * 60 * 60,
    });

    const id = await ctx.db.insert("registrations", {
      name,
      email,
      phone,
      country,
      org,
      ticketId,
      paymentStorageId: args.paymentStorageId,
      photoStorageId: args.photoStorageId,
      status: "pending",
    });

    const paymentUrl = await ctx.storage.getUrl(args.paymentStorageId);
    const photoUrl = await ctx.storage.getUrl(args.photoStorageId);
    if (!paymentUrl || !photoUrl) {
      throw new Error("Falha a resolver anexos.");
    }

    await sendNewRegistrationEmail(ctx, {
      name,
      email,
      phone,
      country,
      org,
      ticketName: ticket.name,
      paymentUrl,
      photoUrl,
    });

    return id;
  },
});

// Protected: only authenticated admins can read registrations
export const get = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const rows = await ctx.db.query("registrations").collect();
    return await Promise.all(
      rows.map(async (r) => ({
        ...r,
        resolvedPaymentUrl: r.paymentStorageId
          ? await ctx.storage.getUrl(r.paymentStorageId)
          : null,
        resolvedPhotoUrl: r.photoStorageId
          ? await ctx.storage.getUrl(r.photoStorageId)
          : null,
      })),
    );
  },
});

export const remove = mutation({
  args: { id: v.id("registrations") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const existing = await ctx.db.get(args.id);
    for (const fileId of [existing?.paymentStorageId, existing?.photoStorageId]) {
      if (!fileId) continue;
      try {
        await ctx.storage.delete(fileId);
      } catch {
        // best-effort: não bloquear remoção se ficheiro já sumiu
      }
    }
    await ctx.db.delete(args.id);
  },
});

export const updateStatus = mutation({
  args: { id: v.id("registrations"), status: v.union(v.literal("pending"), v.literal("confirmed"), v.literal("cancelled")) },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.patch(args.id, { status: args.status });
  },
});
