import type { Metadata } from "next";
import MentoriaContent from "./MentoriaContent";

export const metadata: Metadata = {
  title: "Mentoria — FIVAA",
  description:
    "Programa de mentoria do FIVAA para desenvolvimento artístico personalizado.",
};

export default function ProgramacaoMentoria() {
  return <MentoriaContent />;
}
