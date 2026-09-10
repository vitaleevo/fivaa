import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Divider } from "@/components/BrandElements";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos e Condições de Uso — FIVAA",
  description:
    "Termos e condições gerais de utilização do website e participação no FIVAA 2026 no Palácio de Ferro, Luanda, Angola.",
  alternates: {
    canonical: "https://fivaaforum.com/termos",
  },
};

export default function TermosPage() {
  return (
    <>
      <PageHero
        badge="Termos Gerais"
        title="Termos e Condições de Uso"
        subtitle="Regras de utilização da plataforma e participação no FIVAA 2026."
        backgroundImage="/images/hero/fivaa-forum-hero.webp"
      />

      <section className="site-grid bg-warm-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10 text-gray-700">
            <div className="rounded-2xl border border-gold/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-montserrat text-xl font-bold text-green-dark sm:text-2xl">
                1. Aceitação dos Termos
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                Ao aceder ao website do FIVAA (fivaaforum.com) e ao submeter qualquer formulário de inscrição ou contacto, o utilizador declara ter lido, compreendido e aceite os presentes Termos e Condições.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-montserrat text-xl font-bold text-green-dark sm:text-2xl">
                2. Inscrições e Participação no Evento
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                A inscrição através do website confere o direito a solicitar a credencial de acesso ao FIVAA 2026, a realizar-se nos dias 20 e 21 de novembro de 2026 no Palácio de Ferro, em Luanda. A organização reserva-se o direito de limitar a admissão de acordo com a lotação máxima de segurança do recinto.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-montserrat text-xl font-bold text-green-dark sm:text-2xl">
                3. Propriedade Intelectual e Direitos de Imagem
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                Todas as marcas, logótipos, textos, imagens e conteúdos multimédia exibidos no website são propriedade exclusiva do FIVAA ou dos seus respetivos artistas e parceiros, estando protegidos pelas leis de propriedade intelectual vigentes na República de Angola e tratados internacionais.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-montserrat text-xl font-bold text-green-dark sm:text-2xl">
                4. Lei Aplicável e Jurisdição
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                Os presentes Termos regem-se pela legislação da República de Angola. Para a resolução de quaisquer litígios emergentes, são competentes os Tribunais da Comarca de Luanda, com expressa renúncia a qualquer outro.
              </p>
            </div>
          </div>

          <Divider className="my-12" />

          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border-2 border-green-dark px-8 py-3.5 font-montserrat text-sm font-extrabold text-green-dark transition-all hover:bg-green-dark hover:text-white"
            >
              ← Voltar à Página Principal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
