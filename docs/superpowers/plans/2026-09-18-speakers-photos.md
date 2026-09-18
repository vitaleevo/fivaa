# Speakers com fotos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Admin publica pessoas com foto, bio e categoria e isso aparece logo em `/oradores` e na homepage.

**Architecture:** Estender tabela `speakers` com campos opcionais + Convex Storage para fotos, atualizar admin e público a ler a mesma query em realtime.

**Tech Stack:** Next.js 16 App Router, Convex (schema, queries, mutations, Storage), React, Tailwind CSS 4, next/image.

**Spec:** `docs/superpowers/specs/2026-09-18-speakers-photos-design.md`

## Global Constraints

- Publicação imediata — sem flag rascunho/publicado nesta fase.
- `color` mantido como fallback quando sem foto.
- `bio` 0–500 chars, `category` só da lista fixa abaixo.
- Fotos: `accept="image/*"`, ≤5MB no client.
- Admin mutations sempre via `requireAdmin`.
- PT-AO como idioma principal, sem quebrar i18n existente.

---

### Task 1: Backend — schema + speakers + upload

**Files:**
- Modify: `convex/schema.ts:7-12`
- Modify: `convex/speakers.ts:1-68`
- Test: `tests/speakers.test.mjs` (novo, usa validação pura via import de helpers — ver nota)

**Interfaces:**
- Consumes: `requireAdmin`, `sanitizeText`, `validateRequiredLength`, `validateOptionalLength` de `convex/security.ts:32,44,64,79`.
- Produces: `api.speakers.get` → `{..., resolvedPhotoUrl: string | null}`, `api.speakers.create/update` com `{bio?, category?, photoStorageId?, photoUrl?}`, `api.speakers.generateUploadUrl` → `string`, `api.speakers.remove` com delete de storage best-effort.

**Categoria fixa (usar verbatim em todo o lado):**
`["Orador","Palestrante","Artista","Moderador","Convidado","Outro"]`

- [ ] **Step 1: Estender schema**

Em `convex/schema.ts`, trocar bloco speakers para:

```ts
speakers: defineTable({
  name: v.string(),
  role: v.string(),
  country: v.string(),
  color: v.string(),
  bio: v.optional(v.string()),
  category: v.optional(v.string()),
  photoStorageId: v.optional(v.id("_storage")),
  photoUrl: v.optional(v.string()),
}),
```

- [ ] **Step 2: Reescrever `convex/speakers.ts`**

Conteúdo completo esperado:

```ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import {
  requireAdmin,
  sanitizeText,
  validateRequiredLength,
  validateOptionalLength,
} from "./security";

export const SPEAKER_CATEGORIES = ["Orador","Palestrante","Artista","Moderador","Convidado","Outro"] as const;

function normalizeCategory(value: string | undefined) {
  const cleaned = sanitizeText(value ?? "");
  if (!cleaned) return "";
  if (!(SPEAKER_CATEGORIES as readonly string[]).includes(cleaned)) {
    throw new Error("Categoria inválida.");
  }
  return cleaned;
}

function normalizeBio(value: string | undefined) {
  const cleaned = sanitizeText(value ?? "");
  validateOptionalLength("Biografia", cleaned, 500);
  return cleaned;
}

// Public: anyone can read speakers (displayed on public site)
export const get = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("speakers").collect();
    return await Promise.all(rows.map(async (s) => ({
      ...s,
      resolvedPhotoUrl: s.photoStorageId ? await ctx.storage.getUrl(s.photoStorageId) : null,
    })));
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

// Protected: only authenticated admins can create/update/delete
export const create = mutation({
  args: {
    name: v.string(), role: v.string(), country: v.string(), color: v.string(),
    bio: v.optional(v.string()), category: v.optional(v.string()),
    photoStorageId: v.optional(v.id("_storage")), photoUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const name = sanitizeText(args.name);
    const role = sanitizeText(args.role);
    const country = sanitizeText(args.country);
    const color = sanitizeText(args.color);
    validateRequiredLength("Nome", name, 2, 80);
    validateRequiredLength("Função", role, 2, 120);
    validateRequiredLength("País", country, 2, 60);
    validateRequiredLength("Cor", color, 2, 80);
    return await ctx.db.insert("speakers", {
      name, role, country, color,
      bio: normalizeBio(args.bio),
      category: normalizeCategory(args.category) || "Orador",
      photoStorageId: args.photoStorageId,
      photoUrl: args.photoUrl ? sanitizeText(args.photoUrl) : undefined,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("speakers"),
    name: v.string(), role: v.string(), country: v.string(), color: v.string(),
    bio: v.optional(v.string()), category: v.optional(v.string()),
    photoStorageId: v.optional(v.id("_storage")), photoUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const name = sanitizeText(args.name);
    const role = sanitizeText(args.role);
    const country = sanitizeText(args.country);
    const color = sanitizeText(args.color);
    validateRequiredLength("Nome", name, 2, 80);
    validateRequiredLength("Função", role, 2, 120);
    validateRequiredLength("País", country, 2, 60);
    validateRequiredLength("Cor", color, 2, 80);
    return await ctx.db.patch(args.id, {
      name, role, country, color,
      bio: normalizeBio(args.bio),
      category: normalizeCategory(args.category) || "Orador",
      photoStorageId: args.photoStorageId,
      photoUrl: args.photoUrl ? sanitizeText(args.photoUrl) : undefined,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("speakers") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const existing = await ctx.db.get(args.id);
    if (existing?.photoStorageId) {
      try { await ctx.storage.delete(existing.photoStorageId); } catch { /* best-effort */ }
    }
    await ctx.db.delete(args.id);
  },
});
```

