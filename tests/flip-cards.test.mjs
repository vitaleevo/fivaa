import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const flip = readFileSync(new URL("../src/components/FlipCard.tsx", import.meta.url), "utf8");
const atividade = readFileSync(new URL("../src/components/CardAtividade.tsx", import.meta.url), "utf8");
const testemunhos = readFileSync(
  new URL("../src/app/parceiros/testemunhos/TestemunhosClient.tsx", import.meta.url),
  "utf8",
);
const inscricao = readFileSync(
  new URL("../src/app/inscricao/InscricaoClient.tsx", import.meta.url),
  "utf8",
);
const home = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");

test("FlipCard exposes hover, tap, keyboard and reduced-motion support", () => {
  assert.match(flip, /perspective:1200px/);
  assert.match(flip, /preserve-3d/);
  assert.match(flip, /backface-visibility:hidden/);
  assert.match(flip, /rotateY\(180deg\)/);
  assert.match(flip, /onKeyDown/);
  assert.match(flip, /motion-safe:/);
  assert.match(flip, /aria-pressed/);
});

test("content cards use the shared FlipCard", () => {
  assert.match(atividade, /FlipCard/);
  assert.match(testemunhos, /FlipCard/);
  assert.match(inscricao, /FlipCard/);
  assert.match(home, /FlipCard/);
});

test("flipped backs keep actions reachable", () => {
  assert.match(atividade, /Saber mais/);
  assert.match(inscricao, /stopPropagation/);
  assert.match(home, /Explorar/);
});
