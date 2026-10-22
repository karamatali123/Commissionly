"use client";

import { calculateLifeInsurance } from "@/lib/calc/life-insurance";
import { formatCurrency, readMoney, readPercent } from "@/lib/format";
import { TextField } from "@/components/calculator/Fields";
import { CalculatorFrame, ResultPanel } from "@/components/calculator/ResultPanel";
import { useCalculatorFields, useDebounced } from "@/components/calculator/useCalculatorFields";

const defaults = {
  premium: "2000",
  firstYear: "50",
  renewal: "5",
  years: "5",
};

export function LifeInsuranceCalculator() {
  const state = useCalculatorFields(defaults);
  const [shown, setShown] = useDebounced(state.fields);
  const outcome = compute(shown);
  const live = compute(state.fields);
  return (
    <CalculatorFrame
      onSubmit={() => setShown(state.fields)}
      result={<ResultPanel label="Total commission" value={outcome.value} rows={outcome.rows} note={outcome.note} onReset={() => setShown(state.reset())} onCopy={state.flush} />}
    >
      <TextField id="life-premium" label="Annual premium ($)" value={state.fields.premium ?? ""} onChange={(value) => state.setField("premium", value)} error={live.errors.premium} />
      <TextField id="life-first" label="First-year commission rate (%)" value={state.fields.firstYear ?? ""} onChange={(value) => state.setField("firstYear", value)} error={live.errors.firstYear} />
      <TextField id="life-renewal" label="Renewal commission rate (%)" hint="Applied to the same premium in each year after the first." value={state.fields.renewal ?? ""} onChange={(value) => state.setField("renewal", value)} error={live.errors.renewal} />
      <TextField id="life-years" label="Years" value={state.fields.years ?? ""} onChange={(value) => state.setField("years", value)} error={live.errors.years} />
    </CalculatorFrame>
  );
}

function compute(fields: Record<string, string>) {
  const premium = readMoney(fields.premium ?? "", "a premium");
  const firstYear = readPercent(fields.firstYear ?? "", "a first-year rate", 100);
  const renewal = readPercent(fields.renewal ?? "", "a renewal rate", 100);
  const years = readMoney(fields.years ?? "", "a number of years");
  const errors = {
    premium: premium.ok ? undefined : premium.error,
    firstYear: firstYear.ok ? undefined : firstYear.error,
    renewal: renewal.ok ? undefined : renewal.error,
    years: years.ok ? undefined : years.error,
  };
  if (!premium.ok || !firstYear.ok || !renewal.ok || !years.ok) {
    return { value: "—", rows: [], note: errors.premium ?? errors.firstYear ?? errors.renewal ?? errors.years, errors };
  }
  const result = calculateLifeInsurance({
    premium: premium.value,
    firstYearRatePercent: firstYear.value,
    renewalRatePercent: renewal.value,
    years: years.value,
  });
  if (!result.ok) return { value: "—", rows: [], note: result.error, errors };
  return {
    value: formatCurrency(result.total),
    rows: result.rows,
    note: "The same premium is used every year. These rates are whatever the contract says, including for other insurance lines.",
    errors,
  };
}
