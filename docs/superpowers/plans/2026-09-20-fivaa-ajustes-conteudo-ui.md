# FIVAA — Pacote de ajustes (logos, LinkedIn, flip→zoom, programação, admin) — Plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar embatch os 7 ajustes pedidos pelo utilizador (nitidez dos logos, remover LinkedIn, desativar flip e usar zoom subtil, limpar conteúdos de mentoria/cursos/desafios/workshops/feedback, arrumar o menu do backoffice) sem tocar em nada que não foi pedido.

**Architecture:** Um ficheiro de testes novo (`tests/site-cleanup.test.mjs`) prova cada remoção antes/depois (TDD); cada grupo de tarefas é independente e comittável sozinho; flip é substituído por zoom só com `transform`/`opacity` (sem props de layout); copy removida nas 3 línguas (PT/EN/FR) onde viver em dicionários i18n.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, Convex, node:test (comando `npm test` = `node --experimental-strip-types --test tests/*.test.mjs`), eslint (`npx eslint <ficheiro>`).

**Spec:** Pedido do utilizador em 2026-09-20 (mensagem com 7 itens). Requisitos extraídos, verbatim onde relevante:
1. «os logos estão a perder resolução quando são inseridos no website isso não pode acontecer»
2. «remove o icon de linkedin» (+ «e icon» — frase cortada; assumir: só LinkedIn; se aparecer outro ícone no decorrer, confirmar antes)
3. «desativar o flip em todo o site… deixar os cards com um efeito de zoom básico bem basico mesmo mas elegante»
4. Mentoria: remover todo o bloco de «Conteúdo abaixo» (Fase 1 Meses 1-2 Avaliação e Planeamento + 4 ✓; Fase 2 Meses 3-4 Desenvolvimento de Habilidades + 4 ✓; Fase 3 Meses 5-6 Projeto Final e Exposição + 4 ✓), manter só o cabeçalho «Programa de Mentoria / 6 meses…» — https://www.fivaaforum.com/programacao/mentoria
5. Cursos: remover os 3 blocos de curso (Técnicas Artísticas, Gestão Artística, Arte Digital) com Módulos, manter cabeçalho «Cursos Online / Cursos Estruturados…» — https://www.fivaaforum.com/programacao/cursos
6. Desafios: remover «Desafio do Mês» (Regras + Prémios) e «Desafio Colaborativo» (Regras + Prémios), manter cabeçalho «Desafios Criativos / Desafios Artísticos…»
7. Workshops: remover a expressão «Programação Mensal», remover flip («Virar ↻»/«Voltar ↻») e remover datas/horas («1ª/2ª/3ª/4ª segunda-feira», «18:30 - 20:30»); manter títulos/descrições/tags
8. Feedback: remover dias/horas («Terças-feiras, 18:30 - 20:30», «Quintas-feiras, 19:00 - 21:00»); manter «Sessão de Crítica Construtiva», «Roda de Arte» e «Como funciona»
9. «no backoffice admin está baralhado com menu… evite alterar coisas que eu não te pedi» + «ajusta também o admin que está todo bagunçado» → arrumar só o layout/menu do admin, zero mudanças funcionais

## Global Constraints

- Não alterar nada que não foi pedido (regra explícita do utilizador; vale para todas as tarefas).
- Todo o copy visível existe em PT/EN/FR (`src/lib/i18n/`): qualquer remoção de texto tem de cobrir as 3 línguas ou o teste de dicionários (`tests/i18n.test.mjs`) quebra.
- `npm test` tem de passar a 100% no fim de cada tarefa.
- `npx eslint <ficheiros tocados>` sem erros no fim de cada tarefa.
- Commits pequenos, um por tarefa, estilo do repo: `fix(admin): …`, `feat(cards): …`, `content(programacao): …`, `chore(icons): …`.
- Estado atual conhecido: `src/components/Footer.tsx` tem modificação staged (logo 659×360 já aplicado); não reverter isso.

---

## Task 0: Auditoria dos 5 ficheiros de conteúdo (onde vive cada string)

**Files:**
- Read: `src/app/programacao/mentoria/MentoriaContent.tsx`
- Read: `src/app/programacao/cursos/CursosContent.tsx`
- Read: `src/app/programacao/desafios/DesafiosContent.tsx`
- Read: `src/app/programacao/workshops/WorkshopsContent.tsx`
- Read: `src/app/programacao/feedback/FeedbackContent.tsx`
- Read: `src/lib/i18n/sections/` (ficheiros de programacao/educacao, se existirem)
- Produce: mapa ficheiro→strings (usado pelas Tasks F–H; sem este mapa não avançar)

**Interfaces:**
- Consumes: nada
- Produces: tabela de localização (ex.: «"Encontros semanais com o mentor" vive em `MentoriaContent.tsx:84` hardcoded PT» ou «vive em `src/lib/i18n/sections/programacao.ts` chaves `mentorship.phase1.*` PT/EN/FR»)

- [ ] **Step 1: Ler os 5 ficheiros e localizar cada string da spec**

