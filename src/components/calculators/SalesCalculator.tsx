"use client";

import { calculateSales } from "@/lib/calc/sales";
import { formatCurrency, readMoney, readOptionalMoney, readPercent } from "@/lib/format";
import { TextField } from "@/components/calculator/Fields";
import { CalculatorFrame, ResultPanel } from "@/components/calculator/ResultPanel";
import { useCalculatorFields, useDebounced } from "@/components/calculator/useCalculatorFields";

const defaults = {
  sales: "80000",
  rate: "8",
  quota: "50000",
  accelerator: "1.5",
  draw: "",
};

export function SalesCalculator() {
  const state = useCalculatorFields(defaults);
  const [shown, setShown] = useDebounced(state.fields);
  const outcome = compute(shown);
  const live = compute(state.fields);
  return (
    <CalculatorFrame
      onSubmit={() => setShown(state.fields)}
      result={<ResultPanel label="Commission earned" value={outcome.value} rows={outcome.rows} note={outcome.note} onReset={() => setShown(state.reset())} onCopy={state.flush} />}
    >
      <TextField id="sales-amount" label="Sales amount ($)" value={state.fields.sales ?? ""} onChange={(value) => state.setField("sales", value)} error={live.errors.sales} />
      <TextField id="sales-rate" label="Commission rate (%)" value={state.fields.rate ?? ""} onChange={(value) => state.setField("rate", value)} error={live.errors.rate} />
      <TextField id="sales-quota" label="Quota ($)" hint="Leave blank if the plan has no quota" value={state.fields.quota ?? ""} onChange={(value) => state.setField("quota", value)} error={live.errors.quota} />
      <TextField id="sales-accelerator" label="Accelerator" hint="Multiplier above quota. 1.5 means 1.5 times the rate." value={state.fields.accelerator ?? ""} onChange={(value) => state.setField("accelerator", value)} error={live.errors.accelerator} />
      <TextField id="sales-draw" label="Draw ($)" hint="Optional advance already paid against this commission" value={state.fields.draw ?? ""} onChange={(value) => state.setField("draw", value)} error={live.errors.draw} />
    </CalculatorFrame>
  );
}

function compute(fields: Record<string, string>) {
  const sales = readMoney(fields.sales ?? "", "a sales amount");
  const rate = readPercent(fields.rate ?? "", "a commission rate", 100);
  const quota = readOptionalMoney(fields.quota ?? "", "a quota");
  const accelerator = readMoney(fields.accelerator ?? "", "an accelerator");
  const draw = readOptionalMoney(fields.draw ?? "", "a draw");
  const errors = {
    sales: sales.ok ? undefined : sales.error,
    rate: rate.ok ? undefined : rate.error,
    quota: quota.ok ? undefined : quota.error,
    accelerator: accelerator.ok ? undefined : accelerator.error,
    draw: draw.ok ? undefined : draw.error,
  };
  if (!sales.ok || !rate.ok || !quota.ok || !accelerator.ok || !draw.ok) {
    return { value: "—", rows: [], note: errors.sales ?? errors.rate ?? errors.quota ?? errors.accelerator ?? errors.draw, errors };
  }
  const result = calculateSales({
    salesAmount: sales.value,
    ratePercent: rate.value,
    quota: quota.value,
    accelerator: accelerator.value,
    draw: draw.value,
  });
  if (!result.ok) return { value: "—", rows: [], note: result.error, errors };
  return { value: formatCurrency(result.commission), rows: result.rows, note: undefined, errors };
}
