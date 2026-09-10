import type { Metadata } from "next";
import Link from "next/link";
import { AccentBar, Badge } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Como Ser Parceiro — FIVAA",
  description:
    "Processo de parceria do FIVAA - Como se tornar um parceiro oficial.",
};

const passos = [
  {
    step: "1",
    title: "Contacte-nos",
    desc: "Entre em contacto connosco através do formulário ou por e-mail para manifestar o seu interesse.",
  },
  {
    step: "2",
    title: "Apresentação",
    desc: "Apresente a sua organização e como pretende colaborar com o FIVAA.",
  },
  {
    step: "3",
    title: "Proposta",
    desc: "Desenvolvemos em conjunto uma proposta de parceria personalizada.",
  },
  {
    step: "4",
    title: "Formalização",
    desc: "Assinatura do acordo de parceria e início da colaboração.",
  },
];

const tipos = [
  {
    title: "Parceiro Institucional",
    desc: "Organizações governamentais e não governamentais que apoiam a cultura e a arte.",
    examples: ["Ministérios", "Embaixadas", "Fundações culturais"],
  },
  {
    title: "Parceiro Empresarial",
    desc: "Empresas que desejam associar a sua marca a um projeto cultural de impacto.",
    examples: ["Bancos", "Telecomunicações", "Indústrias criativas"],
  },
  {
    title: "Parceiro Académico",
    desc: "Universidades e instituições de ensino que promovem a educação artística.",
    examples: ["Universidades", "Escolas de arte", "Institutos culturais"],
  },
  {
    title: "Parceiro Midiático",
    desc: "Mídia e plataformas de comunicação que divulgam arte e cultura.",
    examples: ["Jornais", "TV", "Rádio", "Plataformas digitais"],
  },
];

export default function ParceirosComoSer() {
  return (
    <>
      <PageHero
        badge="Torne-se Parceiro"
        title="Como Ser Parceiro"
        subtitle="Um processo simples para uma parceria que transforma"
        backgroundImage="/images/hero/fivaa-palacio-ferro.webp"
        breadcrumbs={[
          { label: "Parceiros", href: "/parceiros" },
          { label: "Como Ser Parceiro" },
        ]}
      />

      {/* Processo */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge>Processo de Parceria</Badge>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {passos.map((p) => (
              <div key={p.step} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-green-dark font-montserrat text-2xl font-bold">
                  {p.step}
                </div>
                <h3 className="mb-2 font-montserrat text-lg font-bold text-green-dark">{p.title}</h3>
                <p className="text-sm text-gray-medium">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-white pb-4 text-center">
        <Link
          href="/contactos"
          className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 font-montserrat text-sm font-bold text-green-dark shadow-lg shadow-gold/20 transition-all hover:-translate-y-0.5 hover:bg-gold-metallic hover:shadow-xl"
        >
          Falar com a equipa
        </Link>
      </section>

      {/* Tipos de Parceiros */}
      <section className="relative bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge>Tipos de Parceria</Badge>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tipos.map((t) => (
              <div key={t.title} className="rounded-2xl border border-gold/10 bg-white p-6 shadow-md transition-all hover:border-gold/30 hover:shadow-lg">
                <h3 className="mb-2 font-montserrat text-lg font-bold text-green-dark">{t.title}</h3>
                <p className="mb-4 text-sm text-gray-medium">{t.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {t.examples.map((e) => (
                    <span key={e} className="rounded-full bg-gold/10 px-3 py-1 text-xs text-gold">{e}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
