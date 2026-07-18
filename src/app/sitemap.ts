export const dynamic = "force-static";

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fivaaforum.com";
  const routes = [
    "",
    "/sobre",
    "/sobre/visao-geral",
    "/sobre/objetivos",
    "/sobre/impacto",
    "/sobre/historia",
    "/programacao",
    "/programacao/workshops",
    "/programacao/palestras",
    "/programacao/exposicoes",
    "/programacao/mentoria",
    "/programacao/cursos",
    "/programacao/desafios",
    "/programacao/feedback",
    "/programacao/festival",
    "/educacao",
    "/educacao/recursos",
    "/educacao/workshops",
    "/educacao/certificacoes",
    "/oradores",
    "/parceiros",
    "/parceiros/beneficios",
    "/parceiros/como-ser",
    "/parceiros/testemunhos",
    "/inscricao",
    "/contactos",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
}
