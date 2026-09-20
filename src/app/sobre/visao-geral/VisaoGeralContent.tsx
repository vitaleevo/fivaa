"use client";

import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import Sidebar from "@/components/Sidebar";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function VisaoGeralContent() {
  const { t } = useLanguage();
  const sidebarLinks = [
    { href: "/sobre/visao-geral", label: t.nav.aboutOverview },
    { href: "/sobre/objetivos", label: t.nav.aboutObjectives },
    { href: "/sobre/impacto", label: t.nav.aboutImpact },
    { href: "/sobre/historia", label: t.nav.aboutHistory },
  ];
  return (
    <>
      <PageHero
        badge={t.sobre.visaoHeroBadge}
        title={t.sobre.visaoHeroTitle}
        backgroundImage="/images/hero/fivaa-junte-se.webp"
        breadcrumbs={[
          { label: t.nav.about, href: "/sobre" },
          { label: t.nav.aboutOverview },
        ]}
      />

      {/* Content */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <Sidebar title={t.sobre.sidebarTitle} links={sidebarLinks} />
            <div className="space-y-12">
              <div>
                <p className="text-lg leading-relaxed text-gray-medium">
                  {t.sobre.visaoIntro}
                </p>
              </div>

              <div className="rounded-2xl border border-gold/20 bg-cream p-8">
                <p className="font-montserrat text-xl font-bold text-green-dark italic">
                  &ldquo;{t.sobre.visaoQuote}&rdquo;
                </p>
              </div>

              <div>
                <h2 className="mb-4 font-montserrat text-2xl font-bold text-green-dark">{t.sobre.visaoWhatTitle}</h2>
                <p className="text-gray-medium leading-relaxed">
                  {t.sobre.visaoWhatText}
                </p>
              </div>

              <div>
                <h2 className="mb-4 font-montserrat text-2xl font-bold text-green-dark">{t.sobre.visaoCommitTitle}</h2>
                <p className="text-gray-medium leading-relaxed">
                  {t.sobre.visaoCommitText}
                </p>
              </div>

              <div className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md">
                <h3 className="mb-4 font-montserrat text-lg font-bold text-green-dark">{t.sobre.visaoOrgTitle}</h3>
                <p className="text-gray-medium leading-relaxed">
                  {t.sobre.visaoOrgText}
                </p>
              </div>

              <div className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md">
                <h3 className="mb-4 font-montserrat text-lg font-bold text-green-dark">{t.sobre.visaoReachTitle}</h3>
                <p className="text-gray-medium leading-relaxed">
                  {t.sobre.visaoReachText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
