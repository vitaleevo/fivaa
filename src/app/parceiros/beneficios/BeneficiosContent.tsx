"use client";

import Link from "next/link";
import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const benefitIcons = ["👁️", "🎨", "🤝", "📣", "📊", " VIP", "❤️", "🌍"];

export default function BeneficiosContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.parceiros.benHeroBadge}
        title={t.parceiros.benHeroTitle}
        subtitle={t.parceiros.benHeroSubtitle}
        backgroundImage="/images/hero/fivaa-palacio-ferro.webp"
        breadcrumbs={[
          { label: t.nav.partners, href: "/parceiros" },
          { label: t.nav.partnerBenefits },
        ]}
      />

      {/* Benefícios */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.parceiros.benItems.map((b, i) => (
              <div key={b.title} className="rounded-2xl border border-gold/10 bg-white p-6 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg text-center">
                <span className="text-3xl">{benefitIcons[i]}</span>
                <h3 className="mt-4 mb-2 font-montserrat text-lg font-bold text-green-dark">{b.title}</h3>
                <p className="text-sm text-gray-medium">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-green-dark py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat text-3xl font-bold text-white">{t.parceiros.benCtaTitle}</h2>
          <p className="mt-4 text-white/70">{t.parceiros.benCtaDesc}</p>
          <Link href="/contactos" className="mt-8 inline-block rounded-full bg-gold px-8 py-4 font-montserrat text-sm font-bold text-green-dark shadow-lg shadow-gold/20 transition-all hover:bg-gold/90 hover:shadow-xl">
            {t.parceiros.benCtaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
