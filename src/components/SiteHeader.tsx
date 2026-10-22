import Image from "next/image";
import Link from "next/link";
import { NavDismiss } from "@/components/NavDismiss";
import { headerLinks } from "@/data/keywords";
import { SITE_NAME } from "@/lib/site";

export function SiteHeader() {
  const realEstate = headerLinks("real-estate");
  const sales = headerLinks("sales");
  const insurance = headerLinks("insurance");
  return (
    <header className="border-b border-line bg-surface">
      <NavDismiss />
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <div className="mx-auto max-w-5xl px-4">
        <input id="nav-toggle" type="checkbox" className="nav-check" />
        <div className="site-bar flex items-center justify-between gap-3 py-3">
          <Link href="/" className="flex min-h-11 items-center gap-2 font-semibold tracking-tight">
            <Image src="/images/logo.jpg" alt="" width={40} height={40} className="size-10 rounded-xl" priority />
            {SITE_NAME}
          </Link>
          <label htmlFor="nav-toggle" className="menu-button inline-flex min-h-11 cursor-pointer items-center rounded-lg border border-line px-4 md:hidden">
            Menu
          </label>
        </div>
        <nav className="site-nav gap-1 pb-4 md:pb-0" aria-label="Primary">
          <Link href="/" className="inline-flex min-h-11 items-center rounded-lg px-3">
            Home
          </Link>
          <details className="nav-details" name="site-menu">
            <summary className="inline-flex min-h-11 cursor-pointer items-center rounded-lg px-3">Real estate</summary>
            <div className="nav-panel rounded-xl border border-line bg-surface p-2 shadow-sm">
              {realEstate.map((page) => (
                <Link key={page.id} href={page.path} className="block min-h-11 rounded-lg px-3 py-2 leading-6 hover:bg-accent-soft">
                  {page.navLabel}
                </Link>
              ))}
            </div>
          </details>
          <details className="nav-details" name="site-menu">
            <summary className="inline-flex min-h-11 cursor-pointer items-center rounded-lg px-3">Sales</summary>
            <div className="nav-panel rounded-xl border border-line bg-surface p-2 shadow-sm">
              {sales.map((page) => (
                <Link key={page.id} href={page.path} className="block min-h-11 rounded-lg px-3 py-2 leading-6 hover:bg-accent-soft">
                  {page.navLabel}
                </Link>
              ))}
            </div>
          </details>
          {insurance.length > 0 ? (
            <details className="nav-details" name="site-menu">
              <summary className="inline-flex min-h-11 cursor-pointer items-center rounded-lg px-3">Insurance</summary>
              <div className="nav-panel rounded-xl border border-line bg-surface p-2 shadow-sm">
                {insurance.map((page) => (
                  <Link key={page.id} href={page.path} className="block min-h-11 rounded-lg px-3 py-2 leading-6 hover:bg-accent-soft">
                    {page.navLabel}
                  </Link>
                ))}
              </div>
            </details>
          ) : null}
          <Link href="/calculators/" className="inline-flex min-h-11 items-center rounded-lg px-3">
            All calculators
          </Link>
        </nav>
      </div>
    </header>
  );
}
