import type { Metadata } from "next";
import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { TestemunhosWrapper } from "./TestemunhosWrapper";

export const metadata: Metadata = {
  title: "Testemunhos — FIVAA",
  description:
    "Histórias de sucesso e testemunhos de parceiros e artistas do FIVAA.",
};

export default function ParceirosTestemunhos() {
  return (
    <>
      <PageHero
        badge="Testemunhos"
        title="Vozes do FIVAA"
        subtitle="Histórias reais de quem faz parte desta comunidade"
        backgroundImage="/images/hero/banner-xs.webp"
        breadcrumbs={[
          { label: "Parceiros", href: "/parceiros" },
          { label: "Testemunhos" },
        ]}
      />

      {/* Testemunhos */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TestemunhosWrapper />
        </div>
      </section>
    </>
  );
}
