import type { Metadata } from "next";
import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Recursos Educativos — FIVAA",
  description:
    "Biblioteca de recursos educativos do FIVAA para artistas africanos.",
};

const categorias = [
  {
    title: "Biblioteca de Arte",
    desc: "Artigos, ensaios e publicações sobre arte africana e global.",
    items: [
      "Artigos sobre história da arte africana",
      "Ensaios críticos sobre tendências contemporâneas",
      "Publicações sobre técnicas artísticas",
      "Entrevistas com artistas renomados",
    ],
  },
  {
    title: "Tutoriais em Vídeo",
    desc: "Vídeo-aulas e tutoriais práticos em diferentes técnicas.",
    items: [
      "Técnicas de pintura passo a passo",
      "Tutoriais de escultura e modelagem",
      "Aulas de fotografia e composição",
      "Guias de arte digital",
    ],
  },
  {
    title: "Podcasts e Áudio",
    desc: "Conteúdo áudio sobre arte, cultura e desenvolvimento.",
    items: [
      "Entrevistas com artistas",
      "Discussões sobre mercado de arte",
      "Histórias de sucesso",
      "Reflexões sobre criatividade",
    ],
  },
];

export default function EducacaoRecursos() {
  return (
    <>
      <PageHero
        badge="Recursos Educativos"
        title="Biblioteca de Recursos"
        subtitle="Conteúdo educativo para aprimorar as suas habilidades artísticas"
        backgroundImage="/images/hero/fivaa-educacao.png"
        breadcrumbs={[
          { label: "Educação", href: "/educacao" },
          { label: "Recursos" },
        ]}
      />

      {/* Categorias */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {categorias.map((cat) => (
              <div key={cat.title} className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg">
                <h3 className="mb-3 font-montserrat text-xl font-bold text-green-dark">{cat.title}</h3>
                <p className="mb-6 text-sm text-gray-medium">{cat.desc}</p>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-medium">
                      <span className="mt-0.5 text-gold">•</span> {item}
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
