import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const src = (p) => readFileSync(`src/${p}`, "utf8");

test("logos usam assets aparados com ratio natural (sem object-cover em marca)", () => {
  assert.ok(existsSync("public/images/logo-fivaa-branco-footer.png"), "falta asset do footer");
  assert.ok(existsSync("public/images/logo-fivaa-principal-header.png"), "falta asset do header");
  const logo = src("components/Logo.tsx");
  assert.ok(!logo.includes("object-cover"), "Logo.tsx ainda faz crop com object-cover");
  assert.ok(logo.includes("logo-fivaa-principal-header.png"), "LogoPrimary não usa o asset aparado");
});
