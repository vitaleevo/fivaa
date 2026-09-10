import { NextResponse } from "next/server";
import { api } from "../../../../convex/_generated/api";
import { getClientIp, getSubmissionSecret } from "@/lib/request";
import { fetchMutation } from "convex/nextjs";
import { readForm, registrationFields, publicFormError } from "@/lib/form-validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const fields = registrationFields(await readForm(request));

    const submissionSecret = getSubmissionSecret();
    if (!submissionSecret) {
      return NextResponse.json(
        { error: "Configuração de submissão em falta." },
        { status: 503 },
      );
    }

    const clientIp = getClientIp(request);

    await fetchMutation(api.registrations.create, {
      ...fields,
      clientIp,
      submissionSecret,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const { message, status } = publicFormError(error);
    console.error("registration_submission_failed", { status });
    return NextResponse.json({ error: message }, { status });
  }
}
