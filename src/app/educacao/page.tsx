import type { Metadata } from "next";
import Link from "next/link";
import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Educação — FIVAA",
  description:
    "Programas educativos do FIVAA para desenvolvimento artístico.",
};

const areas = [
  {
    title: "Recursos",
    desc: "Biblioteca de artigos, tutoriais, vídeos e áudios sobre arte africana.",
    href: "/educacao/recursos",
    icon: "📚",
  },
  {
    title: "Workshops",
    desc: "Workshops práticos para todos os níveis de experiência.",
    href: "/educacao/workshops",
    icon: "🎨",
  },
  {
    title: "Certificações",
    desc: "Reconhecimento profissional do seu percurso artístico.",
    href: "/educacao/certificacoes",
    icon: "🎓",
  },
];

export default function EducacaoPage() {
  return (
    <>
      <PageHero
        badge="Educação"
        title="Educação Artística"
        subtitle="Recursos, workshops e certificações para o seu desenvolvimento artístico"
        backgroundImage="/images/hero/LC_CERT-10-1.webp"
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
