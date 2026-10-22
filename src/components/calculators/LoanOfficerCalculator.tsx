"use client";

import { calculateLoanOfficer } from "@/lib/calc/loan-officer";
import { formatCurrency, readMoney, readOptionalMoney, readPercent } from "@/lib/format";
import { TextField } from "@/components/calculator/Fields";
import { CalculatorFrame, ResultPanel } from "@/components/calculator/ResultPanel";
import { useCalculatorFields, useDebounced } from "@/components/calculator/useCalculatorFields";

const defaults = {
  loan: "400000",
  points: "100",
  keep: "50",
  minimum: "",
  maximum: "",
};

export function LoanOfficerCalculator() {
  const state = useCalculatorFields(defaults);
  const [shown, setShown] = useDebounced(state.fields);
  const outcome = compute(shown);
  const live = compute(state.fields);
  return (
    <CalculatorFrame
      onSubmit={() => setShown(state.fields)}
      result={<ResultPanel label="You keep" value={outcome.value} rows={outcome.rows} note={outcome.note} onReset={() => setShown(state.reset())} onCopy={state.flush} />}
    >
      <TextField id="lo-loan" label="Loan amount ($)" value={state.fields.loan ?? ""} onChange={(value) => state.setField("loan", value)} error={live.errors.loan} />
      <TextField id="lo-points" label="Basis points" hint="100 basis points is 1% of the loan amount." value={state.fields.points ?? ""} onChange={(value) => state.setField("points", value)} error={live.errors.points} />
      <TextField id="lo-keep" label="Share you keep (%)" value={state.fields.keep ?? ""} onChange={(value) => state.setField("keep", value)} error={live.errors.keep} />
      <TextField id="lo-min" label="Minimum on this file ($)" hint="Leave blank if the plan has no minimum." value={state.fields.minimum ?? ""} onChange={(value) => state.setField("minimum", value)} error={live.errors.minimum} />
      <TextField id="lo-max" label="Maximum on this file ($)" hint="Leave blank if the plan has no maximum." value={state.fields.maximum ?? ""} onChange={(value) => state.setField("maximum", value)} error={live.errors.maximum} />
    </CalculatorFrame>
  );
}

function compute(fields: Record<string, string>) {
  const loan = readMoney(fields.loan ?? "", "a loan amount");
  const points = readMoney(fields.points ?? "", "basis points");
  const keep = readPercent(fields.keep ?? "", "the share you keep", 100);
  const minimum = readOptionalMoney(fields.minimum ?? "", "a minimum");
  const maximum = readOptionalMoney(fields.maximum ?? "", "a maximum");
  const errors = {
    loan: loan.ok ? undefined : loan.error,
    points: points.ok ? undefined : points.error,
    keep: keep.ok ? undefined : keep.error,
    minimum: minimum.ok ? undefined : minimum.error,
    maximum: maximum.ok ? undefined : maximum.error,
  };
  if (!loan.ok || !points.ok || !keep.ok || !minimum.ok || !maximum.ok) {
    return { value: "—", rows: [], note: errors.loan ?? errors.points ?? errors.keep ?? errors.minimum ?? errors.maximum, errors };
  }
  const result = calculateLoanOfficer({
    loanAmount: loan.value,
    basisPoints: points.value,
    keepPercent: keep.value,
    minimum: minimum.value,
    maximum: maximum.value,
  });
  if (!result.ok) return { value: "—", rows: [], note: result.error, errors };
  return { value: formatCurrency(result.agentNet), rows: result.rows, note: "Basis points here are the ones in the comp plan, not a market average.", errors };
}
