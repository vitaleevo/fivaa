"use client";

import Link from "next/link";
import { IconArrowUpRight, IconAward, IconBookOpen, IconPalette } from "@/components/Icon";
import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const areaIcons = [IconBookOpen, IconPalette, IconAward];
const areaHrefs = ["/educacao/recursos", "/educacao/workshops", "/educacao/certificacoes"];

export default function EducacaoContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.educacao.overviewHeroBadge}
        title={t.educacao.overviewHeroTitle}
        subtitle={t.educacao.overviewHeroSubtitle}
        backgroundImage="/images/hero/fivaa-educacao.webp"
      />
      <AccentBar />

      <section className="relative bg-warm-white py-20 md:py-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="section-eyebrow text-green-dark">{t.educacao.overviewEyebrow}</p>
            <h2 className="mt-5 font-montserrat text-3xl font-black tracking-[-0.035em] text-green-dark sm:text-4xl">{t.educacao.overviewTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-medium">{t.educacao.overviewDesc}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {t.educacao.overviewAreas.map((area, index) => {
              const Icon = areaIcons[index];
              return (
                <Link key={area.title} href={areaHrefs[index]} className="content-card group rounded-[1.75rem] p-8 focus-visible:outline-offset-4">
                  <div className="flex items-start justify-between gap-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/12 text-gold"><Icon className="h-6 w-6" /></span>
                    <span className="font-montserrat text-xs font-black tracking-[0.18em] text-green-dark/30">0{index + 1}</span>
                  </div>
                  <h3 className="mt-8 font-montserrat text-2xl font-black tracking-[-0.025em] text-green-dark transition-colors group-hover:text-orange">{area.title}</h3>
                  <p className="mt-3 min-h-12 text-sm leading-relaxed text-gray-medium">{area.desc}</p>
                  <span className="mt-8 inline-flex items-center gap-2 font-montserrat text-xs font-extrabold uppercase tracking-[0.12em] text-green-dark">{area.label}<IconArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
