import type { Metadata } from "next";
import { AccentBar, AfricanPatternDark } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { OradoresWrapper } from "./OradoresWrapper";

export const metadata: Metadata = {
  title: "Oradores — FIVAA",
  description:
    "Conheça os oradores, artistas e palestrantes do FIVAA 2026.",
};

export default function Oradores() {
  return (
    <>
      <PageHero
        badge="Oradores"
        title="Artistas e pensadores"
        subtitle="Da arte africana no FIVAA 2026"
        backgroundImage="/images/hero/fivaa-forum-hero.png"
      />

      {/* 2. Speakers Grid — Dark */}
      <AccentBar />
      <section className="relative overflow-hidden bg-green-dark py-32">
        <AfricanPatternDark />
        <OradoresWrapper />
      </section>
    </>
  );
}
