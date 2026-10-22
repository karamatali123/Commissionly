export const SITE_NAME = "Commissionly";
export const LAST_UPDATED_ISO = "2026-10-22";
export const LAST_UPDATED_LABEL = "October 22, 2026";

function readEnv(name: string): string {
  return process.env[name]?.trim() ?? "";
}

export function getSiteUrl(): string {
  const raw = readEnv("NEXT_PUBLIC_SITE_URL") || "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (path === "/") return `${base}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (/\.[a-z0-9]+$/i.test(normalized)) {
    return `${base}${normalized}`;
  }
  return `${base}${normalized.endsWith("/") ? normalized : `${normalized}/`}`;
}

export const CONTACT_EMAIL = readEnv("NEXT_PUBLIC_CONTACT_EMAIL") || "hello@example.com";
export const TEMPLATE_URL = readEnv("NEXT_PUBLIC_TEMPLATE_URL");
export const ADS_ENABLED = readEnv("NEXT_PUBLIC_ADS_ENABLED") === "true";
export const ADSENSE_CLIENT = readEnv("NEXT_PUBLIC_ADSENSE_CLIENT");
export const PLAUSIBLE_DOMAIN = readEnv("NEXT_PUBLIC_PLAUSIBLE_DOMAIN");
export const FORMSPREE_ID = readEnv("NEXT_PUBLIC_FORMSPREE_ID");
export const GSC_VERIFICATION = readEnv("NEXT_PUBLIC_GSC_VERIFICATION");
