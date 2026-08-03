import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Award, BookOpen, Palette } from "lucide-react";
import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Educação — FIVAA",
  description: "Programas educativos do FIVAA para desenvolvimento artístico.",
};

const areas = [
  { title: "Recursos", desc: "Biblioteca de artigos, tutoriais, vídeos e áudios sobre arte africana.", href: "/educacao/recursos", icon: BookOpen, label: "Explorar conteúdos" },
  { title: "Workshops", desc: "Experiências práticas para todos os níveis de percurso artístico.", href: "/educacao/workshops", icon: Palette, label: "Ver workshops" },
  { title: "Certificações", desc: "Reconhecimento profissional para o seu desenvolvimento criativo.", href: "/educacao/certificacoes", icon: Award, label: "Conhecer certificações" },
];

export default function EducacaoPage() {
  return (
    <>
      <PageHero badge="Educação" title="Educação Artística" subtitle="Recursos, workshops e certificações para apoiar o seu desenvolvimento artístico." backgroundImage="/images/hero/fivaa-educacao.webp" />
      <AccentBar />

      <section className="relative bg-warm-white py-20 md:py-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="section-eyebrow text-green-dark">Aprender e criar</p>
            <h2 className="mt-5 font-montserrat text-3xl font-black tracking-[-0.035em] text-green-dark sm:text-4xl">Escolha o seu próximo passo</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-medium">Uma seleção clara de caminhos para descobrir referências, aprofundar técnicas e validar a sua trajetória.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {areas.map((area, index) => {
              const Icon = area.icon;
              return (
                <Link key={area.title} href={area.href} className="content-card group rounded-[1.75rem] p-8 focus-visible:outline-offset-4">
                  <div className="flex items-start justify-between gap-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/12 text-gold"><Icon className="h-6 w-6" /></span>
                    <span className="font-montserrat text-xs font-black tracking-[0.18em] text-green-dark/30">0{index + 1}</span>
                  </div>
                  <h3 className="mt-8 font-montserrat text-2xl font-black tracking-[-0.025em] text-green-dark transition-colors group-hover:text-orange">{area.title}</h3>
                  <p className="mt-3 min-h-12 text-sm leading-relaxed text-gray-medium">{area.desc}</p>
                  <span className="mt-8 inline-flex items-center gap-2 font-montserrat text-xs font-extrabold uppercase tracking-[0.12em] text-green-dark">{area.label}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
