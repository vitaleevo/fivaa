export function IconLectures({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M18 16V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 14V34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M30 18V30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 20H34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 28H34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function IconExhibition({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 14H42" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="11" r="1.5" fill="currentColor"/>
      <circle cx="17" cy="11" r="1.5" fill="currentColor"/>
      <circle cx="22" cy="11" r="1.5" fill="currentColor"/>
      <path d="M12 20L18 26L24 22L32 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32 20V30H40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 36V42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M30 36V42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function IconLivePerformance({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M24 12V24L30 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M32 16C34.5 18.5 34.5 21.5 32 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M36 12C40 16 40 22 36 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 16C13.5 18.5 13.5 21.5 16 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 12C8 16 8 22 12 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function IconNetworking({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="32" r="5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="36" cy="32" r="5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M20 16L14 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 16L34 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17 32H31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
