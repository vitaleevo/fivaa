import type { Metadata } from "next";
import WorkshopsContent from "./WorkshopsContent";

export const metadata: Metadata = {
  title: "Workshops — FIVAA",
  description:
    "Workshops interativos mensais do FIVAA para aperfeiçoamento artístico.",
};

export default function ProgramacaoWorkshops() {
  return <WorkshopsContent />;
}
