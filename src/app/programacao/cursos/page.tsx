import type { Metadata } from "next";
import Link from "next/link";
import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Cursos — FIVAA",
  description:
    "Cursos online estruturados do FIVAA para aperfeiçoamento artístico.",
};

const cursos = [
  {
    title: "Curso de Técnicas Artísticas",
    duration: "3 meses",
    frequency: "1 sessão por semana",
    desc: "Curso abrangente sobre diferentes técnicas artísticas, desde fundamentos até nível avançado.",
    modulos: [
      "Fundamentos da composição",
      "Teoria das cores",
      "Técnicas de pintura",
      "Escultura e modelagem",
      "Projeto final",
    ],
  },
  {
    title: "Curso de Gestão Artística",
    duration: "3 meses",
    frequency: "1 sessão por semana",
    desc: "Capacitação em habilidades de gestão e empreendedorismo para artistas.",
    modulos: [
      "Marketing pessoal",
      "Gestão de carreira",
      "Finanças para artistas",
      "Propriedade intelectual",
      "Plano de negócios artístico",
    ],
  },
  {
    title: "Curso de Arte Digital",
    duration: "3 meses",
    frequency: "1 sessão por semana",
    desc: "Aprendizagem de ferramentas digitais para criação artística contemporânea.",
    modulos: [
      "Design gráfico",
      "Ilustração digital",
      "Fotografia digital",
      "Edição de vídeo",
      "Arte generativa",
    ],
  },
];

export default function ProgramacaoCursos() {
  return (
    <>
      <PageHero
        badge="Cursos Online"
        title="Cursos Estruturados"
        subtitle="Formação profissional em diferentes áreas artísticas com certificação"
        backgroundImage="/images/hero/387c1334-f070-4f6a-a569-6d63e85e9101.webp"
        breadcrumbs={[
          { label: "Programação", href: "/programacao" },
          { label: "Cursos" },
        ]}
      />

      {/* Cursos */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {cursos.map((curso) => (
              <div key={curso.title} className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full bg-gold/10 px-3 py-1 font-montserrat text-xs font-bold text-gold">{curso.duration}</span>
                  <span className="text-sm text-gray-medium">{curso.frequency}</span>
                </div>
                <h3 className="mb-3 font-montserrat text-xl font-bold text-green-dark">{curso.title}</h3>
                <p className="mb-6 text-sm text-gray-medium">{curso.desc}</p>
                <h4 className="mb-2 font-montserrat text-sm font-bold text-green-dark">Módulos:</h4>
                <ul className="space-y-1">
                  {curso.modulos.map((m) => (
                    <li key={m} className="flex items-center gap-2 text-sm text-gray-medium">
                      <span className="text-gold">•</span> {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-green-dark py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat text-3xl font-bold text-white">Quer aprender connosco?</h2>
          <p className="mt-4 text-white/70">Escolha um curso e comece a sua jornada artística</p>
          <Link href="/inscricao" className="mt-8 inline-block rounded-full bg-gold px-8 py-4 font-montserrat text-sm font-bold text-green-dark shadow-lg shadow-gold/20 transition-all hover:bg-gold/90 hover:shadow-xl">
            Inscrever-me num curso
          </Link>
        </div>
      </section>
    </>
  );
}
