"use client";

import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { TestemunhosWrapper } from "./TestemunhosWrapper";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function TestemunhosPageContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.parceiros.testHeroBadge}
        title={t.parceiros.testHeroTitle}
        subtitle={t.parceiros.testHeroSubtitle}
        backgroundImage="/images/hero/fivaa-palacio-ferro.webp"
        breadcrumbs={[
          { label: t.nav.partners, href: "/parceiros" },
          { label: t.nav.testimonials },
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
