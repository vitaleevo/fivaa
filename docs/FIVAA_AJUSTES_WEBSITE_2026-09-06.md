# Ajustes do website FIVAA - 06/09/2026

## Implementado

- Remoção do menu lateral das páginas Workshops, Palestras e Exposições.
- Altura uniforme dos heróis de páginas internas a partir de 640 px, preservando adaptação móvel.
- Substituição da linha decorativa central pelo indicador Osram dourado, com movimento reduzido quando solicitado pelo sistema.
- Breadcrumbs com melhor contraste, página atual em branco e negrito, e `Início` em português.
- Correções de texto na página Como Ser Parceiro e novo CTA para Contactos.
- CTA de bilhetes e texto do slideshow alinhados com a página de modalidades.
- Datas em português apresentadas por extenso nos textos principais.
- Logótipos públicos recortados visualmente para aproveitar melhor os ficheiros com margem transparente.
- Recolha automática do menu móvel preservada e coberta por teste.
- Teste de regressão para os principais requisitos deste briefing.
- Temas atuais da programação mantidos após aprovação da direção.
- Métricas atualizadas para 100+ artistas e criadores, 30+ países, 30+ oradores e 1K+ participantes.
- Depoimentos pessoais de demonstração removidos da publicação e substituídos por três depoimentos institucionais da Direção, Coordenação de Parcerias e Curadoria do FIVAA.
- Conteúdo público traduzido para português, inglês e francês, incluindo páginas institucionais, programação, educação, parceiros, formulários, política de privacidade e termos.
- Título do separador e idioma do documento atualizados em conjunto com o seletor PT/EN/FR.

## Decisões confirmadas

- Temas atuais aprovados.
- Depoimentos institucionais sem nomes pessoais aprovados.
- Métricas 100+ / 30+ / 30+ / 1K+ aprovadas.
- Versões públicas PT/EN/FR aprovadas para publicação.

## Verificação

- `npm run lint`
- `npm test` - 7 testes aprovados.
- `npm run build`
- `npm run test:browser` - cobertura das rotas públicas e administrativas, idiomas e larguras 320, 768, 1024 e 1440 px.
- Inspeção visual das páginas Desafios e Como Ser Parceiro em desktop e 320 px.
