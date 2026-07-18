export function AfricanPattern({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 opacity-[0.03] ${className}`} style={{
      backgroundImage: `
        repeating-linear-gradient(45deg, #FDB813 0px, #FDB813 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, #FDB813 0px, #FDB813 1px, transparent 1px, transparent 20px)
      `,
    }} />
  );
}

export function AfricanPatternDark({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 opacity-[0.05] ${className}`} style={{
      backgroundImage: `
        repeating-linear-gradient(45deg, #FDB813 0px, #FDB813 1px, transparent 1px, transparent 25px),
        repeating-linear-gradient(-45deg, #FDB813 0px, #FDB813 1px, transparent 1px, transparent 25px)
      `,
    }} />
  );
}

export function KenteStripes({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 opacity-[0.04] ${className}`} style={{
      backgroundImage: `
        linear-gradient(30deg, #FDB813 12%, transparent 12.5%, transparent 87%, #FDB813 87.5%, #FDB813),
        linear-gradient(150deg, #FDB813 12%, transparent 12.5%, transparent 87%, #FDB813 87.5%, #FDB813),
        linear-gradient(30deg, #FDB813 12%, transparent 12.5%, transparent 87%, #FDB813 87.5%, #FDB813),
        linear-gradient(150deg, #FDB813 12%, transparent 12.5%, transparent 87%, #FDB813 87.5%, #FDB813),
        linear-gradient(60deg, #F26A21 25%, transparent 25.5%, transparent 75%, #F26A21 75%, #F26A21),
        linear-gradient(60deg, #F26A21 25%, transparent 25.5%, transparent 75%, #F26A21 75%, #F26A21)
      `,
      backgroundSize: "20px 35px",
      backgroundPosition: "0 0, 0 0, 10px 18px, 10px 18px, 0 0, 10px 18px",
    }} />
  );
}

export function DiamondPattern({ className = "" }: { className?: string }) {
  return (
    <svg className={`absolute inset-0 h-full w-full opacity-[0.03] ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <pattern id="diamonds" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 0L40 20L20 40L0 20Z" fill="none" stroke="#FDB813" strokeWidth="0.5"/>
          <path d="M20 10L30 20L20 30L10 20Z" fill="none" stroke="#F26A21" strokeWidth="0.3"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#diamonds)"/>
    </svg>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 0L20 10L10 20L0 10Z" fill="#FDB813"/>
        <path d="M10 4L16 10L10 16L4 10Z" fill="#124734"/>
      </svg>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </div>
  );
}

export function DividerWhite({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 0L20 10L10 20L0 10Z" fill="#FDB813"/>
        <path d="M10 4L16 10L10 16L4 10Z" fill="#124734"/>
      </svg>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

export function AccentBar({ className = "" }: { className?: string }) {
  return (
    <div className={`h-1 w-full bg-gradient-to-r from-gold via-orange to-gold-metallic ${className}`} />
  );
}

export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-gold ${className}`}>
      {children}
    </span>
  );
}

export function MudclothPattern({ className = "" }: { className?: string }) {
  return (
    <svg className={`absolute inset-0 h-full w-full opacity-[0.03] pointer-events-none ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <pattern id="mudcloth" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          {/* Ziguezague tradicional */}
          <path d="M 0 10 L 15 0 L 30 10 L 45 0 L 60 10" fill="none" stroke="currentColor" strokeWidth="1" />
          {/* Símbolo de Escudo/Cruzes */}
          <path d="M 15 30 L 15 45 M 7.5 37.5 L 22.5 37.5" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="45" cy="37.5" r="2" fill="currentColor" />
          {/* Linhas paralelas pontilhadas */}
          <path d="M 0 55 L 60 55" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mudcloth)" className="text-gold" />
    </svg>
  );
}

export function TribalDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${className}`}>
      <svg className="relative block w-full h-[30px]" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
        <path d="M0,0 L30,60 L60,0 L90,60 L120,0 L150,60 L180,0 L210,60 L240,0 L270,60 L300,0 L330,60 L360,0 L390,60 L420,0 L450,60 L480,0 L510,60 L540,0 L570,60 L600,0 L630,60 L660,0 L690,60 L720,0 L750,60 L780,0 L810,60 L840,0 L870,60 L900,0 L930,60 L960,0 L990,60 L1020,0 L1050,60 L1080,0 L1110,60 L1140,0 L1170,60 L1200,0 L1200,120 L0,120 Z" />
      </svg>
    </div>
  );
}
