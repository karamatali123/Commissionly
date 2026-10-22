import Link from "next/link";
import { relatedKeywords } from "@/data/keywords";

export function RelatedCalculators({ id }: { id: string }) {
  const pages = relatedKeywords(id);
  if (pages.length === 0) return null;
  return (
    <section className="mt-12" aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-2xl font-semibold tracking-tight">
        Related calculators
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {pages.map((page) => (
          <li key={page.id}>
            <Link
              href={page.path}
              className="block min-h-11 rounded-xl border border-line bg-surface px-4 py-3 leading-6 hover:border-accent"
            >
              <span className="font-semibold">{page.navLabel}</span>
              <span className="mt-1 block text-sm text-muted">{page.h1}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
