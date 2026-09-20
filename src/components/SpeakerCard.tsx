"use client";

import Image from "next/image";
import { useState } from "react";

export type PublicSpeaker = {
  _id: string;
  name: string;
  role: string;
  country: string;
  color: string;
  bio?: string;
  category?: string;
  resolvedPhotoUrl?: string | null;
  photoUrl?: string;
};

function InitialAvatar({ speaker, size }: { speaker: PublicSpeaker; size: "lg" | "sm" }) {
  if (size === "lg") {
    return (
      <>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 15px),
                               repeating-linear-gradient(-45deg, #fff 0px, #fff 1px, transparent 1px, transparent 15px)`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-montserrat text-8xl font-black text-white/20">
            {speaker.name.charAt(0)}
          </span>
        </div>
      </>
    );
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="font-montserrat text-8xl font-black text-white/20">
        {speaker.name.charAt(0)}
      </span>
    </div>
  );
}

export function SpeakerCard({ speaker }: { speaker: PublicSpeaker }) {
  const src = speaker.resolvedPhotoUrl ?? speaker.photoUrl ?? null;
  const [failed, setFailed] = useState(false);
  const showImg = !!src && !failed;

  // Sem foto: cartão estático.
  if (!showImg) {
    return (
      <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-transform duration-300 motion-safe:hover:scale-[1.02] hover:border-gold/30 hover:bg-white/10 hover:shadow-xl">
        <div className={`relative h-64 overflow-hidden bg-gradient-to-br ${speaker.color}`}>
          <InitialAvatar speaker={speaker} size="lg" />
          <div className="absolute right-3 top-3 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
            <span className="text-xs font-semibold text-white">{speaker.country}</span>
          </div>
        </div>
        <div className="p-6">
          {speaker.category && (
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">
              {speaker.category}
            </p>
          )}
          <h3 className="font-montserrat text-lg font-bold text-white">{speaker.name}</h3>
          <p className="mt-1 text-sm font-medium text-gold">{speaker.role}</p>
          {speaker.bio && <p className="mt-3 text-sm leading-relaxed text-white/60 line-clamp-3">{speaker.bio}</p>}
          <div className="mt-4 h-[1px] w-0 bg-gradient-to-r from-gold to-orange transition-all group-hover:w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-transform duration-300 motion-safe:hover:scale-[1.02] hover:border-gold/30 hover:bg-white/10 hover:shadow-xl">
      <div className={`relative h-64 shrink-0 overflow-hidden bg-gradient-to-br ${speaker.color}`}>
        <Image
          src={src}
          alt={speaker.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-top transition-transform duration-300 motion-safe:group-hover:scale-[1.04]"
          onError={() => setFailed(true)}
        />
        <div className="absolute right-3 top-3 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
          <span className="text-xs font-semibold text-white">{speaker.country}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        {speaker.category && (
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">
            {speaker.category}
          </p>
        )}
        <h3 className="font-montserrat text-lg font-bold text-white">{speaker.name}</h3>
        <p className="mt-1 text-sm font-medium text-gold">{speaker.role}</p>
        {speaker.bio && <p className="mt-3 text-sm leading-relaxed text-white/60 line-clamp-3">{speaker.bio}</p>}
        <div className="mt-4 h-[1px] w-0 bg-gradient-to-r from-gold to-orange transition-all group-hover:w-full" />
      </div>
    </div>
  );
}
