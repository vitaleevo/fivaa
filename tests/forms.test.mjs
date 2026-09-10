import { test } from "node:test";
import assert from "node:assert/strict";
import { readForm, contactFields, registrationFields, publicFormError } from "../src/lib/form-validation.ts";
import { ticketDestination } from "../src/lib/site.ts";

const valid = () => ({ name: "  Ana Silva  ", email: "ANA@example.com", subject: "Bilhetes", message: "Gostaria de informações.", startedAt: Date.now() - 5000, honeypot: "" });
const request = (body, headers = {}) => new Request("https://fivaaforum.com/api/contact", { method: "POST", headers: { "content-type": "application/json", ...headers }, body });

test("contact normalizes valid data and preserves subject", () => {
  const result = contactFields(valid());
  assert.equal(result.name, "Ana Silva");
  assert.equal(result.email, "ana@example.com");
  assert.match(result.message, /^\[Assunto: Bilhetes\]/);
});
test("invalid fields, bots, stale and future submissions are rejected", () => {
  for (const changes of [{ name: [] }, { subject: {} }, { email: "invalid" }, { message: "" }, { message: "x".repeat(1001) }, { honeypot: "bot" }, { startedAt: Date.now() + 10_000 }, { startedAt: Date.now() - 8_000_000 }, { startedAt: "5000" }]) {
    assert.throws(() => contactFields({ ...valid(), ...changes }));
  }
});
test("registration requires a valid phone and ticket", () => {
  const input = { ...valid(), phone: "+244 931238451", country: "Angola", ticketId: "ticket-id" };
  assert.equal(registrationFields(input).org, "");
  assert.throws(() => registrationFields({ ...input, phone: "abcdefghijk" }));
  assert.throws(() => registrationFields({ ...input, ticketId: "" }));
});
test("JSON boundary rejects wrong types and malformed content", async () => {
  for (const value of ["null", "[]", "123", "{"]) await assert.rejects(() => readForm(request(value)), { status: 400 });
  await assert.rejects(() => readForm(request("{}", { "content-type": "text/plain" })), { status: 415 });
  await assert.rejects(() => readForm(request("{}", { origin: "https://unrelated.example" })), { status: 403 });
  await assert.rejects(() => readForm(request(JSON.stringify({ value: "x".repeat(20_000) }))), { status: 413 });
  assert.deepEqual(await readForm(request("{}", { origin: "https://fivaaforum.com" })), {});
});
test("public errors never leak backend stack or secret", () => {
  const result = publicFormError(new Error("secret=abc at convex/messages.ts line 12"));
  assert.equal(result.status, 503);
  assert.doesNotMatch(result.message, /secret=|convex\//);
  assert.equal(publicFormError(new Error("Muitas tentativas")).status, 429);
});
test("ticket destinations reject unsafe URLs and provide a labelled contact fallback", () => {
  for (const url of [undefined, "", "javascript:alert(1)", "http://ticket.ao", "https://user:password@ticket.ao"]) {
    const result = ticketDestination(url, "Acesso Fóruns");
    assert.equal(result.isOnlinePurchase, false);
    assert.match(result.purchaseUrl, /^mailto:geral@fivaaforum.com\?/);
  }
  assert.deepEqual(ticketDestination(" https://ticket.ao/event/example/ ", "Example"), { purchaseUrl: "https://ticket.ao/event/example/", isOnlinePurchase: true });
});
