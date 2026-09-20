import type { Metadata } from "next";
import PalestrasContent from "./PalestrasContent";

export const metadata: Metadata = {
  title: "Palestras — FIVAA",
  description:
    "Palestras inspiradoras do FIVAA sobre arte, cultura e desenvolvimento.",
};

export default function ProgramacaoPalestras() {
  return <PalestrasContent />;
}
