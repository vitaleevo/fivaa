import type { Metadata } from "next";
import EducacaoCertificacoesContent from "./EducacaoCertificacoesContent";

export const metadata: Metadata = {
  title: "Certificações — FIVAA",
  description:
    "Certificações e reconhecimento profissional do FIVAA para artistas.",
};

export default function EducacaoCertificacoes() {
  return <EducacaoCertificacoesContent />;
}
