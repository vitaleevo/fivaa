import { fetchMutation } from "convex/nextjs";
import type { NextjsOptions } from "convex/nextjs";
import type { FunctionReference, FunctionReturnType } from "convex/server";

/**
 * Mensagens de erro de rede que devem ser tratadas como transitórias
 * (o backend Convex está inacessível ou a rede está instável).
 */
const RETRYABLE_NETWORK_PATTERNS = [
  "fetch failed",
  "econnrefused",
  "econnreset",
  "etimedout",
  "enotfound",
  "socket hang up",
  "network error",
  "networkrequestfailed",
  "timeout",
  "aborted",
  "tls handshake",
  "unable to connect",
];

/** Mensagens de erro de rede que devem ser mostradas ao utilizador de forma amigável. */
const NETWORK_ERROR_PATTERNS = [
  ...RETRYABLE_NETWORK_PATTERNS,
  "connection",
  "rede",
  "servidor",
];

export function isRetryableNetworkError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const message = error.message.toLowerCase();
  return RETRYABLE_NETWORK_PATTERNS.some((pattern) => message.includes(pattern));
}

export function isNetworkError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const message = error.message.toLowerCase();
  return NETWORK_ERROR_PATTERNS.some((pattern) => message.includes(pattern));
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Executa uma mutation no Convex com retry automático para erros de rede
 * transitórios (o erro "fetch failed" é intermitente nesta infraestrutura).
 *
 * - 3 tentativas com backoff progressivo (250ms, 500ms, 750ms)
 * - Erros de negócio (validação, rate limit, auth) NÃO são repetidos — são propagados de imediato
 */
export async function fetchMutationWithRetry<
  Mutation extends FunctionReference<"mutation">,
>(
  mutation: Mutation,
  args: Mutation["_args"],
  options?: NextjsOptions,
  retries = 3,
): Promise<FunctionReturnType<Mutation>> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return options === undefined
        ? await fetchMutation(mutation, args)
        : await fetchMutation(mutation, args, options);
    } catch (error) {
      lastError = error;

      if (!isRetryableNetworkError(error) || attempt === retries) {
        throw error;
      }

      await sleep(250 * attempt);
    }
  }

  throw lastError;
}

/** Mensagem amigável para quando o backend está inacessível. */
export function getNetworkErrorMessage(): string {
  return "O serviço está temporariamente indisponível. Por favor, tente novamente dentro de alguns instantes.";
}
