"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <section className="bg-warm-white px-6 py-24 text-center text-green-dark">
      <p className="font-bold">404</p>
      <h1 className="mt-4 font-montserrat text-3xl font-bold">{t.common.notFoundTitle}</h1>
      <p className="mt-4">{t.common.notFoundDesc}</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-gold px-8 py-4 font-bold">{t.common.notFoundButton}</Link>
    </section>
  );
}
