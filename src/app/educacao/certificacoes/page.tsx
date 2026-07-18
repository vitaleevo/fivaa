import type { Metadata } from "next";
import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Certificações — FIVAA",
  description:
    "Certificações e reconhecimento profissional do FIVAA para artistas.",
};

const certificacoes = [
  {
    title: "Certificado de Participação",
    desc: "Emitido a todos os membros que participam em workshops, palestras e eventos do FIVAA.",
    requirements: [
      "Participação mínima de 80%",
      "Avaliação positiva do mentor",
      "Projeto prático concluído",
    ],
  },
  {
    title: "Certificado de Aperfeiçoamento",
    desc: "Emitido a artistas que completam um ciclo completo de formação do FIVAA.",
    requirements: [
      "Conclusão de 3 ou mais workshops",
      "Participação no programa de mentoria",
      "Apresentação de projeto final",
    ],
  },
  {
    title: "Certificado de Especialização",
    desc: "Emitido a artistas que completam um curso estruturado do FIVAA.",
    requirements: [
      "Conclusão completa do curso",
      "Projeto final avaliado com nota mínima",
      "Apresentação pública do trabalho",
    ],
  },
];

export default function EducacaoCertificacoes() {
  return (
    <>
      <PageHero
        badge="Certificações"
        title="Certificações"
        subtitle="Reconhecimento profissional do seu percurso artístico no FIVAA"
        backgroundImage="/images/hero/LC_CERT-10-1.webp"
        breadcrumbs={[
          { label: "Educação", href: "/educacao" },
          { label: "Certificações" },
        ]}
      />

      {/* Certificações */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {certificacoes.map((c) => (
              <div key={c.title} className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="mb-3 font-montserrat text-xl font-bold text-green-dark">{c.title}</h3>
                <p className="mb-6 text-sm text-gray-medium">{c.desc}</p>
                <h4 className="mb-2 font-montserrat text-sm font-bold text-green-dark">Requisitos:</h4>
                <ul className="space-y-1 text-left">
                  {c.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-gray-medium">
                      <span className="mt-0.5 text-gold">✓</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
