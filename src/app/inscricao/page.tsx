import type { Metadata } from "next";
import { InscricaoWrapper } from "./InscricaoWrapper";

export const metadata: Metadata = {
  title: "Inscrição — FIVAA",
  description:
    "Inscreva-se no FIVAA 2026. Garanta o seu lugar no maior evento de valorização da arte africana.",
};

export default function InscricaoPage() {
  return <InscricaoWrapper />;
}
