# Design: Inscrição com anexos + aviso ao admin por email (Resend via Convex)

Data: 2026-09-19
Estado: aprovado pelo utilizador (secções 1–3 validadas em chat)
Path: architectural (subsistema novo de email + alterações ao fluxo de inscrição + admin)
Origem: pedido "duas coisas na inscrição → admin aprova → email"

## 1. Objetivo

A pessoa inscreve-se em `/inscricao` anexando **comprovativo de pagamento** (JPG/PNG/PDF)
e **foto** (JPG/PNG), pelo mesmo processo de upload dos oradores. A submissão cria um
registo `pending` visível no admin e dispara um **email automático a avisar o admin**.
O admin aprova (confirmada) ou cancela no backoffice existente.

## 2. Decisões aprovadas

- Uploads: mesmo processo dos oradores (Convex Storage via `generateUploadUrl`, preview,
  ≤5MB no client). Ambos os anexos **obrigatórios**.
- Email: **Resend via componente oficial do Convex** (`@convex-dev/resend`).
- Remetente: `FIVAA <inscricoes@vitaleevo.ao>` (domínio `vitaleevo.ao` já verificado
  na conta Resend; trocar para `fivaaforum.com` quando esse domínio for validado no DNS).
- Destinatário: variável nova `INSCRICOES_NOTIFY_EMAIL` (ex. `inscricoes@fivaaforum.com`).
- Atomicidade: registo `pending` + agendamento do email na mesma transação
  (ou as duas coisas acontecem ou nenhuma).
- Pré-requisitos externos: conta Resend, validação do domínio `fivaaforum.com` no DNS,
  `RESEND_API_KEY` no ambiente do Convex (prod e dev).

## 3. Arquitetura e fluxo

1. Visitante preenche `/inscricao` + 2 anexos (upload direto ao Storage, com preview).
2. `POST /api/registration` valida e chama `registrations.create` com os storage IDs.
3. `create` verifica que os ficheiros existem, insere `pending` e agenda o email.
4. Componente Resend envia email ao admin com dados + links dos anexos (com retry próprio).
5. Admin revê em `/admin/inscricoes` (foto + comprovativo visíveis) e muda o estado.

Peças novas: componente Resend, `generateUploadUrl` público de inscrições,
`InscricaoForm.tsx`, colunas de anexos no admin, `convex/emails.ts`.
Reaproveitado: rate limit/antibot/segredo, estados pending/confirmed/cancelled,
padrão de upload e remoção best-effort dos oradores.

## 4. Componentes

### 4.1 Formulário público (`InscricaoForm.tsx` em `/inscricao`)

Campos atuais (nome, email, telefone, país, organização, bilhete) + 2 uploads com
preview e botão remover. Submeter bloqueado durante uploads. Ambos obrigatórios.

### 4.2 Backend Convex

- Schema `registrations`: `paymentStorageId` e `photoStorageId` como
  `v.optional(v.id("_storage"))` (opcionais no schema para não partir registos antigos;
  obrigatórios na validação do `create`).
- `generateUploadUrl` público só para inscrições (abuso mitigado por 5MB + rate limit
  existente no `create`: 3 tentativas/30min por IP/email).
- `create`: confirma existência dos ficheiros (`storage.getMetadata`), insere `pending`,
  agenda email via scheduler do componente Resend.
- `remove`: apaga os dois ficheiros do Storage (best-effort), como nos oradores.

### 4.3 Email (`convex/emails.ts` + componente Resend)

Conteúdo: nome, email, telefone, país, organização, bilhete + links diretos para
comprovativo e foto (via `storage.getUrl` no momento do envio). Falhas de envio:
retry do componente + erro visível no dashboard do Convex; a inscrição nunca se perde.

### 4.4 Admin (`/admin/inscricoes`)

Miniatura da foto + link "ver comprovativo" por linha; selo de anexo em falta só em
registos antigos. Aprovação no select de estado atual, sem mudanças.

## 5. Erros, segurança e testes

- Upload inválido (tipo/tamanho) → mensagem imediata, sem submeter; falha de rede →
  toast e nova tentativa. Rejeições de submissão usam as mensagens públicas atuais.
- Upload público intencional mas limitado (tipo + tamanho); `create` mantém segredo
  interno + honeypot + rate limit. Ficheiros órfãos aceites nesta fase (limpeza futura).
  Leitura de anexos atrás de `requireAdmin`.
- Testes: unitários (anexos obrigatórios, IDs inválidos, conteúdo do email),
  `npm run lint`, `npm test`, `npm run build` (42+ rotas).
- Manual: fluxo completo em dev com chave de teste Resend; repetição em produção após
  DNS + `npx convex deploy`.

## 6. Fora de âmbito (futuro)

- Email de confirmação/bilhete para o inscrito.
- Bilhete em PDF/QR.
- Limpeza automática de ficheiros órfãos (cron).
- Validação do NIB/referência de pagamento contra o comprovativo.
