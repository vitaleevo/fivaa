"use client";

import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function EducacaoRecursosContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.educacao.recursosHeroBadge}
        title={t.educacao.recursosHeroTitle}
        subtitle={t.educacao.recursosHeroSubtitle}
        backgroundImage="/images/hero/fivaa-educacao.webp"
        breadcrumbs={[
          { label: t.nav.education, href: "/educacao" },
          { label: t.nav.resources },
        ]}
      />

      {/* Categorias */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {t.educacao.recursosItems.map((cat) => (
              <div key={cat.title} className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg">
                <h3 className="mb-3 font-montserrat text-xl font-bold text-green-dark">{cat.title}</h3>
                <p className="mb-6 text-sm text-gray-medium">{cat.desc}</p>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-medium">
                      <span className="mt-0.5 text-gold">•</span> {item}
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