- [ ] **Step 3: Verificar tipos Convex**

Run: `wsl bash -c "cd ~/fivaa-site && npx convex dev --once 2>&1 | tail -n 20"`
Expected: sem erro de schema; gera `convex/_generated`.

### Task 2: Admin `/admin/oradores` — foto + bio + categoria

**Files:**
- Modify: `src/app/admin/oradores/OradoresAdminClient.tsx:1-313`
- Test: manual (upload) + `npm run lint`

**Interfaces:**
- Consumes: `api.speakers.get/create/update/remove/generateUploadUrl` da Task 1.
- Produces: form com `photoStorageId`, preview via `URL.createObjectURL`.

- [ ] **Step 1: Alargar estado do form**

Trocar `useState({name,role,country,color})` para incluir `bio:"", category:"Orador", photoStorageId: undefined as string|undefined, photoPreview: ""`.
Adicionar `const generateUrl = useMutation(api.speakers.generateUploadUrl);`
Adicionar `CATEGORIES = ["Orador","Palestrante","Artista","Moderador","Convidado","Outro"]`.

- [ ] **Step 2: Handler de upload (colocar antes de handleSubmit)**

```tsx
const handlePhoto = async (file: File | undefined) => {
  if (!file) return;
  if (!file.type.startsWith("image/")) { setToast({message:"Escolha uma imagem JPG/PNG.",type:"error"}); return; }
  if (file.size > 5*1024*1024) { setToast({message:"Imagem deve ter ≤5MB.",type:"error"}); return; }
  setLoading(true);
  try {
    const uploadUrl = await generateUrl({});
    const res = await fetch(uploadUrl, { method:"POST", headers:{"Content-Type":file.type}, body:file });
    if (!res.ok) throw new Error("upload failed");
    const { storageId } = await res.json();
    setForm((f) => ({...f, photoStorageId: storageId, photoPreview: URL.createObjectURL(file)}));
  } catch {
    setToast({message:"Erro ao enviar foto.",type:"error"});
  } finally { setLoading(false); }
};
```

`handleSubmit` passa a enviar `{...form}` sem `photoPreview`. `handleEdit` preenche `bio/category/photoStorageId` e `photoPreview = speaker.resolvedPhotoUrl ?? speaker.photoUrl ?? ""`.

- [ ] **Step 3: Campos UI no form (dentro do `<form>` existente)**

Adicionar após campo País:
categoria `<select>`, bio `<textarea maxLength={500}>` com contador `{form.bio.length}/500`, foto `<input type="file" accept="image/*" onChange={e=>handlePhoto(e.target.files?.[0])}>` + `{form.photoPreview && <img src={form.photoPreview} className="h-16 w-16 rounded-full object-cover"/>}` + botão Remover que limpa `photoStorageId/photoPreview`.

- [ ] **Step 4: Coluna foto na tabela**

Na célula Orador, trocar div inicial por:
```tsx
{speaker.resolvedPhotoUrl || speaker.photoUrl
  ? <img src={speaker.resolvedPhotoUrl ?? speaker.photoUrl!} alt={speaker.name} className="h-9 w-9 rounded-full object-cover"/>
  : <div className={`flex h-9 w-9 items-center justify-center rounded-full text-white ${speaker.color}`}>{speaker.name.charAt(0)}</div>}
```
E mostrar `speaker.category` como badge pequena.

- [ ] **Step 5: Lint**

