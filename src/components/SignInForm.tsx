"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

export function SignInForm() {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signIn("password", {
        email: email.trim().toLowerCase(),
        password,
        flow: "signIn",
      });
    } catch (err) {
      console.error("Authentication failed:", err);
      setError("Credenciais inválidas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit} aria-label="Formulário de autenticação do administrador">
      <div>
        <h3 className="text-lg font-medium text-gray-900 text-center mb-4">
          Autenticação
        </h3>
        <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700">Email</label>
        <div className="mt-1">
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-describedby={error ? "login-error" : undefined}
            aria-invalid={error ? "true" : "false"}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gold focus:outline-none focus:ring-gold sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700">Password</label>
        <div className="mt-1">
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-describedby={error ? "login-error" : undefined}
            aria-invalid={error ? "true" : "false"}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gold focus:outline-none focus:ring-gold sm:text-sm"
          />
        </div>
      </div>

      {error && (
        <div id="login-error" className="text-sm text-red-600 font-medium text-center" role="alert">
          {error}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          aria-label={loading ? "A processar autenticação..." : "Entrar no painel administrativo"}
          className="flex w-full justify-center rounded-md border border-transparent bg-gold py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gold-metallic focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
          {loading ? "A processar..." : "Entrar no Backoffice"}
        </button>
      </div>
    </form>
  );
}
