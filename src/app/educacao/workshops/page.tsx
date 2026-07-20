import type { Metadata } from "next";
import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Workshops Educacionais — FIVAA",
  description:
    "Workshops interativos do FIVAA para aprendizagem prática.",
};

const workshops = [
  {
    title: "Workshop de Iniciação Artística",
    target: "Iniciantes",
    desc: "Introdução às fundamentos da arte para quem está a começar a sua jornada artística.",
    contents: [
      "Noções básicas de composição",
      "Teoria das cores",
      "Técnicas básicas de desenho",
      "Exploração de materiais",
    ],
  },
  {
    title: "Workshop de Aperfeiçoamento",
    target: "Intermédio",
    desc: "Sessões práticas para artistas que já dominam os fundamentos e querem evoluir.",
    contents: [
      "Técnicas avançadas de pintura",
      "Composição sofisticada",
      "Desenvolvimento de estilo pessoal",
      "Crítica e auto-avaliação",
    ],
  },
  {
    title: "Workshop Especializado",
    target: "Avançado",
    desc: "Workshops temáticos com artistas convidados de renome internacional.",
    contents: [
      "Mestres da arte africana",
      "Técnicas contemporâneas",
      "Arte e tecnologia",
      "Networking profissional",
    ],
  },
];

export default function EducacaoWorkshops() {
  return (
    <>
      <PageHero
        badge="Workshops Educacionais"
        title="Workshops de Aprendizagem"
        subtitle="Formação prática para todos os níveis de experiência artística"
        backgroundImage="/images/hero/fivaa-educacao.png"
        breadcrumbs={[
          { label: "Educação", href: "/educacao" },
          { label: "Workshops" },
        ]}
      />

      {/* Workshops */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {workshops.map((w) => (
              <div key={w.title} className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg">
                <span className="inline-block rounded-full bg-gold/10 px-3 py-1 font-montserrat text-xs font-bold text-gold">{w.target}</span>
                <h3 className="mt-4 mb-3 font-montserrat text-xl font-bold text-green-dark">{w.title}</h3>
                <p className="mb-6 text-sm text-gray-medium">{w.desc}</p>
                <h4 className="mb-2 font-montserrat text-sm font-bold text-green-dark">Conteúdo:</h4>
                <ul className="space-y-1">
                  {w.contents.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-gray-medium">
                      <span className="text-gold">•</span> {c}
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
