import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Badge, Divider } from "@/components/BrandElements";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade & Proteção de Dados — FIVAA",
  description:
    "Política de Privacidade e Gestão de Dados Pessoais do FIVAA 2026 em conformidade com a Lei n.º 22/11 de Angola, RGPD/GDPR e normas internacionais de privacidade.",
  alternates: {
    canonical: "https://fivaaforum.com/privacidade",
  },
};

export default function PrivacidadePage() {
  return (
    <>
      <PageHero
        badge="Transparência e Confiança"
        title="Política de Privacidade e Proteção de Dados"
        subtitle="O nosso compromisso rigoroso com a segurança e privacidade dos seus dados pessoais em Angola e a nível global."
        backgroundImage="/images/hero/fivaa-forum-hero.webp"
      />

      <section className="site-grid bg-warm-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Card de introdução com Lei 22/11 */}
          <div className="mb-12 rounded-2xl border border-gold/20 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <Badge>Conformidade Legal</Badge>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                Lei n.º 22/11 (Angola) & RGPD/GDPR
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
              O <strong>FIVAA — Fórum & Festival Internacional da Valorização da Arte Africana</strong> (“FIVAA”, “nós”) respeita a sua privacidade e está empenhado em proteger os seus dados pessoais. Esta Política explica como recolhemos, utilizamos, partilhamos e protegemos as suas informações, em total conformidade com a <strong>Lei da Proteção de Dados Pessoais de Angola (Lei n.º 22/11, de 11 de Janeiro)</strong>, bem como os padrões internacionais do <strong>Regulamento Geral sobre a Proteção de Dados (RGPD/GDPR)</strong> e <strong>LGPD</strong>.
            </p>
          </div>

          <div className="space-y-12 text-gray-700">
            {/* 1. Responsável */}
            <div className="rounded-2xl border border-gold/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-montserrat text-xl font-bold text-green-dark sm:text-2xl">
                1. Responsável pelo Tratamento dos Dados
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                A entidade responsável pelo tratamento dos seus dados pessoais é a Comissão Organizadora do FIVAA:
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-gray-600">
                <li><strong>Organização:</strong> FIVAA — Fórum Internacional para a Valorização da Arte Africana</li>
                <li><strong>Sede do Evento:</strong> Palácio de Ferro, Rua Major Kanhangulo, Luanda, Angola</li>
                <li><strong>E-mail para Assuntos de Privacidade:</strong> <a href="mailto:geral@fivaaforum.com" className="text-gold font-semibold hover:underline">geral@fivaaforum.com</a></li>
              </ul>
            </div>

            {/* 2. Dados Recolhidos */}
            <div className="rounded-2xl border border-gold/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-montserrat text-xl font-bold text-green-dark sm:text-2xl">
                2. Dados Pessoais que Recolhemos
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                Recolhemos apenas as informações estritamente necessárias para a sua participação no evento e prestação de serviços informativos:
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gold/10 bg-warm-white p-4">
                  <h3 className="font-montserrat text-sm font-bold text-green-dark">🎟️ Inscrição e Bilhética</h3>
                  <p className="mt-1 text-xs text-gray-600">Nome completo, endereço de correio eletrónico, número de telefone, país de residência, organização/instituição e tipo de bilhete escolhido.</p>
                </div>
                <div className="rounded-xl border border-gold/10 bg-warm-white p-4">
                  <h3 className="font-montserrat text-sm font-bold text-green-dark">💬 Formulários de Contacto</h3>
                  <p className="mt-1 text-xs text-gray-600">Nome, e-mail e conteúdo da mensagem submetida através do nosso canal de comunicação oficial.</p>
                </div>
                <div className="rounded-xl border border-gold/10 bg-warm-white p-4">
                  <h3 className="font-montserrat text-sm font-bold text-green-dark">🌐 Dados Técnicos de Navegação</h3>
                  <p className="mt-1 text-xs text-gray-600">Endereço IP (com máscaras de segurança para limitação de taxa/anti-spam), tipo de navegador e preferências de idioma.</p>
                </div>
                <div className="rounded-xl border border-gold/10 bg-warm-white p-4">
                  <h3 className="font-montserrat text-sm font-bold text-green-dark">🍪 Cookies Estritamente Necessários</h3>
                  <p className="mt-1 text-xs text-gray-600">Preferência de idioma (PT/EN/FR), preferências de consentimento e tokens de sessão para administradores autorizados.</p>
                </div>
              </div>
            </div>

            {/* 3. Finalidades */}
            <div className="rounded-2xl border border-gold/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-montserrat text-xl font-bold text-green-dark sm:text-2xl">
                3. Finalidades e Bases Legais do Tratamento
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                Os seus dados são tratados com base nas seguintes justificações legais estabelecidas no Artigo 13.º da Lei n.º 22/11 de Angola e no Artigo 6.º do RGPD:
              </p>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-gold">✓</span>
                  <span><strong>Execução do Registo no Evento:</strong> Processamento da sua inscrição, emissão do bilhete/credencial de acesso ao Palácio de Ferro e controlo de lotação.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-gold">✓</span>
                  <span><strong>Comunicação Operacional:</strong> Notificações sobre a programação, alterações de horários ou informações de segurança do FIVAA 2026.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-gold">✓</span>
                  <span><strong>Segurança e Prevenção de Fraudes:</strong> Mecanismos anti-bot e limitação de taxa (rate limiting) para proteger a integridade da plataforma.</span>
                </li>
              </ul>
            </div>

            {/* 4. Direitos dos Titulares */}
            <div className="rounded-2xl border border-gold/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-montserrat text-xl font-bold text-green-dark sm:text-2xl">
                4. Os Seus Direitos (Lei n.º 22/11 & RGPD)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                Enquanto titular dos dados pessoais, a legislação angolana e internacional assegura-lhe os seguintes direitos fundamentais:
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <strong className="text-sm text-green-dark">Direito de Acesso</strong>
                  <p className="text-xs text-gray-600 mt-1">Saber quais os dados que mantemos sobre si e obter cópia dos mesmos.</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <strong className="text-sm text-green-dark">Direito de Retificação</strong>
                  <p className="text-xs text-gray-600 mt-1">Solicitar a correção de dados desatualizados ou incorretos.</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <strong className="text-sm text-green-dark">Direito de Eliminação / Esquecimento</strong>
                  <p className="text-xs text-gray-600 mt-1">Pedir a remoção dos seus dados de registo quando já não forem necessários.</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <strong className="text-sm text-green-dark">Direito de Oposição</strong>
                  <p className="text-xs text-gray-600 mt-1">Opor-se ao tratamento de dados para fins específicos a qualquer momento.</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Para exercer qualquer um destes direitos, basta enviar um e-mail para <a href="mailto:geral@fivaaforum.com" className="text-gold font-bold hover:underline">geral@fivaaforum.com</a>.
              </p>
            </div>

            {/* 5. Segurança */}
            <div className="rounded-2xl border border-gold/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-montserrat text-xl font-bold text-green-dark sm:text-2xl">
                5. Segurança e Armazenamento dos Dados
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                Implementamos medidas técnicas e organizativas rigorosas para proteger os seus dados, incluindo:
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li>Criptografia de ponta a ponta durante a transmissão (HTTPS/TLS 1.3).</li>
                <li>Autenticação forte com assinaturas digitais JWT (RS256) para controlo de acessos administrativos.</li>
                <li>Restrição de acesso: apenas membros credenciados da organização podem consultar a base de inscrições.</li>
                <li>Políticas de retenção: os dados de inscrição são eliminados com segurança após o encerramento das atividades do ciclo do FIVAA 2026.</li>
              </ul>
            </div>

            {/* 6. Atualizações */}
            <div className="rounded-2xl border border-gold/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-montserrat text-xl font-bold text-green-dark sm:text-2xl">
                6. Atualizações a Esta Política
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                Esta Política pode ser atualizada periodicamente para refletir evoluções legislativas ou melhorias na plataforma. A data da última atualização é <strong>Agosto de 2026</strong>.
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
