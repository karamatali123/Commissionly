import type { Metadata } from "next";
import { GSC_VERIFICATION, LAST_UPDATED_ISO, SITE_NAME, absoluteUrl } from "@/lib/site";

export interface SeoFields {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}

export function pageMetadata({ title, description, path, index = true }: SeoFields): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true, "max-image-preview": "large" }
      : { index: false, follow: false },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: SITE_NAME,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/icon-512.png"),
        description: "Free commission calculators for sales, real estate, insurance, and related pay plans.",
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        name: SITE_NAME,
        url: absoluteUrl("/"),
        inLanguage: "en-US",
        publisher: { "@id": absoluteUrl("/#organization") },
      },
    ],
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function appSchema(page: { h1: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: page.h1,
    url: absoluteUrl(page.path),
    description: page.description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    inLanguage: "en-US",
    isAccessibleForFree: true,
    dateModified: LAST_UPDATED_ISO,
    publisher: { "@id": absoluteUrl("/#organization") },
    isPartOf: { "@id": absoluteUrl("/#website") },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function calculatorListSchema(pages: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Commission calculators",
    numberOfItems: pages.length,
    itemListElement: pages.map((page, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: page.name,
      url: absoluteUrl(page.path),
    })),
  };
}

export function rootMetadata(): Metadata {
  return {
    metadataBase: new URL(absoluteUrl("/")),
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    category: "finance",
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    verification: GSC_VERIFICATION ? { google: GSC_VERIFICATION } : undefined,
  };
}
