import { LAST_UPDATED_ISO, getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${getSiteUrl()}/sitemap.xml</loc>
    <lastmod>${LAST_UPDATED_ISO}</lastmod>
  </sitemap>
</sitemapindex>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
