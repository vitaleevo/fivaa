"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AuthLoading, Authenticated, Unauthenticated, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "../../../convex/_generated/api";
import { SignInForm } from "@/components/SignInForm";
import { LogoWhite } from "@/components/Logo";
import { KenteStripes } from "@/components/BrandElements";

const adminNavItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    href: "/admin/inscricoes",
    label: "Inscrições",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
      </svg>
    ),
  },
  {
    href: "/admin/mensagens",
    label: "Mensagens",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    href: "/admin/bilhetes",
    label: "Bilhetes",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
      </svg>
    ),
  },
  {
    href: "/admin/oradores",
    label: "Oradores",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    href: "/admin/programacao",
    label: "Programação",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    href: "/admin/testemunhos",
    label: "Testemunhos",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
];

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AuthLoading>
        <FullScreenStatus label="A validar sessão..." />
      </AuthLoading>

      <Unauthenticated>
        <AdminSignInScreen />
      </Unauthenticated>

      <Authenticated>
        <AdminShell>{children}</AdminShell>
      </Authenticated>
    </div>
  );
}

function AdminSignInScreen() {
  return (
    <div className="flex min-h-screen bg-warm-white">
      {/* Brand panel (desktop) */}
      <div className="relative hidden w-1/2 overflow-hidden bg-green-dark lg:flex lg:flex-col lg:justify-between">
        <KenteStripes className="opacity-[0.05]" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative z-10 p-12">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold shadow-lg">
              <span className="text-xl font-black text-green-dark">F</span>
            </div>
            <div>
              <p className="text-lg font-black text-white">FIVAA Backoffice</p>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
                Área de administração
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 px-12 pb-16">
          <LogoWhite className="mb-8 h-16 w-auto" />
          <blockquote className="max-w-md">
            <p className="text-2xl font-bold leading-snug text-white">
              Valorizar a arte africana é valorizar quem a cria.
            </p>
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-12 bg-gold" />
            <p className="text-sm text-white/60">
              Fórum &amp; Festival Internacional — Luanda, Angola
            </p>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:hidden">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-dark">
              <span className="text-xl font-black text-gold">F</span>
            </div>
            <LogoWhite className="mx-auto h-12 w-auto" />
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.32em] text-gold">
              Acesso restrito
            </p>
            <h1 className="mt-2 text-2xl font-black text-gray-900">
              FIVAA Backoffice
            </h1>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
            <div className="mb-6 hidden text-left lg:block">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">Acesso restrito</p>
              <h1 className="mt-1 text-2xl font-black text-gray-900">Bem-vindo de volta</h1>
              <p className="mt-1 text-sm text-gray-500">
                Inicia sessão para gerir o FIVAA 2026.
              </p>
            </div>
            <SignInForm />
          </div>

          <div className="mt-5 text-center">
            <Link href="/" className="text-sm font-medium text-gray-500 transition-colors hover:text-green-dark">
              &larr; Voltar ao site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  const admin = useQuery(api.admin.current);
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (admin === undefined) {
    return <FullScreenStatus label="A confirmar permissões..." />;
  }

  if (!admin.isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <svg className="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="text-xl font-black text-gray-900">Acesso negado</h1>
          <p className="mt-2 text-sm text-gray-500">
            Apenas o email autorizado pode aceder ao backoffice do FIVAA.
          </p>
          <div className="mt-6">
            <SignOutButton variant="danger" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-gray-900 transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold">
              <span className="text-sm font-black text-green-dark">F</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">FIVAA</p>
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">Backoffice</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Fechar menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Navegação administrativa">
          <div className="space-y-1">
            {adminNavItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gold/15 text-gold"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className={isActive ? "text-gold" : "text-white/40"}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User section */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">
              {admin.email?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{admin.email}</p>
              <p className="text-[10px] text-white/40">Administrador</p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar (mobile) */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-gray-200 bg-white px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Abrir menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gold">
              <span className="text-[10px] font-black text-green-dark">F</span>
            </div>
            <span className="text-sm font-bold text-gray-900">Backoffice</span>
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function SignOutButton({ variant = "default" }: { variant?: "default" | "danger" }) {
  const { signOut } = useAuthActions();

  return (
    <button
      type="button"
      onClick={() => signOut()}
      className={`mt-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
        variant === "danger"
          ? "bg-red-50 text-red-600 hover:bg-red-100"
          : "text-white/50 hover:bg-white/5 hover:text-white/70"
      }`}
    >
      Terminar sessão
    </button>
  );
}

function FullScreenStatus({ label }: { label: string }) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex items-center gap-3 rounded-full border border-gold/15 bg-white px-5 py-3 shadow-lg">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        <span className="text-sm font-bold text-gray-700">{label}</span>
      </div>
    </div>
  );
}
