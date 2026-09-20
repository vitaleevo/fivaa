import { NextResponse } from "next/server";
import { api } from "../../../../convex/_generated/api";
import { getClientIp, getSubmissionSecret } from "@/lib/request";
import { fetchMutation } from "convex/nextjs";
import { readForm, contactFields, publicFormError } from "@/lib/form-validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const fields = contactFields(await readForm(request));

    const submissionSecret = getSubmissionSecret();
    if (!submissionSecret) {
      return NextResponse.json(
        { error: "Configuração de submissão em falta." },
        { status: 503 },
      );
    }

    const clientIp = getClientIp(request);

    await fetchMutation(api.messages.create, {
      ...fields,
      clientIp,
      submissionSecret,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const { message, status } = publicFormError(error);
    console.error("contact_submission_failed", { status });
    return NextResponse.json({ error: message }, { status });
  }
}
