import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  workers: 2,
  timeout: 45_000,
  use: { baseURL: process.env.SITE_TEST_URL || "http://localhost:3000", headless: true, locale: "pt-AO" },
});
