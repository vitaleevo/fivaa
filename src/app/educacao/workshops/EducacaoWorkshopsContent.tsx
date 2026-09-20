"use client";

import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function EducacaoWorkshopsContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.educacao.workshopsHeroBadge}
        title={t.educacao.workshopsHeroTitle}
        subtitle={t.educacao.workshopsHeroSubtitle}
        backgroundImage="/images/hero/fivaa-educacao.webp"
        breadcrumbs={[
          { label: t.nav.education, href: "/educacao" },
          { label: t.nav.workshops },
        ]}
      />

      {/* Workshops */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {t.educacao.workshopsItems.map((w) => (
              <div key={w.title} className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg">
                <span className="inline-block rounded-full bg-gold/10 px-3 py-1 font-montserrat text-xs font-bold text-gold">{w.target}</span>
                <h3 className="mt-4 mb-3 font-montserrat text-xl font-bold text-green-dark">{w.title}</h3>
                <p className="mb-6 text-sm text-gray-medium">{w.desc}</p>
                <h4 className="mb-2 font-montserrat text-sm font-bold text-green-dark">{t.educacao.workshopsContentsTitle}</h4>
                <ul className="space-y-1">
                  {w.contents.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-gray-medium">
                      <span className="text-gold">•</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