Ler cada ficheiro e anotar onde está cada fragmento (hardcoded ou chave i18n + as 3 línguas):
Mentoria: «Fase 1», «Meses 1-2», «Avaliação e Planeamento», «Análise detalhada do portfólio», «Definição de objetivos», «Plano de desenvolvimento personalizado», «Encontros semanais com o mentor», «Fase 2», «Meses 3-4», «Desenvolvimento de Habilidades», «Exercícios práticos personalizados», «Feedback construtivo semanal», «Workshops especializados», «Desenvolvimento de estilo próprio», «Fase 3», «Meses 5-6», «Projeto Final e Exposição», «Desenvolvimento de projeto final», «Preparação de portfólio profissional», «Exposição no Festival Anual», «Avaliação final e certificação».
Cursos: «Curso de Técnicas Artísticas», «Fundamentos da composição», «Teoria das cores», «Técnicas de pintura», «Escultura e modelagem», «Projeto final», «Curso de Gestão Artística», «Marketing pessoal», «Gestão de carreira», «Finanças para artistas», «Propriedade intelectual», «Plano de negócios artístico», «Curso de Arte Digital», «Design gráfico», «Ilustração digital», «Fotografia digital», «Edição de vídeo», «Arte generativa».
Desafios: «Desafio do Mês», «Submissão de até 3 obras por artista», «Prazo: último dia de cada mês», «Avaliação por júri especializado», «Destaque na galeria virtual», «Publicação nas redes sociais», «Prémios simbólicos», «Desafio Colaborativo», «Formação de equipas de 3-5 artistas», «Tema definido pelo FIVAA», «Prazo de 2 semanas», «Apresentação no Festival», «Reconhecimento coletivo», «Publicação em media», «Oportunidades de parceria», «Documentação do processo».
Workshops: «Programação Mensal», «1ª segunda-feira», «2ª segunda-feira», «3ª segunda-feira», «4ª segunda-feira», «18:30 - 20:30», «Virar ↻», «Voltar ↻».
Feedback: «Terças-feiras, 18:30 - 20:30», «Quintas-feiras, 19:00 - 21:00».

- [ ] **Step 2: Escrever o mapa no topo do plano (editar este ficheiro)**

