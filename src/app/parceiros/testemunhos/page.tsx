import type { Metadata } from "next";
import TestemunhosPageContent from "./TestemunhosPageContent";

export const metadata: Metadata = {
  title: "Testemunhos — FIVAA",
  description:
    "Histórias de sucesso e testemunhos de parceiros e artistas do FIVAA.",
};

export default function ParceirosTestemunhos() {
  return <TestemunhosPageContent />;
}
