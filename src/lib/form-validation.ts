export class FormError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export async function readForm(request: Request): Promise<Record<string, unknown>> {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    throw new FormError("Origem da submissão inválida.", 403);
  }
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    throw new FormError("Formato de submissão inválido.", 415);
  }
  const reader = request.body?.getReader();
  if (!reader) throw new FormError("Submissão inválida.");
  const decoder = new TextDecoder();
  let length = 0;
  let text = "";
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 16_384) {
        await reader.cancel();
        throw new FormError("Submissão demasiado grande.", 413);
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } finally {
    reader.releaseLock();
  }
  let body: unknown;
  try { body = JSON.parse(text); } catch { throw new FormError("Submissão inválida."); }
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new FormError("Submissão inválida.");
  return body as Record<string, unknown>;
}

function field(body: Record<string, unknown>, key: string, label: string, min: number, max: number) {
  const value = body[key] ?? "";
  if (typeof value !== "string") throw new FormError(`${label} inválido.`);
  const trimmed = value.trim();
  if (trimmed.length < min || trimmed.length > max) throw new FormError(`${label} deve conter entre ${min} e ${max} caracteres.`);
  return trimmed;
}

function common(body: Record<string, unknown>) {
  const name = field(body, "name", "Nome", 3, 80);
  const email = field(body, "email", "E-mail", 3, 254).toLowerCase();
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) throw new FormError("E-mail inválido.");
  if (typeof body.startedAt !== "number" || !Number.isFinite(body.startedAt)) throw new FormError("Submissão inválida.");
  const elapsed = Date.now() - body.startedAt;
  if (elapsed < 1500 || elapsed > 7_200_000) throw new FormError("Aguarde um momento e tente novamente. Se esta página está aberta há muito tempo, recarregue-a.");
  const honeypot = field(body, "honeypot", "Verificação", 0, 0);
  return { name, email, submittedAt: body.startedAt, honeypot };
}

export function contactFields(body: Record<string, unknown>) {
  const values = common(body);
  const subject = field(body, "subject", "Assunto", 3, 100);
  const message = field(body, "message", "Mensagem", 10, 1000);
  return { ...values, message: `[Assunto: ${subject}]\n\n${message}` };
}

export function registrationFields(body: Record<string, unknown>) {
  const values = common(body);
  const phone = field(body, "phone", "Telefone", 9, 20);
  if (!/^\+?[0-9\s\-()]{9,20}$/.test(phone)) throw new FormError("Telefone inválido.");
  return {
    ...values, phone,
    country: field(body, "country", "País", 2, 50),
    org: field(body, "org", "Organização", 0, 100),
    ticketId: field(body, "ticketId", "Bilhete", 1, 100),
  };
}

export function publicFormError(error: unknown) {
  if (error instanceof FormError) return { message: error.message, status: error.status };
  const message = error instanceof Error ? error.message : "";
  if (message.includes("Muitas tentativas")) return { message: "Muitas tentativas. Tente novamente mais tarde.", status: 429 };
  if (message.includes("Bilhete inválido")) return { message: "Bilhete inválido. Volte a selecionar a modalidade.", status: 400 };
  return { message: "O serviço está temporariamente indisponível. Tente novamente ou contacte geral@fivaaforum.com.", status: 503 };
}
