import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    Password({
      profile(params) {
        if (params.email !== "info@fivaa.com") {
          throw new Error("Apenas o administrador principal pode aceder.");
        }
        return { email: params.email as string };
      },
    }),
  ],
});
