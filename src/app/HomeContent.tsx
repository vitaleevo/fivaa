"use client";

import HeroSlideshow from "@/components/HeroSlideshow";
import Link from "next/link";
import { IconLectures, IconExhibition, IconLivePerformance, IconNetworking } from "@/components/HighlightIcons";
import { AfricanPatternDark, Divider, Badge, MudclothPattern, TribalDivider } from "@/components/BrandElements";
import FlipCard from "@/components/FlipCard";
import FlipLink from "@/components/FlipLink";
import HomeSpeakers from "./HomeSpeakers";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const stats = [
  { number: "100+", labelKey: "statsCreators" },
  { number: "30+", labelKey: "statsCountries" },
  { number: "30+", labelKey: "statsSpeakers" },
  { number: "1K+", labelKey: "statsAttendees" },
] as const;

const highlightIcons = [IconLectures, IconExhibition, IconLivePerformance, IconNetworking];
const highlightHrefs = [
  "/programacao/palestras",
  "/programacao/exposicoes",
  "/programacao/festival",
  "/programacao",
];

export default function HomeContent() {
  const { t } = useLanguage();

  return (
    <>
      {/* 1. Hero — Fullscreen Slideshow */}
      <HeroSlideshow />

      {/* 2. Manifesto — Dark */}
      <TribalDivider className="text-green-dark bg-warm-white" />
      <section className="relative overflow-hidden bg-green-dark py-28 md:py-36">
        <AfricanPatternDark />
        <MudclothPattern className="opacity-[0.06]" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-orange/5 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <Badge className="border-white/20 bg-white/5 text-white/80">{t.home.manifestoBadge}</Badge>
          <p className="mt-8 font-montserrat text-3xl font-bold leading-[1.18] tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
            &ldquo;{t.home.manifestoQuote1}{" "}
            <span className="text-gold">{t.home.manifestoQuote2}</span>{" "}
            {t.home.manifestoQuote3}&rdquo;
          </p>
          <Divider className="mt-10" />
        </div>
      </section>
      <TribalDivider className="text-green-dark bg-warm-white rotate-180" />

      {/* 3. Números — Light */}
      <section className="site-grid relative bg-warm-white py-20 md:py-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-gold/15 bg-white/95 shadow-[0_24px_70px_rgba(18,71,52,0.10)] backdrop-blur-sm">
            <div className="grid grid-cols-2 divide-y divide-gold/10 md:grid-cols-4 md:divide-x md:divide-y-0">
              {stats.map((stat) => (
                <div key={stat.labelKey} className="group px-4 py-9 text-center sm:px-6 sm:py-11">
                  <p className="font-montserrat text-4xl font-black tracking-[-0.05em] text-gold transition-transform duration-300 group-hover:scale-105 sm:text-5xl lg:text-6xl">
                  {stat.number}
                  </p>
                  <p className="mt-3 font-montserrat text-[11px] font-bold uppercase tracking-[0.12em] text-gray-medium sm:text-xs">
                  {t.home[stat.labelKey]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Destaques — Dark */}
      <TribalDivider className="text-green-dark bg-warm-white" />
      <section className="relative bg-green-dark py-28 md:py-32">
        <AfricanPatternDark />
        <MudclothPattern className="opacity-[0.06]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center md:mb-16">
            <Badge className="border-white/20 bg-white/5 text-white/80">{t.home.highlightsBadge}</Badge>
            <h2 className="mt-6 font-montserrat text-4xl font-black text-white sm:text-5xl">
              {t.home.highlightsTitle}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.highlights.map((item, hi) => {
              const Icon = highlightIcons[hi];
              return (
                <FlipCard
                  key={item.title}
                  label={`${t.common.flipHint}: ${item.title}`}
                  front={
                    <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-8 shadow-[0_14px_36px_rgba(0,0,0,0.14)] backdrop-blur-sm transition-colors hover:border-gold/40 hover:bg-white/10">
                      <div className="mb-6 text-gold">
                        <Icon className="w-12 h-12" />
                      </div>
                      <h3 className="mb-3 font-montserrat text-lg font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/60">
                        {item.desc}
                      </p>
                      <span className="absolute bottom-3 right-4 text-sm text-white/30" aria-hidden="true">↻</span>
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold to-orange transition-all group-hover:w-full" />
                    </div>
                  }
                  back={
                    <div className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-gold/40 bg-white/10 p-8 shadow-[0_14px_36px_rgba(0,0,0,0.14)] backdrop-blur-sm">
                      <div className="mb-6 text-gold">
                        <Icon className="w-12 h-12" />
                      </div>
                      <h3 className="mb-3 font-montserrat text-lg font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/60">
                        {item.desc}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-6">
                        <FlipLink
                          href={highlightHrefs[hi]}
                          className="inline-flex items-center gap-2 font-montserrat text-sm font-bold text-gold transition-colors hover:text-gold/80"
                        >
                          {t.common.explore} <span aria-hidden="true">→</span>
                        </FlipLink>
                        <span className="text-xs text-white/40" aria-hidden="true">{t.common.backHint}</span>
                      </div>
                    </div>
                  }
                />
              );
            })}
          </div>
        </div>
      </section>
      <TribalDivider className="text-green-dark bg-warm-white rotate-180" />

      {/* 4b. Oradores — Dark (publicado pelo admin) */}
      <HomeSpeakers />

      {/* 5. Programação — Light */}
      <section className="site-grid relative bg-warm-white py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center md:mb-16">
            <Badge>{t.home.scheduleBadge}</Badge>
            <h2 className="mt-6 font-montserrat text-4xl font-black text-green-dark sm:text-5xl">
              {t.home.scheduleTitle}
            </h2>
          </div>
          <div className="relative rounded-[2rem] border border-gold/15 bg-white px-5 py-10 shadow-[0_24px_70px_rgba(18,71,52,0.10)] sm:px-10 md:px-14">
            <div className="absolute left-8 top-12 h-[calc(100%-6rem)] w-px bg-gradient-to-b from-gold/60 via-gold/25 to-transparent md:left-1/2" />
            <div className="space-y-14">
              {t.home.timeline.map((item, i) => (
                <div key={item.day} className={`relative flex items-center gap-8 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
                    <Badge>{item.day}</Badge>
                    <h3 className="mt-4 font-montserrat text-2xl font-bold text-green-dark">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-gray-medium">{item.desc}</p>
                  </div>
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-gold/40 bg-white shadow-lg shadow-gold/10 md:mx-0">
                    <div className="h-2.5 w-2.5 rounded-full bg-gold" />
                  </div>
                  <div className="hidden flex-1 md:block" />
                </div>
              ))}
            </div>
          </div>
          <Divider className="my-10" />
          <div className="text-center">
            <Link href="/programacao" className="inline-flex items-center gap-2 rounded-full border-2 border-green-dark px-8 py-4 font-montserrat text-sm font-extrabold text-green-dark transition-all hover:-translate-y-0.5 hover:bg-green-dark hover:text-white hover:shadow-xl hover:shadow-green-dark/15">
              {t.home.scheduleViewAll}
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Local — Dark */}
      <TribalDivider className="text-green-dark bg-warm-white" />
      <section className="relative overflow-hidden bg-green-dark py-28 md:py-32">
        <AfricanPatternDark />
        <MudclothPattern className="opacity-[0.06]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(253,184,19,0.08)_0%,_transparent_70%)]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Badge className="border-white/20 bg-white/5 text-white/80">{t.home.venueBadge}</Badge>
          <h2 className="mt-6 font-montserrat text-4xl font-black text-white sm:text-5xl">
            {t.home.venueTitle}
          </h2>
          <p className="mt-6 text-lg text-white/70">
            {t.home.venueSubtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs font-medium uppercase tracking-wider text-white/40">
            <span className="rounded-full border border-white/20 px-4 py-2">20 e 21 de novembro de 2026</span>
            <span className="rounded-full border border-white/20 px-4 py-2">Luanda, Angola</span>
            <span className="rounded-full border border-white/20 px-4 py-2">fivaaforum.com</span>
          </div>
        </div>
      </section>
      <TribalDivider className="text-green-dark bg-cream rotate-180" />

      {/* 7. CTA Final — Light */}
      <section className="site-grid relative overflow-hidden bg-cream py-24 md:py-32">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-gold/20 bg-warm-white/90 px-6 py-14 shadow-[0_24px_70px_rgba(18,71,52,0.10)] backdrop-blur-sm sm:px-12 sm:py-16">
          <h2 className="mb-6 font-montserrat text-4xl font-black text-green-dark sm:text-5xl">
            {t.home.ctaTitle1}{" "}
            <span className="text-gold">{t.home.ctaTitle2}</span>?
          </h2>
          <p className="mb-12 text-lg text-gray-medium">
            {t.home.ctaSubtitle}
          </p>
          <Link href="/inscricao" className="group relative inline-block overflow-hidden rounded-full bg-gold px-14 py-5 font-montserrat text-base font-extrabold text-green-dark transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-gold/30">
            <span className="relative z-10">{t.home.ctaButton}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gold to-gold-metallic opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
          </div>
        </div>
      </section>
    </>
  );
}
