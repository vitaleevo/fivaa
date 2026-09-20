import type { Metadata } from "next";
import PrivacidadeContent from "./PrivacidadeContent";

export const metadata: Metadata = {
  title: "Política de Privacidade & Proteção de Dados — FIVAA",
  description:
    "Política de Privacidade e Gestão de Dados Pessoais do FIVAA 2026 em conformidade com a Lei n.º 22/11 de Angola, RGPD/GDPR e normas internacionais de privacidade.",
  alternates: {
    canonical: "https://fivaaforum.com/privacidade",
  },
};

export default function PrivacidadePage() {
  return <PrivacidadeContent />;
}
