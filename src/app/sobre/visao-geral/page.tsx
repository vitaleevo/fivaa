import type { Metadata } from "next";
import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Visão Geral — FIVAA",
  description:
    "Conheça o FIVAA - Fórum Internacional para a Valorização de Artistas Africanos.",
};

const sidebarLinks = [
  { href: "/sobre/visao-geral", label: "Visão Geral" },
  { href: "/sobre/objetivos", label: "Objetivos" },
  { href: "/sobre/impacto", label: "Impacto" },
  { href: "/sobre/historia", label: "História" },
];

export default function SobreVisaoGeral() {
  return (
    <>
      <PageHero
        badge="Visão Geral"
        title="Mais que artistas, somos educadores"
        backgroundImage="/images/hero/fivaa-junte-se.webp"
        breadcrumbs={[
          { label: "Sobre", href: "/sobre" },
          { label: "Visão Geral" },
        ]}
      />

      {/* Content */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <Sidebar title="Sobre o FIVAA" links={sidebarLinks} />
            <div className="space-y-12">
              <div>
                <p className="text-lg leading-relaxed text-gray-medium">
                  Bem-vindo ao FIVAA, uma comunidade dedicada à valorização dos artistas de todas as disciplinas!
                  Nosso objetivo é criar um espaço vibrante e colaborativo onde artistas, apreciadores de arte e
                  profissionais da indústria possam se conectar, compartilhar e aprender.
                </p>
              </div>

              <div className="rounded-2xl border border-gold/20 bg-cream p-8">
                <p className="font-montserrat text-xl font-bold text-green-dark italic">
                  &ldquo;FÓRUM INTERNACIONAL PARA VALORIZAÇÃO DE ARTISTAS AFRICANOS&rdquo;
                </p>
              </div>

              <div>
                <h2 className="mb-4 font-montserrat text-2xl font-bold text-green-dark">O que é o FIVAA?</h2>
                <p className="text-gray-medium leading-relaxed">
                  O Fórum Internacional Fivaa é uma plataforma educacional dedicada a criar uma plataforma
                  unificadora para a região rumo ao desenvolvimento, bem como alcançar artistas africanos que
                  lutam para desenvolver a sua arte. A associação irá desempenhar um papel independente no
                  cumprimento de alguns dos mandatos de Desenvolvimento Social/Económico da SADC e de países
                  não-SADC, alargar e melhorar a indústria da arte em toda a região africana.
                </p>
              </div>

              <div>
                <h2 className="mb-4 font-montserrat text-2xl font-bold text-green-dark">Os nossos compromissos</h2>
                <p className="text-gray-medium leading-relaxed">
                  Estamos empenhados em usar a arte em vários programas educativos/de capacitação como
                  ferramentas para participar no desenvolvimento comunitário com as partes interessadas e estar
                  ativamente envolvidos na luta contra a pobreza, o VIH/SIDA, o cancro, o abuso de mulheres/crianças
                  e o abuso de drogas.
                </p>
              </div>

              <div className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md">
                <h3 className="mb-4 font-montserrat text-lg font-bold text-green-dark">Organização Independente</h3>
                <p className="text-gray-medium leading-relaxed">
                  Esta Associação é uma organização independente, sem fins lucrativos, com um Fundador visionário
                  e procura estabelecer relações fraternas com outras organizações Nacionais e Internacionais
                  visando objetivos mútuos definidos. A Associação é mantida unida por um amor comum e duradouro
                  pela arte e pela confiança mútua.
                </p>
              </div>

              <div className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md">
                <h3 className="mb-4 font-montserrat text-lg font-bold text-green-dark">Alcance Continental</h3>
                <p className="text-gray-medium leading-relaxed">
                  Assim unida a diferentes culturas, raça, origem/nacionalidade, esta Associação procura avançar
                  com o estabelecimento de um escritório nacional em todos os países africanos, onde um número
                  seleccionado de membros do Comité Executivo Nacional (CEN) formula o Conselho Executivo Regional (CER).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
