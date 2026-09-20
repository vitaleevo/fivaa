import type { Metadata } from "next";
import TermosContent from "./TermosContent";

export const metadata: Metadata = {
  title: "Termos e Condições de Uso — FIVAA",
  description:
    "Termos e condições gerais de utilização do website e participação no FIVAA 2026 no Palácio de Ferro, Luanda, Angola.",
  alternates: {
    canonical: "https://fivaaforum.com/termos",
  },
};

export default function TermosPage() {
  return <TermosContent />;
}
