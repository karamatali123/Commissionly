"use client";

import { calculateCommission, calculateRate, calculateSaleFromCommission } from "@/lib/calc/commission";
import { formatCurrency, readMoney, readPercent, type MoneyRow } from "@/lib/format";
import { TextField } from "@/components/calculator/Fields";
import { CalculatorFrame, ResultPanel } from "@/components/calculator/ResultPanel";
import { useCalculatorFields, useDebounced } from "@/components/calculator/useCalculatorFields";

export const simpleDefaults = {
  sale: "75000",
  rate: "8",
  commission: "6000",
  desired: "6000",
};

export type SimpleMode = "commission" | "reverse" | "rate";

export function CommissionModes({
  mode,
  values,
  onChange,
  onFlush,
}: {
  mode: SimpleMode;
  values?: Record<string, string>;
  onChange?: (values: Record<string, string>) => void;
  onFlush?: () => void;
}) {
  const state = useCalculatorFields(
    simpleDefaults,
    values && onChange ? { values, onChange, onFlush } : undefined,
  );
  const [shown, setShown] = useDebounced(state.fields);
  const outcome = compute(mode, shown);
  const live = compute(mode, state.fields);

  return (
    <CalculatorFrame
      onSubmit={() => setShown(state.fields)}
      result={
        <ResultPanel
          label={outcome.label}
          value={outcome.value}
          rows={outcome.rows}
          note={outcome.note}
          onReset={() => setShown(state.reset())}
          onCopy={state.flush}
        />
      }
    >
      {mode === "rate" ? (
        <TextField
          id="commission-amount"
          label="Commission ($)"
          value={state.fields.commission ?? ""}
          onChange={(next) => state.setField("commission", next)}
          error={live.fieldErrors.commission}
        />
      ) : null}
      {mode === "reverse" ? (
        <TextField
          id="desired-commission"
          label="Desired commission ($)"
          value={state.fields.desired ?? ""}
          onChange={(next) => state.setField("desired", next)}
          error={live.fieldErrors.desired}
        />
      ) : (
        <TextField
          id="sale-amount"
          label="Sale amount ($)"
          value={state.fields.sale ?? ""}
          onChange={(next) => state.setField("sale", next)}
          error={live.fieldErrors.sale}
        />
      )}
      {mode !== "rate" ? (
        <TextField
          id="commission-rate"
          label="Commission rate (%)"
          value={state.fields.rate ?? ""}
          onChange={(next) => state.setField("rate", next)}
          error={live.fieldErrors.rate}
        />
      ) : null}
    </CalculatorFrame>
  );
}

function compute(mode: SimpleMode, fields: Record<string, string>) {
  const sale = readMoney(fields.sale ?? "", "a sale amount");
  const rate = readPercent(fields.rate ?? "", "a commission rate", 100);
  const commission = readMoney(fields.commission ?? "", "a commission");
  const desired = readMoney(fields.desired ?? "", "a desired commission");
  const fieldErrors = {
    sale: sale.ok ? undefined : sale.error,
    rate: rate.ok ? undefined : rate.error,
    commission: commission.ok ? undefined : commission.error,
    desired: desired.ok ? undefined : desired.error,
  };
  let label = "Commission";
  let value = "—";
  let rows: MoneyRow[] = [];
  let note: string | undefined;

  if (mode === "commission") {
    if (sale.ok && rate.ok) {
      const result = calculateCommission(sale.value, rate.value);
      if (result.ok) {
        value = formatCurrency(result.commission);
        rows = result.rows;
      } else note = result.error;
    } else note = fieldErrors.sale ?? fieldErrors.rate;
  } else if (mode === "reverse") {
    label = "Sale amount";
    if (desired.ok && rate.ok) {
      const result = calculateSaleFromCommission(desired.value, rate.value);
      if (result.ok) {
        value = formatCurrency(result.saleAmount);
        rows = result.rows;
      } else note = result.error;
    } else note = fieldErrors.desired ?? fieldErrors.rate;
  } else {
    label = "Commission rate";
    if (commission.ok && sale.ok) {
      const result = calculateRate(commission.value, sale.value);
      if (result.ok) {
        value = result.rows[0]?.display ?? "—";
        rows = result.rows;
      } else note = result.error;
    } else note = fieldErrors.commission ?? fieldErrors.sale;
  }

  return { label, value, rows, note, fieldErrors };
}
