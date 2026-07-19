import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  speakers: defineTable({
    name: v.string(),
    role: v.string(),
    country: v.string(),
    color: v.string(),
  }),
  schedule: defineTable({
    day: v.string(),
    time: v.string(),
    title: v.string(),
    type: v.string(),
  }),
  testimonials: defineTable({
    name: v.string(),
    role: v.string(),
    location: v.string(),
    quote: v.string(),
  }),
  tickets: defineTable({
    name: v.string(),
    price: v.string(),
    desc: v.string(),
    features: v.array(v.string()),
  }),
  registrations: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    country: v.string(),
    org: v.string(),
    ticketId: v.string(),
    status: v.string(),
  }),
  messages: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    read: v.boolean(),
  }),
  submissionRateLimits: defineTable({
    key: v.string(),
    count: v.number(),
    windowStart: v.number(),
    blockedUntil: v.optional(v.number()),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),
});
