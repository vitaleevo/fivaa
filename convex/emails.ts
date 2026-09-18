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
