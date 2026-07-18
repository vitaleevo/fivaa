import type { Metadata } from "next";
import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { ProgramacaoWrapper } from "./ProgramacaoWrapper";

export const metadata: Metadata = {
  title: "Programação — FIVAA",
  description:
    "Confira a programação completa dos dois dias do FIVAA 2026: palestras, workshops, exposições e atuações ao vivo.",
};

export default function Programacao() {
  return (
    <>
      <PageHero
        badge="Programação"
        title="Dois dias de imersão"
        subtitle="Na arte e cultura africana"
        backgroundImage="/images/hero/387c1334-f070-4f6a-a569-6d63e85e9101.webp"
      />

      <AccentBar />
      <ProgramacaoWrapper />
    </>
  );
}
