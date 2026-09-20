"use client";

import { AccentBar, Badge } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function HistoriaContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.sobre.histHeroBadge}
        title={t.sobre.histHeroTitle}
        subtitle={t.sobre.histHeroSubtitle}
        backgroundImage="/images/hero/fivaa-junte-se.webp"
        breadcrumbs={[
          { label: t.nav.about, href: "/sobre" },
          { label: t.nav.aboutHistory },
        ]}
      />

      {/* Timeline */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative space-y-12">
            <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-gold via-orange to-green-dark md:left-1/2" />
            {t.sobre.histTimeline.map((item, i) => (
              <div key={item.title} className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-8 z-10 h-4 w-4 rounded-full border-2 border-gold bg-white shadow-lg md:left-1/2 md:-translate-x-1/2" />
                <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <span className="inline-block rounded-full bg-gold/10 px-3 py-1 font-montserrat text-xs font-bold text-gold">{item.year}</span>
                  <h3 className="mt-2 font-montserrat text-xl font-bold text-green-dark">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estrutura */}
      <section className="relative bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge>{t.sobre.histStructBadge}</Badge>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.sobre.histStructure.map((item) => (
              <div key={item.role} className="rounded-2xl border border-gold/10 bg-white p-6 shadow-md text-center transition-all hover:border-gold/30 hover:shadow-lg">
                <h3 className="mb-2 font-montserrat text-lg font-bold text-green-dark">{item.role}</h3>
                <p className="text-sm text-gray-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge>{t.sobre.histValuesBadge}</Badge>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-green-dark p-6 text-white">
              <h3 className="font-montserrat text-lg font-bold">{t.sobre.histValues[0].title}</h3>
              <p className="mt-2 text-sm text-white/70">{t.sobre.histValues[0].desc}</p>
            </div>
            <div className="rounded-2xl bg-gold p-6 text-green-dark">
              <h3 className="font-montserrat text-lg font-bold">{t.sobre.histValues[1].title}</h3>
              <p className="mt-2 text-sm text-green-dark/70">{t.sobre.histValues[1].desc}</p>
            </div>
            <div className="rounded-2xl bg-orange p-6 text-white">
              <h3 className="font-montserrat text-lg font-bold">{t.sobre.histValues[2].title}</h3>
              <p className="mt-2 text-sm text-white/70">{t.sobre.histValues[2].desc}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
