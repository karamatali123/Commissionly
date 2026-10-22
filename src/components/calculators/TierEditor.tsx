"use client";

import { decodeTiers, encodeTiers, type TierDraft } from "@/lib/calc/tiered";
import { TextField } from "@/components/calculator/Fields";

export function TierEditor({
  idPrefix,
  value,
  onChange,
}: {
  idPrefix: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const drafts = decodeTiers(value);
  if (!drafts) {
    return (
      <p className="text-sm text-danger sm:col-span-2" role="alert">
        These tiers could not be read. Reset the calculator to restore the example tiers.
      </p>
    );
  }

  function update(next: TierDraft[]) {
    onChange(encodeTiers(next));
  }

  return (
    <div className="grid gap-3 sm:col-span-2">
      {drafts.map((draft, index) => (
        <fieldset key={`${idPrefix}-${index}`} className="grid gap-3 rounded-xl border border-line p-3 sm:grid-cols-4">
          <legend className="px-1 text-sm font-medium">Tier {index + 1}</legend>
          <TextField id={`${idPrefix}-from-${index}`} label="From ($)" value={draft.from} onChange={(next) => update(drafts.map((row, rowIndex) => (rowIndex === index ? { ...row, from: next } : row)))} />
          <TextField id={`${idPrefix}-to-${index}`} label="To ($)" hint="Blank means no limit" value={draft.to} onChange={(next) => update(drafts.map((row, rowIndex) => (rowIndex === index ? { ...row, to: next } : row)))} />
          <TextField id={`${idPrefix}-rate-${index}`} label="Rate (%)" value={draft.rate} onChange={(next) => update(drafts.map((row, rowIndex) => (rowIndex === index ? { ...row, rate: next } : row)))} />
          <div className="flex items-end">
            <button
              type="button"
              className="inline-flex min-h-11 items-center rounded-lg border border-line px-3"
              onClick={() => update(drafts.filter((_, rowIndex) => rowIndex !== index))}
              disabled={drafts.length === 1}
            >
              Remove
            </button>
          </div>
        </fieldset>
      ))}
      <button
        type="button"
        className="inline-flex min-h-11 items-center justify-center rounded-lg border border-line px-4"
        onClick={() => {
          const last = drafts[drafts.length - 1];
          update([...drafts, { from: last?.to || "", to: "", rate: "" }]);
        }}
      >
        Add tier
      </button>
    </div>
  );
}
