"use client";

import { calculateRealEstate, type AgentRole, type AgentSide, type BuyerPayer, type SplitModel } from "@/lib/calc/real-estate";
import { formatCurrency, readMoney, readPercent } from "@/lib/format";
import { ChoiceGroup, TextField } from "@/components/calculator/Fields";
import { CalculatorFrame, ResultPanel } from "@/components/calculator/ResultPanel";
import { useCalculatorFields, useDebounced } from "@/components/calculator/useCalculatorFields";

const shared = {
  price: "450000",
  listingRate: "3",
  buyerRate: "3",
  payer: "seller",
  side: "listing",
  role: "agent",
  referral: "0",
  agentSplit: "70",
  franchise: "0",
  transactionFee: "295",
  closing: "2",
};

export const realEstateDefaults = shared;
export const brokerDefaults = {
  ...shared,
  model: "cap",
  cap: "20000",
  ytd: "18000",
  flat: "500",
};

export function RealEstateCalculator({ variant }: { variant: "standard" | "broker" }) {
  const defaults = variant === "broker" ? brokerDefaults : realEstateDefaults;
  const state = useCalculatorFields(defaults);
  const [shown, setShown] = useDebounced(state.fields);
  const outcome = compute(shown, variant);
  const live = compute(state.fields, variant);
  const payer = state.fields.payer ?? "seller";
  const role = state.fields.role ?? "agent";
  const model = variant === "broker" ? (state.fields.model ?? "percent") : "percent";
  const referring = role === "referral";

  return (
    <CalculatorFrame
      onSubmit={() => setShown(state.fields)}
      result={
        <ResultPanel
          label={(shown.role ?? "agent") === "referral" ? "Referral fee" : "Agent net before taxes"}
          value={outcome.value}
          rows={outcome.rows}
          note={outcome.note}
          onReset={() => setShown(state.reset())}
          onCopy={state.flush}
        />
      }
    >
      <TextField id="re-price" label="Home sale price ($)" value={state.fields.price ?? ""} onChange={(value) => state.setField("price", value)} error={live.errors.price} />
      <div className="flex flex-wrap gap-2">
        {[
          ["300000", "$300,000"],
          ["500000", "$500,000"],
          ["1000000", "$1,000,000"],
        ].map(([value, label]) => (
          <button key={value} type="button" className="inline-flex min-h-11 items-center rounded-full border border-line px-3 text-sm" onClick={() => state.setField("price", value)}>
            {label}
          </button>
        ))}
      </div>
      <TextField id="re-listing" label="Listing agent rate (%)" value={state.fields.listingRate ?? ""} onChange={(value) => state.setField("listingRate", value)} error={live.errors.listingRate} />
      {payer !== "none" ? (
        <TextField id="re-buyer" label="Buyer agent rate (%)" value={state.fields.buyerRate ?? ""} onChange={(value) => state.setField("buyerRate", value)} error={live.errors.buyerRate} />
      ) : null}
      <TextField
        id="re-referral"
        label={referring ? "Referral percent you receive (%)" : "Referral fee (%)"}
        hint={referring ? "For example, 20 means 20% of the side you selected." : undefined}
        value={state.fields.referral ?? ""}
        onChange={(value) => state.setField("referral", value)}
        error={live.errors.referral}
      />
      {referring ? null : (
        <>
          <TextField id="re-franchise" label="Franchise / brokerage fee (%)" value={state.fields.franchise ?? ""} onChange={(value) => state.setField("franchise", value)} error={live.errors.franchise} />
          <TextField id="re-transaction" label="Transaction fee ($)" value={state.fields.transactionFee ?? ""} onChange={(value) => state.setField("transactionFee", value)} error={live.errors.transactionFee} />
        </>
      )}
      <TextField id="re-closing" label="Estimated closing costs (%)" hint="Used only for seller net" value={state.fields.closing ?? ""} onChange={(value) => state.setField("closing", value)} error={live.errors.closing} />
      {!referring && model !== "flat" ? (
        <TextField id="re-split" label="Your broker split (%)" hint="The share you keep, such as 70" value={state.fields.agentSplit ?? ""} onChange={(value) => state.setField("agentSplit", value)} error={live.errors.agentSplit} />
      ) : null}
      <ChoiceGroup
        wide
        label="Who pays the buyer agent"
        name="payer"
        value={payer}
        onChange={(value) => state.setField("payer", value)}
        options={[
          { value: "seller", label: "Seller" },
          { value: "buyer", label: "Buyer" },
          { value: "none", label: "No buyer agent" },
        ]}
      />
      <ChoiceGroup
        wide
        label="Your side"
        name="side"
        value={state.fields.side ?? "listing"}
        onChange={(value) => state.setField("side", value)}
        options={[
          { value: "listing", label: "Listing side" },
          { value: "buyer", label: "Buyer side" },
          { value: "both", label: "Both sides" },
        ]}
      />
      <ChoiceGroup
        wide
        label="Your role"
        name="role"
        value={role}
        onChange={(value) => state.setField("role", value)}
        options={[
          { value: "agent", label: "Selling agent", hint: "Referral comes off your side, then the broker split." },
          { value: "referral", label: "Referring agent", hint: "You receive only the referral percent of the side you selected." },
        ]}
      />
      {variant === "broker" && !referring ? (
        <ChoiceGroup
          wide
          label="Broker split model"
          name="model"
          value={model}
          onChange={(value) => state.setField("model", value)}
          options={[
            { value: "percent", label: "Percentage split", hint: "You keep a fixed percent of every deal." },
            { value: "cap", label: "Percentage until an annual cap", hint: "Broker fees stop once the cap is full." },
            { value: "flat", label: "Flat fee per deal", hint: "The broker takes a dollar amount instead of a percent." },
          ]}
        />
      ) : null}
      {variant === "broker" && !referring && model === "cap" ? (
        <>
          <TextField id="re-cap" label="Annual cap ($)" value={state.fields.cap ?? ""} onChange={(value) => state.setField("cap", value)} error={live.errors.cap} />
          <TextField id="re-ytd" label="Year-to-date paid toward cap ($)" value={state.fields.ytd ?? ""} onChange={(value) => state.setField("ytd", value)} error={live.errors.ytd} />
        </>
      ) : null}
      {variant === "broker" && !referring && model === "flat" ? (
        <TextField id="re-flat" label="Flat broker fee ($)" value={state.fields.flat ?? ""} onChange={(value) => state.setField("flat", value)} error={live.errors.flat} />
      ) : null}
    </CalculatorFrame>
  );
}

