import type { Metadata } from "next";

import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import CardAtividade from "@/components/CardAtividade";
import Sidebar from "@/components/Sidebar";
function MicIcon({ className = "" }: { className?: string }) {
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
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Palestras — FIVAA",
  description:
    "Palestras inspiradoras do FIVAA sobre arte, cultura e desenvolvimento.",
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

const palestras = [
  {
    title: "O Futuro da Arte Africana",
    desc: "Uma reflexão sobre as tendências emergentes e o papel da arte africana no cenário internacional.",
    schedule: "2ª quarta-feira do mês",
    tags: ["Tendências", "Internacional"],
  },
  {
    title: "Arte como Ferramenta de Transformação Social",
    desc: "Como a arte pode ser usada para combater a pobreza, o VIH/SIDA e outras questões sociais.",
    schedule: "3ª quarta-feira do mês",
    tags: ["Social", "Impacto"],
  },
  {
    title: "Empreendedorismo na Arte",
    desc: "Estratégias para artistas construírem carreiras sustentáveis e monetizarem o seu trabalho.",
    schedule: "4ª quarta-feira do mês",
    tags: ["Negócios", "Sustentabilidade"],
  },
];

export default function ProgramacaoPalestras() {
  return (
    <>
      <PageHero
        badge="Programação Mensal"
        title="Palestras Inspiradoras"
        subtitle="Sessões de conhecimento e reflexão sobre arte, cultura e desenvolvimento"
        backgroundImage="/images/hero/fivaa-art-culture.webp"
        breadcrumbs={[
          { label: "Programação", href: "/programacao" },
          { label: "Palestras" },
        ]}
      />

      {/* Content */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <Sidebar title="Programação" links={sidebarLinks} />
            <div className="space-y-6">
              {palestras.map((p) => (
                <CardAtividade
                  key={p.title}
                  title={p.title}
                  description={p.desc}
                  schedule={p.schedule}
                  tags={p.tags}
                  icon={<MicIcon className="h-5 w-5 text-gold" />}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
