# Inscrição com anexos + email ao admin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Visitante inscreve-se com comprovativo de pagamento + foto, o registo fica pendente no admin e o admin recebe email via Resend.

**Architecture:** Uploads diretos ao Convex Storage (mesmo padrão dos oradores); `registrations.create` valida os ficheiros, insere `pending` e agenda o email Resend na mesma mutação (atómico); admin revê anexos e aprova no estado atual.

**Tech Stack:** Next.js 16 App Router, Convex (schema, mutations, Storage, scheduler), `@convex-dev/resend`, React, Tailwind CSS 4.

**Spec:** `docs/superpowers/specs/2026-09-19-inscricao-anexos-email-design.md`

## Global Constraints

- PT-AO como idioma principal, sem quebrar i18n existente.
- Ambos os anexos obrigatórios no `create`.
- Ficheiros: comprovativo JPG/PNG/PDF, foto JPG/PNG; cada um ≤5MB (client + server).
- Leitura de inscrições e anexos sempre atrás de `requireAdmin`.
- `RESEND_TEST_MODE` default `true` (só endereços `@resend.dev`); produção exige `false` + `RESEND_API_KEY` + `INSCRICOES_NOTIFY_EMAIL`.
- Remetente fixo: `FIVAA <inscricoes@fivaaforum.com>`.

## HUMAN STEPS (executor não faz; pedir ao utilizador)

- Criar conta Resend, validar o domínio `fivaaforum.com` no DNS.
- Definir no ambiente do Convex (dev e prod): `RESEND_API_KEY`, `INSCRICOES_NOTIFY_EMAIL`,
  `RESEND_TEST_MODE=false` só em prod.
- Correr `npx convex deploy` após o código estar no main.

## File Structure

- Create: `convex/convex.config.ts` — regista o componente Resend.
- Create: `convex/emails.ts` — `sendNewRegistrationEmail(ctx, data)` + HTML do email.
- Modify: `convex/schema.ts` — `registrations` ganha `paymentStorageId?`, `photoStorageId?`.
- Modify: `convex/registrations.ts` — `generateUploadUrl` público; `create` com anexos + email;
  `get` com URLs resolvidos; `remove` com limpeza de ficheiros.
- Modify: `convex/_generated/*` — via `npx convex codegen` (commit incluído).
- Modify: `src/lib/form-validation.ts` — `registrationFields` exige os dois storage IDs.
- Modify: `src/app/api/registration/route.ts` — sem edição (spread `...fields` já passa os novos campos); só verificar.
- Create: `src/app/inscricao/InscricaoForm.tsx` — formulário público com 2 uploads.
- Modify: `src/app/inscricao/InscricaoClient.tsx` — nova secção "Inscreva-se" com o form.
- Modify: `src/app/admin/inscricoes/InscricoesClient.tsx` — coluna "Anexos".
- Modify: `tests/forms.test.mjs` — input passa a incluir os storage IDs + casos novos.
- Modify: `package.json` + `package-lock.json` — via `npm install @convex-dev/resend`.
- Modify: `.env.example` — documenta `RESEND_API_KEY`, `RESEND_TEST_MODE`, `INSCRICOES_NOTIFY_EMAIL`.

---

### Task 1: Componente Resend — install, config, emails.ts

**Files:**
- Create: `convex/convex.config.ts`
- Create: `convex/emails.ts`
- Modify: `.env.example`
- Test: `npx convex codegen` gera `components.resend` sem erro; `npm run lint` limpo.

**Interfaces:**
- Consumes: `components.resend` (gerado pelo codegen), envs `RESEND_API_KEY`, `RESEND_TEST_MODE`, `INSCRICOES_NOTIFY_EMAIL`.
- Produces: `sendNewRegistrationEmail(ctx: MutationCtx, data: NewRegistrationEmail): Promise<EmailId>` usado pela Task 2.

- [ ] **Step 1: Instalar o componente**

Run: `wsl bash -c "cd ~/fivaa-site && npm install @convex-dev/resend"`
Expected: `added 1 package`, sem erros.

- [ ] **Step 2: Criar `convex/convex.config.ts`**

```ts
import { defineApp } from "convex/server";
import resend from "@convex-dev/resend/convex.config.js";

const app = defineApp();
app.use(resend);

export default app;
```

- [ ] **Step 3: Criar `convex/emails.ts`**

