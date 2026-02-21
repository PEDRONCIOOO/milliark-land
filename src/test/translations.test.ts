import { describe, it, expect } from "vitest";
import en from "../../messages/en.json";
import ptBR from "../../messages/pt-BR.json";
import es from "../../messages/es.json";

function getKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  const keys: string[] = [];
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      keys.push(...getKeys(obj[key] as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys.sort();
}

describe("Translation files", () => {
  const enKeys = getKeys(en);
  const ptBRKeys = getKeys(ptBR);
  const esKeys = getKeys(es);

  it("en.json has translation keys", () => {
    expect(enKeys.length).toBeGreaterThan(0);
  });

  it("pt-BR.json has the same keys as en.json", () => {
    const missingInPtBR = enKeys.filter((k) => !ptBRKeys.includes(k));
    const extraInPtBR = ptBRKeys.filter((k) => !enKeys.includes(k));
    expect(missingInPtBR).toEqual([]);
    expect(extraInPtBR).toEqual([]);
  });

  it("es.json has the same keys as en.json", () => {
    const missingInEs = enKeys.filter((k) => !esKeys.includes(k));
    const extraInEs = esKeys.filter((k) => !enKeys.includes(k));
    expect(missingInEs).toEqual([]);
    expect(extraInEs).toEqual([]);
  });

  it("no translation value is empty string", () => {
    const checkEmpty = (obj: Record<string, unknown>, file: string, prefix = "") => {
      for (const key of Object.keys(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === "object" && obj[key] !== null) {
          checkEmpty(obj[key] as Record<string, unknown>, file, fullKey);
        } else {
          expect(obj[key], `${file}:${fullKey} is empty`).not.toBe("");
        }
      }
    };
    checkEmpty(en, "en.json");
    checkEmpty(ptBR, "pt-BR.json");
    checkEmpty(es, "es.json");
  });

  it("all namespaces present in en.json", () => {
    const expectedNamespaces = [
      "metadata",
      "nav",
      "buttons",
      "hero",
      "logoTicker",
      "features",
      "testimonials",
      "team",
      "cta",
      "headquarters",
      "footer",
      "notFound",
      "blog",
      "pages",
    ];
    for (const ns of expectedNamespaces) {
      expect(en).toHaveProperty(ns);
    }
  });
});
