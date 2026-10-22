import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { infoBreadcrumbs, type InfoPage as InfoPageData } from "@/data/keywords";
import { breadcrumbSchema } from "@/lib/seo";
import { LAST_UPDATED_LABEL } from "@/lib/site";

export function InfoPage({
  page,
  children,
}: {
  page: InfoPageData;
  children: React.ReactNode;
}) {
  const crumbs = infoBreadcrumbs(page);
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8">
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{page.h1}</h1>
      <div className="mt-6 space-y-4 leading-7">{children}</div>
      <p className="mt-10 text-sm text-muted">Last updated {LAST_UPDATED_LABEL}.</p>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </article>
  );
}
