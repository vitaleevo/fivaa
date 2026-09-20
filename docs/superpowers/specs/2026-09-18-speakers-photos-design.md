# Design: Oradores com fotos, bio e categoria — admin → site público

Data: 2026-09-18
Estado: aprovado pelo utilizador (publicação imediata, upload no admin, básico completo)
Path: architectural (altera schema + storage + admin + público)

## 1. Objetivo

Permitir que o admin publique em `/admin/oradores` pessoas/envolvidos (oradores,
palestrantes, artistas, moderadores, convidados) com foto e informação completa,
visíveis imediatamente em `/oradores` e na homepage.

Hoje `speakers` só tem `name, role, country, color` e o público mostra
gradiente + inicial — sem foto nem bio.

## 2. Decisões aprovadas

- Campos: foto + nome + função + país + biografia curta + categoria.
- Fotos: upload JPG/PNG no browser → Convex Storage (recomendado).
- Visibilidade: publicação imediata, sem rascunho/destaque nesta fase.

## 3. Abordagem escolhida: estender `speakers` (opção A)

Alternativas descartadas:
- B. Nova tabela `people`: duplicava queries/admin/UI sem benefício atual.
- C. Fotos em `public/` via git: impossível fazer upload em produção Vercel (FS read-only).

## 4. Backend (Convex)

### 4.1 Schema `convex/schema.ts`
```ts
speakers: defineTable({
  name: v.string(),
  role: v.string(),
  country: v.string(),
  color: v.string(), // mantido como fallback visual
  bio: v.optional(v.string()),
  category: v.optional(v.string()),
  photoStorageId: v.optional(v.id("_storage")),
  photoUrl: v.optional(v.string()), // compat: URL externa ou legada
})
```

### 4.2 `convex/speakers.ts`
- `get`: retorna lista + `resolvedPhotoUrl` (se `photoStorageId`, `ctx.storage.getUrl`).
- `create/update`: args novos opcionais `bio, category, photoStorageId, photoUrl`;
  sanitizar com `sanitizeText`, validar:
  - `bio` 0–500 chars
  - `category` ∈ ["Orador","Palestrante","Artista","Moderador","Convidado","Outro"]
  - `photoStorageId` válido se fornecido
- `remove`: mantém; se tiver `photoStorageId`, `ctx.storage.delete` (best-effort).
- Novo `generateUploadUrl = mutation({ handler: requireAdmin + ctx.storage.generateUploadUrl() })`.

Segurança: tudo protegido por `requireAdmin`, como hoje. Upload validado no
client (tipo image/*, ≤5MB) + no server pela validação de tamanho Convex.

## 5. Admin `/admin/oradores/OradoresAdminClient.tsx`

- Form atual + 3 campos novos:
  - Categoria: `<select>` fixo.
  - Biografia: `<textarea rows=3 maxlength=500>` com contador.
  - Foto: `<input type=file accept="image/*">` + preview + estado uploading +
    botão remover. Fluxo: `generateUploadUrl` → `fetch PUT file` → `photoStorageId` no form.
- Tabela: coluna foto com thumbnail 36px (ou inicial colorida se sem foto).
- Pesquisa passa a incluir bio/categoria.
- Mensagens toast mantidas.

## 6. Público

### 6.1 `/oradores/OradoresClient.tsx`
- Se `resolvedPhotoUrl || photoUrl`: `<Image fill object-cover>` no topo do card (h-64).
- Senão: gradiente + inicial (atual).
- Badge categoria + país, `role` em gold, `bio` com `line-clamp-3`.
- Estado vazio mantido: "Os oradores serão anunciados em breve."

### 6.2 Homepage `src/app/page.tsx`
- Nova secção "Vozes do FIVAA" após Destaques: `useQuery(api.speakers.get)`,
  primeiros 8, mesmo card compacto + link "Ver todos os oradores".
- Reusa componente `SpeakerCard` extraído para não duplicar com OradoresClient.

## 7. Testes e verificação

- `npm run lint` → 0 erros.
- `npm test`: estender `tests/forms.test.mjs` ou novo `tests/speakers.test.mjs`:
  bio >500 rejeitada, categoria inválida rejeitada, `ticketDestination` intacto.
- `npm run build` → 42+ rotas OK.
- Manual: upload no admin → visível em `/oradores` + homepage sem refresh (realtime Convex).

## 8. Fora de âmbito (futuro)

- Rascunho/publicado, destaque, ordenação manual.
- Crop de imagem no browser.
- Redes sociais / organização.
- Migração de fotos antigas (não existem).
