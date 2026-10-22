"use client";

import { calculateCommercial } from "@/lib/calc/commercial";
import { formatCurrency, readMoney, readPercent } from "@/lib/format";
import { ChoiceGroup, TextField } from "@/components/calculator/Fields";
import { CalculatorFrame, ResultPanel } from "@/components/calculator/ResultPanel";
import { useCalculatorFields, useDebounced } from "@/components/calculator/useCalculatorFields";

const defaults = {
  mode: "sale",
  price: "2000000",
  rate: "5",
  listingShare: "60",
  rent: "10000",
  months: "84",
  leaseRate: "6",
  splitRates: "yes",
  earlyRate: "6",
  laterRate: "3",
};

export function CommercialCalculator() {
  const state = useCalculatorFields(defaults);
  const [shown, setShown] = useDebounced(state.fields);
  const outcome = compute(shown);
  const live = compute(state.fields);
  const mode = state.fields.mode ?? "sale";
  const splitRates = state.fields.splitRates === "yes";

  return (
    <CalculatorFrame
      onSubmit={() => setShown(state.fields)}
      result={<ResultPanel label="Commission" value={outcome.value} rows={outcome.rows} note={outcome.note} onReset={() => setShown(state.reset())} onCopy={state.flush} />}
    >
      <ChoiceGroup
        wide
        label="Deal type"
        name="commercial-mode"
        value={mode}
        onChange={(value) => state.setField("mode", value)}
        options={[
          { value: "sale", label: "Sale" },
          { value: "lease", label: "Lease" },
        ]}
      />
      {mode === "sale" ? (
        <>
          <TextField id="co-price" label="Sale price ($)" value={state.fields.price ?? ""} onChange={(value) => state.setField("price", value)} error={live.errors.price} />
          <TextField id="co-rate" label="Commission rate (%)" value={state.fields.rate ?? ""} onChange={(value) => state.setField("rate", value)} error={live.errors.rate} />
          <TextField id="co-share" label="Listing share of the fee (%)" value={state.fields.listingShare ?? ""} onChange={(value) => state.setField("listingShare", value)} error={live.errors.listingShare} />
        </>
      ) : (
        <>
          <TextField id="co-rent" label="Monthly rent ($)" value={state.fields.rent ?? ""} onChange={(value) => state.setField("rent", value)} error={live.errors.rent} />
          <TextField id="co-months" label="Term (months)" value={state.fields.months ?? ""} onChange={(value) => state.setField("months", value)} error={live.errors.months} />
          <ChoiceGroup
            wide
            label="Lease rate"
            name="lease-rate"
            value={state.fields.splitRates ?? "no"}
            onChange={(value) => state.setField("splitRates", value)}
            options={[
              { value: "no", label: "One rate for the whole term" },
              { value: "yes", label: "Different rate after year 5", hint: "The first 60 months use the early rate. Later months use the second rate." },
            ]}
          />
          {splitRates ? (
            <>
              <TextField id="co-early" label="Years 1–5 rate (%)" value={state.fields.earlyRate ?? ""} onChange={(value) => state.setField("earlyRate", value)} error={live.errors.earlyRate} />
              <TextField id="co-later" label="Year 6 and after rate (%)" value={state.fields.laterRate ?? ""} onChange={(value) => state.setField("laterRate", value)} error={live.errors.laterRate} />
            </>
          ) : (
            <TextField id="co-lease-rate" label="Commission rate (%)" value={state.fields.leaseRate ?? ""} onChange={(value) => state.setField("leaseRate", value)} error={live.errors.leaseRate} />
          )}
        </>
      )}
    </CalculatorFrame>
  );
}

function compute(fields: Record<string, string>) {
  const price = readMoney(fields.price ?? "", "a sale price");
  const rate = readPercent(fields.rate ?? "", "a commission rate", 100);
  const listingShare = readPercent(fields.listingShare ?? "", "a listing share", 100);
  const rent = readMoney(fields.rent ?? "", "monthly rent");
  const months = readMoney(fields.months ?? "", "a term in months");
  const leaseRate = readPercent(fields.leaseRate ?? "", "a lease rate", 100);
  const earlyRate = readPercent(fields.earlyRate ?? "", "the years 1–5 rate", 100);
  const laterRate = readPercent(fields.laterRate ?? "", "the later rate", 100);
  const errors = {
    price: price.ok ? undefined : price.error,
    rate: rate.ok ? undefined : rate.error,
    listingShare: listingShare.ok ? undefined : listingShare.error,
    rent: rent.ok ? undefined : rent.error,
    months: months.ok ? undefined : months.error,
    leaseRate: leaseRate.ok ? undefined : leaseRate.error,
    earlyRate: earlyRate.ok ? undefined : earlyRate.error,
    laterRate: laterRate.ok ? undefined : laterRate.error,
  };
  if (fields.mode === "lease") {
    const split = fields.splitRates === "yes";
    if (!rent.ok || !months.ok || (split ? !earlyRate.ok || !laterRate.ok : !leaseRate.ok)) {
      return { value: "—", rows: [], note: errors.rent ?? errors.months ?? "Fix the highlighted fields to update the result.", errors };
    }
    const result = calculateCommercial({
      mode: "lease",
      monthlyRent: rent.value,
      termMonths: months.value,
      ratePercent: leaseRate.ok ? leaseRate.value : 0,
      useSplitRates: split,
      earlyRatePercent: earlyRate.ok ? earlyRate.value : 0,
      laterRatePercent: laterRate.ok ? laterRate.value : 0,
    });
    if (!result.ok) return { value: "—", rows: [], note: result.error, errors };
    return { value: formatCurrency(result.total), rows: result.rows, note: undefined, errors };
  }
  if (!price.ok || !rate.ok || !listingShare.ok) {
    return { value: "—", rows: [], note: errors.price ?? errors.rate ?? errors.listingShare, errors };
  }
  const result = calculateCommercial({
    mode: "sale",
    salePrice: price.value,
    ratePercent: rate.value,
    listingSharePercent: listingShare.value,
  });
  if (!result.ok) return { value: "—", rows: [], note: result.error, errors };
  return { value: formatCurrency(result.total), rows: result.rows, note: undefined, errors };
}
