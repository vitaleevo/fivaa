# FIVAA — Fórum & Festival Internacional da Valorização da Arte Africana

Website oficial do FIVAA 2026 — Palácio de Ferro, Luanda, Angola.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Estilo:** Tailwind CSS 4
- **Backend:** Convex (auth, base de dados, realtime)
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

## Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `CONVEX_DEPLOYMENT` | ID do deployment Convex |
| `NEXT_PUBLIC_CONVEX_URL` | URL pública do Convex |
| `NEXT_PUBLIC_CONVEX_SITE_URL` | URL do site Convex |
| `CONVEX_SITE_URL` | URL do Convex (server-side) |
| `JWT_PRIVATE_KEY` | Chave privada JWT |
| `FIVAA_ADMIN_EMAILS` | E-mails de admin (vírgula separados) |

## Estrutura

```
src/
  app/           → Páginas (App Router)
  components/    → Componentes React
  lib/           → Utilitários
convex/          → Backend Convex (schema, functions)
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
