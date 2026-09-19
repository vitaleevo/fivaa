import { components } from "./_generated/api";
import { Resend } from "@convex-dev/resend";
import type { MutationCtx } from "./_generated/server";

const resend = new Resend(components.resend, {
  testMode: process.env.RESEND_TEST_MODE !== "false",
  apiKey: process.env.RESEND_API_KEY,
});

export type NewRegistrationEmail = {
  name: string;
  email: string;
  phone: string;
  country: string;
  org: string;
  ticketName: string;
  paymentUrl: string;
  photoUrl: string;
};

function emailHtml(data: NewRegistrationEmail) {
  return `<h2>Nova inscrição — FIVAA</h2>
<p><strong>Nome:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Telefone:</strong> ${data.phone}</p>
<p><strong>País:</strong> ${data.country}</p>
<p><strong>Organização:</strong> ${data.org || "—"}</p>
<p><strong>Bilhete:</strong> ${data.ticketName}</p>
<p><a href="${data.paymentUrl}">Ver comprovativo de pagamento</a></p>
<p><a href="${data.photoUrl}">Ver foto</a></p>`;
}

export type RegistrationStatus = "pending" | "confirmed" | "cancelled";

const statusCopy: Record<RegistrationStatus, { subject: string; title: string; body: string }> = {
  confirmed: {
    subject: "Inscrição confirmada — FIVAA",
    title: "Inscrição confirmada",
    body: "O seu comprovativo foi revisto e a sua inscrição está confirmada. Vemo-nos no FIVAA!",
  },
  cancelled: {
    subject: "Inscrição não aprovada — FIVAA",
    title: "Inscrição não aprovada",
    body: "Após revisão, a sua inscrição não foi aprovada.",
  },
  pending: {
    subject: "Inscrição em revisão — FIVAA",
    title: "Inscrição em revisão",
    body: "A sua inscrição voltou a estar em revisão pela nossa equipa.",
  },
};

export async function sendRegistrationStatusEmail(
  ctx: MutationCtx,
  data: { to: string; name: string; status: RegistrationStatus; motive: string },
) {
  const isTest = process.env.RESEND_TEST_MODE !== "false";
  const to = isTest ? "delivered@resend.dev" : data.to;
  if (!isTest && !process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY not configured");
  }
  const copy = statusCopy[data.status];
  const motiveBlock = data.motive ? `<p><strong>Motivo:</strong> ${data.motive}</p>` : "";
  return await resend.sendEmail(ctx, {
    from: "FIVAA <inscricoes@vitaleevo.ao>",
    to,
    subject: `${copy.subject}: ${data.name}`,
    html: `<h2>${copy.title} — FIVAA</h2><p>Olá ${data.name},</p><p>${copy.body}</p>${motiveBlock}`,
  });
}
export async function sendNewRegistrationEmail(ctx: MutationCtx, data: NewRegistrationEmail) {
  const isTest = process.env.RESEND_TEST_MODE !== "false";
  const to = isTest ? "delivered@resend.dev" : (process.env.INSCRICOES_NOTIFY_EMAIL ?? "").trim();
  if (!to) {
    throw new Error("INSCRICOES_NOTIFY_EMAIL not configured");
  }
  if (!isTest && !process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY not configured");
  }
  return await resend.sendEmail(ctx, {
    from: "FIVAA <inscricoes@vitaleevo.ao>",
    to,
    subject: `Nova inscrição: ${data.name}`,
    html: emailHtml(data),
  });
}
