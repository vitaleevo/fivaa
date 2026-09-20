"use client";

import Link from "next/link";
import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import CardAtividade from "@/components/CardAtividade";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function BookOpenIcon({ className = "" }: { className?: string }) {
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export default function WorkshopsContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t.programacao.workshopsHeroBadge}
        title={t.programacao.workshopsHeroTitle}
        subtitle={t.programacao.workshopsHeroSubtitle}
        backgroundImage="/images/hero/fivaa-art-culture.webp"
        breadcrumbs={[
          { label: t.nav.schedule, href: "/programacao" },
          { label: t.nav.workshops },
        ]}
      />

      {/* Content */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {t.programacao.workshopsItems.map((ws) => (
                <CardAtividade
                  key={ws.title}
                  title={ws.title}
                  description={ws.desc}
                  schedule={ws.schedule}
                  time={ws.time}
                  tags={[...ws.tags]}
                  icon={<BookOpenIcon className="h-5 w-5 text-gold" />}
                />
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-green-dark py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat text-3xl font-bold text-white">{t.programacao.workshopsCtaTitle}</h2>
          <p className="mt-4 text-white/70">{t.programacao.workshopsCtaDesc}</p>
          <Link href="/inscricao" className="mt-8 inline-block rounded-full bg-gold px-8 py-4 font-montserrat text-sm font-bold text-green-dark shadow-lg shadow-gold/20 transition-all hover:bg-gold/90 hover:shadow-xl">
            {t.programacao.workshopsCtaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