Acrescentar no fim deste documento uma secção `## Mapa de conteúdo (Task 0)` com linhas exatas tipo:
`MentoriaContent.tsx:80-140 → blocos Fase 1-3 hardcoded PT; i18n programacao.ts mentorship.* (PT/EN/FR)`.
Expected: secção existe e cada string acima tem localização.

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/plans/2026-09-20-fivaa-ajustes-conteudo-ui.md
git commit -m "docs(plan): mapear conteúdo programacao para limpeza"
```

---

## Task A: Nitidez dos logos (auditoria + asset do header + sizes/quality)

**Files:**
- Read: `src/components/Logo.tsx`, `src/components/Header.tsx:220-240`, `src/components/Footer.tsx:20-45`, `src/app/parceiros/ParceirosContent.tsx`, `next.config.ts`
- Modify: `src/components/Logo.tsx`, `src/components/Header.tsx`
- Create: `public/images/logo-fivaa-principal-header.png` (aparado via sharp, ver Step 3)
- Test: `tests/site-cleanup.test.mjs` (teste «logos nítidos», ver Step 1)

**Interfaces:**
- Consumes: `logo-fivaa-branco-footer.png` (659×360, já existe — referência de padrão)
- Produces: `LogoPrimary` com ratio natural; regra «largura intrínseca ≥ 2× largura renderizada» para marcas

- [ ] **Step 1: Escrever o teste failing**

Acrescentar a `tests/site-cleanup.test.mjs` (criar o ficheiro se for a primeira tarefa executada):

```js
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
```

- [ ] **Step 2: Correr o teste e confirmar FAIL**

Run: `npm test`
Expected: FAIL em «logos usam assets aparados» (`logo-fivaa-principal-header.png` ainda não existe).

- [ ] **Step 3: Gerar o asset aparado do header (mesma técnica do footer)**

```bash
node -e "require('sharp')('C:/Users/alexa/OneDrive/Documents/empresas/Empresas/fivaa/LOGOTIPOE ÍCONES - FIVAA/LOGOTIPOE ÍCONES - FIVAA/LOGO FIVAA - PRINCIPAL  SEM FUNDO.png').trim({threshold:10}).png().toFile('public/images/logo-fivaa-principal-header.png').then(i=>console.log(i.width+'x'+i.height))"
```

Expected: output tipo `65x360`-ish wide (largura ≫ altura). Se sair quadrado (~1000×1000), ABORTAR: o trim falhou e é preciso inspeção manual do PNG.

- [ ] **Step 4: Reescrever `LogoPrimary` com ratio natural**

Em `src/components/Logo.tsx`, substituir o bloco `LogoPrimary` (linhas 3-16) por:

```tsx
export function LogoPrimary({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <span className={`relative block overflow-hidden ${className}`} data-public-logo>
      <Image
        src="/images/logo-fivaa-principal-header.png"
        alt="FIVAA"
        fill
        sizes="(max-width: 639px) 160px, 208px"
        priority
        quality={90}
        className="object-contain object-center"
      />
    </span>
  );
}
```

Nota: se o PNG aparado tiver ratio ≈ (largura do span)/(altura do span) o `object-contain` não faz letterbox visível. E em `src/components/Header.tsx:229` ajustar a classe para o ratio real do PNG (ex.: se o PNG for ~1.83:1 como o do footer, usar `className="h-24 w-44 sm:h-28 sm:w-52"` em vez de `w-56/w-72`).

- [ ] **Step 5: Auditar restantes `Image` de marca e corrigir `sizes`/`quality`**

Para cada uso de logo/foto institucional (header, footer, parceiros, oradores): confirmar que `width`/`height` intrínsecos ≥ 2× a largura renderizada e que `sizes` reflete a largura real. Só mexer em props (`quality={90}` em marcas, `sizes` correto); não trocar imagens nem layouts.

- [ ] **Step 6: Correr testes + lint e commit**

Run: `npm test` (Expected: PASS) e `npx eslint src/components/Logo.tsx src/components/Header.tsx` (Expected: sem output).

```bash
git add public/images/logo-fivaa-principal-header.png src/components/Logo.tsx src/components/Header.tsx tests/site-cleanup.test.mjs
git commit -m "fix(logos): assets aparados com ratio natural e sem crop"
```

---

## Task B: Remover o ícone do LinkedIn em todo o site

**Files:**
- Modify: `src/components/Header.tsx:7,16`, `src/components/Footer.tsx:6,14`, `src/app/contactos/ContactosContent.tsx:6,13`, `src/lib/site.ts:21`, `src/components/JsonLd.tsx:44,109`, `src/components/SocialIcons.tsx:48-52`
- Test: `tests/site-cleanup.test.mjs` (teste «sem linkedin»)

**Interfaces:**
- Consumes: nada
- Produces: `fivaaSocialLinks` com 2 entradas (Instagram, Facebook); nenhum `Linkedin` referenciado

- [ ] **Step 1: Escrever o teste failing**

```js
test("LinkedIn removido de todo o site", () => {
  const banned = ["Linkedin", "linkedin"];
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
```

- [ ] **Step 2: Correr o teste e confirmar FAIL**

Run: `npm test`
Expected: FAIL em «LinkedIn removido».

- [ ] **Step 3: Remover as 6 referências (troca mínima, sem redesign)**

1. `Header.tsx:7`: `import { Instagram, Facebook, Linkedin }` → `import { Instagram, Facebook }`; apagar a linha 16 (`{ Icon: Linkedin, ...fivaaSocialLinks[2], label: "LinkedIn" },`).
2. `Footer.tsx:6,14`: igual ao header.
3. `ContactosContent.tsx:6,13`: igual ao header.
4. `lib/site.ts:21`: apagar a entrada `{ network: "LinkedIn", href: "https://www.linkedin.com/company/fivaa" },` e confirmar que os índices `[0]`/`[1]` usados nos componentes continuam a ser Instagram/Facebook (reordenar se preciso, sem mudar labels).
5. `JsonLd.tsx:44,109`: apagar a string `"https://www.linkedin.com/company/fivaa",` dos dois arrays `sameAs`.
6. `SocialIcons.tsx`: apagar a função `Linkedin` (linhas ~48-52). Só apagar se `grep -rn "Linkedin" src/` confirmar zero usos após 1-5.

- [ ] **Step 4: Correr testes + lint e commit**

Run: `npm test` (Expected: PASS) e `npx eslint src/components/Header.tsx src/components/Footer.tsx src/app/contactos/ContactosContent.tsx src/lib/site.ts src/components/JsonLd.tsx src/components/SocialIcons.tsx` (Expected: sem output).

```bash
git add -u src tests/site-cleanup.test.mjs
git commit -m "chore(icons): remover LinkedIn de header, footer, contactos e SEO"
```

---

## Task C: Converter CardAtividade (piloto do padrão zoom)

**Files:**
- Modify: `src/components/CardAtividade.tsx`
- Test: teste piloto em `tests/site-cleanup.test.mjs` (depois generalizado na Task E)

**Interfaces:**
- Consumes: `Card`, `CardHeader…` de `@/components/ui/card`; `Link` de `next/link`; `t.common.more`
- Produces: padrão zoom a replicar — `Card` com `transition-transform duration-300 motion-safe:hover:scale-[1.02] hover:shadow-xl` (sem `group`, sem clique, sem `role="button"`, sem `FlipLink`)

- [ ] **Step 1: Escrever o teste failing do padrão**

```js
test("CardAtividade sem flip, com zoom subtil", () => {
  const s = src("components/CardAtividade.tsx");
  assert.ok(!s.includes("FlipCard") && !s.includes("FlipLink"), "ainda importa flip");
  assert.ok(!s.includes("flipHint") && !s.includes("backHint"), "ainda mostra dicas de virar");
  assert.ok(s.includes("hover:scale-"), "sem efeito zoom no hover");
  assert.ok(!s.includes("rotateY"), "ainda tem rotateY");
});
```

- [ ] **Step 2: Correr e confirmar FAIL**

Run: `npm test`
Expected: FAIL (ainda importa `FlipCard`).

- [ ] **Step 3: Reescrever o render (frente vence, link do verso muda-se para a frente)**

1. Apagar imports `FlipLink` e `FlipCard`; importar `Link` de `next/link`.
2. Apagar `flipLabel` (linha 73) e o bloco `back` inteiro (linhas 160-218).
3. No `front`: acrescentar às classes do `Card` `transition-transform duration-300 motion-safe:hover:scale-[1.02] hover:shadow-xl`; apagar o `CardFooter` com `flipHint` (linhas 146-156) e substituí-lo por footer com o link quando `href` existir:

```tsx
<CardFooter>
  {href && (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 font-montserrat text-sm font-bold transition-colors",
        variant === "dark" ? "text-gold hover:text-gold/80" : "text-gold hover:text-gold/80"
      )}
    >
      {t.common.more} <span aria-hidden="true">→</span>
    </Link>
  )}
