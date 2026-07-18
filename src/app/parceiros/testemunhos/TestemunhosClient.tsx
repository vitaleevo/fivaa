"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function TestemunhosClient() {
  const testemunhos = useQuery(api.testimonials.get);

  if (testemunhos === undefined) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
      </div>
    );
  }

  if (testemunhos.length === 0) {
    return (
      <div className="text-center py-20 text-gray-medium">
        Nenhum testemunho disponível de momento.
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {testemunhos.map((t) => (
        <div key={t._id} className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg">
          <div className="mb-4 text-4xl text-gold/30">&ldquo;</div>
          <p className="mb-6 text-sm text-gray-medium italic">&ldquo;{t.quote}&rdquo;</p>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold to-orange font-montserrat text-lg font-bold text-white">
              {t.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-montserrat text-sm font-bold text-green-dark">{t.name}</h4>
              <p className="text-xs text-gray-medium">{t.role}</p>
              <p className="text-xs text-gold">{t.location}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
