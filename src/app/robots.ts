import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const site = getSiteUrl();
  const hostname = new URL(site).hostname;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site}/sitemap-index.xml`,
    ...(hostname === "localhost" ? {} : { host: hostname }),
  };
}
