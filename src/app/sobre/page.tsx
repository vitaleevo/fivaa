import type { Metadata } from "next";
import SobreContent from "./SobreContent";

export const metadata: Metadata = {
  title: "Sobre — FIVAA",
  description:
    "Conheça a missão, visão e valores do Fórum & Festival Internacional da Valorização da Arte Africana.",
};

export default function Sobre() {
  return <SobreContent />;
}
