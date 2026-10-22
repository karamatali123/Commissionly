import Image from "next/image";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateBlock } from "@/components/AffiliateBlock";
import { AuthorReview } from "@/components/AuthorReview";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { RichText } from "@/components/RichText";
import { TemplateCta } from "@/components/TemplateCta";
import type { CalculatorCopy, CopyTable } from "@/content/types";
import { breadcrumbsFor, type KeywordPage } from "@/data/keywords";
import { appSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { LAST_UPDATED_LABEL } from "@/lib/site";

const visuals: Record<string, { src: string; alt: string; width: number; height: number }> = {
  home: {
    src: "/images/desk.jpg",
    alt: "A cream desk with a blank worksheet, a green pen, a stack of coins, and a house key.",
    width: 1200,
    height: 675,
  },
  "real-estate": {
    src: "/images/real-estate.jpg",
    alt: "A forest-green front door with a brass key resting on an envelope on the porch.",
    width: 960,
    height: 720,
  },
  sales: {
    src: "/images/sales.jpg",
    alt: "An open notebook with a rising green bar chart beside a cup of coffee.",
    width: 960,
    height: 720,
  },
};

export function CalculatorPage({
  page,
  copy,
  children,
}: {
  page: KeywordPage;
  copy: CalculatorCopy;
  children: React.ReactNode;
}) {
  const crumbs = breadcrumbsFor(page.id);
  const visual = visuals[page.id];
  return (
    <article className="mx-auto w-full max-w-5xl px-4 py-8">
      {page.path !== "/" ? <Breadcrumbs items={crumbs} /> : null}
      <header className={`grid items-center gap-6 ${visual ? "md:grid-cols-[minmax(0,1fr)_18rem]" : ""} ${page.path === "/" ? "" : "mt-4"}`}>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{page.h1}</h1>
          <p className="mt-3 max-w-3xl text-lg leading-7">{copy.intro}</p>
        </div>
        {visual ? (
          <figure className="overflow-hidden rounded-2xl border border-line">
            <Image
              src={visual.src}
              alt={visual.alt}
              width={visual.width}
              height={visual.height}
              className="h-44 w-full object-cover sm:h-52 md:h-48"
              priority={page.id === "home"}
            />
          </figure>
        ) : null}
      </header>
      {children}
      <AdSlot />
      <Section heading={copy.howTo.heading} paragraphs={copy.howTo.paragraphs} />
      <div className="mt-6">
        <h3 className="text-xl font-semibold">{copy.example.heading}</h3>
        {copy.example.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-3 leading-7">
            <RichText text={paragraph} />
          </p>
        ))}
      </div>
      <Section heading={copy.industry.heading} paragraphs={copy.industry.paragraphs} table={copy.industry.table} />
      {copy.template ? <TemplateCta /> : null}
      {copy.affiliate ? <AffiliateBlock /> : null}
      <FAQ items={copy.faqs} />
      <RelatedCalculators id={page.id} />
      <section className="mt-12 border-t border-line pt-6">
        <h2 className="text-2xl font-semibold tracking-tight">About this calculator</h2>
        <p className="mt-3 leading-7">
          <RichText text={copy.about} />
        </p>
        <p className="mt-3 text-sm text-muted">Last updated {LAST_UPDATED_LABEL}.</p>
      </section>
      <AuthorReview notes={copy.reviewNotes} />
      <JsonLd data={appSchema({ h1: page.h1, description: page.description, path: page.path })} />
      {page.path !== "/" ? <JsonLd data={breadcrumbSchema(crumbs)} /> : null}
      <JsonLd data={faqSchema(copy.faqs)} />
    </article>
  );
}

function Section({
  heading,
  paragraphs,
  table,
}: {
  heading: string;
  paragraphs: string[];
  table?: CopyTable;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="mt-3 leading-7">
          <RichText text={paragraph} />
        </p>
      ))}
      {table ? (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[18rem] text-left text-sm">
            <caption className="mb-2 text-left text-sm text-muted">{table.caption}</caption>
            <thead>
              <tr className="border-b border-line">
                {table.headers.map((header) => (
                  <th key={header} scope="col" className="py-2 pr-3 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={row.join("|")} className="border-b border-line">
                  {row.map((cell, index) => (
                    <td key={`${index}-${cell}`} className="py-2 pr-3 align-top">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}
