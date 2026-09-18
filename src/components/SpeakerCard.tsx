import Image from "next/image";

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

export function SpeakerCard({ speaker }: { speaker: PublicSpeaker }) {
  const src = speaker.resolvedPhotoUrl ?? speaker.photoUrl ?? null;
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-gold/30 hover:bg-white/10">
      <div className={`relative h-64 overflow-hidden bg-gradient-to-br ${speaker.color}`}>
        {src ? (
          <Image
            src={src}
            alt={speaker.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
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
        )}
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
