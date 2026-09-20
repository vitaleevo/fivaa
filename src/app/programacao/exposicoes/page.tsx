import type { Metadata } from "next";
import ExposicoesContent from "./ExposicoesContent";

export const metadata: Metadata = {
  title: "Exposições — FIVAA",
  description:
    "Exposições virtuais e presenciais do FIVAA para divulgação de arte africana.",
};

export default function ProgramacaoExposicoes() {
  return <ExposicoesContent />;
}
