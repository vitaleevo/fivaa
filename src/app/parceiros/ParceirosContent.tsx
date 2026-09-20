"use client";

import Link from "next/link";
import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const areaIcons = ["🎁", "🤝", "💬"];
const areaHrefs = ["/parceiros/beneficios", "/parceiros/como-ser", "/parceiros/testemunhos"];

export default function ParceirosContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.parceiros.overviewHeroBadge}
        title={t.parceiros.overviewHeroTitle}
        subtitle={t.parceiros.overviewHeroSubtitle}
        backgroundImage="/images/hero/fivaa-palacio-ferro.webp"
      />

      {/* Áreas */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {t.parceiros.overviewAreas.map((area, i) => (
              <Link key={area.title} href={areaHrefs[i]} className="group rounded-2xl border border-gold/10 bg-white p-8 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg">
                <span className="text-4xl">{areaIcons[i]}</span>
                <h3 className="mt-4 mb-2 font-montserrat text-xl font-bold text-green-dark group-hover:text-gold">{area.title}</h3>
                <p className="text-sm text-gray-medium">{area.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
