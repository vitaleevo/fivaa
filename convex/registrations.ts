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

// Public: anyone can create a registration (form submission)
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    country: v.string(),
    org: v.string(),
    ticketId: v.string(),
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
    const hasValidTicket = availableTickets.some((ticket) => ticket._id === ticketId);

    if (!hasValidTicket) {
      throw new Error("Bilhete inválido.");
    }

    await enforceSubmissionRateLimit(ctx, {
      scope: "registration",
      clientIp: args.clientIp,
      identity: email,
      maxAttempts: 3,
      windowMs: 1000 * 60 * 30,
      blockMs: 1000 * 60 * 60,
    });

    return await ctx.db.insert("registrations", {
      name,
      email,
      phone,
      country,
      org,
      ticketId,
      status: "pending",
    });
  },
});

// Protected: only authenticated users can read or delete registrations
export const get = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db.query("registrations").collect();
  },
});

export const remove = mutation({
  args: { id: v.id("registrations") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
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
