import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import {
  enforceSubmissionRateLimit,
  ensureHumanSubmission,
  requireTrustedSubmission,
  requireAdmin,
  sanitizeText,
  validateEmail,
  validateRequiredLength,
} from "./security";

// Public: anyone can send a message (contact form)
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
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
    const message = sanitizeText(args.message);

    validateRequiredLength("Nome", name, 3, 80);
    validateEmail(email);
    validateRequiredLength("Mensagem", message, 10, 1200);
    await enforceSubmissionRateLimit(ctx, {
      scope: "contact",
      clientIp: args.clientIp,
      identity: email,
      maxAttempts: 5,
    });

    return await ctx.db.insert("messages", {
      name,
      email,
      message,
      read: false,
    });
  },
});

// Protected: only authenticated admins can read, delete, or mark messages
export const get = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db.query("messages").collect();
  },
});

export const remove = mutation({
  args: { id: v.id("messages") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
  },
});

export const markRead = mutation({
  args: { id: v.id("messages") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.patch(args.id, { read: true });
  },
});

export const markAllRead = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const messages = await ctx.db.query("messages").collect();
    for (const message of messages) {
      if (!message.read) {
        await ctx.db.patch(message._id, { read: true });
      }
    }
  },
});
