"use client";

import { AccentBar, AfricanPatternDark } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { OradoresWrapper } from "./OradoresWrapper";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function OradoresContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.oradores.heroBadge}
        title={t.oradores.heroTitle}
        subtitle={t.oradores.heroSubtitle}
        backgroundImage="/images/hero/fivaa-forum-hero.webp"
      />

      {/* 2. Speakers Grid — Dark */}
      <AccentBar />
      <section className="relative overflow-hidden bg-green-dark py-32">
        <AfricanPatternDark />
        <OradoresWrapper />
      </section>
    </>
  );
}
