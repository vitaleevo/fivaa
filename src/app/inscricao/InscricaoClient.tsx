"use client";

import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock3,
  Globe2,
  MapPin,
  ShieldCheck,
  Sparkles,
  Ticket,
} from "lucide-react";
import {
  AccentBar,
  AfricanPattern,
  AfricanPatternDark,
  Badge,
  Divider,
  DividerWhite,
  MudclothPattern,
  TribalDivider,
} from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { cn } from "@/lib/utils";
import { api } from "../../../convex/_generated/api";

const steps = ["Escolha do bilhete", "Dados do participante", "Confirmação"];

const eventHighlights = [
  "Acesso ao ecossistema criativo do FIVAA e networking de alto valor.",
  "Conteúdos desenhados para artistas, marcas, instituições e parceiros.",
  "Processo de inscrição rápido, com confirmação imediata após submissão.",
];

const participationMoments = [
  {
    title: "Datas",
    description: "20 e 21 de Novembro de 2026",
    icon: CalendarDays,
  },
  {
    title: "Local",
    description: "Palácio de Ferro, Luanda",
    icon: MapPin,
  },
  {
    title: "Experiência",
    description: "Presencial, online e institucional",
    icon: Globe2,
  },
];

const fieldConfig = [
  { id: "name", label: "Nome completo", type: "text", placeholder: "Como quer aparecer na inscrição" },
  { id: "email", label: "E-mail", type: "email", placeholder: "seuemail@dominio.com" },
  { id: "phone", label: "Telefone", type: "tel", placeholder: "+244 900 000 000" },
  { id: "country", label: "País", type: "text", placeholder: "Angola" },
  { id: "org", label: "Organização / cargo", type: "text", placeholder: "Empresa, projeto ou função" },
] as const;

type FormState = {
  name: string;
  email: string;
  phone: string;
  country: string;
  org: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  phone: "",
  country: "",
  org: "",
};