</CardFooter>
```

4. Apagar `MoreLink` (linhas 47-60, usa `FlipLink`) e mudar o `return` da linha 220 para `return front;` (a const `front` já contém o `Card` editado no passo 3).

- [ ] **Step 4: Testes + lint + commit**

Run: `npm test` (PASS) e `npx eslint src/components/CardAtividade.tsx`.

```bash
git add src/components/CardAtividade.tsx tests/site-cleanup.test.mjs
git commit -m "feat(cards): CardAtividade sem flip, zoom subtil no hover"
```

---

## Task D: Converter os restantes 4 consumidores de flip

Regra de fusão (igual à Task C): **frente vence**; se o verso tiver CTA/link único, move-se para o rodapé da frente; senão o verso é descartado. Em todos: sem `role="button"`, sem clique para virar, zoom `motion-safe:hover:scale-[1.02]` + `hover:shadow-xl` no cartão (e nas fotos: wrapper `overflow-hidden` + `transition-transform duration-300 motion-safe:group-hover:scale-[1.04]` só na `Image`).

**Files:**
- Modify: `src/app/HomeContent.tsx` (~linhas 90-125, destaques), `src/app/inscricao/InscricaoClient.tsx` (~linhas 49-62, bilhetes), `src/app/parceiros/testemunhos/TestemunhosClient.tsx` (~linha 31), `src/components/SpeakerCard.tsx` (flip inline próprio, linhas ~51-140, sem `FlipCard`)
- Test: `tests/site-cleanup.test.mjs` (4 testes, um por ficheiro)

- [ ] **Step 1: Escrever os 4 testes failing**

```js
for (const f of ["app/HomeContent.tsx", "app/inscricao/InscricaoClient.tsx", "app/parceiros/testemunhos/TestemunhosClient.tsx", "components/SpeakerCard.tsx"]) {
  test(`sem flip em ${f}`, () => {
    const s = src(f);
    assert.ok(!s.includes("FlipCard") && !s.includes("FlipLink") && !s.includes("rotateY"), `${f} ainda tem flip`);
    assert.ok(!s.includes("flipHint") && !s.includes("backHint") && !s.includes("clickToFlip"), `${f} ainda tem dicas de virar`);
  });
}
```

- [ ] **Step 2: Correr e confirmar 4 FAILs**

Run: `npm test`
Expected: FAIL nos 4 testes novos.

- [ ] **Step 3: Converter cada ficheiro (ler frente/verso antes de editar; aplicar em cada um: apagar imports e estado de flip, descartar o verso, mover CTA/link único do verso para o rodapé da frente, pôr `transition-transform duration-300 motion-safe:hover:scale-[1.02] hover:shadow-xl` no cartão)**

`HomeContent.tsx`: ler bloco ~80-130; manter a face da frente dos destaques; o `FlipLink` interno (linhas ~120-125) passa a `Link` de `next/link` no rodapé da frente; zoom no cartão.
`InscricaoClient.tsx`: ler bloco ~40-70; manter a frente dos bilhetes com `details.name` e CTA de inscrição; descartar o verso; zoom no cartão.
`TestemunhosClient.tsx`: ler ficheiro; manter a frente dos testemunhos; descartar o verso; zoom no cartão.
`SpeakerCard.tsx`: tem flip inline (`useState flipped`, linhas ~51/84-97/101-140) — remover o estado, os handlers `onClick`/`onKeyDown`, `aria-pressed`, `role="button"`, o `div` do verso (linha ~134+) e as classes `preserve-3d`/`backface`; foto do orador com zoom interno (wrapper `overflow-hidden` + `transition-transform duration-300 motion-safe:group-hover:scale-[1.04]` só na `Image`, cartão com classe `group`). Manter nome, cargo e bio da frente.

- [ ] **Step 4: Testes + lint + commit**

Run: `npm test` (PASS) e `npx eslint` nos 4 ficheiros.

```bash
git add src/app/HomeContent.tsx src/app/inscricao/InscricaoClient.tsx src/app/parceiros/testemunhos/TestemunhosClient.tsx src/components/SpeakerCard.tsx tests/site-cleanup.test.mjs
git commit -m "feat(cards): remover flip de destaques, bilhetes, testemunhos e oradores"
```

---

## Task E: Apagar FlipCard/FlipLink e chaves i18n órfãs

**Files:**
- Delete: `src/components/FlipCard.tsx`, `src/components/FlipLink.tsx`
- Modify: `src/lib/i18n/sections/common.ts` (chaves flip PT/EN/FR)
- Test: `tests/site-cleanup.test.mjs` + `tests/i18n.test.mjs` (existente)

**Interfaces:**
- Consumes: prova de zero usos (grep)
- Produces: nenhum export flip restante

- [ ] **Step 1: Escrever o teste failing**

```js
test("componentes flip apagados e sem referências", () => {
  assert.ok(!existsSync("src/components/FlipCard.tsx"), "FlipCard.tsx ainda existe");
  assert.ok(!existsSync("src/components/FlipLink.tsx"), "FlipLink.tsx ainda existe");
});
```

(Garantir que o import no topo de `tests/site-cleanup.test.mjs` inclui `existsSync`: `import { readFileSync, existsSync } from "node:fs";`.)

- [ ] **Step 2: Confirmar zero usos e apagar**

Run: `grep -rn "FlipCard\|FlipLink\|flipCard\|flipHint\|backHint\|clickToFlip\|clickToReturn" src/`
Expected: apenas as linhas de `common.ts` (chaves) e do teste. Se aparecer mais algum uso, migrar primeiro (voltar à Task D) — NÃO apagar.
Depois: `git rm src/components/FlipCard.tsx src/components/FlipLink.tsx` e remover as chaves `flipCard`, `flipHint`, `backHint` (se existir), `clickToFlip`, `clickToReturn` nos 3 blocos PT/EN/FR de `src/lib/i18n/sections/common.ts` (linhas ~3-7, ~19-23, ~35-39). Manter `more` e todas as outras chaves.

- [ ] **Step 3: Testes + lint + commit**

Run: `npm test` (PASS, inclui `i18n.test.mjs` que valida chaves idênticas PT/EN/FR).

```bash
git add -u src tests/site-cleanup.test.mjs
git commit -m "chore(cards): apagar FlipCard/FlipLink e chaves i18n órfãs"
```

---

## Task F: Remover detalhe de Mentoria, Cursos e Desafios (3 commits)

Usar o mapa da Task 0. Em cada página: **manter hero/cabeçalho + CTA de contacto/inscrição; apagar só os blocos «Conteúdo abaixo»**. Se o copy viver em dicionários, remover as chaves nas 3 línguas.

**Files:**
- Modify: ficheiros apontados pelo mapa (ex.: `src/app/programacao/mentoria/MentoriaContent.tsx` + secção i18n correspondente; idem cursos/desafios)
- Test: `tests/site-cleanup.test.mjs` (3 testes com as strings da Task 0)

- [ ] **Step 1: Escrever os 3 testes failing (strings exatas da Task 0)**

```js
test("mentoria sem blocos de fase", () => {
  const s = src("app/programacao/mentoria/MentoriaContent.tsx");
  for (const b of ["Fase 1", "Fase 2", "Fase 3", "Avaliação e Planeamento", "Encontros semanais com o mentor", "Avaliação final e certificação"]) {
    assert.ok(!s.includes(b), `mentoria ainda contém "${b}"`);
  }
});
test("cursos sem blocos de curso", () => {
  const s = src("app/programacao/cursos/CursosContent.tsx");
  for (const b of ["Curso de Técnicas Artísticas", "Curso de Gestão Artística", "Curso de Arte Digital", "Teoria das cores", "Plano de negócios artístico", "Arte generativa"]) {
    assert.ok(!s.includes(b), `cursos ainda contém "${b}"`);
  }
});
test("desafios sem blocos de desafio", () => {
  const s = src("app/programacao/desafios/DesafiosContent.tsx");
  for (const b of ["Desafio do Mês", "Desafio Colaborativo", "Submissão de até 3 obras por artista", "Avaliação por júri especializado", "Documentação do processo"]) {
    assert.ok(!s.includes(b), `desafios ainda contém "${b}"`);
  }
});
```

(Ajustar caminhos para os do mapa da Task 0; se alguma string viver em dicionário i18n, o teste lê esse ficheiro em vez do Content. Se alguma string PT tiver variação de acento/capitalização no código, usar o texto exato do código.)

- [ ] **Step 2: Correr e confirmar 3 FAILs**

Run: `npm test`
Expected: FAIL nos 3 testes.

- [ ] **Step 3: Apagar os blocos (um ficheiro/página de cada vez, um commit por página)**

Apagar as secções JSX (ou chaves i18n + render) correspondentes, mantendo hero, intro e CTAs. Não reordenar nem reestilizar o que fica.

- [ ] **Step 4: Testes + lint + 3 commits**

Run: `npm test` (PASS) e `npx eslint` nos ficheiros tocados.

```bash
git add <os ficheiros da mentoria segundo o mapa da Task 0> tests/site-cleanup.test.mjs && git commit -m "content(programacao): remover detalhe do programa de mentoria"
git add <os ficheiros dos cursos segundo o mapa da Task 0> tests/site-cleanup.test.mjs && git commit -m "content(programacao): remover detalhe dos cursos online"
git add <os ficheiros dos desafios segundo o mapa da Task 0> tests/site-cleanup.test.mjs && git commit -m "content(programacao): remover detalhe dos desafios criativos"
```

---

## Task G: Workshops — remover «Programação Mensal», flip e datas/horas

**Files:**
- Modify: `src/app/programacao/workshops/WorkshopsContent.tsx` (+ i18n se aplicável, ver mapa Task 0)
- Test: `tests/site-cleanup.test.mjs`

- [ ] **Step 1: Escrever o teste failing**

```js
test("workshops sem programação mensal, flip ou datas", () => {
  const s = src("app/programacao/workshops/WorkshopsContent.tsx");
  for (const b of ["Programação Mensal", "programação mensal", "1ª segunda-feira", "2ª segunda-feira", "3ª segunda-feira", "4ª segunda-feira", "18:30", "Virar ↻", "Voltar ↻", "FlipCard", "rotateY"]) {
    assert.ok(!s.includes(b), `workshops ainda contém "${b}"`);
  }
  for (const keep of ["Workshop de Técnicas Artísticas", "Workshop de Criação", "Workshop de Gestão Artística", "Workshop Colaborativo"]) {
    assert.ok(s.includes(keep), `workshops perdeu "${keep}" (era para manter)`);
  }
});
```

(Ajustar caminho/strings ao mapa da Task 0 e ao texto exato do código, incluindo EN/FR se o copy for via i18n: nesse caso o teste lê também o dicionário.)

- [ ] **Step 2: Correr e confirmar FAIL**

Run: `npm test`
Expected: FAIL.

- [ ] **Step 3: Editar (só remoções)**

Apagar: linha/bloco «Programação Mensal»; badges de dia («1ª segunda-feira»…); horários («18:30 - 20:30»); faces de verso + «Virar ↻»/«Voltar ↻» (se usar `FlipCard`, converter a frente para o padrão zoom da Task C em vez de apagar o cartão). Manter títulos, descrições e tags (Pintura, Escultura, Fotografia, Arte Digital, Processo Criativo, Bloqueios, Novas Mídias, Marketing, Carreira, Finanças, Propriedade Intelectual, Trabalho em Equipa, Projetos Colaborativos, Troca).

- [ ] **Step 4: Testes + lint + commit**

Run: `npm test` (PASS) e `npx eslint` no ficheiro.

```bash
git add <os ficheiros dos workshops segundo o mapa da Task 0> tests/site-cleanup.test.mjs
git commit -m "content(programacao): workshops sem datas, horas e flip"
```

---

## Task H: Feedback — remover dias e horas

**Files:**
- Modify: `src/app/programacao/feedback/FeedbackContent.tsx` (+ i18n se aplicável)
- Test: `tests/site-cleanup.test.mjs`

- [ ] **Step 1: Escrever o teste failing**

```js
test("feedback sem dias nem horas", () => {
  const s = src("app/programacao/feedback/FeedbackContent.tsx");
  for (const b of ["Terças-feiras", "Quintas-feiras", "18:30", "19:00", "20:30", "21:00"]) {
    assert.ok(!s.includes(b), `feedback ainda contém "${b}"`);
  }
  for (const keep of ["Sessão de Crítica Construtiva", "Roda de Arte", "Como funciona"]) {
    assert.ok(s.includes(keep), `feedback perdeu "${keep}" (era para manter)`);
  }
});
```

(Ajustar ao texto exato do código/i18n via mapa da Task 0.)

- [ ] **Step 2: Correr e confirmar FAIL**

Run: `npm test`
Expected: FAIL.

- [ ] **Step 3: Editar (só remoções)**

Apagar as linhas «Terças-feiras, 18:30 - 20:30» e «Quintas-feiras, 19:00 - 21:00» (badges ou parágrafos). Manter o resto byte por byte.

- [ ] **Step 4: Testes + lint + commit**

Run: `npm test` (PASS) e `npx eslint` no ficheiro.

```bash
git add <os ficheiros do feedback segundo o mapa da Task 0> tests/site-cleanup.test.mjs
git commit -m "content(programacao): feedback sem dias nem horas"
```

---

## Task I: Arrumar o menu/layout do admin (só visual, zero funcional)

**Files:**
- Read: `src/app/admin/AdminAuthGuard.tsx:177-315` (sidebar + topbar), `src/app/admin/AdminDashboardClient.tsx:150-180` (quick links)
- Modify: apenas classes Tailwind em `AdminAuthGuard.tsx` (e `AdminUI.tsx` se o defeito lá viver)
- Proibido tocar em: rotas, queries/mutations Convex, guards de auth, dados, textos

- [ ] **Step 1: Reproduzir e listar defeitos (sem editar)**

Correr `npm run dev`, abrir `http://localhost:3000/admin`, capturar o que está «baralhado» (exemplos típicos: sidebar sobreposta ao conteúdo no desktop por falta de `lg:translate-x-0`/`lg:pl-*` no `main`; itens do `nav` sem espaçamento; topbar desalinhada no mobile). Escrever a lista de defeitos observados (máx. 5) e só corrigir esses.

