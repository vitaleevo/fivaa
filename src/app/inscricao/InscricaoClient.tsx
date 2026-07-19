"use client";

import { useState } from "react";
import { AccentBar, AfricanPatternDark } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { TurnstileWidget } from "@/components/TurnstileWidget";
import { cn } from "@/lib/utils";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const steps = ["Bilhete", "Dados Pessoais", "Confirmação"];

export default function InscricaoClient() {
  const ticketTypes = useQuery(api.tickets.get);
  
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", org: "" });
  const [honeypot, setHoneypot] = useState("");
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [securityError, setSecurityError] = useState("");
  const hasTurnstile = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const nameVal = form.name.trim();
    const emailVal = form.email.trim();
    const phoneVal = form.phone.trim();
    const countryVal = form.country.trim();

    if (nameVal.length < 3) {
      newErrors.name = "Nome deve conter pelo menos 3 caracteres.";
    } else if (nameVal.length > 80) {
      newErrors.name = "Nome não deve exceder 80 caracteres.";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailVal)) {
      newErrors.email = "Insira um endereço de e-mail válido.";
    } else if (emailVal.length > 80) {
      newErrors.email = "E-mail não deve exceder 80 caracteres.";
    }

    // Phone validation
    const phoneRegex = /^\+?[0-9\s\-()]{9,20}$/;
    if (!phoneRegex.test(phoneVal)) {
      newErrors.phone = "Insira um telefone válido (mínimo 9 dígitos).";
    }

    if (countryVal.length < 2) {
      newErrors.country = "Insira um país válido.";
    } else if (countryVal.length > 50) {
      newErrors.country = "País não deve exceder 50 caracteres.";
    }

    if (form.org.trim().length > 100) {
      newErrors.org = "Organização/Cargo não deve exceder 100 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 0) {
      if (selected) setStep(1);
    } else if (step === 1) {
      if (validateForm()) {
        if (hasTurnstile && !turnstileToken) {
          setSecurityError("Confirme a verificação de segurança antes de continuar.");
          return;
        }

        setIsSubmitting(true);
        setSecurityError("");
        try {
          const response = await fetch("/api/registration", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: form.name.trim().replace(/[<>]/g, ""),
              email: form.email.trim().replace(/[<>]/g, ""),
              phone: form.phone.trim().replace(/[<>]/g, ""),
              country: form.country.trim().replace(/[<>]/g, ""),
              org: form.org.trim().replace(/[<>]/g, ""),
              ticketId: selected!,
              startedAt,
              honeypot,
              turnstileToken,
            }),
          });

          const result = (await response.json()) as { error?: string };
          if (!response.ok) {
            throw new Error(result.error ?? "Ocorreu um erro ao confirmar a inscrição.");
          }

          setStep(2);
          setHoneypot("");
          setTurnstileToken("");
          setTurnstileKey((current) => current + 1);
        } catch (error) {
          console.error("Erro ao submeter:", error);
          setSecurityError(
            error instanceof Error
              ? error.message
              : "Ocorreu um erro ao confirmar a inscrição. Tente novamente.",
          );
          setTurnstileToken("");
          setTurnstileKey((current) => current + 1);
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  return (
    <>
      <PageHero
        badge="Inscrição"
        title="Garanta o seu lugar"
        subtitle="No maior evento de valorização da arte africana"
        backgroundImage="/images/hero/whatsapp-image-2025-09-08-at-10-01-27-am-1200x800.jpeg"
      />

      {/* 2. Form — Dark */}
      <AccentBar />
      <section className="relative overflow-hidden bg-green-dark py-16">
        <AfricanPatternDark />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Progress */}
          <div className="mb-16 flex items-center justify-center gap-2" role="group" aria-label="Progresso da inscrição">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div 
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-montserrat text-sm font-bold transition-all ${i <= step ? "bg-gold text-green-dark" : "bg-white/10 text-white/30"}`}
                  aria-current={i === step ? "step" : undefined}
                >
                  {i + 1}
                </div>
                <span className={`text-sm font-medium ${i <= step ? "text-white" : "text-white/30"}`}>
                  {s}
                </span>
                {i < steps.length - 1 && <div className={`mx-2 h-[1px] w-8 ${i < step ? "bg-gold" : "bg-white/10"}`} aria-hidden="true" />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} aria-label="Formulário de inscrição para o evento FIVAA">
            <div className="hidden" aria-hidden="true">
              <label htmlFor="registration-website">Website</label>
              <input
                id="registration-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {hasTurnstile && (
              <div className="mb-8 flex justify-center">
                <TurnstileWidget
                  key={turnstileKey}
                  action="registration_form"
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

            {securityError && (
              <p className="mb-6 text-center text-sm font-medium text-rose-400">
                {securityError}
              </p>
            )}

            {/* Step 1 */}
            {step === 0 && (
              <div>
                <h2 className="mb-10 text-center font-montserrat text-2xl font-bold text-white">
                  Escolha o seu bilhete
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {ticketTypes === undefined ? (
                    <div className="col-span-3 flex justify-center py-10">
                      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
                    </div>
                  ) : ticketTypes.map((t) => (
                    <button type="button" key={t._id} onClick={() => setSelected(t._id)}
                      aria-pressed={selected === t._id}
                      aria-label={`Selecionar bilhete ${t.name} por ${t.price}`}
                      className={`rounded-2xl border-2 p-8 text-left transition-all ${selected === t._id ? "border-gold bg-gold/10 shadow-xl shadow-gold/10" : "border-white/10 bg-white/5 hover:border-white/20"}`}>
                      <h3 className="font-montserrat text-lg font-bold text-white">{t.name}</h3>
                      <p className="mt-3 font-montserrat text-3xl font-black text-gold">{t.price}</p>
                      <p className="mt-3 text-sm text-white/60">{t.desc}</p>
                      <ul className="mt-6 space-y-2">
                        {t.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-xs text-white/50">
                            <span className="mt-0.5 text-gold">✓</span> {f}
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>
                <div className="mt-12 text-center">
                  <button type="submit" disabled={!selected}
                    aria-label={selected ? "Continuar para preenchimento de dados" : "Selecione um bilhete para continuar"}
                    className="rounded-full bg-gold px-14 py-5 font-montserrat text-base font-bold text-green-dark transition-all hover:shadow-2xl hover:shadow-gold/20 disabled:cursor-not-allowed disabled:opacity-30">
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 1 && (
              <div className="mx-auto max-w-xl">
                <h2 className="mb-10 text-center font-montserrat text-2xl font-bold text-white">
                  Os seus dados
                </h2>
                <div className="space-y-5">
                  {[
                    { id: "name", label: "Nome Completo", type: "text" },
                    { id: "email", label: "E-mail", type: "email" },
                    { id: "phone", label: "Telefone", type: "tel" },
                    { id: "country", label: "País", type: "text" },
                    { id: "org", label: "Organização / Cargo", type: "text" },
                  ].map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="mb-2 block font-montserrat text-sm font-semibold text-white/60">
                        {field.label}
                      </label>
                      <input id={field.id} type={field.type} required
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
                          errors[field.id]
                            ? "border-rose-500 focus:border-rose-500"
                            : "border-white/10 focus:border-gold"
                        )} />
                      {errors[field.id] && (
                        <p id={`${field.id}-error`} className="mt-1.5 font-montserrat text-xs font-medium text-rose-400" role="alert">
                          {errors[field.id]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-12 flex justify-between">
                  <button type="button" onClick={() => setStep(0)}
                    aria-label="Voltar para seleção de bilhete"
                    className="rounded-full border border-white/20 px-8 py-4 font-montserrat text-sm font-semibold text-white/50 transition-all hover:border-white/30 hover:text-white/70">
                    Voltar
                  </button>
                  <button type="submit" disabled={isSubmitting}
                    aria-label={isSubmitting ? "A processar inscrição..." : "Confirmar inscrição no evento"}
                    className="rounded-full bg-gold px-14 py-5 font-montserrat text-base font-bold text-green-dark transition-all hover:shadow-2xl hover:shadow-gold/20 disabled:opacity-50">
                    {isSubmitting ? "A processar..." : "Confirmar Inscrição"}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 2 && (
              <div className="mx-auto max-w-xl text-center" aria-live="polite">
                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gold/10">
                  <span className="text-4xl text-gold">✓</span>
                </div>
                <h2 className="mb-4 font-montserrat text-4xl font-black text-white">
                  Inscrição Confirmada!
                </h2>
                <p className="mb-10 text-white/60">
                  Receberá um e-mail com todas as instruções de participação.
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-left">
                  <h3 className="mb-5 font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-gold">Resumo</h3>
                  <div className="space-y-3 text-sm text-white/60">
                    <p><strong className="text-white">Nome:</strong> {form.name}</p>
                    <p><strong className="text-white">E-mail:</strong> {form.email}</p>
                    <p><strong className="text-white">Bilhete:</strong> {ticketTypes?.find((t) => t._id === selected)?.name}</p>
                    <p><strong className="text-white">Valor:</strong> {ticketTypes?.find((t) => t._id === selected)?.price}</p>
                  </div>
                </div>
                <button type="button" onClick={() => { setStep(0); setSelected(null); setForm({ name: "", email: "", phone: "", country: "", org: "" }); setHoneypot(""); setStartedAt(Date.now()); setTurnstileToken(""); setTurnstileKey((current) => current + 1); setSecurityError(""); }}
                  aria-label="Iniciar nova inscrição"
                  className="mt-10 rounded-full border border-white/20 px-8 py-4 font-montserrat text-sm font-semibold text-white/50 transition-all hover:border-white/30 hover:text-white/70">
                  Nova Inscrição
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
