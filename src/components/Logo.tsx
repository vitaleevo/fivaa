import Image from "next/image";

export function LogoPrimary({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/images/LOGO FIVAA - PRINCIPAL  SEM FUNDO.png"
      alt="FIVAA"
      width={420}
      height={128}
      priority
      className={className}
    />
  );
}

export function LogoWhite({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/images/LOGO FIVAA - MONOCRÓMATICO - BRANCO SEM FUNDO.png"
      alt="FIVAA"
      width={420}
      height={128}
      className={className}
    />
  );
}

export function LogoDark({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 210 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* F */}
      <path d="M10 10H40V20H20V28H35V38H20V55H10V10Z" fill="#1A1A1A"/>
      {/* I */}
      <path d="M48 10H58V55H48V10Z" fill="#1A1A1A"/>
      {/* V */}
      <path d="M66 10H76L91 55H81L76 40L71 55H61L66 10Z" fill="#1A1A1A"/>
      {/* A */}
      <path d="M100 55L120 10H130L150 55H140L135 42H115L110 55H100ZM117 32H133L125 12L117 32Z" fill="#1A1A1A"/>
      {/* A */}
      <path d="M158 55L178 10H188L208 55H198L193 42H173L168 55H158ZM175 32H191L183 12L175 32Z" fill="#1A1A1A"/>
      {/* Gold accent diamond */}
      <path d="M95 30L105 40L95 50L85 40Z" fill="#FDB813"/>
      <path d="M95 33L102 40L95 47L88 40Z" fill="#1A1A1A"/>
      {/* Orange underline */}
      <rect x="10" y="58" width="198" height="3" rx="1.5" fill="#F26A21"/>
    </svg>
  );
}

export function LogoIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="28" fill="#124734" stroke="#FDB813" strokeWidth="2"/>
      <path d="M18 18H38V24H24V28H34V32H24V42H18V18Z" fill="white"/>
      <path d="M30 42L40 18H44L50 42H46L44 36H38L36 42H30ZM39 32H43L41 20L39 32Z" fill="white"/>
      <path d="M30 22L36 30L30 38L24 30Z" fill="#FDB813"/>
      <path d="M30 24L34 30L30 36L26 30Z" fill="#124734"/>
    </svg>
  );
}
