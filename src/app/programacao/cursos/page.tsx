import type { Metadata } from "next";
import CursosContent from "./CursosContent";

export const metadata: Metadata = {
  title: "Cursos — FIVAA",
  description:
    "Cursos online estruturados do FIVAA para aperfeiçoamento artístico.",
};

export default function ProgramacaoCursos() {
  return <CursosContent />;
}