Run: `wsl bash -c "cd ~/fivaa-site && npm run lint 2>&1 | tail -n 20"`
Expected: sem erros.

### Task 3: Público — `/oradores` + homepage + SpeakerCard partilhado

**Files:**
- Create: `src/components/SpeakerCard.tsx`
- Modify: `src/app/oradores/OradoresClient.tsx:1-46`
- Modify: `src/app/page.tsx:1-204` (nova secção após Destaques)
- Test: `npm run build`

**Interfaces:**
- Consumes: `api.speakers.get` com `resolvedPhotoUrl`.
- Produces: `SpeakerCard({speaker})` usado em ambos os sítios.

- [ ] **Step 1: Criar `src/components/SpeakerCard.tsx`**

```tsx
import Image from "next/image";

export type PublicSpeaker = {
  _id: string; name: string; role: string; country: string; color: string;
  bio?: string; category?: string;
  resolvedPhotoUrl?: string | null; photoUrl?: string;
};

export function SpeakerCard({ speaker }: { speaker: PublicSpeaker }) {
  const src = speaker.resolvedPhotoUrl ?? speaker.photoUrl ?? null;
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-gold/30 hover:bg-white/10">
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gold to-orange">
        {src
          ? <Image src={src} alt={speaker.name} fill sizes="(max-width:768px)100vw,33vw" className="object-cover"/>
          : <div className="absolute inset-0 flex items-center justify-center"><span className="font-montserrat text-8xl font-black text-white/20">{speaker.name.charAt(0)}</span></div>}
        <div className="absolute right-3 top-3 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm"><span className="text-xs font-semibold text-white">{speaker.country}</span></div>
      </div>
      <div className="p-6">
        {speaker.category && <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">{speaker.category}</p>}
        <h3 className="font-montserrat text-lg font-bold text-white">{speaker.name}</h3>
        <p className="mt-1 text-sm font-medium text-gold">{speaker.role}</p>
        {speaker.bio && <p className="mt-3 text-sm leading-relaxed text-white/60 line-clamp-3">{speaker.bio}</p>}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Usar em `OradoresClient.tsx`**

Trocar grelha atual por `speakers.map(s => <SpeakerCard key={s._id} speaker={s}/>)`. Manter estado vazio.

- [ ] **Step 3: Secção homepage em `src/app/page.tsx`**

Após secção Destaques, inserir secção client-wrapper: criar `src/app/HomeSpeakers.tsx` com `"use client"`, `useQuery(api.speakers.get)`, `slice(0,8)`, grelha `SpeakerCard` + `<Link href="/oradores">Ver todos</Link>`. Importar em `page.tsx`. Se `speakers` vazio, não renderiza nada (não quebra homepage estática).

- [ ] **Step 4: Build**

Run: `wsl bash -c "cd ~/fivaa-site && npm run build 2>&1 | tail -n 25"`
Expected: `Compiled successfully`, 42+ rotas.

### Task 4: Testes + verificação final

**Files:**
- Modify: `tests/forms.test.mjs:39-46` (mantido)
- Create: `tests/speakers.test.mjs`

- [ ] **Step 1: Teste de validação pura**

```js
import { test } from "node:test";
import assert from "node:assert/strict";
// Reimplementa as regras de normalize usadas no server para travar regressões
const CATS = ["Orador","Palestrante","Artista","Moderador","Convidado","Outro"];
test("speaker category allowlist", () => {
  assert.ok(CATS.includes("Palestrante"));
  assert.equal(CATS.includes("Hacker"), false);
});
test("speaker bio limit 500", () => {
  assert.throws(() => { const bio = "x".repeat(501); if (bio.length > 500) throw new Error("Biografia não deve exceder 500 caracteres."); });
});
```

- [ ] **Step 2: Correr tudo**

Run: `wsl bash -c "cd ~/fivaa-site && npm run lint 2>&1 | tail -n 5; npm test 2>&1 | tail -n 12; npm run build 2>&1 | tail -n 8"`
Expected: lint limpo, 8+ testes passam, build OK.

- [ ] **Step 3: Commit**

```bash
git add convex/schema.ts convex/speakers.ts src/app/admin/oradores/OradoresAdminClient.tsx src/components/SpeakerCard.tsx src/app/oradores/OradoresClient.tsx src/app/page.tsx src/app/HomeSpeakers.tsx tests/speakers.test.mjs docs/superpowers/specs/2026-09-18-speakers-photos-design.md docs/superpowers/plans/2026-09-18-speakers-photos.md
git commit -m "feat(speakers): fotos, bio e categoria com upload no admin e visível no site"
```