- [ ] **Step 2: Correção mínima de classes**

Ajustar só as classes responsáveis (ex.: no `aside`, garantir `lg:translate-x-0`; no content wrapper, `lg:pl-64` correspondente à largura da sidebar; alinhar `nav` com `space-y-1`). Não mexer em lógica, links, labels ou ordem de itens.

- [ ] **Step 3: Verificar desktop + mobile + lint e commit**

Recarregar `/admin` em viewport desktop (≥1024px) e mobile (≤640px): menu abre/fecha, sem sobreposição, sem scroll horizontal. Run: `npm test` (PASS) e `npx eslint src/app/admin/AdminAuthGuard.tsx`.

```bash
git add src/app/admin/AdminAuthGuard.tsx
git commit -m "fix(admin): arrumar layout do menu sem mudar comportamento"
```

---

## Task J: Verificação final de todo o pacote

- [ ] **Step 1: Suite completa + lint geral**

Run: `npm test` (Expected: todos PASS, incluindo `site-cleanup`, `i18n`, `assets`) e `npx eslint src/` (Expected: sem erros).

- [ ] **Step 2: Build de produção**

Run: `npm install` (repõe `@convex-dev/resend`, em falta no `node_modules` local — pré-existente, causa do erro `convex.config.ts:2` no build) e depois `npm run build` (Expected: `✓ Compiled successfully`).

