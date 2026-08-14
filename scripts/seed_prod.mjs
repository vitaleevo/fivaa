import { ConvexHttpClient } from "convex/browser";

const siteUrl = "https://bright-squirrel-751.convex.cloud";
const email = "info@fivaa.com";
const password = "S1st3mas123!!!";

const convex = new ConvexHttpClient(siteUrl);

const { api } = await import("../convex/_generated/api.js");

const tokens = await convex.action(api.auth.signIn, {
  provider: "password",
  params: { flow: "signIn", email, password },
});

if (!tokens) {
  console.error("AUTH ERROR: no tokens returned");
  process.exit(1);
}

const token = tokens?.tokens?.token ?? tokens?.value;
convex.setAuth(async () => token);

const result = await convex.mutation(api.seed.run);
console.log("SEED OK", JSON.stringify(result));
