"use client";

import { calculateSplit } from "@/lib/calc/split";
import { formatCurrency, readMoney, readPercent } from "@/lib/format";
import { ChoiceGroup, TextField } from "@/components/calculator/Fields";
import { CalculatorFrame, ResultPanel } from "@/components/calculator/ResultPanel";
import { useCalculatorFields, useDebounced } from "@/components/calculator/useCalculatorFields";

const defaults = {
  total: "10000",
  mode: "percent",
  names: "Alex|Jordan|Sam",
  shares: "50|30|20",
};

export function SplitCalculator() {
  const state = useCalculatorFields(defaults);
  const [shown, setShown] = useDebounced(state.fields);
  const outcome = compute(shown);
  const people = readPeople(state.fields);
  const mode = state.fields.mode === "fixed" ? "fixed" : "percent";

  function writePeople(next: { name: string; share: string }[]) {
    state.patch({
      names: next.map((person) => person.name).join("|"),
      shares: next.map((person) => person.share).join("|"),
    });
  }

  return (
    <CalculatorFrame
      onSubmit={() => setShown(state.fields)}
      result={<ResultPanel label="Total split" value={outcome.value} rows={outcome.rows} note={outcome.note} onReset={() => setShown(state.reset())} onCopy={state.flush} />}
    >
      <TextField id="split-total" label="Total commission ($)" value={state.fields.total ?? ""} onChange={(value) => state.setField("total", value)} error={outcome.totalError && shown === state.fields ? outcome.totalError : undefined} />
      <ChoiceGroup
        label="Split by"
        name="split-mode"
        value={mode}
        onChange={(value) => state.setField("mode", value)}
        options={[
          { value: "percent", label: "Percentage" },
          { value: "fixed", label: "Fixed amount" },
        ]}
      />
      <div className="grid gap-3 sm:col-span-2">
        {people.map((person, index) => (
          <div key={index} className="grid gap-3 rounded-xl border border-line p-3 sm:grid-cols-[1fr_1fr_auto]">
            <TextField id={`split-name-${index}`} label={`Person ${index + 1} name`} value={person.name} onChange={(value) => writePeople(people.map((row, rowIndex) => (rowIndex === index ? { ...row, name: value } : row)))} />
            <TextField
              id={`split-share-${index}`}
              label={mode === "percent" ? "Share (%)" : "Amount ($)"}
              value={person.share}
              onChange={(value) => writePeople(people.map((row, rowIndex) => (rowIndex === index ? { ...row, share: value } : row)))}
            />
            <div className="flex items-end">
              <button type="button" className="inline-flex min-h-11 items-center rounded-lg border border-line px-3" disabled={people.length <= 2} onClick={() => writePeople(people.filter((_, rowIndex) => rowIndex !== index))}>
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-line px-4"
          disabled={people.length >= 6}
          onClick={() => writePeople([...people, { name: `Person ${people.length + 1}`, share: "" }])}
        >
          Add person
        </button>
      </div>
    </CalculatorFrame>
  );
}

function readPeople(fields: Record<string, string>) {
  const names = (fields.names ?? "").split("|");
  const shares = (fields.shares ?? "").split("|");
  const count = Math.max(names.length, shares.length, 2);
  return Array.from({ length: count }, (_, index) => ({
    name: names[index] ?? "",
    share: shares[index] ?? "",
  }));
}

function compute(fields: Record<string, string>) {
  const total = readMoney(fields.total ?? "", "a total commission");
  const people = readPeople(fields);
  const mode = fields.mode === "fixed" ? "fixed" : "percent";
  if (!total.ok) return { value: "—", rows: [], note: total.error, totalError: total.error };
  if (people.length < 2) return { value: "—", rows: [], note: "Add at least two people.", totalError: undefined };
  if (people.length > 6) return { value: "—", rows: [], note: "This split stops at six people.", totalError: undefined };
  const parsed = people.map((person) => {
    const value = mode === "percent" ? readPercent(person.share, "a share", 100) : readMoney(person.share, "an amount");
    return { name: person.name, value };
  });
  const invalid = parsed.find((person) => !person.value.ok);
  if (invalid && !invalid.value.ok) return { value: "—", rows: [], note: invalid.value.error, totalError: undefined };
  const result = calculateSplit(
    total.value,
    mode,
    parsed.map((person) => ({ name: person.name, value: person.value.ok ? person.value.value : 0 })),
  );
  if (!result.ok) return { value: "—", rows: [], note: result.error, totalError: undefined };
  return { value: formatCurrency(total.value), rows: result.rows, note: undefined, totalError: undefined };
}
