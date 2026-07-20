import type { Metadata } from "next";
import Link from "next/link";
import { AccentBar } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Benefícios para Parceiros — FIVAA",
  description:
    "Benefícios exclusivos para parceiros do FIVAA - Fórum Internacional para a Valorização de Artistas Africanos.",
};

const beneficios = [
  {
    title: "Visibilidade Marca",
    desc: "A sua marca associada a um evento cultural de referência em Angola e na região.",
    icon: "👁️",
  },
  {
    title: "Acesso a Talentos",
    desc: "Contacto direto com artistas de excelência para projetos e colaborações.",
    icon: "🎨",
  },
  {
    title: "Networking Elite",
    desc: "Eventos exclusivos com colecionadores, galeristas e profissionais da indústria.",
    icon: "🤝",
  },
  {
    title: "Marketing Cultural",
    desc: "Associação a iniciativas de responsabilidade social e cultural.",
    icon: "📣",
  },
  {
    title: "Conteúdo Exclusivo",
    desc: "Acesso a relatórios, análises de mercado e tendências da arte africana.",
    icon: "📊",
  },
  {
    title: "Eventos VIP",
    desc: "Convites para cerimónias, galas e eventos exclusivos do FIVAA.",
    icon: " VIP",
  },
  {
    title: "Suporte Comunidade",
    desc: "Contribuição para o desenvolvimento da comunidade artística africana.",
    icon: "❤️",
  },
  {
    title: "Retorno Social",
    desc: "Impacto positivo na sociedade através da promoção da arte e cultura.",
    icon: "🌍",
  },
];

export default function ParceirosBeneficios() {
  return (
    <>
      <PageHero
        badge="Parceria"
        title="Benefícios para Parceiros"
        subtitle="Uma parceria que vai além do financeiro - impacto cultural e social"
        backgroundImage="/images/hero/fivaa-palacio-ferro.webp"
        breadcrumbs={[
          { label: "Parceiros", href: "/parceiros" },
          { label: "Benefícios" },
        ]}
      />

      {/* Benefícios */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {beneficios.map((b) => (
              <div key={b.title} className="rounded-2xl border border-gold/10 bg-white p-6 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg text-center">
                <span className="text-3xl">{b.icon}</span>
                <h3 className="mt-4 mb-2 font-montserrat text-lg font-bold text-green-dark">{b.title}</h3>
                <p className="text-sm text-gray-medium">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-green-dark py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat text-3xl font-bold text-white">Torne-se nosso parceiro</h2>
          <p className="mt-4 text-white/70">Entre em contato e descubra como podemos criar valor juntos</p>
          <Link href="/contactos" className="mt-8 inline-block rounded-full bg-gold px-8 py-4 font-montserrat text-sm font-bold text-green-dark shadow-lg shadow-gold/20 transition-all hover:bg-gold/90 hover:shadow-xl">
            Falar connosco
          </Link>
        </div>
      </section>
    </>
  );
}
