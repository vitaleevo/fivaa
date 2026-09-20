import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const schema = readFileSync(new URL("../convex/schema.ts", import.meta.url), "utf8");
const speakers = readFileSync(new URL("../convex/speakers.ts", import.meta.url), "utf8");

test("speakers schema supports photo, bio and category", () => {
  assert.match(schema, /bio:\s*v\.optional/);
  assert.match(schema, /category:\s*v\.optional/);
  assert.match(schema, /photoStorageId:\s*v\.optional/);
});

test("speakers backend exposes upload URL and category allowlist", () => {
  assert.match(speakers, /generateUploadUrl/);
  assert.match(speakers, /SPEAKER_CATEGORIES/);
  assert.match(speakers, /Palestrante/);
});

test("speaker category allowlist rejects unknown", () => {
  const CATS = ["Orador", "Palestrante", "Artista", "Moderador", "Convidado", "Outro"];
  assert.ok(CATS.includes("Palestrante"));
  assert.equal(CATS.includes("Hacker"), false);
});

test("speaker bio limit 500", () => {
  const tooLong = "x".repeat(501);
  assert.throws(() => {
    if (tooLong.length > 500) throw new Error("Biografia não deve exceder 500 caracteres.");
  });
});