```ts
import { components } from "./_generated/api";
import { Resend } from "@convex-dev/resend";
import type { MutationCtx } from "./_generated/server";

const resend = new Resend(components.resend, {
  testMode: process.env.RESEND_TEST_MODE !== "false",
  apiKey: process.env.RESEND_API_KEY,
});

export type NewRegistrationEmail = {
  name: string;
  email: string;
  phone: string;
  country: string;
  org: string;
  ticketName: string;
  paymentUrl: string;
  photoUrl: string;
};

function emailHtml(data: NewRegistrationEmail) {
  return `<h2>Nova inscrição — FIVAA</h2>
<p><strong>Nome:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Telefone:</strong> ${data.phone}</p>
<p><strong>País:</strong> ${data.country}</p>
<p><strong>Organização:</strong> ${data.org || "—"}</p>
<p><strong>Bilhete:</strong> ${data.ticketName}</p>
<p><a href="${data.paymentUrl}">Ver comprovativo de pagamento</a></p>
<p><a href="${data.photoUrl}">Ver foto</a></p>`;
}

export async function sendNewRegistrationEmail(ctx: MutationCtx, data: NewRegistrationEmail) {
  const isTest = process.env.RESEND_TEST_MODE !== "false";
  const to = isTest ? "delivered@resend.dev" : (process.env.INSCRICOES_NOTIFY_EMAIL ?? "").trim();
  if (!to) {
    throw new Error("INSCRICOES_NOTIFY_EMAIL not configured");
  }
  if (!isTest && !process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY not configured");
  }
  return await resend.sendEmail(ctx, {
    from: "FIVAA <inscricoes@fivaaforum.com>",
    to,
    subject: `Nova inscrição: ${data.name}`,
    html: emailHtml(data),
  });
}
```

- [ ] **Step 4: Documentar envs no `.env.example`**

Acrescentar no fim do ficheiro:

```
RESEND_API_KEY=
RESEND_TEST_MODE=true
INSCRICOES_NOTIFY_EMAIL=
```

- [ ] **Step 5: Regenerar tipos Convex**

Run: `wsl bash -c "cd ~/fivaa-site && npx convex codegen"`
Expected: sem erros; `convex/_generated/api.d.ts` passa a conter `components`.

- [ ] **Step 6: Lint + commit**

Run: `wsl bash -c "cd ~/fivaa-site && npm run lint 2>&1 | tail -n 5"`
Expected: 0 erros.

```bash
git add package.json package-lock.json convex/convex.config.ts convex/emails.ts convex/_generated .env.example
git commit -m "feat(email): componente Resend com envio de nova inscricao ao admin"
```

### Task 2: Backend inscrições — schema, upload público, create, get, remove

**Files:**
- Modify: `convex/schema.ts` (bloco `registrations`)
- Modify: `convex/registrations.ts`
- Test: `tests/forms.test.mjs` (casos novos na Task 3) + verificação manual de tipos via build na Task 6.

**Interfaces:**
- Consumes: `sendNewRegistrationEmail` da Task 1; `requireAdmin`, `sanitizeText`,
  `validateRequiredLength`, `validateOptionalLength`, `validateEmail`, `validatePhone`,
  `enforceSubmissionRateLimit`, `ensureHumanSubmission`, `requireTrustedSubmission` de `convex/security.ts`.
- Produces: `api.registrations.generateUploadUrl` (público), `create` com
  `{paymentStorageId: Id<"_storage">, photoStorageId: Id<"_storage">}` obrigatórios,
  `get` com `resolvedPaymentUrl`/`resolvedPhotoUrl`, `remove` com limpeza.

- [ ] **Step 1: Estender o schema**

Em `convex/schema.ts`, bloco `registrations`, acrescentar:

```ts
paymentStorageId: v.optional(v.id("_storage")),
photoStorageId: v.optional(v.id("_storage")),
```

- [ ] **Step 2: Reescrever `convex/registrations.ts`**

Conteúdo completo:

```ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import {
  enforceSubmissionRateLimit,
  ensureHumanSubmission,
  requireTrustedSubmission,
  requireAdmin,
  sanitizeText,
  validateEmail,
  validateOptionalLength,
  validatePhone,
  validateRequiredLength,
} from "./security";
import { sendNewRegistrationEmail } from "./emails";

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

// Public: browser uploads go straight to Storage (unguessable URLs).
// Abuse is bounded by the 5MB client check and the rate limit on `create`.
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Public: anyone can create a registration (form submission)
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    country: v.string(),
    org: v.string(),
    ticketId: v.string(),
    paymentStorageId: v.id("_storage"),
    photoStorageId: v.id("_storage"),
    submittedAt: v.number(),
    honeypot: v.optional(v.string()),
    clientIp: v.string(),
    submissionSecret: v.string(),
  },
  handler: async (ctx, args) => {
    requireTrustedSubmission(args.submissionSecret);
    ensureHumanSubmission({
      honeypot: args.honeypot,
      submittedAt: args.submittedAt,
    });

    const name = sanitizeText(args.name);
    const email = sanitizeText(args.email);
    const phone = sanitizeText(args.phone);
    const country = sanitizeText(args.country);
    const org = sanitizeText(args.org);
    const ticketId = sanitizeText(args.ticketId);

    validateRequiredLength("Nome", name, 3, 80);
    validateEmail(email);
    validatePhone(phone);
    validateRequiredLength("País", country, 2, 50);
    validateOptionalLength("Organização / Cargo", org, 100);

    const availableTickets = await ctx.db.query("tickets").collect();
    const ticket = availableTickets.find((t) => t._id === ticketId);

    if (!ticket) {
      throw new Error("Bilhete inválido.");
    }

    const paymentMeta = await ctx.storage.getMetadata(args.paymentStorageId);
    if (!paymentMeta) {
      throw new Error("Comprovativo inválido.");
    }
    if (paymentMeta.size > MAX_ATTACHMENT_BYTES) {
      throw new Error("Comprovativo excede 5MB.");
    }
    const photoMeta = await ctx.storage.getMetadata(args.photoStorageId);
    if (!photoMeta) {
      throw new Error("Foto inválida.");
    }
    if (photoMeta.size > MAX_ATTACHMENT_BYTES) {
      throw new Error("Foto excede 5MB.");
    }

    await enforceSubmissionRateLimit(ctx, {
      scope: "registration",
      clientIp: args.clientIp,
      identity: email,
      maxAttempts: 3,
      windowMs: 1000 * 60 * 30,
      blockMs: 1000 * 60 * 60,
    });

    const id = await ctx.db.insert("registrations", {
      name,
      email,
      phone,
      country,
      org,
      ticketId,
      paymentStorageId: args.paymentStorageId,
      photoStorageId: args.photoStorageId,
      status: "pending",
    });

    const paymentUrl = await ctx.storage.getUrl(args.paymentStorageId);
    const photoUrl = await ctx.storage.getUrl(args.photoStorageId);
    if (!paymentUrl || !photoUrl) {
      throw new Error("Falha a resolver anexos.");
    }

    await sendNewRegistrationEmail(ctx, {
      name,
      email,
      phone,
      country,
      org,
      ticketName: ticket.name,
      paymentUrl,
      photoUrl,
    });

    return id;
  },
});

// Protected: only authenticated admins can read registrations
export const get = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const rows = await ctx.db.query("registrations").collect();
    return await Promise.all(
      rows.map(async (r) => ({
        ...r,
        resolvedPaymentUrl: r.paymentStorageId
          ? await ctx.storage.getUrl(r.paymentStorageId)
          : null,
        resolvedPhotoUrl: r.photoStorageId
          ? await ctx.storage.getUrl(r.photoStorageId)
          : null,
      })),
    );
  },
});

export const remove = mutation({
  args: { id: v.id("registrations") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const existing = await ctx.db.get(args.id);
    for (const fileId of [existing?.paymentStorageId, existing?.photoStorageId]) {
      if (!fileId) continue;
      try {
        await ctx.storage.delete(fileId);
      } catch {
        // best-effort: não bloquear remoção se ficheiro já sumiu
      }
    }
    await ctx.db.delete(args.id);
  },
});

export const updateStatus = mutation({
  args: { id: v.id("registrations"), status: v.union(v.literal("pending"), v.literal("confirmed"), v.literal("cancelled")) },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.patch(args.id, { status: args.status });
  },
});
```

- [ ] **Step 3: Codegen + lint + commit**

Run: `wsl bash -c "cd ~/fivaa-site && npx convex codegen && npm run lint 2>&1 | tail -n 5"`
Expected: codegen sem erros; lint 0 erros.

```bash
git add convex/schema.ts convex/registrations.ts convex/_generated
git commit -m "feat(inscricao): anexos obrigatorios e email Resend no create"
```

