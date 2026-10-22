"use client";

import { calculateTravel } from "@/lib/calc/travel";
import { formatCurrency, readMoney, readPercent } from "@/lib/format";
import { TextField } from "@/components/calculator/Fields";
import { CalculatorFrame, ResultPanel } from "@/components/calculator/ResultPanel";
import { useCalculatorFields, useDebounced } from "@/components/calculator/useCalculatorFields";

const defaults = {
  booking: "4000",
  rate: "10",
  keep: "70",
};

export function TravelCalculator() {
  const state = useCalculatorFields(defaults);
  const [shown, setShown] = useDebounced(state.fields);
  const outcome = compute(shown);
  const live = compute(state.fields);
  return (
    <CalculatorFrame
      onSubmit={() => setShown(state.fields)}
      result={<ResultPanel label="You keep" value={outcome.value} rows={outcome.rows} note={outcome.note} onReset={() => setShown(state.reset())} onCopy={state.flush} />}
    >
      <TextField id="travel-booking" label="Booking amount ($)" value={state.fields.booking ?? ""} onChange={(value) => state.setField("booking", value)} error={live.errors.booking} />
      <TextField id="travel-rate" label="Supplier commission rate (%)" value={state.fields.rate ?? ""} onChange={(value) => state.setField("rate", value)} error={live.errors.rate} />
      <TextField id="travel-keep" label="Share you keep after the host split (%)" hint="70 means you keep 70% of the supplier commission and the host keeps 30%." value={state.fields.keep ?? ""} onChange={(value) => state.setField("keep", value)} error={live.errors.keep} />
    </CalculatorFrame>
  );
}

function compute(fields: Record<string, string>) {
  const booking = readMoney(fields.booking ?? "", "a booking amount");
  const rate = readPercent(fields.rate ?? "", "a commission rate", 100);
  const keep = readPercent(fields.keep ?? "", "the share you keep", 100);
  const errors = {
    booking: booking.ok ? undefined : booking.error,
    rate: rate.ok ? undefined : rate.error,
    keep: keep.ok ? undefined : keep.error,
  };
  if (!booking.ok || !rate.ok || !keep.ok) {
    return { value: "—", rows: [], note: errors.booking ?? errors.rate ?? errors.keep, errors };
  }
  const result = calculateTravel({
    bookingAmount: booking.value,
    commissionRatePercent: rate.value,
    agentKeepPercent: keep.value,
  });
  if (!result.ok) return { value: "—", rows: [], note: result.error, errors };
  return { value: formatCurrency(result.agentNet), rows: result.rows, note: undefined, errors };
}
