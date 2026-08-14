import { ConvexHttpClient } from "convex/browser";
const convex = new ConvexHttpClient("https://bright-squirrel-751.convex.cloud");
const { api } = await import("../convex/_generated/api.js");
const tokens = await convex.action(api.auth.signIn, {
  provider: "password",
  params: { flow: "signIn", email: "info@fivaa.com", password: "S1st3mas123!!!" },
});
const jwt = tokens?.tokens?.token ?? tokens?.value;
console.log("JWT first 40 chars:", jwt.slice(0, 40));
console.log("JWT dots:", (jwt.match(/\./g) || []).length);

// Try raw REST with the JWT
const resp = await fetch("https://bright-squirrel-751.convex.cloud/api/mutation", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Authorization": `Bearer ${jwt}` },
  body: JSON.stringify({ path: "seed:run", args: {}, format: "json" }),
});
const text = await resp.text();
console.log("REST status:", resp.status);
console.log("REST body:", text.slice(0, 300));
