import type { Metadata } from "next";
import ComoSerContent from "./ComoSerContent";

export const metadata: Metadata = {
  title: "Como Ser Parceiro — FIVAA",
  description:
    "Processo de parceria do FIVAA - Como se tornar um parceiro oficial.",
};

export default function ParceirosComoSer() {
  return <ComoSerContent />;
}
