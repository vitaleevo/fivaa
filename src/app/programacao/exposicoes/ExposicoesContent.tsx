"use client";

import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import CardAtividade from "@/components/CardAtividade";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function ImageIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

export default function ExposicoesContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.programacao.exposicoesHeroBadge}
        title={t.programacao.exposicoesHeroTitle}
        subtitle={t.programacao.exposicoesHeroSubtitle}
        backgroundImage="/images/hero/fivaa-art-culture.webp"
        breadcrumbs={[
          { label: t.nav.schedule, href: "/programacao" },
          { label: t.nav.exhibitions },
        ]}
      />

      {/* Content */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {t.programacao.exposicoesItems.map((exp) => (
                <CardAtividade
                  key={exp.title}
                  title={exp.title}
                  description={exp.desc}
                  schedule={exp.schedule}
                  tags={[...exp.tags]}
                  icon={<ImageIcon className="h-5 w-5 text-gold" />}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
