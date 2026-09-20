"use client";

import Link from "next/link";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CursosContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.programacao.cursosHeroBadge}
        title={t.programacao.cursosHeroTitle}
        subtitle={t.programacao.cursosHeroSubtitle}
        backgroundImage="/images/hero/fivaa-art-culture.webp"
        breadcrumbs={[
          { label: t.nav.schedule, href: "/programacao" },
          { label: t.nav.courses },
        ]}
      />

      {/* CTA */}
      <section className="relative bg-green-dark py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat text-3xl font-bold text-white">{t.programacao.cursosCtaTitle}</h2>
          <p className="mt-4 text-white/70">{t.programacao.cursosCtaDesc}</p>
          <Link href="/inscricao" className="mt-8 inline-block rounded-full bg-gold px-8 py-4 font-montserrat text-sm font-bold text-green-dark shadow-lg shadow-gold/20 transition-all hover:bg-gold/90 hover:shadow-xl">
            {t.programacao.cursosCtaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
