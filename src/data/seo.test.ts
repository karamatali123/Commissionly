import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { infoPages, keywordPages, publishedKeywords, relatedKeywords } from "@/data/keywords";
import { activeAffiliates } from "@/data/affiliates";
import { platformFees } from "@/data/platform-fees";
import { calculatorCopy, getCopy } from "@/content/calculators";
import { copyWordSource } from "@/content/types";
import { countWords } from "@/lib/words";

const root = process.cwd();

describe("keyword map", () => {
  it("gives every page a unique title, description, path, and keyword", () => {
    const titles = [...keywordPages.map((page) => page.title), ...infoPages.map((page) => page.title)];
    const descriptions = [
      ...keywordPages.map((page) => page.description),
      ...infoPages.map((page) => page.description),
    ];
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    expect(new Set(keywordPages.map((page) => page.path)).size).toBe(keywordPages.length);
    expect(new Set(keywordPages.map((page) => page.primaryKeyword)).size).toBe(keywordPages.length);
  });

  it("keeps titles and descriptions inside the length limits", () => {
    const pages = [
      ...keywordPages.map((page) => ({ title: page.title, description: page.description, id: page.id })),
      ...infoPages.map((page) => ({ title: page.title, description: page.description, id: page.id })),
    ];
    const problems = pages.flatMap((page) => {
      const issues: string[] = [];
      if (page.title.length < 50 || page.title.length > 60) {
        issues.push(`${page.id} title ${page.title.length}: ${page.title}`);
      }
      if (page.description.length < 140 || page.description.length > 160) {
        issues.push(`${page.id} description ${page.description.length}: ${page.description}`);
      }
      return issues;
    });
    expect(problems).toEqual([]);
  });

  it("puts the primary keyword in the description", () => {
    for (const page of keywordPages) {
      expect(page.description.toLowerCase()).toContain(page.primaryKeyword.toLowerCase());
    }
  });

  it("points related links at published pages", () => {
    for (const page of publishedKeywords()) {
      expect(page.related.length).toBeGreaterThanOrEqual(4);
      expect(page.related.length).toBeLessThanOrEqual(6);
      expect(relatedKeywords(page.id).map((item) => item.id)).toEqual(page.related);
    }
  });

  it("has a page file for every published route", () => {
    const routes = [
      ...publishedKeywords().map((page) => page.path),
      ...infoPages.map((page) => page.path),
    ];
    const missing = routes.filter((route) => {
      const file = route === "/" ? "src/app/page.tsx" : path.join("src/app", route, "page.tsx");
      return !fs.existsSync(path.join(root, file));
    });
    expect(missing).toEqual([]);
  });
});

describe("calculator copy", () => {
  it("stays between 600 and 1200 words and uses 4 to 8 FAQs", () => {
    const problems: string[] = [];
    for (const page of publishedKeywords()) {
      const copy = getCopy(page.id);
      const words = countWords(copyWordSource(copy));
      if (words < 600 || words > 1200) problems.push(`${page.id} has ${words} words`);
      if (copy.faqs.length < 4 || copy.faqs.length > 8) {
        problems.push(`${page.id} has ${copy.faqs.length} FAQs`);
      }
      for (const faq of copy.faqs) {
        const faqWords = countWords(faq.answer);
        if (faqWords < 40 || faqWords > 80) {
          problems.push(`${page.id} FAQ "${faq.question}" has ${faqWords} words`);
        }
      }
      expect(copy.intro.toLowerCase()).toContain(page.primaryKeyword.toLowerCase());
      expect(copy.howTo.heading.toLowerCase()).toContain(
        page.primaryKeyword.split(" ").slice(0, 2).join(" ") === "real estate"
          ? "real estate"
          : page.primaryKeyword.split(" ")[0] === "commission" && page.id !== "home"
            ? "commission"
            : page.id === "home"
              ? "commission"
              : page.primaryKeyword.split(" ").slice(0, 2).join(" "),
      );
    }
    expect(problems).toEqual([]);
  });

  it("only links to published internal paths", () => {
    const live = new Set([
      ...publishedKeywords().map((page) => page.path),
      ...infoPages.map((page) => page.path),
    ]);
    const hrefs = Object.values(calculatorCopy)
      .flatMap((copy) => copyWordSource(copy).match(/\]\((\/[^)]+)\)/g) ?? [])
      .map((href) => href.slice(2, -1));
    const broken = hrefs.filter((href) => !live.has(href.endsWith("/") ? href : `${href}/`));
    expect(broken).toEqual([]);
  });
});

describe("monetization data", () => {
  it("does not publish affiliate links without an https url", () => {
    expect(activeAffiliates([{ name: "Example", href: "http://example.com", description: "x" }])).toEqual([]);
    expect(activeAffiliates()).toEqual([]);
  });

  it("does not ship unverified platform fees", () => {
    for (const fee of platformFees) {
      expect(fee.sourceUrl.startsWith("https://")).toBe(true);
      expect(fee.lastVerified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
