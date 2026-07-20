import type { Metadata } from "next";
import { AccentBar, Badge, AfricanPatternDark } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { ContactFormWrapper } from "@/components/ContactFormWrapper";
import { Instagram, Facebook, Linkedin, Youtube } from "@/components/SocialIcons";

const socialLinks = [
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export const metadata: Metadata = {
  title: "Contactos — FIVAA",
  description:
    "Entre em contacto com a equipa do FIVAA. Estamos em Luanda, Angola.",
};

export default function Contactos() {
  return (
    <>
      <PageHero
        badge="Contactos"
        title="Estamos aqui"
        subtitle="Entre em contacto com a equipa do FIVAA. Estamos em Luanda, Angola."
        backgroundImage="/images/hero/fivaa-forum-hero.png"
      />

      {/* 2. Content — Dark */}
      <AccentBar />
      <section className="relative overflow-hidden bg-green-dark py-32">
        <AfricanPatternDark />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Info */}
            <div>
              <Badge className="mb-10 border-white/20 bg-white/5 text-white/80">Informações</Badge>
              <div className="space-y-10">
                {[
                  { label: "Telefone", value: "+244 931 238 451", href: "tel:+244931238451" },
                  { label: "E-mail", value: "info@fivaaforum.com", href: "mailto:info@fivaaforum.com" },
                  { label: "Local", value: "Palácio de Ferro, Luanda, Angola" },
                  { label: "Data", value: "20-21 Novembro 2026" },
                ].map((info) => (
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
                  Redes Sociais
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
              <Badge className="mb-10 border-white/20 bg-white/5 text-white/80">Envie-nos uma mensagem</Badge>
              <ContactFormWrapper />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
