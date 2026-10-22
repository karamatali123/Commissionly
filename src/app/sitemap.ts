import type { MetadataRoute } from "next";
import { infoPages, publishedKeywords } from "@/data/keywords";
import { absoluteUrl, LAST_UPDATED_ISO } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(LAST_UPDATED_ISO);
  return [
    ...publishedKeywords().map((page) => ({
      url: absoluteUrl(page.path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: page.path === "/" ? 1 : 0.8,
    })),
    ...infoPages.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
