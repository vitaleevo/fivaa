"use client";

import PageHero from "@/components/PageHero";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function DesafiosContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.programacao.desafiosHeroBadge}
        title={t.programacao.desafiosHeroTitle}
        subtitle={t.programacao.desafiosHeroSubtitle}
        backgroundImage="/images/hero/fivaa-art-culture.webp"
        breadcrumbs={[
          { label: t.nav.schedule, href: "/programacao" },
          { label: t.nav.challenges },
        ]}
      />
    </>
  );
}
