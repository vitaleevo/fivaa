import type { Metadata } from "next";
import { AccentBar, Badge } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "História — FIVAA",
  description:
    "Fundação, estrutura e mandatos do FIVAA - Fórum Internacional para a Valorização de Artistas Africanos.",
};

const timeline = [
  {
    year: "Fundação",
    title: "Criação do FIVAA",
    desc: "O FIVAA foi fundado com a missão de promover e valorizar artistas africanos, criando uma plataforma unificadora para a região.",
  },
  {
    year: "Mandato SADC",
    title: "Expansão Regional",
    desc: "AAssociação passou a desempenhar um papel independente no cumprimento de mandatos de Desenvolvimento Social/Económico da SADC e países não-SADC.",
  },
  {
    year: "Escritórios Nacionais",
    title: "Presença Continental",
    desc: "Estabelecimento de escritórios nacionais em todos os países africanos, com membros do Comité Executivo Nacional formulando o Conselho Executivo Regional.",
  },
  {
    year: "Hoje",
    title: "Plataforma Global",
    desc: "O FIVAA é hoje uma organização independente, sem fins lucrativos, com relações fraternas com organizações Nacionais e Internacionais.",
  },
];

const structure = [
  {
    role: "Fundador",
    desc: "Liderança visionária que guia a organização com paixão pela arte africana.",
  },
  {
    role: "Comité Executivo Nacional (CEN)",
    desc: "Membros selecionados em cada país africano que formulam o Conselho Executivo Regional.",
  },
  {
    role: "Conselho Executivo Regional (CER)",
    desc: "Coordenação regional dos programas e iniciativas do FIVAA.",
  },
  {
    role: "Comunidade de Artistas",
    desc: "Artistas de todas as disciplinas que compõem o coração da organização.",
  },
];

export default function SobreHistoria() {
  return (
    <>
      <PageHero
        badge="História"
        title="A nossa história"
        subtitle="De uma visão a uma organização continental que transforma vidas através da arte"
        backgroundImage="/images/hero/fivaa-junte-se.webp"
        breadcrumbs={[
          { label: "Sobre", href: "/sobre" },
          { label: "História" },
        ]}
      />

      {/* Timeline */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative space-y-12">
            <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-gold via-orange to-green-dark md:left-1/2" />
            {timeline.map((item, i) => (
              <div key={item.title} className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-8 z-10 h-4 w-4 rounded-full border-2 border-gold bg-white shadow-lg md:left-1/2 md:-translate-x-1/2" />
                <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <span className="inline-block rounded-full bg-gold/10 px-3 py-1 font-montserrat text-xs font-bold text-gold">{item.year}</span>
                  <h3 className="mt-2 font-montserrat text-xl font-bold text-green-dark">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estrutura */}
      <section className="relative bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge>Estrutura Organizacional</Badge>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {structure.map((item) => (
              <div key={item.role} className="rounded-2xl border border-gold/10 bg-white p-6 shadow-md text-center transition-all hover:border-gold/30 hover:shadow-lg">
                <h3 className="mb-2 font-montserrat text-lg font-bold text-green-dark">{item.role}</h3>
                <p className="text-sm text-gray-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge>Os Nossos Valores</Badge>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-green-dark p-6 text-white">
              <h3 className="font-montserrat text-lg font-bold">Unidade</h3>
              <p className="mt-2 text-sm text-white/70">Artistas unidos por um amor comum e duradouro pela arte</p>
            </div>
            <div className="rounded-2xl bg-gold p-6 text-green-dark">
              <h3 className="font-montserrat text-lg font-bold">Confiança</h3>
              <p className="mt-2 text-sm text-green-dark/70">Mantida por confiança mútua entre todos os membros</p>
            </div>
            <div className="rounded-2xl bg-orange p-6 text-white">
              <h3 className="font-montserrat text-lg font-bold">Colaboração</h3>
              <p className="mt-2 text-sm text-white/70">Diversidade de culturas, raça, origem e nacionalidade</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
