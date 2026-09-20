"use client";

import Link from "next/link";
import { AccentBar } from "@/components/BrandElements";
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

      {/* Cursos */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {t.programacao.cursosItems.map((curso) => (
              <div key={curso.title} className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full bg-gold/10 px-3 py-1 font-montserrat text-xs font-bold text-gold">{curso.duration}</span>
                  <span className="text-sm text-gray-medium">{curso.frequency}</span>
                </div>
                <h3 className="mb-3 font-montserrat text-xl font-bold text-green-dark">{curso.title}</h3>
                <p className="mb-6 text-sm text-gray-medium">{curso.desc}</p>
                <h4 className="mb-2 font-montserrat text-sm font-bold text-green-dark">{t.programacao.cursosModulosTitle}</h4>
                <ul className="space-y-1">
                  {curso.modulos.map((m) => (
                    <li key={m} className="flex items-center gap-2 text-sm text-gray-medium">
                      <span className="text-gold">•</span> {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

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
