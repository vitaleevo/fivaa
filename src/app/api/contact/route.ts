import { NextResponse } from "next/server";
import { api } from "../../../../convex/_generated/api";
import { getClientIp, getErrorStatus, getSubmissionSecret } from "@/lib/request";
import {
  fetchMutationWithRetry,
  isNetworkError,
  getNetworkErrorMessage,
} from "@/lib/convex";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
      startedAt?: number;
      honeypot?: string;
    };

    const submissionSecret = getSubmissionSecret();
    if (!submissionSecret) {
      return NextResponse.json(
        { error: "Configuração de submissão em falta." },
        { status: 503 },
      );
    }

    const clientIp = getClientIp(request);

    await fetchMutationWithRetry(api.messages.create, {
      name: body.name ?? "",
      email: body.email ?? "",
      message: `[Assunto: ${(body.subject ?? "").trim()}]\n\n${body.message ?? ""}`,
      submittedAt: Number(body.startedAt ?? 0),
      honeypot: body.honeypot ?? "",
      clientIp,
      submissionSecret,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = isNetworkError(error)
      ? getNetworkErrorMessage()
      : error instanceof Error
        ? error.message
        : "Falha ao enviar a mensagem.";

    return NextResponse.json(
      { error: message },
      { status: getErrorStatus(message) },
    );
  }
}
