import type { MutationCtx, QueryCtx } from "./_generated/server";

const DEFAULT_ADMIN_EMAILS = ["info@fivaa.com"];
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^\+?[0-9\s\-()]{9,20}$/;
const RATE_LIMIT_WINDOW_MS = 1000 * 60 * 10;
const RATE_LIMIT_BLOCK_MS = 1000 * 60 * 30;

type AuthContext = Pick<MutationCtx, "auth"> | Pick<QueryCtx, "auth">;
type RateLimitContext = Pick<MutationCtx, "db">;

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function getAllowedAdminEmails() {
  const rawValue =
    process.env.FIVAA_ADMIN_EMAILS ??
    process.env.ADMIN_EMAILS ??
    process.env.FIVAA_ADMIN_EMAIL ??
    DEFAULT_ADMIN_EMAILS.join(",");

  const emails = rawValue
    .split(",")
    .map((email) => normalizeEmail(email))
    .filter(Boolean);

  return new Set(emails.length > 0 ? emails : DEFAULT_ADMIN_EMAILS);
}

export async function requireAdmin(ctx: AuthContext) {
  const identity = await ctx.auth.getUserIdentity();
  const email =
    identity && typeof identity.email === "string"
      ? normalizeEmail(identity.email)
      : "";

  if (!email || !getAllowedAdminEmails().has(email)) {
    throw new Error("Unauthorized: admin access required.");
  }

  return { identity, email };
}

export function sanitizeText(value: string) {
  return value.trim().replace(/[<>]/g, "");
}

export function sanitizeSecret(value: string) {
  return value.trim();
}

export function validateEmail(email: string) {
  if (!EMAIL_REGEX.test(email)) {
    throw new Error("E-mail inválido.");
  }
}

export function validatePhone(phone: string) {
  if (!PHONE_REGEX.test(phone)) {
    throw new Error("Telefone inválido.");
  }
}

export function validateRequiredLength(
  label: string,
  value: string,
  minimum: number,
  maximum: number,
) {
  if (value.length < minimum) {
    throw new Error(`${label} deve conter pelo menos ${minimum} caracteres.`);
  }

  if (value.length > maximum) {
    throw new Error(`${label} não deve exceder ${maximum} caracteres.`);
  }
}

export function validateOptionalLength(
  label: string,
  value: string,
  maximum: number,
) {
  if (value.length > maximum) {
    throw new Error(`${label} não deve exceder ${maximum} caracteres.`);
  }
}

export function ensureHumanSubmission({
  honeypot,
  submittedAt,
  minElapsedMs = 1500,
  maxAgeMs = 1000 * 60 * 60 * 2,
}: {
  honeypot?: string;
  submittedAt: number;
  minElapsedMs?: number;
  maxAgeMs?: number;
}) {
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    throw new Error("Submissão rejeitada.");
  }

  const now = Date.now();

  if (!Number.isFinite(submittedAt)) {
    throw new Error("Submissão inválida.");
  }

  const elapsed = now - submittedAt;

  if (elapsed < minElapsedMs || elapsed > maxAgeMs) {
    throw new Error("Submissão inválida.");
  }
}

export function getFormSubmissionSecret() {
  return (
    process.env.FIVAA_FORM_SUBMISSION_SECRET ??
    process.env.FORM_SUBMISSION_SECRET ??
    ""
  ).trim();
}

export function requireTrustedSubmission(secret: string) {
  const expectedSecret = getFormSubmissionSecret();

  if (!expectedSecret) {
    throw new Error("Submissões temporariamente indisponíveis.");
  }

  if (sanitizeSecret(secret) !== expectedSecret) {
    throw new Error("Unauthorized: trusted server submission required.");
  }
}

export function normalizeClientIp(ip: string) {
  return ip
    .split(",")[0]
    .trim()
    .toLowerCase()
    .replace(/[^a-f0-9:.]/g, "")
    .slice(0, 64);
}

async function touchRateLimitRecord(
  ctx: RateLimitContext,
  key: string,
  maxAttempts: number,
  windowMs: number,
  blockMs: number,
) {
  const now = Date.now();
  const existing = await ctx.db
    .query("submissionRateLimits")
    .withIndex("by_key", (q) => q.eq("key", key))
    .unique();

  if (existing?.blockedUntil && existing.blockedUntil > now) {
    throw new Error("Muitas tentativas. Tente novamente mais tarde.");
  }

  if (!existing || now - existing.windowStart > windowMs) {
    if (existing) {
      await ctx.db.patch(existing._id, {
        count: 1,
        windowStart: now,
        blockedUntil: undefined,
        updatedAt: now,
      });
      return;
    }

    await ctx.db.insert("submissionRateLimits", {
      key,
      count: 1,
      windowStart: now,
      updatedAt: now,
    });
    return;
  }

  const nextCount = existing.count + 1;
  await ctx.db.patch(existing._id, {
    count: nextCount,
    blockedUntil: nextCount > maxAttempts ? now + blockMs : undefined,
    updatedAt: now,
  });

  if (nextCount > maxAttempts) {
    throw new Error("Muitas tentativas. Tente novamente mais tarde.");
  }
}

export async function enforceSubmissionRateLimit(
  ctx: RateLimitContext,
  {
    scope,
    clientIp,
    identity,
    maxAttempts = 5,
    windowMs = RATE_LIMIT_WINDOW_MS,
    blockMs = RATE_LIMIT_BLOCK_MS,
  }: {
    scope: "contact" | "registration";
    clientIp: string;
    identity?: string;
    maxAttempts?: number;
    windowMs?: number;
    blockMs?: number;
  },
) {
  const normalizedIp = normalizeClientIp(clientIp);

  if (!normalizedIp) {
    throw new Error("Origem da submissão inválida.");
  }

  await touchRateLimitRecord(
    ctx,
    `${scope}:ip:${normalizedIp}`,
    maxAttempts,
    windowMs,
    blockMs,
  );

  if (identity) {
    await touchRateLimitRecord(
      ctx,
      `${scope}:identity:${normalizeEmail(identity)}`,
      maxAttempts,
      windowMs,
      blockMs,
    );
  }
}
