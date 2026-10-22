import Link from "next/link";
import { footerGroups, infoPages } from "@/data/keywords";
import { SITE_NAME } from "@/lib/site";

const legal = infoPages.filter((page) => page.id !== "calculators");

export function SiteFooter() {
  const groups = footerGroups();
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <div key={group.label}>
            <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">{group.label}</h2>
            <ul className="mt-3 space-y-2">
              {group.pages.map((page) => (
                <li key={page.id}>
                  <Link href={page.path} className="inline-flex min-h-11 items-center underline-offset-2 hover:underline">
                    {page.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">Company</h2>
          <ul className="mt-3 space-y-2">
            {legal.map((page) => (
              <li key={page.id}>
                <Link href={page.path} className="inline-flex min-h-11 items-center underline-offset-2 hover:underline">
                  {page.h1}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mx-auto max-w-5xl px-4 pb-8 text-sm leading-6 text-muted">
        {SITE_NAME} estimates are not financial, tax, legal, or brokerage advice.
      </p>
    </footer>
  );
}
