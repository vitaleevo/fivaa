import type { Metadata } from "next";
import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Desafios — FIVAA",
  description:
    "Desafios artísticos mensais do FIVAA para estimular a criatividade.",
};

const desafios = [
  {
    title: "Desafio do Mês",
    desc: "Um tema novo todos os meses para desafiar a sua criatividade e produzir obras originais.",
    rules: [
      "Submissão de até 3 obras por artista",
      "Prazo: último dia de cada mês",
      "Todas as disciplinas artísticas são bem-vindas",
      "Avaliação por júri especializado",
    ],
    prizes: [
      "Destaque na galeria virtual",
      "Publicação nas redes sociais",
      "Exposição no Festival Anual",
      "Prémios simbólicos",
    ],
  },
  {
    title: "Desafio Colaborativo",
    desc: "Projetos em equipa onde artistas de diferentes disciplinas trabalham juntos.",
    rules: [
      "Formação de equipas de 3-5 artistas",
      "Tema definido pelo FIVAA",
      "Prazo de 2 semanas",
      "Apresentação no Festival",
    ],
    prizes: [
      "Reconhecimento coletivo",
      "Publicação em media",
      "Oportunidades de parceria",
      "Documentação do processo",
    ],
  },
];

export default function ProgramacaoDesafios() {
  return (
    <>
      <PageHero
        badge="Desafios Criativos"
        title="Desafios Artísticos"
        subtitle="Estimule a sua criatividade com desafios mensais e competições"
        backgroundImage="/images/hero/fivaa-art-culture.png"
        breadcrumbs={[
          { label: "Programação", href: "/programacao" },
          { label: "Desafios" },
        ]}
      />

      {/* Desafios */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {desafios.map((d) => (
              <div key={d.title} className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg">
                <h3 className="mb-3 font-montserrat text-xl font-bold text-green-dark">{d.title}</h3>
                <p className="mb-6 text-sm text-gray-medium">{d.desc}</p>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-montserrat text-sm font-bold text-green-dark">Regras:</h4>
                    <ul className="space-y-1">
                      {d.rules.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-sm text-gray-medium">
                          <span className="mt-0.5 text-gold">•</span> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-montserrat text-sm font-bold text-green-dark">Prémios:</h4>
                    <ul className="space-y-1">
                      {d.prizes.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-gray-medium">
                          <span className="mt-0.5 text-gold">✓</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
