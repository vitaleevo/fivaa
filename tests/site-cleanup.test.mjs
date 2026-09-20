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

test("LinkedIn removido de todo o site", () => {
  const banned = ["Linkedin", "linkedin", "LinkedIn", "linkedin.com"];
  const files = [
    "components/Header.tsx",
    "components/Footer.tsx",
    "components/SocialIcons.tsx",
    "components/JsonLd.tsx",
    "app/contactos/ContactosContent.tsx",
    "lib/site.ts",
  ];
  for (const f of files) {
    const s = src(f);
    for (const b of banned) assert.ok(!s.includes(b), `${f} ainda contém "${b}"`);
  }
});

test("CardAtividade sem flip, com zoom subtil", () => {
  const s = src("components/CardAtividade.tsx");
  assert.ok(!s.includes("FlipCard") && !s.includes("FlipLink"), "ainda importa flip");
  assert.ok(!s.includes("flipHint") && !s.includes("backHint"), "ainda mostra dicas de virar");
  assert.ok(s.includes("hover:scale-"), "sem efeito zoom no hover");
  assert.ok(!s.includes("rotateY"), "ainda tem rotateY");
});
