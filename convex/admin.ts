import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { getAllowedAdminEmails, normalizeEmail } from "./security";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    const user = userId ? await ctx.db.get(userId) : null;
    const email = user?.email ? normalizeEmail(user.email) : "";

    return {
      email: email || null,
      isAdmin: Boolean(email && getAllowedAdminEmails().has(email)),
    };
  },
});
