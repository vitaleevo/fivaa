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

for (const f of ["app/HomeContent.tsx", "app/inscricao/InscricaoClient.tsx", "app/parceiros/testemunhos/TestemunhosClient.tsx", "components/SpeakerCard.tsx"]) {
  test(`sem flip em ${f}`, () => {
    const s = src(f);
    assert.ok(!s.includes("FlipCard") && !s.includes("FlipLink") && !s.includes("rotateY"), `${f} ainda tem flip`);
    assert.ok(!s.includes("flipHint") && !s.includes("backHint") && !s.includes("clickToFlip"), `${f} ainda tem dicas de virar`);
  });
}

test("mentoria sem blocos de fase", () => {
  const s = src("lib/i18n/sections/programacao.ts");
  for (const b of ["mentoriaPhases", "Avaliação e Planeamento", "Encontros semanais com o mentor", "Avaliação final e certificação", "Assessment and Planning", "Évaluation et planification"]) {
    assert.ok(!s.includes(b), `programacao.ts ainda contém "${b}"`);
  }
});
test("cursos sem blocos de curso", () => {
  const s = src("lib/i18n/sections/programacao.ts");
  for (const b of ["cursosItems", "Teoria das cores", "Plano de negócios artístico", "Arte generativa", "Colour theory", "Théorie des couleurs"]) {
    assert.ok(!s.includes(b), `programacao.ts ainda contém "${b}"`);
  }
});
test("desafios sem blocos de desafio", () => {
  const s = src("lib/i18n/sections/programacao.ts");
  for (const b of ["desafiosItems", "Desafio Colaborativo", "Submissão de até 3 obras por artista", "Documentação do processo", "Collaborative Challenge", "Défi collaboratif"]) {
    assert.ok(!s.includes(b), `programacao.ts ainda contém "${b}"`);
  }
});
test("workshops sem programação mensal nem datas", () => {
  const s = src("lib/i18n/sections/programacao.ts");
  // CUIDADO (brief): valores PT/EN/FR do hero ("Programação Mensal"/"Monthly Programme"/"Programme mensuel")
  // são idênticos entre workshopsHeroBadge e palestrasHeroBadge — assertar a CHAVE, não o valor.
  assert.ok(!s.includes("workshopsHeroBadge"), 'programacao.ts ainda contém "workshopsHeroBadge"');
  assert.ok(s.includes("palestrasHeroBadge"), 'palestrasHeroBadge foi apagada por acidente (era para manter)');
  for (const b of ["1ª segunda-feira", "2ª segunda-feira", "3ª segunda-feira", "4ª segunda-feira", "1st Monday", "2nd Monday", "3rd Monday", "4th Monday", "1er lundi", "2e lundi", "3e lundi", "4e lundi"]) {
    assert.ok(!s.includes(b), `programacao.ts ainda contém "${b}"`);
  }
  // Tempos: valores nus ("18:30 - 20:30", "6:30 - 8:30 PM", "18h30 - 20h30") colidem com feedbackItems
  // (ex.: schedule "Terças-feiras, 18:30 - 20:30") — assertar com prefixo `time:` que só existe nos workshops.
  for (const b of ['time: "18:30 - 20:30"', 'time: "6:30 - 8:30 PM"', 'time: "18h30 - 20h30"']) {
    assert.ok(!s.includes(b), `programacao.ts ainda contém "${b}"`);
  }
  for (const keep of ["Workshop de Técnicas Artísticas", "Workshop de Criação", "Workshop de Gestão Artística", "Workshop Colaborativo"]) {
    assert.ok(s.includes(keep), `workshops perdeu "${keep}" (era para manter)`);
  }
});

test("feedback sem dias nem horas", () => {
  const s = src("lib/i18n/sections/programacao.ts");
  for (const b of ["Terças-feiras, 18:30 - 20:30", "Quintas-feiras, 19:00 - 21:00", "Tuesdays, 6:30 - 8:30 PM", "Thursdays, 7:00 - 9:00 PM", "Mardis, 18h30 - 20h30", "Jeudis, 19h00 - 21h00"]) {
    assert.ok(!s.includes(b), `programacao.ts ainda contém "${b}"`);
  }
  for (const keep of ["Sessão de Crítica Construtiva", "Roda de Arte", "Como funciona", "feedbackHowTitle"]) {
    assert.ok(s.includes(keep), `feedback perdeu "${keep}" (era para manter)`);
  }
});
