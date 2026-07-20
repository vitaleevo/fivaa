import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { getAllowedAdminEmails, normalizeEmail } from "./security";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params) {
        const email = normalizeEmail(params.email as string);
        const flow = params.flow as string;
        const setupEnabled = process.env.FIVAA_ENABLE_ADMIN_SETUP === "true";

        if (!getAllowedAdminEmails().has(email)) {
          throw new Error("Credenciais inválidas.");
        }

        if (flow === "signUp" && !setupEnabled) {
          throw new Error("Cadastro de administrador indisponível.");
        }

        return { email };
      },
    }),
  ],
});
