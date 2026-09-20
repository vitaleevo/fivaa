"use client";

import Link from "next/link";
import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function MentoriaContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.programacao.mentoriaHeroBadge}
        title={t.programacao.mentoriaHeroTitle}
        subtitle={t.programacao.mentoriaHeroSubtitle}
        backgroundImage="/images/hero/fivaa-art-culture.webp"
        breadcrumbs={[
          { label: t.nav.schedule, href: "/programacao" },
          { label: t.nav.mentorship },
        ]}
      />

      {/* Fases */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {t.programacao.mentoriaPhases.map((p) => (
              <div key={p.phase} className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full bg-gold/10 px-3 py-1 font-montserrat text-xs font-bold text-gold">{p.phase}</span>
                  <span className="text-sm text-gray-medium">{p.duration}</span>
                </div>
                <h3 className="mb-3 font-montserrat text-xl font-bold text-green-dark">{p.title}</h3>
                <p className="mb-4 text-sm text-gray-medium">{p.desc}</p>
                <ul className="space-y-1">
                  {p.items.map((item) => (
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
          <h2 className="font-montserrat text-3xl font-bold text-white">{t.programacao.mentoriaCtaTitle}</h2>
          <p className="mt-4 text-white/70">{t.programacao.mentoriaCtaDesc}</p>
          <Link href="/inscricao" className="mt-8 inline-block rounded-full bg-gold px-8 py-4 font-montserrat text-sm font-bold text-green-dark shadow-lg shadow-gold/20 transition-all hover:bg-gold/90 hover:shadow-xl">
            {t.programacao.mentoriaCtaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
