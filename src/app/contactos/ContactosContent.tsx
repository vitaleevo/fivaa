"use client";

import { AccentBar, Badge, AfricanPatternDark } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { ContactFormWrapper } from "@/components/ContactFormWrapper";
import { Instagram, Facebook, Linkedin } from "@/components/SocialIcons";
import { contactEmail, socialLinks as fivaaSocialLinks } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const socialLinks = [
  { Icon: Instagram, ...fivaaSocialLinks[0], label: "Instagram" },
  { Icon: Facebook, ...fivaaSocialLinks[1], label: "Facebook" },
  { Icon: Linkedin, ...fivaaSocialLinks[2], label: "LinkedIn" },
];

export default function ContactosContent() {
  const { t } = useLanguage();
  const infos = [
    { label: t.contactos.phoneLabel, value: "+244 931 238 451", href: "tel:+244931238451" },
    { label: t.contactos.emailLabel, value: contactEmail, href: `mailto:${contactEmail}` },
    { label: t.contactos.venueLabel, value: t.contactos.venueValue },
    { label: t.contactos.dateLabel, value: t.contactos.dateValue },
  ];

  return (
    <>
      <PageHero
        badge={t.contactos.heroBadge}
        title={t.contactos.heroTitle}
        subtitle={t.contactos.heroSubtitle}
        backgroundImage="/images/hero/fivaa-forum-hero.webp"
      />

      {/* 2. Content — Dark */}
      <AccentBar />
      <section className="relative overflow-hidden bg-green-dark py-32">
        <AfricanPatternDark />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Info */}
            <div>
              <Badge className="mb-10 border-white/20 bg-white/5 text-white/80">{t.contactos.infoBadge}</Badge>
              <div className="space-y-10">
                {infos.map((info) => (
                  <div key={info.label}>
                    <p className="mb-2 font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-gold">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a href={info.href} aria-label={`${info.label}: ${info.value}`} className="text-lg text-white/70 transition-colors hover:text-gold">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-lg text-white/70">{info.value}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-14">
                <h3 className="mb-5 font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-gold">
                  {t.contactos.socialTitle}
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const IconComponent = social.Icon;
                    return (
                      <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/50 transition-all hover:border-gold hover:bg-gold hover:text-green-dark"
                        aria-label={social.label}>
                        <IconComponent className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <Badge className="mb-10 border-white/20 bg-white/5 text-white/80">{t.contactos.formBadge}</Badge>
              <ContactFormWrapper />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