### Task 3: API route + validação — aceitar os storage IDs

**Files:**
- Modify: `src/lib/form-validation.ts` (`registrationFields`)
- Modify: `tests/forms.test.mjs` (input + casos novos)
- Test: `npm test` verde.

**Interfaces:**
- Consumes: nada novo.
- Produces: `registrationFields` devolve `{..., paymentStorageId, photoStorageId}`; o spread
  `...fields` em `src/app/api/registration/route.ts:23-27` já os passa à mutation (verificar, sem editar).

- [ ] **Step 1: Primeiro o teste a falhar**

Em `tests/forms.test.mjs`, no objeto de input da inscrição, acrescentar:

```js
paymentStorageId: "jd123",
photoStorageId: "jd456",
```

E acrescentar estes casos no fim do ficheiro:

```js
test("registration requires payment proof and photo", () => {
  const base = {
    name: "Aina Manuel", email: "aina@example.com", phone: "+244900000000",
    country: "Angola", org: "", ticketId: "jd7ticket",
    startedAt: Date.now() - 2000, honeypot: "",
    paymentStorageId: "jd7pay", photoStorageId: "jd7photo",
  };
  assert.equal(registrationFields(base).paymentStorageId, "jd7pay");
  assert.throws(() => registrationFields({ ...base, paymentStorageId: "" }), /Comprovativo/);
  assert.throws(() => registrationFields({ ...base, photoStorageId: "" }), /Foto/);
});
```

Run: `wsl bash -c "cd ~/fivaa-site && npm test 2>&1 | tail -n 8"`
Expected: FAIL em `registration requires payment proof and photo` (função ainda não exige).

- [ ] **Step 2: Implementação mínima**

Em `src/lib/form-validation.ts`, em `registrationFields`, acrescentar antes do `return`:

```ts
const paymentStorageId = field(body, "paymentStorageId", "Comprovativo", 1, 200);
const photoStorageId = field(body, "photoStorageId", "Foto", 1, 200);
```

E incluir ambos no objeto devolvido:

```ts
return {
  ...values, phone,
  country: field(body, "country", "País", 2, 50),
  org: field(body, "org", "Organização", 0, 100),
  ticketId: field(body, "ticketId", "Bilhete", 1, 100),
  paymentStorageId,
  photoStorageId,
};
```

- [ ] **Step 3: Correr testes + commit**

Run: `wsl bash -c "cd ~/fivaa-site && npm test 2>&1 | tail -n 12"`
Expected: todos passam (12+ testes).

```bash
git add src/lib/form-validation.ts tests/forms.test.mjs
git commit -m "feat(inscricao): validacao exige comprovativo e foto"
```

### Task 4: Formulário público com 2 uploads

**Files:**
- Create: `src/app/inscricao/InscricaoForm.tsx`
- Modify: `src/app/inscricao/InscricaoClient.tsx` (nova secção após os cartões)
- Test: `npm run lint` + `npm run build`.

**Interfaces:**
- Consumes: `api.tickets.get` (lista p/ select), `api.registrations.generateUploadUrl`,
  `POST /api/registration` com `{name,email,phone,country,org,ticketId,startedAt,honeypot,paymentStorageId,photoStorageId}`.
- Produces: secção "Inscreva-se" em `/inscricao`.

- [ ] **Step 1: Criar `src/app/inscricao/InscricaoForm.tsx`**

