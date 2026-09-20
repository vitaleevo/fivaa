"use client";

import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function DesafiosContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.programacao.desafiosHeroBadge}
        title={t.programacao.desafiosHeroTitle}
        subtitle={t.programacao.desafiosHeroSubtitle}
        backgroundImage="/images/hero/fivaa-art-culture.webp"
        breadcrumbs={[
          { label: t.nav.schedule, href: "/programacao" },
          { label: t.nav.challenges },
        ]}
      />

      {/* Desafios */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {t.programacao.desafiosItems.map((d) => (
              <div key={d.title} className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg">
                <h3 className="mb-3 font-montserrat text-xl font-bold text-green-dark">{d.title}</h3>
                <p className="mb-6 text-sm text-gray-medium">{d.desc}</p>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-montserrat text-sm font-bold text-green-dark">{t.programacao.desafiosRulesTitle}</h4>
                    <ul className="space-y-1">
                      {d.rules.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-sm text-gray-medium">
                          <span className="mt-0.5 text-gold">•</span> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-montserrat text-sm font-bold text-green-dark">{t.programacao.desafiosPrizesTitle}</h4>
                    <ul className="space-y-1">
                      {d.prizes.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-gray-medium">
                          <span className="mt-0.5 text-gold">✓</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
