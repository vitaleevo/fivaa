import type { Metadata } from "next";
import FestivalContent from "./FestivalContent";

export const metadata: Metadata = {
  title: "Festival Anual — FIVAA",
  description:
    "O Festival Anual do FIVAA - O maior evento de arte africana do ano.",
};

export default function ProgramacaoFestival() {
  return <FestivalContent />;
}
