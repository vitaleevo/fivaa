"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  { bg: "/images/hero/fivaa-forum-hero.webp", title: "FIVAA 2026", subtitle: "Fórum Internacional para a Valorização da Arte Africana" },
  { bg: "/images/hero/fivaa-art-culture.webp", title: "Arte & Cultura", subtitle: "Dois dias de imersão na arte africana" },
  { bg: "/images/hero/fivaa-palacio-ferro.webp", title: "20–21 Novembro", subtitle: "Palácio de Ferro, Luanda, Angola" },
  { bg: "/images/hero/fivaa-junte-se.webp", title: "Junte-se a nós", subtitle: "Inscreva-se agora no maior evento de arte africana" },
  { bg: "/images/hero/fivaa-educacao.webp", title: "Luanda, Angola", subtitle: "Palácio de Ferro — o palco da arte africana" },
  { bg: "/images/hero/fivaa-experiencia.webp", title: "Experiência única", subtitle: "Música, exposições, networking e muito mais" },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const next = useCallback(() => setCurrent((previous) => (previous + 1) % slides.length), []);
  const previous = useCallback(() => setCurrent((value) => (value - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(next, 7000);
    return () => window.clearInterval(timer);
  }, [next, reducedMotion]);

  const activeSlide = slides[current];

  return (
    <section className="relative h-[calc(100vh-7rem)] min-h-[620px] w-full overflow-hidden bg-green-dark supports-[height:100svh]:h-[calc(100svh-7rem)]" aria-label="Apresentação de imagens do evento FIVAA">
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {current + 1} de {slides.length}: {activeSlide.title} — {activeSlide.subtitle}
      </div>

      {slides.map((slide, index) => {
        const active = index === current;
        return (
          <div
            key={slide.bg}
            className={`absolute inset-0 ${reducedMotion ? "" : "transition-opacity duration-1000 ease-in-out"} ${active ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"}`}
            aria-hidden="true"
          >
            <Image
              src={slide.bg}
              alt=""
              fill
              sizes="100vw"
              priority={index === 0}
              aria-hidden="true"
              style={{ objectFit: "cover", objectPosition: "center" }}
              className={`${reducedMotion ? "" : "transition-transform duration-[7000ms] ease-out"} ${active ? "scale-105" : "scale-100"}`}
            />
          </div>
        );
      })}

      <div className="absolute inset-0 z-10 bg-black/35" aria-hidden="true" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-green-dark via-green-dark/65 to-green-dark/10" aria-hidden="true" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-green-dark/85 via-transparent to-black/35" aria-hidden="true" />
      <div className="absolute left-0 top-0 z-20 h-full w-1 bg-gradient-to-b from-gold via-orange to-transparent" aria-hidden="true" />

      <div className="absolute inset-0 z-20 flex items-center justify-center px-5 pb-16 pt-20 sm:px-8 lg:px-12">
        <div className="w-full max-w-4xl text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-green-dark/60 px-4 py-2 shadow-lg backdrop-blur-md">
            <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-[0.24em] text-gold sm:text-xs">FIVAA Fórum & Festival 2026</span>
          </div>
          <h1 className="max-w-3xl font-montserrat text-5xl font-black leading-[0.98] tracking-[-0.045em] text-white drop-shadow-[0_5px_16px_rgba(0,0,0,0.55)] sm:text-6xl md:text-7xl lg:text-8xl">
            {activeSlide.title}
          </h1>
          <p className="mt-6 max-w-2xl font-montserrat text-base font-medium leading-relaxed text-white/90 drop-shadow-[0_2px_5px_rgba(0,0,0,0.6)] sm:text-lg lg:text-xl">
            {activeSlide.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link href="/inscricao" className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 font-montserrat text-sm font-extrabold text-green-dark shadow-xl shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-gold-metallic hover:shadow-2xl sm:px-10">
              Inscreva-se agora
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <span className="font-montserrat text-xs font-bold uppercase tracking-[0.14em] text-white/75">20–21 Nov · Palácio de Ferro</span>
          </div>
        </div>
      </div>

      <button onClick={previous} className="absolute left-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/15 text-white backdrop-blur-sm transition-all hover:border-gold hover:bg-green-dark/70 hover:text-gold active:scale-95 sm:flex md:left-8" aria-label="Slide anterior">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/15 text-white backdrop-blur-sm transition-all hover:border-gold hover:bg-green-dark/70 hover:text-gold active:scale-95 sm:flex md:right-8" aria-label="Próximo slide">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-0 right-0 z-20 hidden h-40 w-40 border-l border-t border-gold/30 bg-green-dark/20 backdrop-blur-sm lg:block" aria-hidden="true">
        <div className="absolute bottom-7 right-8 whitespace-nowrap font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Luanda · Angola</div>
      </div>

      <div className="absolute bottom-7 left-0 right-0 z-30 flex items-center justify-center gap-3" role="tablist" aria-label="Navegação de slides">
        {slides.map((slide, index) => (
          <button
            key={slide.bg}
            type="button"
            onClick={() => setCurrent(index)}
            role="tab"
            aria-selected={index === current}
            aria-label={`Ir para slide ${index + 1}: ${slide.title}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${index === current ? "w-8 bg-gold" : "w-2.5 bg-white/35 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </section>
  );
}
