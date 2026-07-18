"use client";

import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { SignInForm } from "@/components/SignInForm";
import Link from "next/link";
import { useAuthActions } from "@convex-dev/auth/react";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AuthLoading>
        <div className="flex h-screen items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
        </div>
      </AuthLoading>

      <Unauthenticated>
        <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center font-montserrat text-3xl font-black text-green-dark">
              FIVAA Backoffice
            </h2>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 border border-gold/10">
              <SignInForm />
            </div>
            <div className="mt-4 text-center">
              <Link href="/" className="text-sm text-gold hover:text-orange transition-colors">
                &larr; Voltar ao site
              </Link>
            </div>
          </div>
        </div>
      </Unauthenticated>

      <Authenticated>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <div className="w-64 bg-green-dark text-white flex flex-col">
            <div className="p-6 border-b border-white/10">
              <h2 className="font-montserrat text-xl font-bold text-gold">FIVAA Admin</h2>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              <Link href="/admin" className="block px-4 py-2 rounded bg-white/5 hover:bg-white/10 transition-colors">
                Dashboard
              </Link>
              <Link href="/admin/inscricoes" className="block px-4 py-2 rounded hover:bg-white/10 transition-colors">
                Inscrições
              </Link>
              <Link href="/admin/mensagens" className="block px-4 py-2 rounded hover:bg-white/10 transition-colors">
                Mensagens
              </Link>
              <Link href="/admin/oradores" className="block px-4 py-2 rounded hover:bg-white/10 transition-colors">
                Oradores
              </Link>
              <Link href="/admin/programacao" className="block px-4 py-2 rounded hover:bg-white/10 transition-colors">
                Programação
              </Link>
              <Link href="/admin/testemunhos" className="block px-4 py-2 rounded hover:bg-white/10 transition-colors">
                Testemunhos
              </Link>
            </nav>
            <div className="p-4 border-t border-white/10">
              <SignOutButton />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 bg-gray-50 overflow-auto">
            {children}
          </div>
        </div>
      </Authenticated>
    </div>
  );
}

function SignOutButton() {
  const { signOut } = useAuthActions();
  return (
    <button
      onClick={() => signOut()}
      className="w-full text-left px-4 py-2 text-sm text-white/50 hover:text-white transition-colors"
    >
      Terminar Sessão
    </button>
  );
}
