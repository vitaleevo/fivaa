"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    bg: "/images/hero/11.webp",
    logo: "/images/LOGO FIVAA - PRINCIPAL.png",
    title: "FIVAA 2026",
    subtitle: "Fórum Internacional para a Valorização da Arte Africana",
  },
  {
    bg: "/images/hero/387c1334-f070-4f6a-a569-6d63e85e9101.webp",
    logo: "/images/LOGO FIVAA - NEGATIVO.png",
    title: "Arte & Cultura",
    subtitle: "Dois dias de imersão na arte africana",
  },
  {
    bg: "/images/hero/banner-xs.webp",
    logo: "/images/LOGO FIVAA - MONOCRÓMATICO - BRANCO SEM FUNDO.png",
    title: "20-21 Novembro",
    subtitle: "Palácio de Ferro, Luanda, Angola",
  },
  {
    bg: "/images/hero/BeauxArtsFestival-3_F6F5D918-D076-2506-9708329E3D1124EA_f6f70129-d4ea-262f-31953200ed3efa60.webp",
    logo: "/images/LOGO FIVAA - PRINCIPAL  SEM FUNDO.png",
    title: "Junte-se a nós",
    subtitle: "Inscreva-se agora no maior evento de arte africana",
  },
  {
    bg: "/images/hero/LC_CERT-10-1.webp",
    logo: "/images/LOGO FIVAA - PRINCIPAL.png",
    title: "Luanda, Angola",
    subtitle: "Palácio de Ferro — O palco da arte africana",
  },
  {
    bg: "/images/hero/whatsapp-image-2025-09-08-at-10-01-27-am-1200x800.jpeg",
    logo: "/images/LOGO FIVAA - NEGATIVO.png",
    title: "Experiência Única",
    subtitle: "Música, exposições, networking e muito mais",
  },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[80vh] min-h-[550px] w-full overflow-hidden md:h-[85vh]" aria-label="Apresentação de imagens do evento FIVAA">
      {/* Visually hidden main H1 for page SEO */}
      <h1 className="sr-only">FIVAA 2026 — Fórum Internacional para a Valorização da Arte Africana em Luanda, Angola</h1>

      {/* Live region for screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {current + 1} de {slides.length}: {slides[current].title} — {slides[current].subtitle}
      </div>

      {/* Slides */}
      {slides.map((slide, i) => {
        const active = i === current;
        return (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background image with Ken Burns slow zoom */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={slide.bg}
                alt=""
                fill
                className={`object-cover transition-transform duration-[7000ms] ease-out ${
                  active ? "scale-105" : "scale-100"
                }`}
                priority={i === 0}
                aria-hidden="true"
              />
            </div>

            {/* Premium glassmorphic gradient overlay */}
            <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-green-dark/95 via-black/35 to-black/50" />

            {/* Slide Content wrapper */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
              <div
                className={`max-w-4xl transition-all duration-1000 transform ${
                  active ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
              >
                {/* Subtitle Badge */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 backdrop-blur-md">
                  <span className="font-montserrat text-xs font-bold uppercase tracking-[0.25em] text-gold">
                    FIVAA Fórum & Festival 2026
                  </span>
                </div>

                {/* Title */}
                <h2 className="mb-5 font-montserrat text-4xl font-black leading-tight text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] sm:text-5xl md:text-6xl lg:text-7xl">
                  {slide.title}
                </h2>

                {/* Description */}
                <p className="mx-auto max-w-2xl font-montserrat text-base font-medium text-white/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] sm:text-lg lg:text-xl">
                  {slide.subtitle}
                </p>

                {/* CTA Button */}
                <div className="mt-8">
                  <Link
                    href="/inscricao"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold px-10 py-4 font-montserrat text-sm font-bold text-white shadow-lg shadow-gold/25 transition-all hover:bg-gold-metallic hover:shadow-xl hover:shadow-gold/30 hover:scale-105"
                  >
                    <span className="relative z-10">Inscreva-se Agora</span>
                    <svg
                      className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Left Arrow */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all hover:border-gold hover:bg-gold/20 hover:text-gold active:scale-95 md:left-8 md:h-14 md:w-14"
        aria-label="Anterior"
      >
        <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all hover:border-gold hover:bg-gold/20 hover:text-gold active:scale-95 md:right-8 md:h-14 md:w-14"
        aria-label="Próximo"
      >
        <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Date Badge (Top Left) */}
      <div className="absolute left-6 top-6 z-20 sm:left-8 sm:top-8">
        <div className="rounded-full border border-gold/30 bg-green-dark/80 px-5 py-2.5 backdrop-blur-md shadow-md">
          <span className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-gold">
            20-21 Nov 2026 &middot; Luanda
          </span>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-center gap-3" role="tablist" aria-label="Navegação de slides">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Ir para slide ${i + 1}: ${slides[i].title}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-gold" : "w-2.5 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
