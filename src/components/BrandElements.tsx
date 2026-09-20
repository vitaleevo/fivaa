export function AfricanPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute inset-0 h-full w-full pointer-events-none opacity-[0.014] ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="african-pattern-light" x="0" y="0" width="9" height="9" patternUnits="userSpaceOnUse">
          <path d="M4.5 0.7L8.3 4.5L4.5 8.3L0.7 4.5Z" fill="none" stroke="#124734" strokeWidth="0.36" />
          <path d="M2.2 2.2L4.5 4.5L2.2 6.8" fill="none" stroke="#FDB813" strokeWidth="0.34" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.8 2.2L4.5 4.5L6.8 6.8" fill="none" stroke="#FDB813" strokeWidth="0.34" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="4.5" cy="4.5" r="0.42" fill="#F26A21" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#african-pattern-light)" />
    </svg>
  );
}

export function AfricanPatternDark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute inset-0 h-full w-full pointer-events-none opacity-[0.018] ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="african-pattern-dark" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 5H10" stroke="#FDB813" strokeWidth="0.26" strokeDasharray="0.8 1.4" />
          <path d="M5 0V10" stroke="#FDB813" strokeWidth="0.26" strokeDasharray="0.8 1.4" />
          <path d="M5 1L9 5L5 9L1 5Z" fill="none" stroke="#FDB813" strokeWidth="0.34" />
          <path d="M2.8 2.9L5 5L7.2 2.9" fill="none" stroke="#F26A21" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.8 7.1L5 5L7.2 7.1" fill="none" stroke="#F26A21" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#african-pattern-dark)" />
    </svg>
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

export function OsramScrollCue({ className = "" }: { className?: string }) {
  return (
    <div
      className={`osram-scroll-cue flex flex-col items-center text-gold ${className}`}
      aria-hidden="true"
      data-osram-scroll-cue
    >
      <svg viewBox="0 0 48 32" className="h-7 w-11" fill="none">
        <path
          d="M4 5C7.5 13.5 14.5 18 24 18S40.5 13.5 44 5C41.5 17.5 34.5 26 24 26S6.5 17.5 4 5Z"
          fill="currentColor"
        />
      </svg>
      <span className="sr-only">Conteúdo abaixo</span>
    </div>
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
    <div className={`relative w-full overflow-hidden leading-[0] ${className}`}>
      <svg
        className="relative block h-[42px] w-full md:h-[54px]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="tribal-divider-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M0 52L20 32L40 52L60 32L80 52L100 32L120 52" fill="none" stroke="rgba(253,184,19,0.28)" strokeWidth="3" strokeLinejoin="round" />
            <path d="M0 72L20 92L40 72L60 92L80 72L100 92L120 72" fill="none" stroke="rgba(242,106,33,0.18)" strokeWidth="3" strokeLinejoin="round" />
            <path d="M40 18L60 38L80 18" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </pattern>
        </defs>
        <path
          d="M0 58L40 36L80 58L120 36L160 58L200 36L240 58L280 36L320 58L360 36L400 58L440 36L480 58L520 36L560 58L600 36L640 58L680 36L720 58L760 36L800 58L840 36L880 58L920 36L960 58L1000 36L1040 58L1080 36L1120 58L1160 36L1200 58V120H0V58Z"
          fill="currentColor"
        />
        <path
          d="M0 58L40 36L80 58L120 36L160 58L200 36L240 58L280 36L320 58L360 36L400 58L440 36L480 58L520 36L560 58L600 36L640 58L680 36L720 58L760 36L800 58L840 36L880 58L920 36L960 58L1000 36L1040 58L1080 36L1120 58L1160 36L1200 58V120H0V58Z"
          fill="url(#tribal-divider-pattern)"
        />
        <path
          d="M0 58L40 36L80 58L120 36L160 58L200 36L240 58L280 36L320 58L360 36L400 58L440 36L480 58L520 36L560 58L600 36L640 58L680 36L720 58L760 36L800 58L840 36L880 58L920 36L960 58L1000 36L1040 58L1080 36L1120 58L1160 36L1200 58"
          fill="none"
          stroke="rgba(253,184,19,0.40)"
          strokeWidth="2.2"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />
        <path
          d="M20 76L40 56L60 76L80 56L100 76L120 56L140 76L160 56L180 76L200 56L220 76L240 56L260 76L280 56L300 76L320 56L340 76L360 56L380 76L400 56L420 76L440 56L460 76L480 56L500 76L520 56L540 76L560 56L580 76L600 56L620 76L640 56L660 76L680 56L700 76L720 56L740 76L760 56L780 76L800 56L820 76L840 56L860 76L880 56L900 76L920 56L940 76L960 56L980 76L1000 56L1020 76L1040 56L1060 76L1080 56L1100 76L1120 56L1140 76L1160 56L1180 76"
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
