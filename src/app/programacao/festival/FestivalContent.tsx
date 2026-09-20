"use client";

import Link from "next/link";
import { AccentBar, Badge } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FestivalContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.programacao.festivalHeroBadge}
        title={t.programacao.festivalHeroTitle}
        subtitle={t.programacao.festivalHeroSubtitle}
        backgroundImage="/images/hero/fivaa-art-culture.webp"
        breadcrumbs={[
          { label: t.nav.schedule, href: "/programacao" },
          { label: t.nav.festival },
        ]}
      />

      {/* Programação */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge>{t.programacao.festivalScheduleBadge}</Badge>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {t.programacao.festivalDays.map((d) => (
              <div key={d.day} className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg">
                <span className="inline-block rounded-full bg-gold/10 px-3 py-1 font-montserrat text-xs font-bold text-gold">{d.day}</span>
                <h3 className="mt-4 mb-3 font-montserrat text-xl font-bold text-green-dark">{d.title}</h3>
                <p className="mb-4 text-sm text-gray-medium">{d.desc}</p>
                <ul className="space-y-1">
                  {d.activities.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-sm text-gray-medium">
                      <span className="text-gold">•</span> {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eventos Especiais */}
      <section className="relative bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge>{t.programacao.festivalEventsBadge}</Badge>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {t.programacao.festivalEvents.map((e) => (
              <div key={e.title} className="rounded-2xl border border-gold/10 bg-white p-6 shadow-md transition-all hover:border-gold/30 hover:shadow-lg">
                <h3 className="mb-3 font-montserrat text-lg font-bold text-green-dark">{e.title}</h3>
                <p className="mb-4 text-sm text-gray-medium">{e.desc}</p>
                <ul className="space-y-1">
                  {e.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-medium">
                      <span className="text-gold">✓</span> {item}
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
          <h2 className="font-montserrat text-3xl font-bold text-white">{t.programacao.festivalCtaTitle}</h2>
          <p className="mt-4 text-white/70">{t.programacao.festivalCtaDesc}</p>
          <Link href="/inscricao" className="mt-8 inline-block rounded-full bg-gold px-8 py-4 font-montserrat text-sm font-bold text-green-dark shadow-lg shadow-gold/20 transition-all hover:bg-gold/90 hover:shadow-xl">
            {t.programacao.festivalCtaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
