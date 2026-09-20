"use client";

import PageHero from "@/components/PageHero";
import { Badge, Divider } from "@/components/BrandElements";
import Link from "next/link";
import type { ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { contactEmail } from "@/lib/site";

function rich(text: string, bolds: string[]): ReactNode {
  let parts: ReactNode[] = [text];
  for (const b of bolds) {
    const next: ReactNode[] = [];
    parts.forEach((p, i) => {
      if (typeof p !== "string") {
        next.push(p);
        return;
      }
      const split = p.split(b);
      split.forEach((s, j) => {
        if (s) next.push(s);
        if (j < split.length - 1) next.push(<strong key={`${i}-${j}`}>{b}</strong>);
      });
    });
    parts = next;
  }
  return <>{parts}</>;
}

export default function PrivacidadeContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.legal.privHeroBadge}
        title={t.legal.privHeroTitle}
        subtitle={t.legal.privHeroSubtitle}
        backgroundImage="/images/hero/fivaa-forum-hero.webp"
      />

      <section className="site-grid bg-warm-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Card de introdução com Lei 22/11 */}
          <div className="mb-12 rounded-2xl border border-gold/20 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <Badge>{t.legal.privLawBadge}</Badge>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                {t.legal.privLawTag}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
              {rich(t.legal.privIntroText, [...t.legal.privIntroBolds])}
            </p>
          </div>

          <div className="space-y-12 text-gray-700">
            {/* 1. Responsável */}
            <div className="rounded-2xl border border-gold/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-montserrat text-xl font-bold text-green-dark sm:text-2xl">
                {t.legal.privS1Title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                {t.legal.privS1Intro}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-gray-600">
                <li><strong>{t.legal.privOrgLabel}</strong> {t.legal.privOrgValue}</li>
                <li><strong>{t.legal.privVenueLabel}</strong> {t.legal.privVenueValue}</li>
                <li><strong>{t.legal.privEmailLabel}</strong> <a href={`mailto:${contactEmail}`} className="text-gold font-semibold hover:underline">{contactEmail}</a></li>
              </ul>
            </div>

            {/* 2. Dados Recolhidos */}
            <div className="rounded-2xl border border-gold/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-montserrat text-xl font-bold text-green-dark sm:text-2xl">
                {t.legal.privS2Title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                {t.legal.privS2Intro}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {t.legal.privS2Cards.map((c) => (
                  <div key={c.title} className="rounded-xl border border-gold/10 bg-warm-white p-4">
                    <h3 className="font-montserrat text-sm font-bold text-green-dark">{c.title}</h3>
                    <p className="mt-1 text-xs text-gray-600">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Finalidades */}
            <div className="rounded-2xl border border-gold/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-montserrat text-xl font-bold text-green-dark sm:text-2xl">
                {t.legal.privS3Title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                {t.legal.privS3Intro}
              </p>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                {t.legal.privS3Items.map((item) => (
                  <li key={item.title} className="flex items-start gap-2">
                    <span className="font-bold text-gold">✓</span>
                    <span><strong>{item.title}</strong> {item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Direitos dos Titulares */}
            <div className="rounded-2xl border border-gold/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-montserrat text-xl font-bold text-green-dark sm:text-2xl">
                {t.legal.privS4Title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                {t.legal.privS4Intro}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {t.legal.privS4Rights.map((r) => (
                  <div key={r.title} className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <strong className="text-sm text-green-dark">{r.title}</strong>
                    <p className="text-xs text-gray-600 mt-1">{r.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-600">
                {t.legal.privS4ExercisePre}<a href={`mailto:${contactEmail}`} className="text-gold font-bold hover:underline">{contactEmail}</a>.
              </p>
            </div>

            {/* 5. Segurança */}
            <div className="rounded-2xl border border-gold/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-montserrat text-xl font-bold text-green-dark sm:text-2xl">
                {t.legal.privS5Title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                {t.legal.privS5Intro}
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-gray-600">
                {t.legal.privS5Items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {/* 6. Atualizações */}
            <div className="rounded-2xl border border-gold/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-montserrat text-xl font-bold text-green-dark sm:text-2xl">
                {t.legal.privS6Title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                {t.legal.privS6TextPre}<strong>{t.legal.privS6Date}</strong>.
              </p>
            </div>
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
