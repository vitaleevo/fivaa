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
- Headers de segurança configurados
