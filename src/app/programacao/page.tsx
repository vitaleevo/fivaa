import type { Metadata } from "next";
import ProgramacaoContent from "./ProgramacaoContent";

export const metadata: Metadata = {
  title: "Programação — FIVAA",
  description:
    "Confira a programação completa dos dois dias do FIVAA 2026: palestras, workshops, exposições e atuações ao vivo.",
};

export default function Programacao() {
  return <ProgramacaoContent />;
}
