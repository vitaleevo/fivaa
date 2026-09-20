import type { Metadata } from "next";
import ImpactoContent from "./ImpactoContent";

export const metadata: Metadata = {
  title: "Impacto — FIVAA",
  description:
    "Impacto do FIVAA na valorização da arte e na sociedade africana.",
};

export default function SobreImpacto() {
  return <ImpactoContent />;
}
