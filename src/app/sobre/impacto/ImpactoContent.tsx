"use client";

import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ImpactoContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.sobre.impHeroBadge}
        title={t.sobre.impHeroTitle}
        subtitle={t.sobre.impHeroSubtitle}
        backgroundImage="/images/hero/fivaa-junte-se.webp"
        breadcrumbs={[
          { label: t.nav.about, href: "/sobre" },
          { label: t.nav.aboutImpact },
        ]}
      />

      {/* Impact Cards */}
      <AccentBar />
      <section className="relative bg-green-dark py-20">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #FDB813 0px, #FDB813 1px, transparent 1px, transparent 30px)`,
        }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {t.sobre.impacts.map((impact) => (
              <div key={impact.title} className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-gold/30 hover:bg-white/10">
                <h3 className="mb-4 font-montserrat text-xl font-bold text-white">{impact.title}</h3>
                <p className="mb-6 text-sm text-white/60">{impact.desc}</p>
                <ul className="space-y-2">
                  {impact.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/50">
                      <span className="mt-1 text-gold">✓</span> {item}
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