- [ ] **Step 3: Revisão visual rápida**

`npm run dev` e abrir: `/` (zoom nos destaques), `/oradores`, `/inscricao`, `/programacao/mentoria`, `/programacao/cursos`, `/programacao/desafios`, `/programacao/workshops`, `/programacao/feedback`, `/admin` — confirmar sem flip, sem LinkedIn, sem datas removidas, logos nítidos.

---

## Mapa de conteúdo (Task 0)

_Auditoria 2026-09-20 (Task 0). Conclusão geral: **zero strings hardcoded** nos 5 ficheiros — todos renderizam via `useLanguage()` (`t.programacao.*`). Todo o conteúdo vive em `src/lib/i18n/sections/programacao.ts` nas 3 línguas (pt / en / fr). Nenhum dos 5 ficheiros importa `FlipCard`/`FlipLink` nem usa `rotateY` (grep em `src/app/programacao` sem matches)._

_Render (ficheiro → linhas / chave i18n / flip):_
- `MentoriaContent.tsx:28-44` → `t.programacao.mentoriaPhases.map` (phase/duration/title/desc/items); `flip: não`
- `CursosContent.tsx:28-46` → `t.programacao.cursosItems.map` (title/duration/frequency/desc/modulos) + `cursosModulosTitle` (:36); `flip: não`
- `DesafiosContent.tsx:27-55` → `t.programacao.desafiosItems.map` (title/desc/rules/prizes) + `desafiosRulesTitle` (:33)/`desafiosPrizesTitle` (:43); `flip: não`
- `WorkshopsContent.tsx:49-60` → `t.programacao.workshopsItems.map` via `CardAtividade` (title/desc/schedule/time/tags); `flip: não`
- `FeedbackContent.tsx:27-42` → `t.programacao.feedbackItems.map` (title/schedule/desc/rules) + `feedbackHowTitle` (:32); `flip: não`

_Convenção abaixo: `pt:<linha>` = valor PT citado; `en:<linha>` / `fr:<linha>` = tradução correspondente. Base: `src/lib/i18n/sections/programacao.ts`._

