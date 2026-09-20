import type { Metadata } from "next";
import HistoriaContent from "./HistoriaContent";

export const metadata: Metadata = {
  title: "História — FIVAA",
  description:
    "Fundação, estrutura e mandatos do FIVAA - Fórum Internacional para a Valorização de Artistas Africanos.",
};

export default function SobreHistoria() {
  return <HistoriaContent />;
}
