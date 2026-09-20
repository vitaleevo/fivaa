import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const atividade = readFileSync(new URL("../src/components/CardAtividade.tsx", import.meta.url), "utf8");
const testemunhos = readFileSync(
  new URL("../src/app/parceiros/testemunhos/TestemunhosClient.tsx", import.meta.url),
  "utf8",
);
const inscricao = readFileSync(
  new URL("../src/app/inscricao/InscricaoClient.tsx", import.meta.url),
  "utf8",
);
const home = readFileSync(new URL("../src/app/HomeContent.tsx", import.meta.url), "utf8");
const speaker = readFileSync(new URL("../src/components/SpeakerCard.tsx", import.meta.url), "utf8");

for (const [name, s] of [["atividade", atividade], ["testemunhos", testemunhos], ["inscricao", inscricao], ["home", home], ["speaker", speaker]]) {
  test(`${name} sem flip, com zoom subtil`, () => {
    assert.doesNotMatch(s, /FlipCard/);
    assert.doesNotMatch(s, /FlipLink/);
    assert.doesNotMatch(s, /rotateY/);
    assert.match(s, /hover:scale-/);
  });
}

test("cards mantêm ações alcançáveis sem verso", () => {
  assert.match(atividade, /t\.common\.more/);
  assert.match(home, /t\.common\.explore/);
});

test("links nunca recebem handlers (RSC serialisation)", () => {
  assert.doesNotMatch(home, /<Link[^>]*onClick/);
  assert.doesNotMatch(atividade, /<Link[^>]*onClick/);
});