function compute(fields: Record<string, string>, variant: "standard" | "broker") {
  const price = readMoney(fields.price ?? "", "a sale price");
  const listingRate = readPercent(fields.listingRate ?? "", "a listing rate", 100);
  const buyerRate = readPercent(fields.buyerRate ?? "", "a buyer agent rate", 100);
  const referral = readPercent(fields.referral ?? "", "a referral fee", 100);
  const franchise = readPercent(fields.franchise ?? "", "a franchise fee", 100);
  const transactionFee = readMoney(fields.transactionFee ?? "", "a transaction fee");
  const closing = readPercent(fields.closing ?? "", "a closing cost percent", 100);
  const agentSplit = readPercent(fields.agentSplit ?? "", "your split", 100);
  const cap = readMoney(fields.cap ?? "0", "an annual cap");
  const ytd = readMoney(fields.ytd ?? "0", "year-to-date cap payments");
  const flat = readMoney(fields.flat ?? "0", "a flat broker fee");
  const errors = {
    price: price.ok ? undefined : price.error,
    listingRate: listingRate.ok ? undefined : listingRate.error,
    buyerRate: buyerRate.ok ? undefined : buyerRate.error,
    referral: referral.ok ? undefined : referral.error,
    franchise: franchise.ok ? undefined : franchise.error,
    transactionFee: transactionFee.ok ? undefined : transactionFee.error,
    closing: closing.ok ? undefined : closing.error,
    agentSplit: agentSplit.ok ? undefined : agentSplit.error,
    cap: cap.ok ? undefined : cap.error,
    ytd: ytd.ok ? undefined : ytd.error,
    flat: flat.ok ? undefined : flat.error,
  };
  const model = (variant === "broker" ? fields.model : "percent") as SplitModel;
  const payer = (fields.payer ?? "seller") as BuyerPayer;
  const ready =
    price.ok &&
    listingRate.ok &&
    (payer === "none" || buyerRate.ok) &&
    referral.ok &&
    franchise.ok &&
    transactionFee.ok &&
    closing.ok &&
    (model === "flat" || agentSplit.ok) &&
    (model !== "cap" || (cap.ok && ytd.ok)) &&
    (model !== "flat" || flat.ok);

  if (!ready) {
    return {
      value: "—",
      rows: [],
      note: errors.price ?? errors.listingRate ?? errors.buyerRate ?? errors.referral ?? "Fix the highlighted fields to update the result.",
      errors,
    };
  }

  const result = calculateRealEstate({
    salePrice: price.value,
    listingRatePercent: listingRate.value,
    buyerRatePercent: buyerRate.ok ? buyerRate.value : 0,
    buyerPayer: payer,
    yourSide: (fields.side === "both" || fields.side === "buyer" ? fields.side : "listing") as AgentSide,
    role: (fields.role === "referral" ? "referral" : "agent") as AgentRole,
    referralFeePercent: referral.value,
    splitModel: model === "cap" || model === "flat" || model === "percent" ? model : "percent",
    agentSplitPercent: agentSplit.ok ? agentSplit.value : 100,
    annualCap: cap.ok ? cap.value : 0,
    ytdTowardCap: ytd.ok ? ytd.value : 0,
    flatBrokerFee: flat.ok ? flat.value : 0,
    franchiseFeePercent: franchise.value,
    transactionFee: transactionFee.value,
    closingCostPercent: closing.value,
  });
  if (!result.ok) return { value: "—", rows: [], note: result.error, errors };
  const deals =
    result.dealsToFillCap === null
      ? ""
      : result.dealsToFillCap === 0
        ? "The cap is already full."
        : result.dealsToFillCap === 1
          ? "One deal at this size fills the remaining cap."
          : `${result.dealsToFillCap} deals at this size fill the remaining cap.`;
  const capNote =
    model === "cap" && fields.role !== "referral"
      ? `This deal counts ${formatCurrency(result.appliedToCap)} toward the cap. ${formatCurrency(result.capRoomAfter)} of cap room remains. ${deals}`
      : undefined;
  const negative = result.agentNet < 0 ? "Fees are larger than the commission on this side." : undefined;
  return { value: formatCurrency(result.agentNet), rows: result.rows, note: [capNote, negative].filter(Boolean).join(" "), errors };
}
