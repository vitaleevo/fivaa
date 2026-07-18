"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Instagram, Facebook, Linkedin, Youtube } from "@/components/SocialIcons";

const socialLinks = [
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/sobre",
    label: "Sobre",
    children: [
      { href: "/sobre/visao-geral", label: "Visão Geral" },
      { href: "/sobre/objetivos", label: "Objetivos" },
      { href: "/sobre/impacto", label: "Impacto" },
      { href: "/sobre/historia", label: "História" },
    ],
  },
  {
    href: "/programacao",
    label: "Programação",
    children: [
      { href: "/programacao/workshops", label: "Workshops" },
      { href: "/programacao/palestras", label: "Palestras" },
      { href: "/programacao/exposicoes", label: "Exposições" },
      { href: "/programacao/mentoria", label: "Mentoria" },
      { href: "/programacao/cursos", label: "Cursos" },
      { href: "/programacao/desafios", label: "Desafios" },
      { href: "/programacao/feedback", label: "Feedback" },
      { href: "/programacao/festival", label: "Festival" },
    ],
  },
  {
    href: "/educacao",
    label: "Educação",
    children: [
      { href: "/educacao/recursos", label: "Recursos" },
      { href: "/educacao/workshops", label: "Workshops" },
      { href: "/educacao/certificacoes", label: "Certificações" },
    ],
  },
  { href: "/oradores", label: "Oradores" },
  {
    href: "/parceiros",
    label: "Parceiros",
    children: [
      { href: "/parceiros/beneficios", label: "Benefícios" },
      { href: "/parceiros/como-ser", label: "Como Ser Parceiro" },
      { href: "/parceiros/testemunhos", label: "Testemunhos" },
    ],
  },
  { href: "/contactos", label: "Contactos" },
];

function DesktopDropdown({ link }: { link: typeof navLinks[0] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  if (!link.children) return null;

  const isActive = pathname === link.href || link.children.some((child) => pathname === child.href);

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link
        href={link.href}
        className={cn(
          "flex items-center gap-1 rounded-lg px-4 py-2 font-montserrat text-sm font-medium transition-all",
          isActive
            ? "bg-gold/10 text-gold"
            : "text-gray-medium hover:bg-gold/5 hover:text-gold"
        )}
      >
        {link.label}
        <svg className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Link>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-xl border border-gold/10 bg-white p-2 shadow-xl">
          {link.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={cn(
                "block rounded-lg px-4 py-2.5 font-montserrat text-sm transition-all",
                pathname === child.href
                  ? "bg-gold/10 font-medium text-gold"
                  : "text-gray-medium hover:bg-gold/5 hover:text-gold"
              )}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileDropdown({ link }: { link: typeof navLinks[0] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  if (!link.children) return null;

  const isActive = pathname === link.href || link.children.some((child) => pathname === child.href);

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link
          href={link.href}
          className={cn(
            "rounded-lg px-4 py-3 font-montserrat text-sm font-medium transition-all",
            isActive
              ? "bg-gold/10 text-gold"
              : "text-gray-medium hover:bg-gold/5 hover:text-gold"
          )}
        >
          {link.label}
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="mr-4 p-2 text-gray-medium"
          aria-label={`Toggle ${link.label}`}
        >
          <svg className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="ml-4 border-l-2 border-gold/20 pl-4">
          {link.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={cn(
                "block rounded-lg px-4 py-2.5 font-montserrat text-sm transition-all",
                pathname === child.href
                  ? "bg-gold/10 font-medium text-gold"
                  : "text-gray-medium hover:bg-gold/5 hover:text-gold"
              )}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top Bar */}
      <div className="bg-green-dark py-2">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <a href="tel:+244931238451" className="flex items-center gap-2 text-xs text-white/70 transition-colors hover:text-gold">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +244 931 238 451
            </a>
            <a href="mailto:info@fivaaforum.com" className="flex items-center gap-2 text-xs text-white/70 transition-colors hover:text-gold">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              info@fivaaforum.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const IconComponent = social.Icon;
              return (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="text-white/50 transition-colors hover:text-gold" aria-label={social.label}>
                  <IconComponent className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gold/10 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/LOGO FIVAA - PRINCIPAL  SEM FUNDO.png"
              alt="FIVAA — Fórum Internacional para a Valorização da Arte Africana"
              width={540}
              height={180}
              className="h-28 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) =>
              link.children ? (
                <DesktopDropdown key={link.href} link={link} />
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-4 py-2 font-montserrat text-sm font-medium transition-all",
                    pathname === link.href
                      ? "bg-gold/10 text-gold"
                      : "text-gray-medium hover:bg-gold/5 hover:text-gold"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/inscricao"
              className="ml-4 rounded-full bg-gold px-6 py-2.5 font-montserrat text-sm font-bold text-white transition-all hover:bg-gold-metallic hover:shadow-lg hover:shadow-gold/20"
            >
              Inscrição
            </Link>
          </nav>

          <details className="group md:hidden" open={mobileOpen ? true : undefined}>
            <summary
              className="flex cursor-pointer list-none flex-col gap-1.5"
              aria-label="Menu"
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(!mobileOpen);
              }}
            >
              <span className="block h-0.5 w-6 bg-green-dark transition-all group-open:translate-y-2 group-open:rotate-45" />
              <span className="block h-0.5 w-6 bg-green-dark transition-all group-open:opacity-0" />
              <span className="block h-0.5 w-6 bg-green-dark transition-all group-open:-translate-y-2 group-open:-rotate-45" />
            </summary>
            {mobileOpen && (
              <div className="absolute left-0 right-0 top-full border-t border-gold/10 bg-white/95 px-4 pb-6 pt-4 shadow-2xl backdrop-blur-xl">
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) =>
                    link.children ? (
                      <MobileDropdown key={link.href} link={link} />
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "rounded-lg px-4 py-3 font-montserrat text-sm font-medium transition-all",
                          pathname === link.href
                            ? "bg-gold/10 text-gold"
                            : "text-gray-medium hover:bg-gold/5 hover:text-gold"
                        )}
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                  <Link href="/inscricao" onClick={() => setMobileOpen(false)}
                    className="mt-2 rounded-full bg-gold px-6 py-2.5 text-center font-montserrat text-sm font-bold text-white">
                    Inscrição
                  </Link>
                </nav>
              </div>
            )}
          </details>
        </div>
      </header>
    </>
  );
}