### Mentoria — `mentoriaPhases` (pt:93-130 / en:390-427 / fr:687-724)
- «Fase 1» → `mentoriaPhases[0].phase` — pt:95 / en:392 ("Phase 1") / fr:689 ("Phase 1")
- «Meses 1-2» → `mentoriaPhases[0].duration` — pt:96 / en:393 ("Months 1-2") / fr:690 ("Mois 1-2")
- «Avaliação e Planeamento» → `mentoriaPhases[0].title` — pt:97 / en:394 ("Assessment and Planning") / fr:691 ("Évaluation et planification")
- «Análise detalhada do portfólio» → `mentoriaPhases[0].items[0]` — pt:100 / en:397 ("Detailed portfolio review") / fr:694 ("Analyse détaillée du portfolio")
- «Definição de objetivos» → `mentoriaPhases[0].items[1]` — pt:101 / en:398 ("Goal setting") / fr:695 ("Définition des objectifs")
- «Plano de desenvolvimento personalizado» → `mentoriaPhases[0].items[2]` — pt:102 / en:399 ("Personalised development plan") / fr:696 ("Plan de développement personnalisé")
- «Encontros semanais com o mentor» → `mentoriaPhases[0].items[3]` — pt:103 / en:400 ("Weekly mentor meetings") / fr:697 ("Rencontres hebdomadaires avec le mentor")
- «Fase 2» → `mentoriaPhases[1].phase` — pt:107 / en:404 ("Phase 2") / fr:701 ("Phase 2")
- «Meses 3-4» → `mentoriaPhases[1].duration` — pt:108 / en:405 ("Months 3-4") / fr:702 ("Mois 3-4")
- «Desenvolvimento de Habilidades» → `mentoriaPhases[1].title` — pt:109 / en:406 ("Skills Development") / fr:703 ("Développement des compétences")
- «Exercícios práticos personalizados» → `mentoriaPhases[1].items[0]` — pt:112 / en:409 ("Personalised practical exercises") / fr:706 ("Exercices pratiques personnalisés")
- «Feedback construtivo semanal» → `mentoriaPhases[1].items[1]` — pt:113 / en:410 ("Weekly constructive feedback") / fr:707 ("Retour constructif hebdomadaire")
- «Workshops especializados» → `mentoriaPhases[1].items[2]` — pt:114 / en:411 ("Specialised workshops") / fr:708 ("Ateliers spécialisés")
- «Desenvolvimento de estilo próprio» → `mentoriaPhases[1].items[3]` — pt:115 / en:412 ("Developing your own style") / fr:709 ("Développement d'un style propre")
- «Fase 3» → `mentoriaPhases[2].phase` — pt:119 / en:416 ("Phase 3") / fr:713 ("Phase 3")
- «Meses 5-6» → `mentoriaPhases[2].duration` — pt:120 / en:417 ("Months 5-6") / fr:714 ("Mois 5-6")
- «Projeto Final e Exposição» → `mentoriaPhases[2].title` — pt:121 / en:418 ("Final Project and Exhibition") / fr:715 ("Projet final et exposition")
- «Desenvolvimento de projeto final» → `mentoriaPhases[2].items[0]` — pt:124 / en:421 ("Final project development") / fr:718 ("Développement du projet final")
- «Preparação de portfólio profissional» → `mentoriaPhases[2].items[1]` — pt:125 / en:422 ("Professional portfolio preparation") / fr:719 ("Préparation d'un portfolio professionnel")
- «Exposição no Festival Anual» → `mentoriaPhases[2].items[2]` — pt:126 / en:423 ("Annual Festival exhibition") / fr:720 ("Exposition au Festival annuel")
- «Avaliação final e certificação» → `mentoriaPhases[2].items[3]` — pt:127 / en:424 ("Final assessment and certification") / fr:721 ("Évaluation finale et certification")

### Cursos — `cursosItems` (pt:138-178 / en:435-475 / fr:732-772)
- «Curso de Técnicas Artísticas» → `cursosItems[0].title` — pt:140 / en:437 ("Art Techniques Course") / fr:734 ("Cours de techniques artistiques")
- «Fundamentos da composição» → `cursosItems[0].modulos[0]` — pt:145 / en:442 ("Composition fundamentals") / fr:739 ("Fondamentaux de la composition")
- «Teoria das cores» → `cursosItems[0].modulos[1]` — pt:146 / en:443 ("Colour theory") / fr:740 ("Théorie des couleurs")
- «Técnicas de pintura» → `cursosItems[0].modulos[2]` — pt:147 / en:444 ("Painting techniques") / fr:741 ("Techniques de peinture")
- «Escultura e modelagem» → `cursosItems[0].modulos[3]` — pt:148 / en:445 ("Sculpture and modelling") / fr:742 ("Sculpture et modelage")
- «Projeto final» → `cursosItems[0].modulos[4]` — pt:149 / en:446 ("Final project") / fr:743 ("Projet final")
- «Curso de Gestão Artística» → `cursosItems[1].title` — pt:153 / en:450 ("Art Management Course") / fr:747 ("Cours de gestion artistique")
- «Marketing pessoal» → `cursosItems[1].modulos[0]` — pt:158 / en:455 ("Personal marketing") / fr:752 ("Marketing personnel")
- «Gestão de carreira» → `cursosItems[1].modulos[1]` — pt:159 / en:456 ("Career management") / fr:753 ("Gestion de carrière")
- «Finanças para artistas» → `cursosItems[1].modulos[2]` — pt:160 / en:457 ("Finance for artists") / fr:754 ("Finances pour artistes")
- «Propriedade intelectual» → `cursosItems[1].modulos[3]` — pt:161 / en:458 ("Intellectual property") / fr:755 ("Propriété intellectuelle")
- «Plano de negócios artístico» → `cursosItems[1].modulos[4]` — pt:162 / en:459 ("Artistic business plan") / fr:756 ("Plan d'affaires artistique")
- «Curso de Arte Digital» → `cursosItems[2].title` — pt:166 / en:463 ("Digital Art Course") / fr:760 ("Cours d'art numérique")
- «Design gráfico» → `cursosItems[2].modulos[0]` — pt:171 / en:468 ("Graphic design") / fr:765 ("Design graphique")
- «Ilustração digital» → `cursosItems[2].modulos[1]` — pt:172 / en:469 ("Digital illustration") / fr:766 ("Illustration numérique")
- «Fotografia digital» → `cursosItems[2].modulos[2]` — pt:173 / en:470 ("Digital photography") / fr:767 ("Photographie numérique")
- «Edição de vídeo» → `cursosItems[2].modulos[3]` — pt:174 / en:471 ("Video editing") / fr:768 ("Montage vidéo")
- «Arte generativa» → `cursosItems[2].modulos[4]` — pt:175 / en:472 ("Generative art") / fr:769 ("Art génératif")

