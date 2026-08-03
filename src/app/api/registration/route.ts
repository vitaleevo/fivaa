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
      phone?: string;
      country?: string;
      org?: string;
      ticketId?: string;
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

    await fetchMutationWithRetry(api.registrations.create, {
      name: body.name ?? "",
      email: body.email ?? "",
      phone: body.phone ?? "",
      country: body.country ?? "",
      org: body.org ?? "",
      ticketId: body.ticketId ?? "",
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
        : "Falha ao concluir a inscrição.";

    return NextResponse.json(
      { error: message },
      { status: getErrorStatus(message) },
    );
  }
}
