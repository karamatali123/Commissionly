import { TEMPLATE_URL } from "@/lib/site";

export function TemplateCta() {
  return (
    <section className="mt-10 rounded-2xl border border-line bg-accent-soft px-5 py-6">
      <h2 className="text-xl font-semibold tracking-tight">Commission spreadsheet template</h2>
      <p className="mt-2 max-w-2xl leading-7">
        Take the same formulas into Excel or Google Sheets when you want a commission calculator spreadsheet or a commission calculator for Excel beside a pipeline. The sheet is the paid template. This page stays free.
      </p>
      {TEMPLATE_URL ? (
        <a
          href={TEMPLATE_URL}
          className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-accent px-4 font-semibold text-accent-ink"
          rel="sponsored nofollow noopener noreferrer"
        >
          Download the Excel / Google Sheets template
        </a>
      ) : null}
    </section>
  );
}
