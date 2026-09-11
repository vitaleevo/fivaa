import { test, expect } from "@playwright/test";
import { readdirSync } from "node:fs";

const routes = readdirSync("src/app", { recursive: true, encoding: "utf8" })
  .filter(path => path.endsWith("page.tsx"))
  .map(path => "/" + path.replace(/\/?page.tsx$/, ""))
  .filter(path => path !== "/programacao/festival");

for (const route of routes) {
  test(`route ${route} has no runtime errors or broken internal links`, async ({ page, request }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("body")).not.toContainText("Application error");
    if (route.startsWith("/admin")) {
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    } else {
      await expect(page.locator("h1")).toBeVisible();
      const links = await page.locator('a[href^="/"]').evaluateAll(nodes => [...new Set(nodes.map(node => node.getAttribute("href")!.split("#")[0]))]);
      for (const link of links.filter(Boolean)) expect((await request.get(link)).status(), link).toBe(200);
      const brokenImages = await page.locator("img").evaluateAll(nodes => nodes.filter((node): node is HTMLImageElement => node instanceof HTMLImageElement && node.complete && node.naturalWidth === 0).map(node => node.src));
      expect(brokenImages).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
}

test("saved language hydrates consistently on reload and navigation", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.addInitScript(() => localStorage.setItem("fivaa_lang", "en"));
  for (const route of ["/", "/inscricao", "/contactos", "/sobre", "/programacao"]) {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("link", { name: "About", exact: true }).first()).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("website briefing corrections remain consistent", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  const heroHeights: number[] = [];
  for (const route of [
    "/programacao/workshops",
    "/programacao/palestras",
    "/programacao/exposicoes",
    "/programacao/mentoria",
    "/programacao/cursos",
    "/programacao/desafios",
    "/programacao/feedback",
  ]) {
    await page.goto(route);
    await expect(page.locator("aside")).toHaveCount(0);
    await expect(page.getByRole("navigation", { name: "breadcrumb" })).toContainText("Início");
    await expect(page.locator("[data-osram-scroll-cue]")).toBeVisible();
    heroHeights.push(await page.locator("[data-page-hero]").evaluate(element => element.getBoundingClientRect().height));
  }
  expect(new Set(heroHeights.map(Math.round)).size).toBe(1);

  await page.goto("/parceiros/como-ser");
  await expect(page.getByText("Parceiro Midiático", { exact: true })).toBeVisible();
  await expect(page.getByText("Mídia e plataformas de comunicação que divulgam arte e cultura.", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Falar com a equipa" })).toHaveAttribute("href", "/contactos");

  await page.goto("/");
  await expect(page.getByRole("link", { name: "Consultar bilhetes" }).first()).toBeVisible();
  await expect(page.getByText("20 e 21 de novembro de 2026", { exact: true })).toBeVisible();
  await expect(page.getByText("100+", { exact: true })).toBeVisible();
  await expect(page.getByText("1K+", { exact: true })).toBeVisible();
  await expect(page.getByText("500+", { exact: true })).toHaveCount(0);
  await expect(page.getByText("10K+", { exact: true })).toHaveCount(0);
});

test("public content switches completely between Portuguese, English, and French", async ({ page }) => {
  await page.goto("/sobre");
  await page.getByRole("button", { name: "Selecionar idioma" }).first().click();
  await page.getByRole("button", { name: /English/ }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByText("Create opportunities for artists, producers, supporters, and African art enthusiasts to exhibit their work, share experiences, challenges, success stories, and pathways for appreciating and preserving African art across SADC and non-SADC countries.", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Choose language" }).first().click();
  await page.getByRole("button", { name: /Français/ }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.getByText("Créer des opportunités pour que les artistes, producteurs, soutiens et passionnés d'art africain exposent leurs œuvres, partagent leurs expériences, leurs défis, leurs réussites et les voies possibles de valorisation et de préservation de l'art africain dans les pays de la SADC et hors SADC.", { exact: true })).toBeVisible();
});

test("testimonial page never exposes deprecated demo identities", async ({ page }) => {
  await page.goto("/parceiros/testemunhos");
  await expect(page.getByText("Direção do FIVAA", { exact: true })).toBeVisible();
  for (const name of ["Maria Santos", "João Silva", "Ana Costa", "Pedro Mendes", "Lucia Fernandes", "Carlos Matos"]) {
    await expect(page.getByText(name, { exact: true })).toHaveCount(0);
  }
});

test("approved programme and institutional testimonials remain available without live data", async ({ page }) => {
  await page.route("https://*.convex.cloud/**", route => route.abort());
  await page.goto("/programacao");
  await expect(page.getByText("Painel: O Futuro das Indústrias Criativas em África", { exact: true })).toBeVisible();
  await page.goto("/parceiros/testemunhos");
  await expect(page.getByText("Direção do FIVAA", { exact: true })).toBeVisible();
});

for (const width of [320, 768, 1024, 1440]) {
  test(`layout and ticket controls at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/inscricao");
    await expect(page.locator("article")).toHaveCount(3);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`tickets-${width}.png`), fullPage: true });
    for (const card of await page.locator("article").all()) {
      await expect(card.locator("a")).toHaveAttribute("href", /^(https:\/\/|mailto:)/);
    }
    if (width < 1280) {
      await page.getByLabel("Menu", { exact: true }).click();
      await page.getByLabel("Abrir submenu Sobre").click();
      await page.getByRole("navigation", { name: "Navegação móvel" }).getByRole("link", { name: "Objetivos" }).click();
      await expect(page).toHaveURL(/\/sobre\/objetivos$/);
      await expect(page.getByRole("navigation", { name: "Navegação móvel" })).not.toBeVisible();
    }
  });
}

test("legacy festival URL redirects to the forum schedule", async ({ request }) => {
  const response = await request.get("/programacao/festival", { maxRedirects: 0 });
  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe("/programacao");
});

test("canonical URLs point to each page and admin rewrites forward the CSP nonce", async ({ request }) => {
  for (const route of ["/inscricao", "/sobre", "/contactos"]) {
    const html = await (await request.get(route)).text();
    expect(html).toContain(`rel="canonical" href="https://fivaaforum.com${route}"`);
  }
  const response = await request.get("/", { headers: { host: "admin.fivaaforum.com" } });
  const nonce = response.headers()["content-security-policy"]?.match(/'nonce-([^']+)'/)?.[1];
  expect(nonce).toBeTruthy();
  expect(await response.text()).toContain(`nonce="${nonce}"`);
});

test("form API rejects malformed submissions without creating records", async ({ request }) => {
  for (const route of ["/api/contact", "/api/registration"]) {
    for (const value of [null, [], { subject: {} }, {}]) {
      const response = await request.post(route, { data: JSON.stringify(value), headers: { "content-type": "application/json" } });
      expect(response.status()).toBe(400);
      expect(await response.json()).toHaveProperty("error");
    }
    const crossOrigin = await request.post(route, { data: {}, headers: { origin: "https://unrelated.example" } });
    expect(crossOrigin.status()).toBe(403);
  }
});

test("contact form displays submission success and service errors", async ({ page }) => {
  await page.goto("/contactos");
  await page.getByRole("button", { name: "Apenas Necessários" }).click();
  await page.route("**/api/contact", route => route.fulfill({ status: 503, json: { error: "Serviço temporariamente indisponível." } }));
  const fill = async () => {
    await page.getByLabel("Nome", { exact: true }).fill("Teste de interface");
    await page.getByLabel("E-mail", { exact: true }).fill("test@example.com");
    await page.getByLabel("Assunto", { exact: true }).fill("Informações de bilhetes");
    await page.getByLabel("Mensagem", { exact: true }).fill("Teste local da interface sem envio real.");
    await page.getByRole("button", { name: "Enviar mensagem de contacto" }).click();
  };
  await fill();
  await expect(page.getByRole("form", { name: "Formulário de contacto" }).getByRole("alert")).toContainText("Serviço temporariamente indisponível");
  await page.unroute("**/api/contact");
  await page.route("**/api/contact", route => route.fulfill({ json: { ok: true } }));
  await page.getByRole("button", { name: "Enviar mensagem de contacto" }).click();
  await expect(page.getByRole("status")).toContainText("Mensagem Enviada!");
});
