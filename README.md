# FIVAA — Fórum & Festival Internacional da Valorização da Arte Africana

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss&logoColor=white)
![Convex](https://img.shields.io/badge/Convex-backend-E10098?logo=convex&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?logo=vercel&logoColor=white)
[![Website](https://img.shields.io/website?down_color=red&down_message=offline&up_color=green&up_message=online&url=https%3A%2F%2Ffivaa.com)](https://fivaa.com)

Website oficial do FIVAA 2026 — Palácio de Ferro, Luanda, Angola.

**Produção:** https://fivaa.com

## Funcionalidades

- 🎟️ **Inscrições** — formulário de registo com bilhetes (honeypot, timing anti-bot, rate-limit)
- 💬 **Contactos** — formulário com proteção de submissões (secret interno server-side)
- 🔐 **Backoffice admin** — login único (email + password), gestão de inscrições, mensagens, oradores, programação, bilhetes e testemunhos
- 🛡️ **Segurança** — auth JWT (RS256), rate-limiting por IP/email, validação server-side, CSP estrito, sem dados de clientes expostos publicamente

## Stack

- **Framework:** Next.js 16 (App Router)
- **Estilo:** Tailwind CSS 4
- **Backend:** Convex (auth, base de dados, realtime)
- **Autenticação:** @convex-dev/auth (Password provider, JWT RS256)
- **Idioma:** Português de Angola (PT-AO)

## Setup Local

```bash
# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env.local
# Preencher os valores do Convex em .env.local

# Iniciar Convex (terminal 1)
npx convex dev

# Iniciar Next.js (terminal 2)
npm run dev
```

O site fica disponível em http://localhost:3000

## Deploy na Vercel

1. Push do código para um repositório GitHub
2. Importar o repositório em [vercel.com/new](https://vercel.com/new)
3. Configurar as **Environment Variables** (ver `.env.example`)
4. Deploy automático

> O backend Convex deve apontar para o mesmo deployment usado em produção (`NEXT_PUBLIC_CONVEX_URL`).

## Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `CONVEX_DEPLOYMENT` | ID do deployment Convex |
| `NEXT_PUBLIC_CONVEX_URL` | URL pública do Convex |
| `NEXT_PUBLIC_CONVEX_SITE_URL` | URL do site Convex |
| `CONVEX_SITE_URL` | URL do Convex (server-side) |
| `JWT_PRIVATE_KEY` | Chave privada JWT (PEM PKCS#8, server-side) |
| `JWKS` | Chaves públicas do JWT (JWK Set) |
| `FORM_SUBMISSION_SECRET` | Segredo interno Vercel ↔ Convex para formulários |
| `FIVAA_ADMIN_EMAILS` | E-mails de admin (vírgula separados) |
| `FIVAA_ENABLE_ADMIN_SETUP` | `true` para permitir criação do 1.º admin (desativar depois) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Chave pública Cloudflare Turnstile |
| `TURNSTILE_SECRET_KEY` | Chave secreta Cloudflare Turnstile (server-side) |

## Segurança

- Login admin restrito a `FIVAA_ADMIN_EMAILS` (verificado no servidor, `requireAdmin`)
- Formulários exigem secret interno + prova de humano (honeypot + timing) + validação + rate-limit
- Queries de dados de clientes (`registrations`, `messages`) só para admins autenticados
- CSP, HSTS, X-Frame-Options, X-Content-Type-Options e rate limiting via middleware
- `.env` nunca versionado (ver `.gitignore`); apenas `.env.example` com placeholders

## Estrutura

```
src/
  app/           → Páginas (App Router) + rotas API (POST-only)
  components/    → Componentes React
  lib/           → Utilitários
  proxy.ts       → Middleware (auth + security headers)
convex/          → Backend Convex (schema, functions, auth, security)
public/          → Imagens e estáticos
```

## Comandos

```bash
npm run dev       # Desenvolvimento
npm run build     # Build de produção
npm run start     # Servidor de produção
npm run lint      # Linting
npx convex dev    # Convex dev server
npx convex deploy # Deploy Convex
```
