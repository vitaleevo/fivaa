import type { Metadata } from "next";
import DesafiosContent from "./DesafiosContent";

export const metadata: Metadata = {
  title: "Desafios — FIVAA",
  description:
    "Desafios artísticos mensais do FIVAA para estimular a criatividade.",
};

export default function ProgramacaoDesafios() {
  return <DesafiosContent />;
}
