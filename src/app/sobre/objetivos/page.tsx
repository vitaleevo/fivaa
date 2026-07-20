import type { Metadata } from "next";
import { AccentBar, Badge, Divider } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import CardAtividade from "@/components/CardAtividade";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Objetivos — FIVAA",
  description:
    "Objetivos principais e o que o FIVAA oferece aos artistas africanos.",
};

const sidebarLinks = [
  { href: "/sobre/visao-geral", label: "Visão Geral" },
  { href: "/sobre/objetivos", label: "Objetivos" },
  { href: "/sobre/impacto", label: "Impacto" },
  { href: "/sobre/historia", label: "História" },
];

const objectives = [
  {
    title: "Promover o Desenvolvimento",
    desc: "Oferecer recursos educacionais e oportunidades de desenvolvimento profissional. Estabelecer plataformas que irão melhorar a promoção e a unidade dos artistas africanos.",
  },
  {
    title: "Compartilhar Conhecimento",
    desc: "Proporcionar um ambiente para troca de ideias, informações e experiências entre artistas e profissionais da indústria.",
  },
  {
    title: "Conectar Profissionais",
    desc: "Facilitar conexões entre pessoas interessadas e atuantes em todo tipo de arte, promovendo colaborações e parcerias.",
  },
];

const offerings = [
  { icon: "💬", title: "Fóruns de Discussão", desc: "Espaços dedicados para discussões sobre diferentes formas de arte." },
  { icon: "🖼️", title: "Galerias Virtuais", desc: "Exposições online onde os membros podem exibir seus trabalhos." },
  { icon: "🎤", title: "Eventos e Webinars", desc: "Palestras, workshops e sessões ao vivo com artistas renomados." },
  { icon: "📚", title: "Recursos Educacionais", desc: "Artigos, tutoriais e cursos online para aprimorar habilidades." },
  { icon: "🤝", title: "Networking", desc: "Oportunidades para colaborar em projetos artísticos e eventos." },
  { icon: "🎓", title: "Plataforma de Mentoria", desc: "Conexão entre artistas emergentes e mentores experientes." },
];

const artAreas = [
  { title: "Arte Visual", desc: "Pintura, escultura, fotografia e outras formas de arte visual." },
  { title: "Literatura", desc: "Espaço para escritores compartilharem suas obras e técnicas." },
  { title: "Música", desc: "Debates sobre composição, performance e produção musical." },
  { title: "Performance", desc: "Teatro, dança e outras formas de performance ao vivo." },
];

export default function SobreObjetivos() {
  return (
    <>
      <PageHero
        badge="Objetivos"
        title="O que nos move"
        backgroundImage="/images/hero/fivaa-junte-se.webp"
        breadcrumbs={[
          { label: "Sobre", href: "/sobre" },
          { label: "Objetivos" },
        ]}
      />

      {/* Objetivos Principais */}
      <AccentBar />
      <section className="relative bg-warm-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <Sidebar title="Sobre o FIVAA" links={sidebarLinks} />
            <div className="space-y-16">
              <div>
                <Badge className="mb-8">Objetivos Principais</Badge>
                <div className="grid gap-6 sm:grid-cols-3">
                  {objectives.map((obj) => (
                    <CardAtividade
                      key={obj.title}
                      title={obj.title}
                      description={obj.desc}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Badge className="mb-8">O que Oferecemos</Badge>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {offerings.map((item) => (
                    <CardAtividade
                      key={item.title}
                      title={item.title}
                      description={item.desc}
                      icon={<span className="text-xl">{item.icon}</span>}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Badge className="mb-8">Áreas Artísticas</Badge>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {artAreas.map((area) => (
                    <CardAtividade
                      key={area.title}
                      title={area.title}
                      description={area.desc}
                    />
                  ))}
                </div>
                <Divider className="mt-12" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
