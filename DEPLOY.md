# Deploy do FIVAA na Vercel

## Pré-requisitos

1. Conta na [Vercel](https://vercel.com)
2. Conta no [Convex](https://convex.dev)
3. Node.js 18+ instalado

## Passo 1: Configurar o Convex

```bash
# Instalar convex se necessário
npm install -g convex

# Fazer login no Convex
npx convex login

# Deploy do schema e functions
npx convex deploy
```

Anote o URL do deployment (ex: `grateful-mouse-771`).

## Passo 2: Importar na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Importe o repositório Git
3. Na secção **Environment Variables**, adicione:

| Nome | Valor |
|------|-------|
| `CONVEX_DEPLOYMENT` | `dev:grateful-mouse-771` |
| `NEXT_PUBLIC_CONVEX_URL` | `https://grateful-mouse-771.convex.cloud` |
| `NEXT_PUBLIC_CONVEX_SITE_URL` | `https://grateful-mouse-771.convex.site` |
| `CONVEX_SITE_URL` | `https://grateful-mouse-771.convex.site` |
| `JWT_PRIVATE_KEY` | *(copiar do .env.auth)* |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | *(site key do Cloudflare Turnstile)* |
| `TURNSTILE_SECRET_KEY` | *(secret key do Cloudflare Turnstile)* |
| `FORM_SUBMISSION_SECRET` | *(mesmo valor na Vercel e no Convex)* |
| `FIVAA_ADMIN_EMAILS` | `admin@fivaaforum.com` |

4. Clique em **Deploy**

## Passo 3: Configurar Domínio (Opcional)

1. Na Vercel, vá a **Settings > Domains**
2. Adicione `fivaaforum.com`
3. Configure os DNS conforme instruções da Vercel

## Variáveis de Ambiente

- `CONVEX_DEPLOYMENT` - ID do deployment Convex (usado por `npx convex dev`)
- `NEXT_PUBLIC_CONVEX_URL` - URL pública do Convex (client-side)
- `NEXT_PUBLIC_CONVEX_SITE_URL` - URL do site Convex (para auth)
- `CONVEX_SITE_URL` - URL do Convex no server-side
- `JWT_PRIVATE_KEY` - Chave privada JWT para autenticação
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` - chave pública do widget anti-bot
- `TURNSTILE_SECRET_KEY` - segredo usado para validar o token no servidor
- `FORM_SUBMISSION_SECRET` - segredo interno compartilhado entre Vercel e Convex para aceitar submissões
- `FIVAA_ADMIN_EMAILS` - lista de e-mails permitidos no backoffice

## Comandos Úteis

```bash
# Desenvolvimento local
npm run dev

# Build de produção
npm run build

# Deploy Convex
npx convex deploy

# Ver logs da Vercel
npx vercel logs
```

## Notas

- O projeto usa Next.js 16 com App Router
- Autenticação via Convex Auth
- Imagens otimizadas (`images.unoptimized: true` no next.config.ts)
- Headers de segurança e CSP por nonce configurados em `src/proxy.ts`
- Formulários públicos passam pelo servidor do Next.js antes de gravarem no Convex
- As mutations públicas agora exigem um segredo interno, portanto `FORM_SUBMISSION_SECRET` precisa existir tanto na Vercel quanto no Convex
- O ficheiro legado `src/middleware.ts` foi substituído por `src/proxy.ts`, conforme o padrão do Next.js 16

## Produção segura

1. Crie um widget no Cloudflare Turnstile para o domínio público.
2. Configure `NEXT_PUBLIC_TURNSTILE_SITE_KEY` e `TURNSTILE_SECRET_KEY` na Vercel.
3. Configure `FORM_SUBMISSION_SECRET` com o mesmo valor na Vercel e no Convex.
4. Defina `FIVAA_ADMIN_EMAILS` com os e-mails reais dos administradores no Convex.
5. Rode um novo `npx convex deploy` após atualizar as variáveis do Convex.
6. Faça um deploy da Vercel depois de atualizar as variáveis da aplicação.

## Rotação de segredos

1. Gere um novo `FORM_SUBMISSION_SECRET`.
2. Atualize primeiro no Convex e depois na Vercel.
3. Gere um novo `TURNSTILE_SECRET_KEY` no painel do Cloudflare se houver suspeita de exposição.
4. Revogue e substitua `JWT_PRIVATE_KEY` se qualquer ficheiro sensível tiver sido exposto.
