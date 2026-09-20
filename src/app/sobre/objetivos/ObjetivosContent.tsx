"use client";

import { AccentBar, Badge, Divider } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import CardAtividade from "@/components/CardAtividade";
import Sidebar from "@/components/Sidebar";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const offeringIcons = ["💬", "🖼️", "🎤", "📚", "🤝", "🎓"];

export default function ObjetivosContent() {
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
        badge={t.sobre.objHeroBadge}
        title={t.sobre.objHeroTitle}
        backgroundImage="/images/hero/fivaa-junte-se.webp"
        breadcrumbs={[
          { label: t.nav.about, href: "/sobre" },
          { label: t.nav.aboutObjectives },
        ]}
      />

      {/* Objetivos Principais */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <Sidebar title={t.sobre.sidebarTitle} links={sidebarLinks} />
            <div className="space-y-16">
              <div>
                <Badge className="mb-8">{t.sobre.objMainBadge}</Badge>
                <div className="grid gap-6 sm:grid-cols-3">
                  {t.sobre.objectives.map((obj) => (
                    <CardAtividade
                      key={obj.title}
                      title={obj.title}
                      description={obj.desc}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Badge className="mb-8">{t.sobre.objOffBadge}</Badge>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {t.sobre.offerings.map((item, i) => (
                    <CardAtividade
                      key={item.title}
                      title={item.title}
                      description={item.desc}
                      icon={<span className="text-xl">{offeringIcons[i]}</span>}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Badge className="mb-8">{t.sobre.objAreasBadge}</Badge>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {t.sobre.artAreas.map((area) => (
                    <CardAtividade
                      key={area.title}
                      title={area.title}
                      description={area.desc}
                    />
                  ))}
                </div>
                <Divider className="mt-12" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
