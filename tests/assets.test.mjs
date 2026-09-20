import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, existsSync } from "node:fs";

test("local image references point to existing assets", () => {
  const missing = [];
  for (const file of readdirSync("src", { recursive: true, encoding: "utf8" }).filter(file => /\.(tsx?|css)$/.test(file))) {
    const source = readFileSync(`src/${file}`, "utf8");
    for (const match of source.matchAll(/["'`]((?:\/images\/)[^"'`$]+\.(?:png|webp|jpe?g|svg))["'`]/g)) {
      if (!existsSync(`public${match[1]}`)) missing.push(`${file}: ${match[1]}`);
    }
  }
  assert.deepEqual(missing, []);
});
