import type { Metadata } from "next";
import { AccentBar, Badge, Divider, AfricanPatternDark } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Sobre — FIVAA",
  description:
    "Conheça a missão, visão e valores do Fórum & Festival Internacional da Valorização da Arte Africana.",
};

export default function Sobre() {
  return (
    <>
      <PageHero
        badge="Sobre"
        title="FIVAA"
        subtitle="Fórum & Festival Internacional da Valorização da Arte Africana"
        backgroundImage="/images/hero/fivaa-junte-se.png"
      />

      {/* 2. Missão — Dark */}
      <AccentBar />
      <section className="relative overflow-hidden bg-green-dark py-32">
        <AfricanPatternDark />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            <div>
              <Badge className="border-white/20 bg-white/5 text-white/80">Missão</Badge>
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                Criar oportunidades para artistas, produtores, apoiadores e
                apreciadores da arte africana exporem suas obras, compartilharem
                experiências, desafios, cases de sucessos e os caminhos
                possíveis para a valorização e preservação da arte africana nos
                países das regiões SADC e não SADC.
              </p>
            </div>

            <div>
              <Badge className="border-white/20 bg-white/5 text-white/80">Visão</Badge>
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                Ser o principal evento em África destinado ao compartilhamento
                das melhores estratégias e práticas de criação, valorização e
                promoção da arte africana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Valores — Light */}
      <section className="relative bg-warm-white py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge>Valores</Badge>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Ética", desc: "Compromisso com a integridade e transparência em todas as ações." },
              { title: "Responsabilidade Social", desc: "Contribuir para o desenvolvimento sustentável das comunidades." },
              { title: "Inovação", desc: "Buscar constantemente novas formas de valorizar a arte africana." },
              { title: "Diversidade", desc: "Respeito às diversidades étnicas e culturais do continente." },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10">
                <h3 className="mb-3 font-montserrat text-lg font-bold text-green-dark">{v.title}</h3>
                <p className="text-sm text-gray-medium">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. O Evento — Dark */}
      <AccentBar />
      <section className="relative overflow-hidden bg-green-dark py-32">
        <AfricanPatternDark />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Badge className="border-white/20 bg-white/5 text-white/80">O Evento</Badge>
          <p className="mt-6 text-lg leading-relaxed text-white/80">
            Realizado nos dias 20 e 21 de Novembro de 2026, nas emblemáticas
            instalações do Palácio de Ferro, em Luanda, Angola, o FIVAA
            reúne artistas, músicos, criadores visuais, líderes culturais,
            empreendedores, investidores, decisores políticos, educadores e
            profissionais da indústria criativa provenientes de África e de
            diversas partes do mundo. O festival integra atuações ao vivo,
            exposições, fóruns da indústria, workshops profissionais,
            oportunidades de networking e intercâmbios culturais.
          </p>
          <Divider className="mt-12" />
        </div>
      </section>
    </>
  );
}
