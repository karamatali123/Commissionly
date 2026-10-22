"use client";

import { useState } from "react";
import { formatCurrency, type MoneyRow } from "@/lib/format";

export function ResultPanel({
  label,
  value,
  rows,
  note,
  onReset,
  onCopy,
}: {
  label: string;
  value: string;
  rows: MoneyRow[];
  note?: string;
  onReset: () => void;
  onCopy: () => void;
}) {
  const [copyState, setCopyState] = useState<"idle" | "done" | "failed">("idle");

  async function copy() {
    onCopy();
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyState("done");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div tabIndex={-1} data-result className="rounded-xl bg-accent-soft p-4 outline-none" aria-live="polite">
        <p className="text-sm font-medium text-muted">{label}</p>
        <p key={value} className="result-value mt-1 text-4xl font-semibold tracking-tight text-result tabular-nums">
          {value}
        </p>
        {note ? <p className="mt-2 text-sm leading-6">{note}</p> : null}
      </div>
      {rows.length > 0 ? (
        <div className="mt-4">
          <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">Step by step</h2>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-6">
            {rows.map((row) => (
              <li key={row.label}>{row.detail}</li>
            ))}
          </ol>
          <table className="mt-4 w-full text-sm">
            <caption className="sr-only">Calculation breakdown</caption>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row.label}-row`} className="border-t border-line">
                  <th scope="row" className={`py-2 pr-3 text-left font-medium ${row.emphasize ? "text-result" : ""}`}>
                    {row.label}
                  </th>
                  <td className={`py-2 text-right tabular-nums ${row.emphasize ? "font-semibold text-result" : ""}`}>
                    {row.display ?? formatCurrency(row.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="submit" className="inline-flex min-h-11 items-center rounded-lg bg-accent px-4 font-semibold text-accent-ink">
          Calculate
        </button>
        <button type="button" className="inline-flex min-h-11 items-center rounded-lg border border-line px-4" onClick={onReset}>
          Reset
        </button>
        <button type="button" className="inline-flex min-h-11 items-center rounded-lg border border-line px-4" onClick={copy}>
          Copy link
        </button>
      </div>
      {copyState === "done" ? <p className="result-value mt-2 text-sm">Link copied.</p> : null}
      {copyState === "failed" ? (
        <p className="mt-2 text-sm text-danger" role="alert">
          Copy failed. Select the address bar and copy it manually.
        </p>
      ) : null}
    </div>
  );
}

export function CalculatorFrame({
  children,
  result,
  onSubmit,
}: {
  children: React.ReactNode;
  result: React.ReactNode;
  onSubmit: () => void;
}) {
  return (
    <form
      className="calc-enter mt-6 overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow)]"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
        const live = event.currentTarget.querySelector<HTMLElement>("[data-result]");
        live?.focus();
      }}
      noValidate
    >
      <div className="grid lg:grid-cols-2">
        <div className="grid gap-4 border-b border-line p-4 sm:grid-cols-2 sm:p-6 lg:border-r lg:border-b-0">{children}</div>
        <div className="p-4 sm:p-6 lg:sticky lg:top-4 lg:self-start">{result}</div>
      </div>
    </form>
  );
}
