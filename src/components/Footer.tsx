"use client";

import Image from "next/image";
import Link from "next/link";
import { DividerWhite } from "@/components/BrandElements";
import { Instagram, Facebook, Linkedin } from "@/components/SocialIcons";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { contactEmail, socialLinks as fivaaSocialLinks } from "@/lib/site";

const socialLinks = [
  { Icon: Instagram, ...fivaaSocialLinks[0], label: "Instagram" },
  { Icon: Facebook, ...fivaaSocialLinks[1], label: "Facebook" },
  { Icon: Linkedin, ...fivaaSocialLinks[2], label: "LinkedIn" },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden border-t-4 border-gold bg-green-dark">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] kente-stripes" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/images/LOGO FIVAA - MONOCRÓMATICO - BRANCO SEM FUNDO.png"
              alt="FIVAA"
              width={1000}
              height={1000}
              className="h-24 w-auto object-contain sm:h-28"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {t.footer.desc}
            </p>
            <div className="mt-4">
              <LanguageSwitcher />
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-gold">
              {t.footer.links}
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/sobre", label: t.nav.about },
                { href: "/programacao", label: t.nav.schedule },
                { href: "/educacao", label: t.nav.education },
                { href: "/oradores", label: t.nav.speakers },
                { href: "/parceiros", label: t.nav.partners },
                { href: "/inscricao", label: t.nav.register },
                { href: "/contactos", label: t.nav.contacts },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-gold">
              {t.footer.contact}
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>Luanda, Angola</li>
              <li>Palácio de Ferro</li>
              <li>
                <a href="tel:+244931238451" className="transition-colors hover:text-gold">
                  +244 931 238 451
                </a>
              </li>
              <li>
                <a href={`mailto:${contactEmail}`} className="transition-colors hover:text-gold">
                  {contactEmail}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-gold">
              {t.footer.social}
            </h4>
            <p className="mb-4 text-sm text-white/60">
              {t.footer.socialText}
            </p>
            <div className="flex gap-3" aria-label="Redes sociais">
              {socialLinks.map((social) => {
                const IconComponent = social.Icon;
                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-gold hover:bg-gold hover:text-green-dark"
                    aria-label={social.label}>
                    <IconComponent className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <DividerWhite className="my-12" />

        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm text-white/40">
              &copy; 2026 {t.footer.rights}
            </p>
            <p className="mt-1 text-xs text-white/20">
              fivaa.com &middot; Palácio de Ferro, Luanda, Angola
            </p>
          </div>
          <div className="flex items-center gap-6 text-xs text-white/50">
            <Link href="/privacidade" className="hover:text-gold transition-colors underline-offset-4 hover:underline">
              {t.footer.privacy}
            </Link>
            <span>&middot;</span>
            <Link href="/termos" className="hover:text-gold transition-colors underline-offset-4 hover:underline">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
