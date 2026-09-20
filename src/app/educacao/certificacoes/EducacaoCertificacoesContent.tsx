"use client";

import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function EducacaoCertificacoesContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.educacao.certificacoesHeroBadge}
        title={t.educacao.certificacoesHeroTitle}
        subtitle={t.educacao.certificacoesHeroSubtitle}
        backgroundImage="/images/hero/fivaa-educacao.webp"
        breadcrumbs={[
          { label: t.nav.education, href: "/educacao" },
          { label: t.nav.certifications },
        ]}
      />

      {/* Certificações */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {t.educacao.certificacoesItems.map((c) => (
              <div key={c.title} className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="mb-3 font-montserrat text-xl font-bold text-green-dark">{c.title}</h3>
                <p className="mb-6 text-sm text-gray-medium">{c.desc}</p>
                <h4 className="mb-2 font-montserrat text-sm font-bold text-green-dark">{t.educacao.certificacoesReqTitle}</h4>
                <ul className="space-y-1 text-left">
                  {c.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-gray-medium">
                      <span className="mt-0.5 text-gold">✓</span> {r}
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
