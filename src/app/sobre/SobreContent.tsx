"use client";

import { AccentBar, Badge, Divider, AfricanPatternDark } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function SobreContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.sobre.overviewHeroBadge}
        title={t.sobre.overviewHeroTitle}
        subtitle={t.sobre.overviewHeroSubtitle}
        backgroundImage="/images/hero/fivaa-junte-se.webp"
      />

      {/* 2. Missão — Dark */}
      <AccentBar />
      <section className="relative overflow-hidden bg-green-dark py-32">
        <AfricanPatternDark />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            <div>
              <Badge className="border-white/20 bg-white/5 text-white/80">{t.sobre.missionBadge}</Badge>
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                {t.sobre.missionText}
              </p>
            </div>

            <div>
              <Badge className="border-white/20 bg-white/5 text-white/80">{t.sobre.visionBadge}</Badge>
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                {t.sobre.visionText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Valores — Light */}
      <section className="relative bg-warm-white py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge>{t.sobre.valuesBadge}</Badge>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.sobre.values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10">
                <h3 className="mb-3 font-montserrat text-lg font-bold text-green-dark">{v.title}</h3>
                <p className="text-sm text-gray-medium">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. O Evento — Dark */}
      <AccentBar />
      <section className="relative overflow-hidden bg-green-dark py-32">
        <AfricanPatternDark />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Badge className="border-white/20 bg-white/5 text-white/80">{t.sobre.eventBadge}</Badge>
          <p className="mt-6 text-lg leading-relaxed text-white/80">
            {t.sobre.eventText}
          </p>
          <Divider className="mt-12" />
        </div>
      </section>
    </>
  );
}
