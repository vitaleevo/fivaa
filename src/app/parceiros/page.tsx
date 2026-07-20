import type { Metadata } from "next";
import Link from "next/link";
import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Parceiros — FIVAA",
  description:
    "Parcerias estratégicas do FIVAA para valorização da arte africana.",
};

const areas = [
  {
    title: "Benefícios",
    desc: "Benefícios exclusivos para parceiros do FIVAA.",
    href: "/parceiros/beneficios",
    icon: "🎁",
  },
  {
    title: "Como Ser Parceiro",
    desc: "Processo simples para se tornar nosso parceiro.",
    href: "/parceiros/como-ser",
    icon: "🤝",
  },
  {
    title: "Testemunhos",
    desc: "Histórias de sucesso de quem já faz parte.",
    href: "/parceiros/testemunhos",
    icon: "💬",
  },
];

export default function ParceirosPage() {
  return (
    <>
      <PageHero
        badge="Parcerias"
        title="Os Nossos Parceiros"
        subtitle="Uma parceria que vai além do financeiro - impacto cultural e social"
        backgroundImage="/images/hero/fivaa-palacio-ferro.webp"
      />

      {/* Áreas */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {areas.map((area) => (
              <Link key={area.title} href={area.href} className="group rounded-2xl border border-gold/10 bg-white p-8 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg">
                <span className="text-4xl">{area.icon}</span>
                <h3 className="mt-4 mb-2 font-montserrat text-xl font-bold text-green-dark group-hover:text-gold">{area.title}</h3>
                <p className="text-sm text-gray-medium">{area.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
