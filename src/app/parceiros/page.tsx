import type { Metadata } from "next";
import ParceirosContent from "./ParceirosContent";

export const metadata: Metadata = {
  title: "Parceiros — FIVAA",
  description:
    "Parcerias estratégicas do FIVAA para valorização da arte africana.",
};

export default function ParceirosPage() {
  return <ParceirosContent />;
}
