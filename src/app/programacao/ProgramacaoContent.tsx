"use client";

import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { ProgramacaoWrapper } from "./ProgramacaoWrapper";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ProgramacaoContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.programacao.overviewHeroBadge}
        title={t.programacao.overviewHeroTitle}
        subtitle={t.programacao.overviewHeroSubtitle}
        backgroundImage="/images/hero/fivaa-art-culture.webp"
      />

      <AccentBar />
      <ProgramacaoWrapper />
    </>
  );
}