### Desafios — `desafiosItems` (pt:187-220 / en:484-517 / fr:781-814)
- «Desafio do Mês» → `desafiosItems[0].title` — pt:189 / en:486 ("Challenge of the Month") / fr:783 ("Défi du mois")
- «Submissão de até 3 obras por artista» → `desafiosItems[0].rules[0]` — pt:192 / en:489 ("Up to 3 works per artist") / fr:786 ("Jusqu'à 3 œuvres par artiste")
- «Prazo: último dia de cada mês» → `desafiosItems[0].rules[1]` — pt:193 / en:490 ("Deadline: last day of each month") / fr:787 ("Délai : dernier jour de chaque mois")
- «Avaliação por júri especializado» → `desafiosItems[0].rules[3]` — pt:195 / en:492 ("Judged by a specialist jury") / fr:789 ("Évaluation par un jury spécialisé")
- «Destaque na galeria virtual» → `desafiosItems[0].prizes[0]` — pt:198 / en:495 ("Featured in the virtual gallery") / fr:792 ("Mise en avant dans la galerie virtuelle")
- «Publicação nas redes sociais» → `desafiosItems[0].prizes[1]` — pt:199 / en:496 ("Published on social media") / fr:793 ("Publication sur les réseaux sociaux")
- «Prémios simbólicos» → `desafiosItems[0].prizes[3]` — pt:201 / en:498 ("Symbolic prizes") / fr:795 ("Prix symboliques")
- «Desafio Colaborativo» → `desafiosItems[1].title` — pt:205 / en:502 ("Collaborative Challenge") / fr:799 ("Défi collaboratif")
- «Formação de equipas de 3-5 artistas» → `desafiosItems[1].rules[0]` — pt:208 / en:505 ("Teams of 3-5 artists") / fr:802 ("Équipes de 3 à 5 artistes")
- «Tema definido pelo FIVAA» → `desafiosItems[1].rules[1]` — pt:209 / en:506 ("Theme set by FIVAA") / fr:803 ("Thème défini par le FIVAA")
- «Prazo de 2 semanas» → `desafiosItems[1].rules[2]` — pt:210 / en:507 ("2-week deadline") / fr:804 ("Délai de 2 semaines")
- «Apresentação no Festival» → `desafiosItems[1].rules[3]` — pt:211 / en:508 ("Festival presentation") / fr:805 ("Présentation au Festival")
- «Reconhecimento coletivo» → `desafiosItems[1].prizes[0]` — pt:214 / en:511 ("Collective recognition") / fr:808 ("Reconnaissance collective")
- «Publicação em media» → `desafiosItems[1].prizes[1]` — pt:215 / en:512 ("Media publication") / fr:809 ("Publication média")
- «Oportunidades de parceria» → `desafiosItems[1].prizes[2]` — pt:216 / en:513 ("Partnership opportunities") / fr:810 ("Opportunités de partenariat")
- «Documentação do processo» → `desafiosItems[1].prizes[3]` — pt:217 / en:514 ("Process documentation") / fr:811 ("Documentation du processus")

### Workshops — `workshopsHeroBadge` + `workshopsItems` (pt:8-40 / en:305-337 / fr:602-634)
- «Programação Mensal» → `workshopsHeroBadge` — pt:8 / en:305 ("Monthly Programme") / fr:602 ("Programme mensuel")
- «1ª segunda-feira» → `workshopsItems[0].schedule` — pt:14 / en:311 ("1st Monday") / fr:608 ("1er lundi")
- «2ª segunda-feira» → `workshopsItems[1].schedule` — pt:21 / en:318 ("2nd Monday") / fr:615 ("2e lundi")
- «3ª segunda-feira» → `workshopsItems[2].schedule` — pt:28 / en:325 ("3rd Monday") / fr:622 ("3e lundi")
- «4ª segunda-feira» → `workshopsItems[3].schedule` — pt:35 / en:332 ("4th Monday") / fr:629 ("4e lundi")
- «18:30 - 20:30» → `workshopsItems[*].time` — pt:15,22,29,36 / en:312,319,326,333 ("6:30 - 8:30 PM") / fr:609,616,623,630 ("18h30 - 20h30")
- NÃO ENCONTRADO: "Virar ↻" (grep em `src/app/programacao` e nos 5 ficheiros: zero matches; sem FlipCard/FlipLink/rotateY em nenhum deles)
- NÃO ENCONTRADO: "Voltar ↻" (idem — zero matches)

### Feedback — `feedbackItems` (pt:225-248 / en:522-545 / fr:819-842)
- «Terças-feiras, 18:30 - 20:30» → `feedbackItems[0].schedule` — pt:228 / en:525 ("Tuesdays, 6:30 - 8:30 PM") / fr:822 ("Mardis, 18h30 - 20h30")
- «Quintas-feiras, 19:00 - 21:00» → `feedbackItems[1].schedule` — pt:238 / en:535 ("Thursdays, 7:00 - 9:00 PM") / fr:832 ("Jeudis, 19h00 - 21h00")

### Notas para Tasks E/F/G/H
- `palestrasHeroBadge: "Programação Mensal"` (programacao.ts pt:44 / en:341 / fr:638) é usado por `src/app/programacao/palestras/PalestrasContent.tsx:34` — NÃO mexer; partilha apenas o valor PT com `workshopsHeroBadge`, são chaves distintas.
- `src/lib/i18n/sections/educacao.ts` existe mas a sua secção `workshops*` (ex. `workshopsHeroBadge: "Workshops Educacionais"`, educacao.ts pt:14) pertence às páginas de Educação, fora do escopo das 5 páginas de Programação auditadas.
