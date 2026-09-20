"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function CookieConsent() {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("fivaa_cookie_consent");
      if (!consent) {
        // Small delay to prevent layout pop
        const timer = setTimeout(() => setShow(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleAccept = (type: "all" | "necessary") => {
    try {
      localStorage.setItem("fivaa_cookie_consent", type);
    } catch {
      // ignore
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.cookies.title}
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-5 duration-300 sm:bottom-6 sm:left-6 sm:right-6"
    >
      <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-green-dark/95 p-5 shadow-2xl backdrop-blur-md sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 pr-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">🛡️</span>
              <h3 className="font-montserrat text-sm font-bold text-gold">
                {t.cookies.title}
              </h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-white/80 sm:text-sm">
              {t.cookies.text}{" "}
              <Link
                href="/privacidade"
                className="font-semibold text-gold underline underline-offset-2 hover:text-white transition-colors"
              >
                {t.cookies.privacyPolicy}
              </Link>
              .
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-nowrap">
            <button
              type="button"
              onClick={() => handleAccept("necessary")}
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t.cookies.necessaryOnly}
            </button>
            <button
              type="button"
              onClick={() => handleAccept("all")}
              className="rounded-full bg-gold px-5 py-2 text-xs font-bold text-green-dark shadow-md transition-all hover:bg-gold-metallic hover:shadow-lg"
            >
              {t.cookies.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
