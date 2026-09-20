import type { Metadata } from "next";
import BeneficiosContent from "./BeneficiosContent";

export const metadata: Metadata = {
  title: "Benefícios para Parceiros — FIVAA",
  description:
    "Benefícios exclusivos para parceiros do FIVAA - Fórum Internacional para a Valorização de Artistas Africanos.",
};

export default function ParceirosBeneficios() {
  return <BeneficiosContent />;
}
