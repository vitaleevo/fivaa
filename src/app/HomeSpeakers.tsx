"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SpeakerCard } from "@/components/SpeakerCard";
import { Badge } from "@/components/BrandElements";

export default function HomeSpeakers() {
  const speakers = useQuery(api.speakers.get);
  if (!speakers || speakers.length === 0) return null;
  const visible = speakers.slice(0, 8);
  return (
    <section className="relative bg-green-dark py-28 md:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center md:mb-16">
          <Badge className="border-white/20 bg-white/5 text-white/80">Vozes do FIVAA</Badge>
          <h2 className="mt-6 font-montserrat text-4xl font-black text-white sm:text-5xl">
            Oradores e convidados
          </h2>
          <p className="mt-4 text-white/60">Publicado pelo admin — atualizado em tempo real.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((s) => (
            <SpeakerCard key={s._id} speaker={s} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/oradores"
            className="inline-flex items-center gap-2 rounded-full border-2 border-gold px-8 py-4 font-montserrat text-sm font-extrabold text-gold transition-all hover:-translate-y-0.5 hover:bg-gold hover:text-green-dark"
          >
            Ver todos os oradores <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
