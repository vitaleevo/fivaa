"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { TurnstileWidget } from "@/components/TurnstileWidget";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [securityError, setSecurityError] = useState("");
  const hasTurnstile = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const nameVal = form.name.trim();
    const emailVal = form.email.trim();
    const subjectVal = form.subject.trim();
    const messageVal = form.message.trim();

    if (nameVal.length < 3) {
      newErrors.name = "O nome deve conter pelo menos 3 caracteres.";
    } else if (nameVal.length > 80) {
      newErrors.name = "O nome não deve exceder 80 caracteres.";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailVal)) {
      newErrors.email = "Por favor, insira um e-mail válido.";
    }

    if (subjectVal.length < 3) {
      newErrors.subject = "O assunto deve conter pelo menos 3 caracteres.";
    } else if (subjectVal.length > 100) {
      newErrors.subject = "O assunto não deve exceder 100 caracteres.";
    }

    if (messageVal.length < 10) {
      newErrors.message = "A mensagem deve conter pelo menos 10 caracteres.";
    } else if (messageVal.length > 1000) {
      newErrors.message = "A mensagem não deve exceder 1000 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    if (validateForm()) {
      if (hasTurnstile && !turnstileToken) {
        setSecurityError("Confirme a verificação de segurança antes de enviar.");
        return;
      }

      setStatus("loading");
      setSecurityError("");
      
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            startedAt,
            honeypot,
            turnstileToken,
          }),
        });

        const result = (await response.json()) as { error?: string };

        if (!response.ok) {
          throw new Error(result.error ?? "Ocorreu um erro ao enviar a mensagem.");
        }

        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setHoneypot("");
        setStartedAt(Date.now());
        setTurnstileToken("");
        setTurnstileKey((current) => current + 1);
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        setSecurityError(error instanceof Error ? error.message : "Falha na verificação de segurança.");
        setTurnstileToken("");
        setTurnstileKey((current) => current + 1);
        setStatus("error");
      }
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gold/20 bg-white/5 p-10 text-center backdrop-blur-sm animate-fade-in">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 text-gold">
          <svg className="h-10 w-10 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-3 font-montserrat text-2xl font-bold text-white">Mensagem Enviada!</h3>
        <p className="mb-6 text-sm text-white/60">
          Agradecemos o seu contacto. A nossa equipa irá responder-lhe com a maior brevidade possível.
        </p>
        <button
          onClick={() => setStatus("idle")}
          aria-label="Enviar nova mensagem de contacto"
          className="rounded-full border border-white/20 px-8 py-3.5 font-montserrat text-xs font-semibold uppercase tracking-wider text-white/50 transition-all hover:border-gold hover:text-white"
        >
          Enviar Nova Mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-label="Formulário de contacto">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {hasTurnstile && (
        <div>
          <TurnstileWidget
            key={turnstileKey}
            action="contact_form"
            onVerify={(token) => {
              setTurnstileToken(token);
              setSecurityError("");
            }}
            onExpire={() => {
              setTurnstileToken("");
              setSecurityError("A verificação expirou. Confirme novamente.");
            }}
            onError={() => {
              setTurnstileToken("");
              setSecurityError("Não foi possível validar a proteção anti-bot.");
            }}
          />
        </div>
      )}

      {[
        { id: "name", label: "Nome", type: "text", placeholder: "Insira o seu nome" },
        { id: "email", label: "E-mail", type: "email", placeholder: "exemplo@fivaaforum.com" },
        { id: "subject", label: "Assunto", type: "text", placeholder: "Assunto do contacto" },
      ].map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id} className="mb-2 block font-montserrat text-sm font-semibold text-white/60">
            {field.label}
          </label>
          <input
            id={field.id}
            type={field.type}
            required
            placeholder={field.placeholder}
            value={form[field.id as keyof typeof form]}
            aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
            aria-invalid={errors[field.id] ? "true" : "false"}
            onChange={(e) => {
              setForm({ ...form, [field.id]: e.target.value });
              if (errors[field.id]) {
                setErrors({ ...errors, [field.id]: "" });
              }
            }}
            className={cn(
              "w-full rounded-xl border bg-white/5 px-5 py-4 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:ring-2 focus:ring-gold/20",
              errors[field.id] ? "border-rose-500 focus:border-rose-500" : "border-white/10 focus:border-gold"
            )}
          />
          {errors[field.id] && (
            <p id={`${field.id}-error`} className="mt-1.5 font-montserrat text-xs font-medium text-rose-400" role="alert">
              {errors[field.id]}
            </p>
          )}
        </div>
      ))}
      
      <div>
        <label htmlFor="message" className="mb-2 block font-montserrat text-sm font-semibold text-white/60">
          Mensagem
        </label>
        <textarea
          id="message"
          rows={5}
          required
          placeholder="Escreva a sua mensagem aqui..."
          value={form.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={errors.message ? "true" : "false"}
          onChange={(e) => {
            setForm({ ...form, message: e.target.value });
            if (errors.message) {
              setErrors({ ...errors, message: "" });
            }
          }}
          className={cn(
            "w-full resize-none rounded-xl border bg-white/5 px-5 py-4 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:ring-2 focus:ring-gold/20",
            errors.message ? "border-rose-500 focus:border-rose-500" : "border-white/10 focus:border-gold"
          )}
        />
        <div className="mt-1 flex justify-between text-xs text-white/40">
          <span id="message-error">{errors.message ? <span className="text-rose-400" role="alert">{errors.message}</span> : ""}</span>
          <span aria-hidden="true">{form.message.length}/1000</span>
        </div>
      </div>

      {status === "error" && (
        <p className="text-sm font-medium text-rose-400">
          Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.
        </p>
      )}

      {securityError && (
        <p className="text-sm font-medium text-rose-400">
          {securityError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        aria-label={status === "loading" ? "A enviar mensagem..." : "Enviar mensagem de contacto"}
        className="flex items-center justify-center gap-3 rounded-full bg-gold px-12 py-5 font-montserrat text-base font-bold text-white transition-all hover:shadow-2xl hover:shadow-gold/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? (
          <>
            <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>A enviar...</span>
          </>
        ) : (
          <span>Enviar Mensagem</span>
        )}
      </button>
    </form>
  );
}
