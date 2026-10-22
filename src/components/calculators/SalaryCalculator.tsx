"use client";

import { calculateSalary, type DrawType, type PayFrequency, type SalesBasis } from "@/lib/calc/salary";
import { defaultTierField, draftsToTiers } from "@/lib/calc/tiered";
import { formatCurrency, readMoney, readPercent } from "@/lib/format";
import { ChoiceGroup, SelectField, TextField } from "@/components/calculator/Fields";
import { CalculatorFrame, ResultPanel } from "@/components/calculator/ResultPanel";
import { useCalculatorFields, useDebounced } from "@/components/calculator/useCalculatorFields";
import { TierEditor } from "@/components/calculators/TierEditor";

export const salaryDefaults = {
  base: "48000",
  frequency: "monthly",
  basis: "period",
  sales: "20000",
  comp: "flat",
  rate: "8",
  tiers: defaultTierField(),
  draw: "0",
  drawType: "none",
};

const frequencies = [
  { value: "weekly", label: "Weekly (52 paychecks)" },
  { value: "biweekly", label: "Biweekly (26 paychecks)" },
  { value: "semimonthly", label: "Semi-monthly (24 paychecks)" },
  { value: "monthly", label: "Monthly (12 paychecks)" },
];

export function SalaryCalculator({
  values,
  onChange,
  onFlush,
}: {
  values?: Record<string, string>;
  onChange?: (values: Record<string, string>) => void;
  onFlush?: () => void;
}) {
  const state = useCalculatorFields(salaryDefaults, values && onChange ? { values, onChange, onFlush } : undefined);
  const [shown, setShown] = useDebounced(state.fields);
  const outcome = compute(shown);
  const live = compute(state.fields);
  const tiered = state.fields.comp === "tiered";
  return (
    <CalculatorFrame
      onSubmit={() => setShown(state.fields)}
      result={<ResultPanel label="Gross this paycheck" value={outcome.value} rows={outcome.rows} note={outcome.note} onReset={() => setShown(state.reset())} onCopy={state.flush} />}
    >
      <TextField id="salary-base" label="Annual base salary ($)" value={state.fields.base ?? ""} onChange={(value) => state.setField("base", value)} error={live.errors.base} />
      <SelectField id="salary-frequency" label="Pay frequency" value={state.fields.frequency ?? "monthly"} onChange={(value) => state.setField("frequency", value)} options={frequencies} />
      <TextField id="salary-sales" label="Expected sales ($)" value={state.fields.sales ?? ""} onChange={(value) => state.setField("sales", value)} error={live.errors.sales} />
      <ChoiceGroup
        label="Sales figure is"
        name="sales-basis"
        value={state.fields.basis ?? "period"}
        onChange={(value) => state.setField("basis", value)}
        options={[
          { value: "period", label: "Per paycheck" },
          { value: "year", label: "Per year" },
        ]}
      />
      <ChoiceGroup
        wide
        label="Commission plan"
        name="salary-comp"
        value={state.fields.comp ?? "flat"}
        onChange={(value) => state.setField("comp", value)}
        options={[
          { value: "flat", label: "Flat rate" },
          { value: "tiered", label: "Marginal tiers", hint: "Tiers apply to the sales figure you entered, not to a different period." },
        ]}
      />
      {tiered ? (
        <TierEditor idPrefix="salary-tier" value={state.fields.tiers ?? ""} onChange={(value) => state.setField("tiers", value)} />
      ) : (
        <TextField id="salary-rate" label="Commission rate (%)" value={state.fields.rate ?? ""} onChange={(value) => state.setField("rate", value)} error={live.errors.rate} />
      )}
      <TextField id="salary-draw" label="Draw per paycheck ($)" value={state.fields.draw ?? ""} onChange={(value) => state.setField("draw", value)} error={live.errors.draw} />
      <ChoiceGroup
        wide
        label="Draw"
        name="draw-type"
        value={state.fields.drawType ?? "none"}
        onChange={(value) => state.setField("drawType", value)}
        options={[
          { value: "none", label: "No draw" },
          { value: "recoverable", label: "Recoverable", hint: "A shortfall remains as a balance." },
          { value: "nonrecoverable", label: "Non-recoverable", hint: "The draw is kept even when commission is lower." },
        ]}
      />
    </CalculatorFrame>
  );
}

function compute(fields: Record<string, string>) {
  const base = readMoney(fields.base ?? "", "a base salary");
  const sales = readMoney(fields.sales ?? "", "expected sales");
  const rate = readPercent(fields.rate ?? "", "a commission rate", 100);
  const draw = readMoney(fields.draw ?? "", "a draw");
  const parsed = draftsToTiers(
    (fields.tiers ?? "")
      .split("|")
      .filter(Boolean)
      .map((part) => {
        const [from, to, ratePart] = part.split(":");
        return { from: from ?? "", to: to ?? "", rate: ratePart ?? "" };
      }),
  );
  const errors = {
    base: base.ok ? undefined : base.error,
    sales: sales.ok ? undefined : sales.error,
    rate: rate.ok ? undefined : rate.error,
    draw: draw.ok ? undefined : draw.error,
  };
  const tiered = fields.comp === "tiered";
  if (!base.ok || !sales.ok || !draw.ok || (!tiered && !rate.ok) || (tiered && !parsed.ok)) {
    return {
      value: "—",
      rows: [],
      note: errors.base ?? errors.sales ?? errors.draw ?? errors.rate ?? (parsed.ok ? undefined : parsed.error),
      errors,
    };
  }
  const frequency = (fields.frequency ?? "monthly") as PayFrequency;
  const result = calculateSalary({
    annualBase: base.value,
    frequency,
    basis: (fields.basis ?? "period") as SalesBasis,
    sales: sales.value,
    commissionMode: tiered ? "tiered" : "flat",
    ratePercent: rate.ok ? rate.value : 0,
    tiers: parsed.ok ? parsed.tiers : [],
    draw: draw.value,
    drawType: (fields.drawType ?? "none") as DrawType,
  });
  if (!result.ok) return { value: "—", rows: [], note: result.error, errors };
  return {
    value: formatCurrency(result.grossPerPeriod),
    rows: result.rows,
    note: `On-target earnings are ${formatCurrency(result.ote)}. That is base plus commission, before a draw changes one paycheck.`,
    errors,
  };
}
