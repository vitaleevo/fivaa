"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function OradoresClient() {
  const speakers = useQuery(api.speakers.get);

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {speakers === undefined ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
        </div>
      ) : speakers.length === 0 ? (
        <div className="text-center py-20 text-white/50">
          Nenhum orador registado.
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {speakers.map((speaker) => (
            <div key={speaker._id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-gold/30 hover:bg-white/10">
              <div className={`relative h-64 bg-gradient-to-br ${speaker.color} overflow-hidden`}>
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 15px),
                                   repeating-linear-gradient(-45deg, #fff 0px, #fff 1px, transparent 1px, transparent 15px)`,
                }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-montserrat text-8xl font-black text-white/20">
                    {speaker.name.charAt(0)}
                  </span>
                </div>
                <div className="absolute right-3 top-3 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
                  <span className="text-xs font-semibold text-white">{speaker.country}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-montserrat text-lg font-bold text-white">
                  {speaker.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-gold">{speaker.role}</p>
                <div className="mt-4 h-[1px] w-0 bg-gradient-to-r from-gold to-orange transition-all group-hover:w-full" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
