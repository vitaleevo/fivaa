"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthLoading, Authenticated, Unauthenticated, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "../../../convex/_generated/api";
import { SignInForm } from "@/components/SignInForm";

const adminNavItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/inscricoes", label: "Inscrições" },
  { href: "/admin/mensagens", label: "Mensagens" },
  { href: "/admin/oradores", label: "Oradores" },
  { href: "/admin/programacao", label: "Programação" },
  { href: "/admin/testemunhos", label: "Testemunhos" },
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
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <p className="text-center font-montserrat text-xs font-bold uppercase tracking-[0.32em] text-gold">
          Acesso restrito
        </p>
        <h1 className="mt-4 text-center font-montserrat text-3xl font-black text-green-dark">
          FIVAA Backoffice
        </h1>
      </div>
      <div className="mt-8 w-full sm:mx-auto sm:max-w-md">
        <div className="rounded-2xl border border-gold/10 bg-white px-5 py-8 shadow-xl shadow-green-dark/5 sm:px-10">
          <SignInForm />
        </div>
        <div className="mt-5 text-center">
          <Link href="/" className="text-sm font-semibold text-green-dark transition-colors hover:text-orange">
            &larr; Voltar ao site
          </Link>
        </div>
      </div>
    </div>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  const admin = useQuery(api.admin.current);

  if (admin === undefined) {
    return <FullScreenStatus label="A confirmar permissões..." />;
  }

  if (!admin.isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-xl shadow-green-dark/5">
          <p className="font-montserrat text-xs font-bold uppercase tracking-[0.28em] text-red-500">
            Acesso negado
          </p>
          <h1 className="mt-4 font-montserrat text-2xl font-black text-green-dark">
            Esta conta não tem permissão de admin.
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-600">
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
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AdminNavigation email={admin.email ?? "info@fivaa.com"} />
      <main className="min-w-0 flex-1 bg-gray-50">
        {children}
      </main>
    </div>
  );
}

function AdminNavigation({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <aside className="bg-green-dark text-white lg:flex lg:w-72 lg:shrink-0 lg:flex-col">
      <div className="border-b border-white/10 px-5 py-5 lg:px-6">
        <p className="font-montserrat text-xs font-bold uppercase tracking-[0.28em] text-gold">
          FIVAA
        </p>
        <h2 className="mt-2 font-montserrat text-xl font-black">Backoffice</h2>
        <p className="mt-2 truncate text-xs text-white/55">{email}</p>
      </div>

      <nav aria-label="Navegação administrativa" className="flex gap-2 overflow-x-auto px-4 py-3 lg:flex-1 lg:flex-col lg:overflow-visible lg:p-4">
        {adminNavItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                isActive
                  ? "bg-gold text-green-dark"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <SignOutButton />
      </div>
    </aside>
  );
}

function SignOutButton({ variant = "default" }: { variant?: "default" | "danger" }) {
  const { signOut } = useAuthActions();

  return (
    <button
      type="button"
      onClick={() => signOut()}
      className={`w-full rounded-lg px-4 py-2.5 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
        variant === "danger"
          ? "bg-red-50 text-red-700 hover:bg-red-100"
          : "bg-white/10 text-white hover:bg-white/15"
      }`}
    >
      Terminar sessão
    </button>
  );
}

function FullScreenStatus({ label }: { label: string }) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex items-center gap-3 rounded-full border border-gold/15 bg-white px-5 py-3 shadow-lg shadow-green-dark/5">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        <span className="font-montserrat text-sm font-bold text-green-dark">{label}</span>
      </div>
    </div>
  );
}
