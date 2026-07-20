import type { Metadata } from "next";
import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Sessões de Feedback — FIVAA",
  description:
    "Sessões de crítica construtiva semanais do FIVAA para crescimento artístico.",
};

const sessoes = [
  {
    title: "Sessão de Crítica Construtiva",
    schedule: "Terças-feiras, 18:30 - 20:30",
    desc: "Espaço seguro para apresentar trabalhos em progresso e receber feedback honesto e construtivo de colegas e mentores.",
    rules: [
      "Traga um trabalho em progresso ou concluído",
      "Feedback respeitoso e construtivo",
      "Todas as disciplinas artísticas são bem-vindas",
      "Sessão facilitada por um mentor experiente",
    ],
  },
  {
    title: "Roda de Arte",
    schedule: "Quintas-feiras, 19:00 - 21:00",
    desc: "Apresentação informal de trabalhos recentes seguida de discussão aberta.",
    rules: [
      "Apresente até 3 trabalhos",
      "Discussão aberta e livre",
      "Troca de experiências e inspiração",
      "Ambiente descontraído e acolhedor",
    ],
  },
];

export default function ProgramacaoFeedback() {
  return (
    <>
      <PageHero
        badge="Sessões de Feedback"
        title="Crítica Construtiva"
        subtitle="Sessões semanais para receber feedback e crescer como artista"
        backgroundImage="/images/hero/fivaa-art-culture.png"
        breadcrumbs={[
          { label: "Programação", href: "/programacao" },
          { label: "Feedback" },
        ]}
      />

      {/* Sessões */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {sessoes.map((s) => (
              <div key={s.title} className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg">
                <span className="inline-block rounded-full bg-gold/10 px-3 py-1 font-montserrat text-xs font-bold text-gold">{s.schedule}</span>
                <h3 className="mt-4 mb-3 font-montserrat text-xl font-bold text-green-dark">{s.title}</h3>
                <p className="mb-6 text-sm text-gray-medium">{s.desc}</p>
                <h4 className="mb-2 font-montserrat text-sm font-bold text-green-dark">Como funciona:</h4>
                <ul className="space-y-1">
                  {s.rules.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-gray-medium">
                      <span className="mt-0.5 text-gold">•</span> {r}
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
