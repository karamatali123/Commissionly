import Link from "next/link";

export default function NotFound() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 leading-7">That address is not a Commissionly calculator. Try one of these.</p>
      <ul className="mt-6 space-y-3">
        <li>
          <Link href="/" className="font-semibold text-accent">
            Commission calculator
          </Link>
        </li>
        <li>
          <Link href="/real-estate-commission-calculator/" className="font-semibold text-accent">
            Real estate commission calculator
          </Link>
        </li>
        <li>
          <Link href="/sales-commission-calculator/" className="font-semibold text-accent">
            Sales commission calculator
          </Link>
        </li>
        <li>
          <Link href="/tiered-commission-calculator/" className="font-semibold text-accent">
            Tiered commission calculator
          </Link>
        </li>
        <li>
          <Link href="/calculators/" className="font-semibold text-accent">
            All calculators
          </Link>
        </li>
      </ul>
    </article>
  );
}
