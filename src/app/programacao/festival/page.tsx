import type { Metadata } from "next";
import Link from "next/link";
import { AccentBar, Badge } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Festival Anual — FIVAA",
  description:
    "O Festival Anual do FIVAA - O maior evento de arte africana do ano.",
};

const days = [
  {
    day: "Dia 1",
    title: "Abertura e Exposições",
    desc: "Cerimónia de abertura com autoridades e inauguracão das exposições.",
    activities: [
      "Cerimónia de abertura oficial",
      "Inauguração da exposição principal",
      "Visita guiada às exposições",
      "Coquetel de networking",
    ],
  },
  {
    day: "Dia 2",
    title: "Workshops e Palestras",
    desc: "Dia dedicado à aprendizagem e partilha de conhecimento.",
    activities: [
      "Workshops intensivos",
      "Palestras com artistas convidados",
      "Painéis de discussão",
      "Sessões de networking",
    ],
  },
];

const events = [
  {
    title: "Cerimónia de Premiação",
    desc: "Entrega dos prémios anuais do FIVAA a artistas que se destacaram durante o ano.",
    items: ["Melhor Artista Emergente", "Melhor Obra do Ano", "Prémio de Mérito", "Prémio da Critica"],
  },
  {
    title: "Leilão de Arte",
    desc: "Leilão de obras de artistas membros, com arrecadação para o fundo de apoio a artistas.",
    items: ["Obras selecionadas por júri", "Arrecadação para artistas emergentes", "Networking com colecionadores", "Documentação completa"],
  },
  {
    title: "Show ao Vivo",
    desc: "Apresentações ao vivo de música, dança e performance artística.",
    items: ["Música ao vivo", "Dança contemporânea", "Performance artística", "Arte interativa"],
  },
];

export default function ProgramacaoFestival() {
  return (
    <>
      <PageHero
        badge="Festival Anual"
        title="Festival Anual"
        subtitle="O maior evento de arte africana do ano - Dezembro 2026"
        backgroundImage="/images/hero/fivaa-art-culture.webp"
        breadcrumbs={[
          { label: "Programação", href: "/programacao" },
          { label: "Festival" },
        ]}
      />

      {/* Programação */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge>Programação do Festival</Badge>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {days.map((d) => (
              <div key={d.day} className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg">
                <span className="inline-block rounded-full bg-gold/10 px-3 py-1 font-montserrat text-xs font-bold text-gold">{d.day}</span>
                <h3 className="mt-4 mb-3 font-montserrat text-xl font-bold text-green-dark">{d.title}</h3>
                <p className="mb-4 text-sm text-gray-medium">{d.desc}</p>
                <ul className="space-y-1">
                  {d.activities.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-sm text-gray-medium">
                      <span className="text-gold">•</span> {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eventos Especiais */}
      <section className="relative bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge>Eventos Especiais</Badge>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {events.map((e) => (
              <div key={e.title} className="rounded-2xl border border-gold/10 bg-white p-6 shadow-md transition-all hover:border-gold/30 hover:shadow-lg">
                <h3 className="mb-3 font-montserrat text-lg font-bold text-green-dark">{e.title}</h3>
                <p className="mb-4 text-sm text-gray-medium">{e.desc}</p>
                <ul className="space-y-1">
                  {e.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-medium">
                      <span className="text-gold">✓</span> {item}
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
          <h2 className="font-montserrat text-3xl font-bold text-white">Não perca o Festival!</h2>
          <p className="mt-4 text-white/70">Dezembro 2026 - Palácio de Ferro, Luanda</p>
          <Link href="/inscricao" className="mt-8 inline-block rounded-full bg-gold px-8 py-4 font-montserrat text-sm font-bold text-green-dark shadow-lg shadow-gold/20 transition-all hover:bg-gold/90 hover:shadow-xl">
            Garantir a minha vaga
          </Link>
        </div>
      </section>
    </>
  );
}
