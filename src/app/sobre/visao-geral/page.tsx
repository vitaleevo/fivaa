import type { Metadata } from "next";
import VisaoGeralContent from "./VisaoGeralContent";

export const metadata: Metadata = {
  title: "Visão Geral — FIVAA",
  description:
    "Conheça o FIVAA - Fórum Internacional para a Valorização de Artistas Africanos.",
};

export default function SobreVisaoGeral() {
  return <VisaoGeralContent />;
}
