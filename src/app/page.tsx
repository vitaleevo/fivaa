import HeroSlideshow from "@/components/HeroSlideshow";
import Link from "next/link";
import { IconLectures, IconExhibition, IconLivePerformance, IconNetworking } from "@/components/HighlightIcons";
import { AfricanPatternDark, Divider, Badge, MudclothPattern, TribalDivider } from "@/components/BrandElements";

const stats = [
  { number: "500+", label: "Artistas e Criadores" },
  { number: "30+", label: "Países Representados" },
  { number: "40+", label: "Oradores e Palestrantes" },
  { number: "10K+", label: "Participantes Esperados" },
];

const highlights = [
  {
    title: "Palestras e Painéis",
    desc: "Debates com líderes do setor sobre o futuro das indústrias criativas africanas.",
    icon: IconLectures,
  },
  {
    title: "Exposições de Arte",
    desc: "Mostra de obras de artistas africanos emergentes e consagrados.",
    icon: IconExhibition,
  },
  {
    title: "Atuações ao Vivo",
    desc: "Música, dança e performances que celebram a riqueza cultural do continente.",
    icon: IconLivePerformance,
  },
  {
    title: "Networking",
    desc: "Oportunidades de conexão entre artistas, produtores e investidores.",
    icon: IconNetworking,
  },
];

const timeline = [
  { day: "20 Nov", title: "Dia 1", desc: "Abertura, painéis, workshops e exposições" },
  { day: "21 Nov", title: "Dia 2", desc: "Masterclasses, feira de oportunidades e encerramento" },
];

