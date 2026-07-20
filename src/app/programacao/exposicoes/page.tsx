import type { Metadata } from "next";

import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import CardAtividade from "@/components/CardAtividade";
import Sidebar from "@/components/Sidebar";
function ImageIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Exposições — FIVAA",
  description:
    "Exposições virtuais e presenciais do FIVAA para divulgação de arte africana.",
};

const sidebarLinks = [
  { href: "/programacao/workshops", label: "Workshops" },
  { href: "/programacao/palestras", label: "Palestras" },
  { href: "/programacao/exposicoes", label: "Exposições" },
  { href: "/programacao/mentoria", label: "Mentoria" },
  { href: "/programacao/cursos", label: "Cursos" },
  { href: "/programacao/desafios", label: "Desafios" },
  { href: "/programacao/feedback", label: "Feedback" },
  { href: "/programacao/festival", label: "Festival" },
];

const exposicoes = [
  {
    title: "Exposição Virtual Temática",
    desc: "Exposições temáticas em galerias virtuais, acessíveis a artistas de todas as regiões e disciplinas.",
    schedule: "1ª sexta-feira (meses pares)",
    tags: ["Virtual", "Temática", "Gratuita"],
  },
  {
    title: "Exposição Presencial Anual",
    desc: "Exposição física durante o Festival Anual, com obras selecionadas pelo júri.",
    schedule: "Durante o Festival",
    tags: ["Presencial", "Festival", "Seleção"],
  },
  {
    title: "Mostra de Talentos Emergentes",
    desc: "Exposição dedicada a artistas emergentes, oferecendo visibilidade e oportunidades de desenvolvimento.",
    schedule: "Trimestral",
    tags: ["Emergentes", "Mentoria", "Portfólio"],
  },
];

export default function ProgramacaoExposicoes() {
  return (
    <>
      <PageHero
        badge="Exposições"
        title="Exposições"
        subtitle="Plataformas de exposição para artistas de todas as disciplinas e regiões"
        backgroundImage="/images/hero/fivaa-art-culture.png"
        breadcrumbs={[
          { label: "Programação", href: "/programacao" },
          { label: "Exposições" },
        ]}
      />

      {/* Content */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <Sidebar title="Programação" links={sidebarLinks} />
            <div className="grid gap-6 sm:grid-cols-2">
              {exposicoes.map((exp) => (
                <CardAtividade
                  key={exp.title}
                  title={exp.title}
                  description={exp.desc}
                  schedule={exp.schedule}
                  tags={exp.tags}
                  icon={<ImageIcon className="h-5 w-5 text-gold" />}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
