import type { Metadata } from "next";
import EducacaoRecursosContent from "./EducacaoRecursosContent";

export const metadata: Metadata = {
  title: "Recursos Educativos — FIVAA",
  description:
    "Biblioteca de recursos educativos do FIVAA para artistas africanos.",
};

export default function EducacaoRecursos() {
  return <EducacaoRecursosContent />;
}
