import { test } from "node:test";
import assert from "node:assert/strict";
import { commonTranslations } from "../src/lib/i18n/sections/common.ts";
import { homeTranslations } from "../src/lib/i18n/sections/home.ts";
import { oradoresTranslations } from "../src/lib/i18n/sections/oradores.ts";
import { formsTranslations } from "../src/lib/i18n/sections/forms.ts";
import { contactosTranslations } from "../src/lib/i18n/sections/contactos.ts";
import { programacaoTranslations } from "../src/lib/i18n/sections/programacao.ts";

const sections = { common: commonTranslations, home: homeTranslations, oradores: oradoresTranslations, forms: formsTranslations, contactos: contactosTranslations, programacao: programacaoTranslations };

function leafPaths(value, prefix = "") {
  if (Array.isArray(value)) return value.flatMap((v, i) => leafPaths(v, `${prefix}[${i}]`));
  if (value && typeof value === "object" && value !== null) {
    return Object.keys(value)
      .sort()
      .flatMap((k) => leafPaths(value[k], prefix ? `${prefix}.${k}` : k));
  }
  return [prefix];
}

function leafValues(value, out = []) {
  if (Array.isArray(value)) value.forEach((v) => leafValues(v, out));
  else if (value && typeof value === "object" && value !== null) Object.values(value).forEach((v) => leafValues(v, out));
  else out.push(value);
  return out;
}

test("section dictionaries have identical keys in pt/en/fr", () => {
  for (const [name, dict] of Object.entries(sections)) {
    assert.deepEqual(leafPaths(dict.en), leafPaths(dict.pt), `${name}.en key mismatch`);
    assert.deepEqual(leafPaths(dict.fr), leafPaths(dict.pt), `${name}.fr key mismatch`);
  }
});

test("section dictionaries have no empty strings", () => {
  for (const [name, dict] of Object.entries(sections)) {
    for (const lang of ["pt", "en", "fr"]) {
      for (const value of leafValues(dict[lang])) {
        assert.equal(typeof value, "string", `${name}.${lang} has non-string leaf`);
        assert.ok(value.trim().length > 0, `${name}.${lang} has empty string`);
      }
    }
  }
});
