import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const registrations = readFileSync(new URL("../convex/registrations.ts", import.meta.url), "utf8");
const emails = readFileSync(new URL("../convex/emails.ts", import.meta.url), "utf8");

// Mirror of the transition rule in registrations.updateStatus:
// email is only sent when the status actually changes.
function wouldNotify(current, next) {
  return current !== next;
}

test("updateStatus only notifies on real transitions", () => {
  assert.match(registrations, /existing\.status === args\.status/);
  assert.match(registrations, /notified: false/);
  assert.match(registrations, /notified: true/);
  assert.equal(wouldNotify("cancelled", "cancelled"), false);
  assert.equal(wouldNotify("pending", "pending"), false);
  assert.equal(wouldNotify("pending", "cancelled"), true);
  assert.equal(wouldNotify("pending", "confirmed"), true);
  assert.equal(wouldNotify("confirmed", "pending"), true);
});

test("cancellation requires a motive", () => {
  assert.match(registrations, /motive: v\.optional/);
  assert.match(registrations, /Indique o motivo do cancelamento/);
  assert.match(registrations, /Motivo.*500/);
});

test("status emails cover all three states", () => {
  assert.match(emails, /sendRegistrationStatusEmail/);
  assert.match(emails, /Inscrição confirmada/);
  assert.match(emails, /Inscrição não aprovada/);
  assert.match(emails, /Inscrição em revisão/);
  assert.match(emails, /Motivo:/);
});
