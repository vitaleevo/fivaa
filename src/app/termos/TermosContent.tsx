"use client";

import PageHero from "@/components/PageHero";
import { Divider } from "@/components/BrandElements";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function TermosContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.legal.termosHeroBadge}
        title={t.legal.termosHeroTitle}
        subtitle={t.legal.termosHeroSubtitle}
        backgroundImage="/images/hero/fivaa-forum-hero.webp"
      />

      <section className="site-grid bg-warm-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10 text-gray-700">
            {t.legal.termosSections.map((s) => (
              <div key={s.title} className="rounded-2xl border border-gold/15 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="font-montserrat text-xl font-bold text-green-dark sm:text-2xl">
                  {s.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          <Divider className="my-12" />

          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border-2 border-green-dark px-8 py-3.5 font-montserrat text-sm font-extrabold text-green-dark transition-all hover:bg-green-dark hover:text-white"
            >
              {t.legal.backHome}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
