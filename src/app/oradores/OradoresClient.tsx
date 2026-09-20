"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { SpeakerCard } from "@/components/SpeakerCard";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function OradoresClient() {
  const { t } = useLanguage();
  const speakers = useQuery(api.speakers.get);

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {speakers === undefined || speakers.length === 0 ? (
        <div className="text-center py-20 text-white/50">
          {t.oradores.empty}
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker._id} speaker={speaker} />
          ))}
        </div>
      )}
    </div>
  );
}