```tsx
"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

type UploadState = { storageId?: Id<"_storage">; preview: string; fileName: string };

const emptyUpload: UploadState = { storageId: undefined, preview: "", fileName: "" };

const MAX_BYTES = 5 * 1024 * 1024;

export default function InscricaoForm() {
  const tickets = useQuery(api.tickets.get);
  const generateUploadUrl = useMutation(api.registrations.generateUploadUrl);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Angola");
  const [org, setOrg] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [payment, setPayment] = useState<UploadState>(emptyUpload);
  const [photo, setPhoto] = useState<UploadState>(emptyUpload);
  const [uploading, setUploading] = useState<"payment" | "photo" | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [startedAt] = useState(() => Date.now());

  const upload = async (kind: "payment" | "photo", file: File | undefined, acceptPdf: boolean) => {
    if (!file) return;
    const okType = acceptPdf
      ? file.type.startsWith("image/") || file.type === "application/pdf"
      : file.type.startsWith("image/");
    if (!okType) {
      setError(kind === "payment" ? "Comprovativo deve ser JPG, PNG ou PDF." : "Foto deve ser JPG ou PNG.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Cada ficheiro deve ter no máximo 5MB.");
      return;
    }
    setError("");
    setUploading(kind);
    try {
      const uploadUrl = await generateUploadUrl({});
      const res = await fetch(uploadUrl, { method: "POST", headers: { "Content-Type": file.type }, body: file });
      if (!res.ok) throw new Error("upload failed");
      const { storageId } = (await res.json()) as { storageId: Id<"_storage"> };
      const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : "";
      const state = { storageId, preview, fileName: file.name };
      if (kind === "payment") setPayment(state);
      else setPhoto(state);
    } catch {
      setError("Erro ao enviar ficheiro. Tente novamente.");
    } finally {
      setUploading(null);
    }
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!payment.storageId || !photo.storageId) {
      setError("Anexe o comprovativo de pagamento e a foto.");
      return;
    }
    if (!ticketId) {
      setError("Escolha a modalidade de bilhete.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone, country, org, ticketId,
          startedAt, honeypot: "",
          paymentStorageId: payment.storageId,
          photoStorageId: photo.storageId,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(data.error ?? "submit failed");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar inscrição.");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-[1.5rem] border border-green-dark/10 bg-white p-8 text-center shadow-sm">
        <p className="font-montserrat text-2xl font-black text-green-dark">Inscrição recebida!</p>
        <p className="mt-3 text-sm leading-relaxed text-gray-medium">
          A nossa equipa vai rever o seu comprovativo. Receberá novidades por email.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-green-dark/15 bg-white px-4 py-3 text-sm text-green-dark outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30";

  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-gold/20 bg-white p-8 shadow-[0_24px_70px_rgba(18,71,52,0.10)]">
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={inputCls} required minLength={3} maxLength={80} placeholder="Nome completo *"
          value={name} onChange={(e) => setName(e.target.value)} />
        <input className={inputCls} required type="email" placeholder="Email *"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className={inputCls} required placeholder="Telefone * (ex: +244 900 000 000)"
          value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input className={inputCls} required minLength={2} maxLength={50} placeholder="País *"
          value={country} onChange={(e) => setCountry(e.target.value)} />
        <input className={`${inputCls} sm:col-span-2`} maxLength={100} placeholder="Organização / Cargo (opcional)"
          value={org} onChange={(e) => setOrg(e.target.value)} />
        <select className={`${inputCls} sm:col-span-2`} required value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}>
          <option value="">Modalidade de bilhete *</option>
          {(tickets ?? []).map((t) => (
            <option key={t._id} value={t._id}>{t.name} — {t.price}</option>
          ))}
        </select>
        <label className="rounded-xl border border-dashed border-green-dark/25 p-4 text-sm">
          <span className="font-bold text-green-dark">Comprovativo de pagamento *</span>
          <span className="mt-1 block text-xs text-gray-medium">JPG, PNG ou PDF até 5MB</span>
          {payment.fileName && <span className="mt-1 block text-xs font-semibold text-green-dark">{payment.fileName}</span>}
          <input type="file" accept="image/*,application/pdf" className="mt-2 w-full text-xs"
            disabled={uploading !== null}
            onChange={(e) => upload("payment", e.target.files?.[0], true)} />
          {uploading === "payment" && <span className="text-xs text-gray-medium">A enviar...</span>}
        </label>
        <label className="rounded-xl border border-dashed border-green-dark/25 p-4 text-sm">
          <span className="font-bold text-green-dark">Foto *</span>
          <span className="mt-1 block text-xs text-gray-medium">JPG ou PNG até 5MB</span>
          {photo.preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo.preview} alt="Pré-visualização da foto" className="mt-2 h-16 w-16 rounded-full object-cover" />
          )}
          <input type="file" accept="image/*" className="mt-2 w-full text-xs"
            disabled={uploading !== null}
            onChange={(e) => upload("photo", e.target.files?.[0], false)} />
          {uploading === "photo" && <span className="text-xs text-gray-medium">A enviar...</span>}
        </label>
      </div>
      {error && <p role="alert" className="mt-4 text-sm font-semibold text-red-600">{error}</p>}
      <button type="submit" disabled={sending || uploading !== null}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 font-montserrat text-sm font-extrabold text-green-dark transition-all hover:-translate-y-0.5 hover:bg-gold-metallic disabled:opacity-50">
        {sending ? "A enviar..." : "Submeter inscrição"}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Montar a secção em `InscricaoClient.tsx`**

No topo: `import InscricaoForm from "./InscricaoForm";`

Após o fecho da `</section>` dos cartões (antes do `<TribalDivider`), inserir:

```tsx
<section className="site-grid relative bg-cream py-20 md:py-28">
  <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-3xl text-center">
      <Badge>Inscreva-se</Badge>
      <h2 className="mt-6 font-montserrat text-4xl font-black tracking-[-0.035em] text-green-dark sm:text-5xl">
        Submeta a sua inscrição
      </h2>
      <p className="mt-5 text-base leading-relaxed text-gray-medium sm:text-lg">
        Preencha os dados e anexe o comprovativo de pagamento e a foto. A equipa confirma de seguida.
      </p>
    </div>
    <div className="mt-10">
      <InscricaoForm />
    </div>
  </div>
