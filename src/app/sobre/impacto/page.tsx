import type { Metadata } from "next";
import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Impacto — FIVAA",
  description:
    "Impacto do FIVAA na valorização da arte e na sociedade africana.",
};

const impacts = [
  {
    title: "Visibilidade e Reconhecimento",
    desc: "O fórum proporciona uma plataforma para que artistas mostrem suas obras ao público, recebam feedback e ganhem reconhecimento.",
    items: [
      "Maior exposição em eventos físicos e virtuais",
      "Reconhecimento profissional através de competições",
      "Destaque de histórias de sucesso",
    ],
  },
  {
    title: "Promoção e Commercialização",
    desc: "O fórum facilita a comercialização de obras de arte e produtos artísticos, conectando artistas com colecionadores e galerias.",
    items: [
      "Criação de um mercado vibrante de arte",
      "Sustentabilidade financeira para artistas",
      "Promoção de novos talentos",
    ],
  },
  {
    title: "Educação e Desenvolvimento",
    desc: "O fórum oferece programas educacionais que ajudam os artistas a desenvolver suas habilidades e conhecimentos.",
    items: [
      "Workshops, cursos e palestras",
      "Programas de mentoria personalizada",
      "Atualização contínua sobre tendências",
    ],
  },
  {
    title: "Criatividade e Inovação",
    desc: "O fórum incentiva a experimentação e a inovação, promovendo novas formas de expressão artística.",
    items: [
      "Estímulo à criação de obras inovadoras",
      "Colaborações entre artistas de diferentes disciplinas",
      "Uso de novas tecnologias na arte",
    ],
  },
  {
    title: "Engajamento do Público",
    desc: "O fórum trabalha para educar e engajar o público, aumentando a apreciação e o entendimento da arte.",
    items: [
      "Programas educativos para o público",
      "Participação comunitária em eventos",
      "Sensibilização social através da arte",
    ],
  },
  {
    title: "Preservação do Património",
    desc: "O fórum contribui para a preservação e celebração do patrimônio cultural através da arte.",
    items: [
      "Promoção de tradições culturais",
      "Celebração da diversidade cultural",
      "Registro visual e cultural da comunidade",
    ],
  },
];

export default function SobreImpacto() {
  return (
    <>
      <PageHero
        badge="Impacto"
        title="Impacto do FIVAA"
        subtitle="O FIVAA desempenha um papel fundamental na valorização da arte em várias dimensões"
        backgroundImage="/images/hero/fivaa-junte-se.webp"
        breadcrumbs={[
          { label: "Sobre", href: "/sobre" },
          { label: "Impacto" },
        ]}
      />

      {/* Impact Cards */}
      <AccentBar />
      <section className="relative bg-green-dark py-20">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #FDB813 0px, #FDB813 1px, transparent 1px, transparent 30px)`,
        }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {impacts.map((impact) => (
              <div key={impact.title} className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-gold/30 hover:bg-white/10">
                <h3 className="mb-4 font-montserrat text-xl font-bold text-white">{impact.title}</h3>
                <p className="mb-6 text-sm text-white/60">{impact.desc}</p>
                <ul className="space-y-2">
                  {impact.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/50">
                      <span className="mt-1 text-gold">✓</span> {item}
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
