"use client";

import Link from "next/link";
import { AccentBar, Badge } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ComoSerContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.parceiros.comoHeroBadge}
        title={t.parceiros.comoHeroTitle}
        subtitle={t.parceiros.comoHeroSubtitle}
        backgroundImage="/images/hero/fivaa-palacio-ferro.webp"
        breadcrumbs={[
          { label: t.nav.partners, href: "/parceiros" },
          { label: t.nav.howToBePartner },
        ]}
      />

      {/* Processo */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge>{t.parceiros.comoProcessBadge}</Badge>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {t.parceiros.comoSteps.map((p) => (
              <div key={p.step} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-green-dark font-montserrat text-2xl font-bold">
                  {p.step}
                </div>
                <h3 className="mb-2 font-montserrat text-lg font-bold text-green-dark">{p.title}</h3>
                <p className="text-sm text-gray-medium">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-white pb-4 text-center">
        <Link
          href="/contactos"
          className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 font-montserrat text-sm font-bold text-green-dark shadow-lg shadow-gold/20 transition-all hover:-translate-y-0.5 hover:bg-gold-metallic hover:shadow-xl"
        >
          {t.parceiros.comoCtaButton}
        </Link>
      </section>

      {/* Tipos de Parceiros */}
      <section className="relative bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge>{t.parceiros.comoTypesBadge}</Badge>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.parceiros.comoTipos.map((tp) => (
              <div key={tp.title} className="rounded-2xl border border-gold/10 bg-white p-6 shadow-md transition-all hover:border-gold/30 hover:shadow-lg">
                <h3 className="mb-2 font-montserrat text-lg font-bold text-green-dark">{tp.title}</h3>
                <p className="mb-4 text-sm text-gray-medium">{tp.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {tp.examples.map((e) => (
                    <span key={e} className="rounded-full bg-gold/10 px-3 py-1 text-xs text-gold">{e}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
