"use client";

import { calculateSaas } from "@/lib/calc/saas";
import { formatCurrency, readMoney, readOptionalMoney, readPercent } from "@/lib/format";
import { ChoiceGroup, TextField } from "@/components/calculator/Fields";
import { CalculatorFrame, ResultPanel } from "@/components/calculator/ResultPanel";
import { useCalculatorFields, useDebounced } from "@/components/calculator/useCalculatorFields";

const defaults = {
  amount: "120000",
  basis: "annual",
  rate: "10",
  quota: "",
  accelerator: "1",
  term: "12",
};

export function SaasCalculator() {
  const state = useCalculatorFields(defaults);
  const [shown, setShown] = useDebounced(state.fields);
  const outcome = compute(shown);
  const live = compute(state.fields);
  return (
    <CalculatorFrame
      onSubmit={() => setShown(state.fields)}
      result={<ResultPanel label="Paid upfront" value={outcome.value} rows={outcome.rows} note={outcome.note} onReset={() => setShown(state.reset())} onCopy={state.flush} />}
    >
      <TextField id="saas-amount" label="New revenue ($)" value={state.fields.amount ?? ""} onChange={(value) => state.setField("amount", value)} error={live.errors.amount} />
      <ChoiceGroup
        label="This amount is"
        name="saas-basis"
        value={state.fields.basis ?? "annual"}
        onChange={(value) => state.setField("basis", value)}
        options={[
          { value: "annual", label: "Annual" },
          { value: "monthly", label: "Monthly" },
        ]}
      />
      <TextField id="saas-rate" label="Commission rate (%)" value={state.fields.rate ?? ""} onChange={(value) => state.setField("rate", value)} error={live.errors.rate} />
      <TextField id="saas-quota" label="Quota ($)" hint="Leave blank if the plan has no quota. Quota is compared with the annual figure." value={state.fields.quota ?? ""} onChange={(value) => state.setField("quota", value)} error={live.errors.quota} />
      <TextField id="saas-accelerator" label="Accelerator above quota" hint="1 leaves the rate unchanged. 1.5 multiplies the rate on revenue above quota." value={state.fields.accelerator ?? ""} onChange={(value) => state.setField("accelerator", value)} error={live.errors.accelerator} />
      <TextField id="saas-term" label="Payout term (months)" hint="The upfront total is also divided across these months." value={state.fields.term ?? ""} onChange={(value) => state.setField("term", value)} error={live.errors.term} />
    </CalculatorFrame>
  );
}

function compute(fields: Record<string, string>) {
  const amount = readMoney(fields.amount ?? "", "a revenue amount");
  const rate = readPercent(fields.rate ?? "", "a commission rate", 100);
  const quota = readOptionalMoney(fields.quota ?? "", "a quota");
  const accelerator = readMoney(fields.accelerator ?? "", "an accelerator");
  const term = readMoney(fields.term ?? "", "a term in months");
  const errors = {
    amount: amount.ok ? undefined : amount.error,
    rate: rate.ok ? undefined : rate.error,
    quota: quota.ok ? undefined : quota.error,
    accelerator: accelerator.ok ? undefined : accelerator.error,
    term: term.ok ? undefined : term.error,
  };
  if (!amount.ok || !rate.ok || !quota.ok || !accelerator.ok || !term.ok) {
    return { value: "—", rows: [], note: errors.amount ?? errors.rate ?? errors.quota ?? errors.accelerator ?? errors.term, errors };
  }
  const result = calculateSaas({
    amount: amount.value,
    basis: fields.basis === "monthly" ? "monthly" : "annual",
    ratePercent: rate.value,
    quota: quota.value,
    accelerator: accelerator.value,
    termMonths: term.value,
  });
  if (!result.ok) return { value: "—", rows: [], note: result.error, errors };
  return {
    value: formatCurrency(result.commission),
    rows: result.rows,
    note: `Spread over the term, that is ${formatCurrency(result.monthlyPayout)} a month. The total does not change.`,
    errors,
  };
}
