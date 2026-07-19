import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { getAllowedAdminEmails, normalizeEmail } from "./security";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    Password({
      profile(params) {
        const email = normalizeEmail(params.email as string);

        if (!getAllowedAdminEmails().has(email)) {
          throw new Error("Credenciais inválidas.");
        }

        return { email, role: "admin" };
      },
    }),
  ],
});
