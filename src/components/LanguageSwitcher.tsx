"use client";

import { useLanguage, Language } from "@/lib/i18n/LanguageContext";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const languages: { code: Language; label: string; flag: string; country: string }[] = [
  { code: "pt", label: "PT", flag: "🇦🇴", country: "Português" },
  { code: "en", label: "EN", flag: "🇬🇧", country: "English" },
  { code: "fr", label: "FR", flag: "🇫🇷", country: "Français" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full border border-gold/30 bg-white/80 px-2.5 py-1.5 text-xs font-bold text-green-dark shadow-sm backdrop-blur-sm transition-all hover:border-gold hover:bg-white focus:outline-none focus:ring-2 focus:ring-gold/40"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Selecionar idioma"
      >
        <span className="text-sm">{currentLang.flag}</span>
        <span className="font-montserrat tracking-wider">{currentLang.label}</span>
        <svg
          className={cn("h-3 w-3 text-gold transition-transform duration-200", open && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-36 origin-top-right rounded-xl border border-gold/20 bg-white p-1.5 shadow-xl ring-1 ring-black/5 backdrop-blur-md">
          <div className="py-1">
            {languages.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setLanguage(item.code);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                  language === item.code
                    ? "bg-green-dark text-gold font-bold"
                    : "text-dark hover:bg-gold/10 hover:text-green-dark"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{item.flag}</span>
                  <span>{item.country}</span>
                </div>
                <span className="text-[10px] uppercase text-gray-400 font-bold">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