export default function Home() {
  return (
    <>
      {/* 1. Hero — Fullscreen Slideshow */}
      <HeroSlideshow />

      {/* 2. Manifesto — Dark */}
      <TribalDivider className="text-green-dark bg-warm-white" />
      <section className="relative overflow-hidden bg-green-dark py-28 md:py-36">
        <AfricanPatternDark />
        <MudclothPattern className="opacity-[0.06]" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-orange/5 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <Badge className="border-white/20 bg-white/5 text-white/80">O nosso manifesto</Badge>
          <p className="mt-8 font-montserrat text-3xl font-bold leading-[1.18] tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
            &ldquo;A arte africana não precisa de validação externa.{" "}
            <span className="text-gold">Ela precisa de um palco.</span>{" "}
            O FIVAA é esse palco.&rdquo;
          </p>
          <Divider className="mt-10" />
        </div>
      </section>
      <TribalDivider className="text-green-dark bg-warm-white rotate-180" />

      {/* 3. Números — Light */}
      <section className="site-grid relative bg-warm-white py-20 md:py-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-gold/15 bg-white/95 shadow-[0_24px_70px_rgba(18,71,52,0.10)] backdrop-blur-sm">
            <div className="grid grid-cols-2 divide-y divide-gold/10 md:grid-cols-4 md:divide-x md:divide-y-0">
              {stats.map((stat) => (
                <div key={stat.label} className="group px-4 py-9 text-center sm:px-6 sm:py-11">
                  <p className="font-montserrat text-4xl font-black tracking-[-0.05em] text-gold transition-transform duration-300 group-hover:scale-105 sm:text-5xl lg:text-6xl">
                  {stat.number}
                  </p>
                  <p className="mt-3 font-montserrat text-[11px] font-bold uppercase tracking-[0.12em] text-gray-medium sm:text-xs">
                  {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Destaques — Dark */}
      <TribalDivider className="text-green-dark bg-warm-white" />
      <section className="relative bg-green-dark py-28 md:py-32">
        <AfricanPatternDark />
        <MudclothPattern className="opacity-[0.06]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center md:mb-16">
            <Badge className="border-white/20 bg-white/5 text-white/80">O Evento</Badge>
            <h2 className="mt-6 font-montserrat text-4xl font-black text-white sm:text-5xl">
              O que vai encontrar
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-8 shadow-[0_14px_36px_rgba(0,0,0,0.14)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/10">
                  <div className="mb-6 text-gold">
                    <Icon className="w-12 h-12" />
                  </div>
                  <h3 className="mb-3 font-montserrat text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    {item.desc}
                  </p>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold to-orange transition-all group-hover:w-full" />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <TribalDivider className="text-green-dark bg-warm-white rotate-180" />

      {/* 5. Programação — Light */}
      <section className="site-grid relative bg-warm-white py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center md:mb-16">
            <Badge>Programação</Badge>
            <h2 className="mt-6 font-montserrat text-4xl font-black text-green-dark sm:text-5xl">
              Dois dias de imersão
            </h2>
          </div>
          <div className="relative rounded-[2rem] border border-gold/15 bg-white px-5 py-10 shadow-[0_24px_70px_rgba(18,71,52,0.10)] sm:px-10 md:px-14">
            <div className="absolute left-8 top-12 h-[calc(100%-6rem)] w-px bg-gradient-to-b from-gold/60 via-gold/25 to-transparent md:left-1/2" />
            <div className="space-y-14">
              {timeline.map((item, i) => (
                <div key={item.day} className={`relative flex items-center gap-8 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
                    <Badge>{item.day}</Badge>
                    <h3 className="mt-4 font-montserrat text-2xl font-bold text-green-dark">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-gray-medium">{item.desc}</p>
                  </div>
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-gold/40 bg-white shadow-lg shadow-gold/10 md:mx-0">
                    <div className="h-2.5 w-2.5 rounded-full bg-gold" />
                  </div>
                  <div className="hidden flex-1 md:block" />
                </div>
              ))}
            </div>
          </div>
          <Divider className="my-10" />
          <div className="text-center">
            <Link href="/programacao" className="inline-flex items-center gap-2 rounded-full border-2 border-green-dark px-8 py-4 font-montserrat text-sm font-extrabold text-green-dark transition-all hover:-translate-y-0.5 hover:bg-green-dark hover:text-white hover:shadow-xl hover:shadow-green-dark/15">
              Ver programação completa
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Local — Dark */}
      <TribalDivider className="text-green-dark bg-warm-white" />
      <section className="relative overflow-hidden bg-green-dark py-28 md:py-32">
        <AfricanPatternDark />
        <MudclothPattern className="opacity-[0.06]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(253,184,19,0.08)_0%,_transparent_70%)]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Badge className="border-white/20 bg-white/5 text-white/80">Local do Evento</Badge>
          <h2 className="mt-6 font-montserrat text-4xl font-black text-white sm:text-5xl">
            Palácio de Ferro
          </h2>
          <p className="mt-6 text-lg text-white/70">
            Um dos mais emblemáticos edifícios de Luanda, Angola
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs font-medium uppercase tracking-wider text-white/40">
            <span className="rounded-full border border-white/20 px-4 py-2">20-21 Novembro 2026</span>
            <span className="rounded-full border border-white/20 px-4 py-2">Luanda, Angola</span>
            <span className="rounded-full border border-white/20 px-4 py-2">fivaaforum.com</span>
          </div>
        </div>
      </section>
      <TribalDivider className="text-green-dark bg-cream rotate-180" />

      {/* 7. CTA Final — Light */}
      <section className="site-grid relative overflow-hidden bg-cream py-24 md:py-32">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-gold/20 bg-warm-white/90 px-6 py-14 shadow-[0_24px_70px_rgba(18,71,52,0.10)] backdrop-blur-sm sm:px-12 sm:py-16">
          <h2 className="mb-6 font-montserrat text-4xl font-black text-green-dark sm:text-5xl">
            Vai perder esta{" "}
            <span className="text-gold">oportunidade</span>?
          </h2>
          <p className="mb-12 text-lg text-gray-medium">
            Junte-se a nós no maior evento de valorização da arte africana.
            Lugares limitados.
          </p>
          <Link href="/inscricao" className="group relative inline-block overflow-hidden rounded-full bg-gold px-14 py-5 font-montserrat text-base font-extrabold text-green-dark transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-gold/30">
            <span className="relative z-10">Inscreva-se Agora</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gold to-gold-metallic opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
          </div>
        </div>
      </section>
    </>
  );
}
