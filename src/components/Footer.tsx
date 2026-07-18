import Image from "next/image";
import Link from "next/link";
import { DividerWhite } from "@/components/BrandElements";
import { Instagram, Facebook, Linkedin, Youtube } from "@/components/SocialIcons";

const socialLinks = [
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-green-dark">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-5">
              <Image
                src="/images/LOGO FIVAA - MONOCRÓMATICO - BRANCO SEM FUNDO.png"
                alt="FIVAA — Fórum Internacional para a Valorização da Arte Africana"
                width={480}
                height={150}
                className="h-36 w-auto object-contain"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Plataforma internacional dedicada à promoção, valorização e
              desenvolvimento das indústrias criativas africanas.
            </p>
          </div>

          <div>
            <h4 className="mb-5 font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/sobre", label: "Sobre" },
                { href: "/programacao", label: "Programação" },
                { href: "/educacao", label: "Educação" },
                { href: "/oradores", label: "Oradores" },
                { href: "/parceiros", label: "Parceiros" },
                { href: "/inscricao", label: "Inscrição" },
                { href: "/contactos", label: "Contactos" },
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
              Contacto
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
                <a href="mailto:info@fivaaforum.com" className="transition-colors hover:text-gold">
                  info@fivaaforum.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Redes Sociais
            </h4>
            <p className="mb-4 text-sm text-white/60">
              Siga o FIVAA nas redes sociais.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.Icon;
                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-gold hover:bg-gold hover:text-white"
                    aria-label={social.label}>
                    <IconComponent className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <DividerWhite className="my-12" />

        <div className="text-center">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} FIVAA — Fórum & Festival
            Internacional da Valorização da Arte Africana.
          </p>
          <p className="mt-1 text-xs text-white/20">
            fivaaforum.com &middot; Luanda, Angola
          </p>
        </div>
      </div>
    </footer>
  );
}