</section>
```

- [ ] **Step 3: Lint + build + commit**

Run: `wsl bash -c "cd ~/fivaa-site && npm run lint 2>&1 | tail -n 5 && npm run build 2>&1 | tail -n 8"`
Expected: lint 0 erros; build `Compiled successfully`, 42+ rotas.

```bash
git add src/app/inscricao/InscricaoForm.tsx src/app/inscricao/InscricaoClient.tsx
git commit -m "feat(inscricao): formulario publico com comprovativo e foto"
```

### Task 5: Admin — coluna de anexos

**Files:**
- Modify: `src/app/admin/inscricoes/InscricoesClient.tsx` (cabeçalho, linha, `emptyColSpan`)
- Test: `npm run lint`.

**Interfaces:**
- Consumes: `reg.resolvedPaymentUrl`, `reg.resolvedPhotoUrl` da Task 2.
- Produces: coluna "Anexos" com miniatura + link.

- [ ] **Step 1: Cabeçalho**

Após `<AdminTableHeadCell>Bilhete</AdminTableHeadCell>`, inserir:

```tsx
<AdminTableHeadCell>Anexos</AdminTableHeadCell>
```

- [ ] **Step 2: Célula da linha**

Após o bloco do `AdminBadge` do bilhete, inserir:

```tsx
<AdminTableCell>
  <div className="flex items-center gap-2">
    {reg.resolvedPhotoUrl ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={reg.resolvedPhotoUrl} alt={reg.name} className="h-9 w-9 rounded-full object-cover" />
    ) : (
      <span className="rounded-full bg-amber-100 px-2 py-1 text-[11px] font-bold text-amber-700">sem foto</span>
    )}
    {reg.resolvedPaymentUrl ? (
      <a href={reg.resolvedPaymentUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-green-dark underline underline-offset-2">
        comprovativo
      </a>
    ) : (
      <span className="rounded-full bg-amber-100 px-2 py-1 text-[11px] font-bold text-amber-700">sem comprovativo</span>
    )}
  </div>
</AdminTableCell>
```

- [ ] **Step 3: Ajustar `emptyColSpan`**

Trocar `emptyColSpan={7}` por `emptyColSpan={8}`.

- [ ] **Step 4: Lint + commit**

Run: `wsl bash -c "cd ~/fivaa-site && npm run lint 2>&1 | tail -n 5"`
Expected: 0 erros.

```bash
git add src/app/admin/inscricoes/InscricoesClient.tsx
git commit -m "feat(admin): anexos visiveis na lista de inscricoes"
```

### Task 6: Verificação final

**Files:** nenhum (só comandos).

- [ ] **Step 1: Suite completa**

Run: `wsl bash -c "cd ~/fivaa-site && npm run lint 2>&1 | tail -n 5 && npm test 2>&1 | tail -n 12 && npm run build 2>&1 | tail -n 8"`
Expected: lint 0 erros; testes todos passam; build OK com 42+ rotas.

- [ ] **Step 2: Pedir ao utilizador os HUMAN STEPS**

Parar e pedir: conta Resend + DNS `fivaaforum.com` + envs no Convex + `npx convex deploy`.
Só após isto, verificação manual: inscrição em dev (email vai para `delivered@resend.dev`
enquanto `RESEND_TEST_MODE=true`) → linha pendente no admin com anexos → aprovar.
