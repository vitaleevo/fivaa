import type { Metadata } from "next";
import Link from "next/link";
import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import CardAtividade from "@/components/CardAtividade";
import Sidebar from "@/components/Sidebar";
function BookOpenIcon({ className = "" }: { className?: string }) {
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Workshops — FIVAA",
  description:
    "Workshops interativos mensais do FIVAA para aperfeiçoamento artístico.",
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

const workshops = [
  {
    title: "Workshop de Técnicas Artísticas",
    schedule: "1ª segunda-feira",
    time: "18:30 - 20:30",
    desc: "Sessões práticas de aperfeiçoamento em diferentes técnicas artísticas, desde pintura e escultura até fotografia e arte digital.",
    tags: ["Pintura", "Escultura", "Fotografia", "Arte Digital"],
  },
  {
    title: "Workshop de Criação",
    schedule: "2ª segunda-feira",
    time: "18:30 - 20:30",
    desc: "Workshops focados no processo criativo, estimulando a imaginação e a inovação artística.",
    tags: ["Processo Criativo", "Bloqueios", "Novas Mídias"],
  },
  {
    title: "Workshop de Gestão Artística",
    schedule: "3ª segunda-feira",
    time: "18:30 - 20:30",
    desc: "Capacitação em habilidades de gestão e empreendedorismo para artistas.",
    tags: ["Marketing", "Carreira", "Finanças", "Propriedade Intelectual"],
  },
  {
    title: "Workshop Colaborativo",
    schedule: "4ª segunda-feira",
    time: "18:30 - 20:30",
    desc: "Sessões de trabalho em grupo onde artistas colaboram em projetos coletivos.",
    tags: ["Trabalho em Equipa", "Projetos Colaborativos", "Troca"],
  },
];

export default function ProgramacaoWorkshops() {
  return (
    <>
      <PageHero
        badge="Programação Mensal"
        title="Workshops Interativos"
        subtitle="Sessões práticas mensais de aperfeiçoamento artístico e troca de experiências"
        backgroundImage="/images/hero/387c1334-f070-4f6a-a569-6d63e85e9101.webp"
        breadcrumbs={[
          { label: "Programação", href: "/programacao" },
          { label: "Workshops" },
        ]}
      />

      {/* Content */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <Sidebar title="Programação" links={sidebarLinks} />
            <div className="grid gap-6 sm:grid-cols-2">
              {workshops.map((ws) => (
                <CardAtividade
                  key={ws.title}
                  title={ws.title}
                  description={ws.desc}
                  schedule={ws.schedule}
                  time={ws.time}
                  tags={ws.tags}
                  icon={<BookOpenIcon className="h-5 w-5 text-gold" />}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-green-dark py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat text-3xl font-bold text-white">Interessado nos nossos workshops?</h2>
          <p className="mt-4 text-white/70">Inscreva-se agora e comece a aperfeiçoar a sua arte</p>
          <Link href="/inscricao" className="mt-8 inline-block rounded-full bg-gold px-8 py-4 font-montserrat text-sm font-bold text-green-dark shadow-lg shadow-gold/20 transition-all hover:bg-gold/90 hover:shadow-xl">
            Inscrever-me agora
          </Link>
        </div>
      </section>
    </>
  );
}
