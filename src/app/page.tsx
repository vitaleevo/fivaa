import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "FIVAA 2026 — Fórum Internacional da Valorização da Arte Africana",
  description:
    "20 e 21 de novembro de 2026 | Palácio de Ferro, Luanda, Angola. O Fórum Internacional dedicado à promoção, valorização e desenvolvimento das indústrias criativas e arte africana.",
};

export default function Home() {
  return <HomeContent />;
}