export default function InscricaoClient() {
  const ticketTypes = useQuery(api.tickets.get);

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [honeypot, setHoneypot] = useState("");
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const selectedTicket = useMemo(
    () => ticketTypes?.find((ticket) => ticket._id === selected) ?? null,
    [selected, ticketTypes],
  );

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const resetForm = () => {
    setStep(0);
    setSelected(null);
    setForm(initialFormState);
    setErrors({});
    setHoneypot("");
    setStartedAt(Date.now());
    setSubmissionError("");
    setIsSubmitting(false);
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};
    const nameVal = form.name.trim();
    const emailVal = form.email.trim();
    const phoneVal = form.phone.trim();
    const countryVal = form.country.trim();
    const orgVal = form.org.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+?[0-9\s\-()]{9,20}$/;

    if (nameVal.length < 3) {
      nextErrors.name = "Nome deve conter pelo menos 3 caracteres.";
    } else if (nameVal.length > 80) {
      nextErrors.name = "Nome não deve exceder 80 caracteres.";
    }

    if (!emailRegex.test(emailVal)) {
      nextErrors.email = "Insira um endereço de e-mail válido.";
    } else if (emailVal.length > 80) {
      nextErrors.email = "E-mail não deve exceder 80 caracteres.";
    }

    if (!phoneRegex.test(phoneVal)) {
      nextErrors.phone = "Insira um telefone válido com no mínimo 9 dígitos.";
    }

    if (countryVal.length < 2) {
      nextErrors.country = "Insira um país válido.";
    } else if (countryVal.length > 50) {
      nextErrors.country = "País não deve exceder 50 caracteres.";
    }

    if (orgVal.length > 100) {
      nextErrors.org = "Organização / cargo não deve exceder 100 caracteres.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goToDetailsStep = () => {
    if (!selected) {
      setSubmissionError("Selecione um bilhete para continuar.");
      return;
    }

    setSubmissionError("");
    setStep(1);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selected) {
      setSubmissionError("Selecione um bilhete para continuar.");
      setStep(0);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionError("");

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
          ticketId: selected,
          startedAt,
          honeypot,
        }),
      });

      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error ?? "Ocorreu um erro ao confirmar a inscrição.");
      }

      setStep(2);
      setHoneypot("");
    } catch (error) {
      console.error("Erro ao submeter inscrição:", error);
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao confirmar a inscrição. Tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        badge="Inscrição"
        title="Participe do FIVAA 2026"
        subtitle="Escolha o formato ideal, complete os seus dados e confirme a presença no maior encontro de valorização da arte africana."
        backgroundImage="/images/hero/fivaa-experiencia.webp"
      />

      <AccentBar />

      <section className="relative overflow-hidden bg-warm-white py-18 md:py-24">
        <AfricanPattern />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {participationMoments.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[1.75rem] border border-gold/15 bg-white p-7 shadow-[0_24px_60px_rgba(18,71,52,0.08)]"
                >
                  <div className="mb-5 inline-flex rounded-2xl bg-gold/10 p-3 text-gold">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-gray-medium">
                    {item.title}
                  </p>
                  <p className="mt-3 font-montserrat text-xl font-bold text-green-dark">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <TribalDivider className="bg-warm-white text-green-dark" />
      <section className="relative overflow-hidden bg-green-dark py-18 md:py-24">
        <AfricanPatternDark />
        <MudclothPattern className="opacity-[0.05]" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-gold/8 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-orange/8 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <Badge className="border-white/20 bg-white/5 text-white/80">Experiência de inscrição</Badge>
              <h2 className="mt-6 max-w-3xl font-montserrat text-4xl font-black leading-tight text-white sm:text-5xl">
                Escolha o seu acesso e prepare a sua presença no evento.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">
                A nova inscrição foi organizada para ajudar o participante a comparar opções,
                preencher os dados com clareza e confirmar a participação com mais confiança.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
              <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-gold">
                O que está incluído
              </p>
              <div className="mt-5 space-y-4">
                {eventHighlights.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm leading-relaxed text-white/70">
                    <span className="mt-0.5 rounded-full bg-gold/15 p-1 text-gold">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-12 flex flex-wrap items-center gap-3" role="group" aria-label="Progresso da inscrição">
            {steps.map((stepLabel, index) => (
              <div key={stepLabel} className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full border text-sm font-bold transition-all",
                    index <= step
                      ? "border-gold bg-gold text-green-dark"
                      : "border-white/15 bg-white/5 text-white/35",
                  )}
                  aria-current={index === step ? "step" : undefined}
                >
                  {index + 1}
                </div>
                <span
                  className={cn(
                    "font-montserrat text-sm font-semibold",
                    index <= step ? "text-white" : "text-white/35",
                  )}
                >
                  {stepLabel}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "hidden h-px w-10 sm:block",
                      index < step ? "bg-gold" : "bg-white/10",
                    )}
                    aria-hidden="true"
                  />
                )}
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
                onChange={(event) => setHoneypot(event.target.value)}
              />
            </div>

            {submissionError && (
              <div className="mb-8 rounded-2xl border border-rose-400/25 bg-rose-500/10 px-5 py-4 text-sm font-medium text-rose-200">
                {submissionError}
              </div>
            )}

            {step === 2 ? (
              <div
                className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.20)] backdrop-blur-sm md:p-10"
                aria-live="polite"
              >
                <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
                  <div className="mb-6 inline-flex rounded-full bg-gold/12 p-4 text-gold">
                    <BadgeCheck className="h-10 w-10" />
                  </div>
                  <Badge className="border-gold/25 bg-gold/10 text-gold">Inscrição confirmada</Badge>
                  <h2 className="mt-6 font-montserrat text-4xl font-black text-white sm:text-5xl">
                    Está oficialmente inscrito.
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
                    A sua submissão foi recebida com sucesso. Guarde os dados abaixo e acompanhe
                    o seu e-mail para próximas instruções sobre acesso, agenda e participação.
                  </p>
                </div>

                <DividerWhite className="my-10" />

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-white/10 bg-green-dark/40 p-6">
                    <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-gold">
                      Participante
                    </p>
                    <div className="mt-5 space-y-3 text-sm text-white/70">
                      <p><span className="font-semibold text-white">Nome:</span> {form.name}</p>
                      <p><span className="font-semibold text-white">E-mail:</span> {form.email}</p>
                      <p><span className="font-semibold text-white">Telefone:</span> {form.phone}</p>
                      <p><span className="font-semibold text-white">País:</span> {form.country}</p>
                      {form.org && (
                        <p><span className="font-semibold text-white">Organização / cargo:</span> {form.org}</p>
                      )}
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-green-dark/40 p-6">
                    <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-gold">
                      Bilhete selecionado
                    </p>
                    <h3 className="mt-4 font-montserrat text-2xl font-bold text-white">
                      {selectedTicket?.name ?? "Bilhete confirmado"}
                    </h3>
                    <p className="mt-2 text-2xl font-black text-gold">
                      {selectedTicket?.price ?? "A confirmar"}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      {selectedTicket?.desc ?? "A sua inscrição foi enviada para processamento."}
                    </p>
                    {selectedTicket?.features?.length ? (
                      <div className="mt-5 space-y-2">
                        {selectedTicket.features.slice(0, 4).map((feature) => (
                          <div key={feature} className="flex items-start gap-3 text-sm text-white/65">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <a
                    href="/programacao"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-montserrat text-sm font-bold text-green-dark transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-gold/20"
                  >
                    Ver programação
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 font-montserrat text-sm font-semibold text-white/70 transition-all hover:border-white/35 hover:text-white"
                  >
                    Fazer nova inscrição
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-[0_28px_80px_rgba(0,0,0,0.20)] backdrop-blur-sm md:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-gold">
                          Escolha o bilhete
                        </p>
                        <h3 className="mt-3 font-montserrat text-2xl font-black text-white">
                          Compare as opções disponíveis
                        </h3>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                        <Ticket className="h-4 w-4 text-gold" />
                        Seleção obrigatória
                      </div>
                    </div>

                    <div className="mt-8 grid gap-5 xl:grid-cols-3">
                      {ticketTypes === undefined ? (
                        <div className="xl:col-span-3 flex justify-center py-16">
                          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold border-t-transparent" />
                        </div>
                      ) : (
                        ticketTypes.map((ticket, index) => {
                          const isSelected = selected === ticket._id;
                          return (
                            <button
                              key={ticket._id}
                              type="button"
                              onClick={() => {
                                setSelected(ticket._id);
                                setSubmissionError("");
                              }}
                              aria-pressed={isSelected}
                              aria-label={`Selecionar bilhete ${ticket.name} por ${ticket.price}`}
                              className={cn(
                                "group relative overflow-hidden rounded-[1.6rem] border p-6 text-left transition-all duration-300",
                                isSelected
                                  ? "border-gold bg-gold/10 shadow-[0_18px_45px_rgba(253,184,19,0.14)]"
                                  : "border-white/10 bg-white/[0.03] hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06]",
                              )}
                            >
                              {index === 0 && (
                                <span className="mb-5 inline-flex rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                                  Mais procurado
                                </span>
                              )}
                              <h4 className="font-montserrat text-xl font-bold text-white">
                                {ticket.name}
                              </h4>
                              <p className="mt-4 font-montserrat text-3xl font-black text-gold">
                                {ticket.price}
                              </p>
                              <p className="mt-4 text-sm leading-relaxed text-white/60">
                                {ticket.desc}
                              </p>
                              <div className="mt-6 space-y-2.5">
                                {ticket.features.map((feature) => (
                                  <div key={feature} className="flex items-start gap-3 text-sm text-white/68">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                                    <span>{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </button>
                          );
                        })
                      )}
                    </div>

                    <DividerWhite className="my-8" />

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-sm text-white/60">
                        {selectedTicket ? (
                          <span>
                            Bilhete escolhido: <span className="font-semibold text-white">{selectedTicket.name}</span>
                          </span>
                        ) : (
                          <span>Selecione uma modalidade para avançar.</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={goToDetailsStep}
                        disabled={!selectedTicket}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-montserrat text-sm font-bold text-green-dark transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-gold/20 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Continuar
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-7 shadow-[0_28px_80px_rgba(0,0,0,0.20)] backdrop-blur-sm md:p-8">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-gold/12 p-3 text-gold">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-gold">
                          Dados do participante
                        </p>
                        <h3 className="mt-2 font-montserrat text-2xl font-black text-white">
                          Complete a sua inscrição
                        </h3>
                      </div>
                    </div>

                    <p className="mt-5 text-sm leading-relaxed text-white/65">
                      Preencha os seus dados para reservar o bilhete selecionado. O envio
                      só é concluído após a confirmação final.
                    </p>

                    {selectedTicket ? (
                      <div className="mt-6 rounded-[1.5rem] border border-gold/20 bg-gold/10 p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-montserrat text-xs font-bold uppercase tracking-[0.18em] text-gold">
                              Bilhete ativo
                            </p>
                            <h4 className="mt-2 font-montserrat text-xl font-bold text-white">
                              {selectedTicket.name}
                            </h4>
                            <p className="mt-1 text-sm text-white/60">{selectedTicket.desc}</p>
                          </div>
                          <p className="font-montserrat text-xl font-black text-gold">
                            {selectedTicket.price}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-6 rounded-[1.5rem] border border-dashed border-white/15 bg-white/[0.03] p-5 text-sm text-white/45">
                        Escolha um bilhete no painel ao lado para ativar o formulário completo.
                      </div>
                    )}

                    <div className="mt-8 space-y-5">
                      {fieldConfig.map((field) => (
                        <div key={field.id}>
                          <label
                            htmlFor={field.id}
                            className="mb-2 block font-montserrat text-sm font-semibold text-white/70"
                          >
                            {field.label}
                          </label>
                          <input
                            id={field.id}
                            type={field.type}
                            required={field.id !== "org"}
                            value={form[field.id]}
                            placeholder={field.placeholder}
                            disabled={!selectedTicket || isSubmitting}
                            aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                            aria-invalid={errors[field.id] ? "true" : "false"}
                            onChange={(event) => updateField(field.id, event.target.value)}
                            className={cn(
                              "w-full rounded-2xl border bg-white/5 px-5 py-4 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:ring-2 focus:ring-gold/20 disabled:cursor-not-allowed disabled:opacity-50",
                              errors[field.id]
                                ? "border-rose-500 focus:border-rose-500"
                                : "border-white/10 focus:border-gold",
                            )}
                          />
                          {errors[field.id] && (
                            <p
                              id={`${field.id}-error`}
                              className="mt-1.5 font-montserrat text-xs font-medium text-rose-300"
                              role="alert"
                            >
                              {errors[field.id]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(0)}
                        className="rounded-full border border-white/20 px-7 py-4 font-montserrat text-sm font-semibold text-white/65 transition-all hover:border-white/35 hover:text-white"
                      >
                        Rever bilhetes
                      </button>
                      <button
                        type="submit"
                        disabled={!selectedTicket || isSubmitting}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-montserrat text-sm font-bold text-green-dark transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-gold/20 disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        {isSubmitting ? "A processar..." : "Confirmar inscrição"}
                        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-7 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-white/8 p-3 text-gold">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-gold">
                        Antes de enviar
                      </p>
                    </div>
                    <div className="mt-5 space-y-4 text-sm leading-relaxed text-white/65">
                      <div className="flex items-start gap-3">
                        <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        <span>Verifique o e-mail informado para receber as próximas instruções.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        <span>Os dados são validados antes do envio para reduzir inscrições inválidas.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Ticket className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        <span>O bilhete selecionado fica resumido acima para evitar erros de confirmação.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

      <TribalDivider className="rotate-180 bg-cream text-green-dark" />
      <section className="relative overflow-hidden bg-cream py-18 md:py-24">
        <AfricanPattern />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <Badge>Próximo passo</Badge>
          <h2 className="mt-6 font-montserrat text-4xl font-black text-green-dark sm:text-5xl">
            Precisa de apoio antes de confirmar?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-medium">
            Se tiver dúvidas sobre lotes, formatos de participação ou parcerias institucionais,
            fale com a equipa do FIVAA antes de finalizar a sua presença no evento.
          </p>
          <Divider className="my-10" />
          <a
            href="/contactos"
            className="inline-flex items-center gap-2 rounded-full border-2 border-green-dark px-8 py-4 font-montserrat text-sm font-extrabold text-green-dark transition-all hover:bg-green-dark hover:text-white"
          >
            Falar com a organização
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
}
