import Image from "next/image";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";
import { CATEGORIES, getInfoPage, publishedKeywords } from "@/data/keywords";
import { pageMetadata } from "@/lib/seo";

const page = getInfoPage("calculators");

export const metadata = pageMetadata(page);

export default function CalculatorsIndexPage() {
  const groups = CATEGORIES.map((category) => ({
    ...category,
    pages: publishedKeywords().filter((item) => item.category === category.id),
  })).filter((group) => group.pages.length > 0);

  return (
    <InfoPage page={page}>
      <p>
        Every calculator on Commissionly is free. The math sits in tested functions, and each page shows the steps under the result. Pick the plan that matches the agreement in front of you.
      </p>
      <ul className="grid gap-4 sm:grid-cols-3">
        <li>
          <Link href="/" className="block overflow-hidden rounded-2xl border border-line">
            <Image src="/images/desk.jpg" alt="" width={1200} height={675} className="h-32 w-full object-cover" />
            <span className="block px-3 py-2 font-semibold">Commission</span>
          </Link>
        </li>
        <li>
          <Link href="/real-estate-commission-calculator/" className="block overflow-hidden rounded-2xl border border-line">
            <Image src="/images/real-estate.jpg" alt="" width={960} height={720} className="h-32 w-full object-cover" />
            <span className="block px-3 py-2 font-semibold">Real estate</span>
          </Link>
        </li>
        <li>
          <Link href="/sales-commission-calculator/" className="block overflow-hidden rounded-2xl border border-line">
            <Image src="/images/sales.jpg" alt="" width={960} height={720} className="h-32 w-full object-cover" />
            <span className="block px-3 py-2 font-semibold">Sales</span>
          </Link>
        </li>
      </ul>
      {groups.map((group) => (
        <section key={group.id} className="mt-8">
          <h2 className="text-2xl font-semibold tracking-tight">{group.label}</h2>
          <ul className="mt-3 space-y-3">
            {group.pages.map((item) => (
              <li key={item.id}>
                <Link href={item.path} className="font-semibold text-accent">
                  {item.h1}
                </Link>
                <p className="text-sm leading-6 text-muted">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </InfoPage>
  );
}
