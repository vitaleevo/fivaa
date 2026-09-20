"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { contactEmail } from "@/lib/site";

export default function PageError({ reset }: { reset: () => void }) {
  const { t } = useLanguage();
  return (
    <section role="alert" className="bg-warm-white px-6 py-24 text-center text-green-dark">
      <h1 className="font-montserrat text-3xl font-bold">{t.common.pageErrorTitle}</h1>
      <p className="mt-4">{t.common.pageErrorDesc.replace("{email}", contactEmail)}</p>
      <button type="button" onClick={reset} className="mt-8 rounded-full bg-gold px-8 py-4 font-bold">{t.common.pageErrorRetry}</button>
    </section>
  );
}
