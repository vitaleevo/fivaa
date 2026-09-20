"use client";

import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import CardAtividade from "@/components/CardAtividade";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function MicIcon({ className = "" }: { className?: string }) {
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
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

export default function PalestrasContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.programacao.palestrasHeroBadge}
        title={t.programacao.palestrasHeroTitle}
        subtitle={t.programacao.palestrasHeroSubtitle}
        backgroundImage="/images/hero/fivaa-art-culture.webp"
        breadcrumbs={[
          { label: t.nav.schedule, href: "/programacao" },
          { label: t.nav.lectures },
        ]}
      />

      {/* Content */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {t.programacao.palestrasItems.map((p) => (
                <CardAtividade
                  key={p.title}
                  title={p.title}
                  description={p.desc}
                  schedule={p.schedule}
                  tags={[...p.tags]}
                  icon={<MicIcon className="h-5 w-5 text-gold" />}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
