"use client";

import { calculateTiered, defaultTierField, draftsToTiers } from "@/lib/calc/tiered";
import { formatCurrency, readMoney } from "@/lib/format";
import { ChoiceGroup, TextField } from "@/components/calculator/Fields";
import { CalculatorFrame, ResultPanel } from "@/components/calculator/ResultPanel";
import { useCalculatorFields, useDebounced } from "@/components/calculator/useCalculatorFields";
import { TierEditor } from "@/components/calculators/TierEditor";

export const tieredDefaults = {
  sales: "120000",
  method: "marginal",
  tiers: defaultTierField(),
};

export function TieredCalculator({
  values,
  onChange,
  onFlush,
}: {
  values?: Record<string, string>;
  onChange?: (values: Record<string, string>) => void;
  onFlush?: () => void;
}) {
  const state = useCalculatorFields(tieredDefaults, values && onChange ? { values, onChange, onFlush } : undefined);
  const [shown, setShown] = useDebounced(state.fields);
  const outcome = compute(shown);
  const liveSales = readMoney(state.fields.sales ?? "", "a sales amount");
  const other = outcome.other;
  return (
    <CalculatorFrame
      onSubmit={() => setShown(state.fields)}
      result={
        <ResultPanel
          label={shown.method === "retroactive" ? "Retroactive commission" : "Marginal commission"}
          value={outcome.value}
          rows={outcome.rows}
          note={outcome.note ?? other}
          onReset={() => setShown(state.reset())}
          onCopy={state.flush}
        />
      }
    >
      <TextField id="tier-sales" label="Sales amount ($)" value={state.fields.sales ?? ""} onChange={(value) => state.setField("sales", value)} error={liveSales.ok ? undefined : liveSales.error} />
      <ChoiceGroup
        wide
        label="Tier method"
        name="tier-method"
        value={state.fields.method ?? "marginal"}
        onChange={(value) => state.setField("method", value)}
        options={[
          { value: "marginal", label: "Marginal (graduated)", hint: "Each rate applies only to the dollars inside that tier." },
          { value: "retroactive", label: "Retroactive", hint: "The rate of the tier you reach applies to the entire sale." },
        ]}
      />
      <TierEditor idPrefix="tier" value={state.fields.tiers ?? ""} onChange={(value) => state.setField("tiers", value)} />
    </CalculatorFrame>
  );
}

function compute(fields: Record<string, string>) {
  const sales = readMoney(fields.sales ?? "", "a sales amount");
  const parsed = draftsToTiers(
    (fields.tiers ?? "")
      .split("|")
      .filter(Boolean)
      .map((part) => {
        const [from, to, rate] = part.split(":");
        return { from: from ?? "", to: to ?? "", rate: rate ?? "" };
      }),
  );
  if (!sales.ok) return { value: "—", rows: [], note: sales.error, other: undefined };
  if (!parsed.ok) return { value: "—", rows: [], note: parsed.error, other: undefined };
  const method = fields.method === "retroactive" ? "retroactive" : "marginal";
  const result = calculateTiered(sales.value, parsed.tiers, method);
  const alternate = calculateTiered(sales.value, parsed.tiers, method === "marginal" ? "retroactive" : "marginal");
  if (!result.ok) return { value: "—", rows: [], note: result.error, other: undefined };
  const other = alternate.ok
    ? method === "marginal"
      ? `Retroactive on the same tiers would pay ${formatCurrency(alternate.total)}.`
      : `Marginal on the same tiers would pay ${formatCurrency(alternate.total)}.`
    : undefined;
  return { value: formatCurrency(result.total), rows: result.rows, note: undefined, other };
}
