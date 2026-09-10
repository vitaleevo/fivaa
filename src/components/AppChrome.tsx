"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { CookieConsent } from "@/components/CookieConsent";
import { PublicContentTranslator } from "@/components/PublicContentTranslator";

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdmin) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <LanguageProvider>
      <div data-public-content className="contents">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-green-dark focus:p-4 focus:text-white">Saltar para o conteúdo</a>
        <Header />
        <main id="conteudo" tabIndex={-1} className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </div>
      <PublicContentTranslator />
    </LanguageProvider>
  );
}
