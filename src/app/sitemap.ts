export const dynamic = "force-static";

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fivaa.com";

  const routes: {
    path: string;
    priority: number;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  }[] = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/inscricao", priority: 0.9, changeFrequency: "daily" },
    { path: "/programacao", priority: 0.9, changeFrequency: "daily" },
    { path: "/oradores", priority: 0.85, changeFrequency: "weekly" },
    { path: "/programacao/palestras", priority: 0.8, changeFrequency: "weekly" },
    { path: "/programacao/workshops", priority: 0.8, changeFrequency: "weekly" },
    { path: "/programacao/exposicoes", priority: 0.8, changeFrequency: "weekly" },
    { path: "/programacao/festival", priority: 0.8, changeFrequency: "weekly" },
    { path: "/programacao/mentoria", priority: 0.75, changeFrequency: "weekly" },
    { path: "/programacao/cursos", priority: 0.75, changeFrequency: "weekly" },
    { path: "/programacao/desafios", priority: 0.75, changeFrequency: "weekly" },
    { path: "/programacao/feedback", priority: 0.7, changeFrequency: "weekly" },
    { path: "/sobre", priority: 0.8, changeFrequency: "weekly" },
    { path: "/sobre/visao-geral", priority: 0.75, changeFrequency: "weekly" },
    { path: "/sobre/objetivos", priority: 0.75, changeFrequency: "weekly" },
    { path: "/sobre/impacto", priority: 0.75, changeFrequency: "weekly" },
    { path: "/sobre/historia", priority: 0.75, changeFrequency: "weekly" },
    { path: "/educacao", priority: 0.8, changeFrequency: "weekly" },
    { path: "/educacao/recursos", priority: 0.75, changeFrequency: "weekly" },
    { path: "/educacao/workshops", priority: 0.75, changeFrequency: "weekly" },
    { path: "/educacao/certificacoes", priority: 0.75, changeFrequency: "weekly" },
    { path: "/parceiros", priority: 0.8, changeFrequency: "weekly" },
    { path: "/parceiros/beneficios", priority: 0.75, changeFrequency: "weekly" },
    { path: "/parceiros/como-ser", priority: 0.75, changeFrequency: "weekly" },
    { path: "/parceiros/testemunhos", priority: 0.7, changeFrequency: "weekly" },
    { path: "/contactos", priority: 0.8, changeFrequency: "monthly" },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

