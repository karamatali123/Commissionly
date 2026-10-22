import { formatCurrency, formatPercent, type MoneyRow } from "@/lib/format";
import type { CalcResult } from "@/lib/calc/types";

export type BuyerPayer = "seller" | "buyer" | "none";
export type AgentSide = "listing" | "buyer" | "both";
export type AgentRole = "agent" | "referral";
export type SplitModel = "percent" | "cap" | "flat";

export interface RealEstateInput {
  salePrice: number;
  listingRatePercent: number;
  buyerRatePercent: number;
  buyerPayer: BuyerPayer;
  yourSide: AgentSide;
  role?: AgentRole;
  referralFeePercent: number;
  splitModel: SplitModel;
  agentSplitPercent: number;
  annualCap: number;
  ytdTowardCap: number;
  flatBrokerFee: number;
  franchiseFeePercent: number;
  transactionFee: number;
  closingCostPercent: number;
}

export interface RealEstateMath {
  listingCommission: number;
  buyerCommission: number;
  totalCommission: number;
  yourGross: number;
  referralFee: number;
  afterReferral: number;
  brokerFee: number;
  capRoomBefore: number;
  appliedToCap: number;
  capRoomAfter: number;
  agentAfterSplit: number;
  franchiseFee: number;
  agentNet: number;
  dealsToFillCap: number | null;
  sellerPaidCommission: number;
  closingCosts: number;
  sellerNet: number;
  rows: MoneyRow[];
}

export function calculateRealEstate(input: RealEstateInput): CalcResult<RealEstateMath> {
  const negative = [
    input.salePrice,
    input.listingRatePercent,
    input.buyerRatePercent,
    input.referralFeePercent,
    input.agentSplitPercent,
    input.annualCap,
    input.ytdTowardCap,
    input.flatBrokerFee,
    input.franchiseFeePercent,
    input.transactionFee,
    input.closingCostPercent,
  ].some((value) => value < 0);
  if (negative) return { ok: false, error: "Amounts and rates cannot be negative." };
  if (input.agentSplitPercent > 100 || input.referralFeePercent > 100 || input.franchiseFeePercent > 100) {
    return { ok: false, error: "Referral, split, and franchise percentages cannot exceed 100%." };
  }

  const listingCommission = (input.salePrice * input.listingRatePercent) / 100;
  const buyerCommission =
    input.buyerPayer === "none" ? 0 : (input.salePrice * input.buyerRatePercent) / 100;
  const totalCommission = listingCommission + buyerCommission;
  const yourGross =
    input.yourSide === "both"
      ? listingCommission + buyerCommission
      : input.yourSide === "listing"
        ? listingCommission
        : buyerCommission;
  const referralOnly = input.role === "referral";
  const referralFee = (yourGross * input.referralFeePercent) / 100;
  const afterReferral = referralOnly ? referralFee : yourGross - referralFee;

  let brokerFee = 0;
  let capRoomBefore = 0;
  let appliedToCap = 0;
  let capRoomAfter = 0;
  let dealsToFillCap: number | null = null;
  const nominalBrokerFee = (afterReferral * (100 - input.agentSplitPercent)) / 100;

  if (!referralOnly && input.splitModel === "flat") {
    brokerFee = Math.min(input.flatBrokerFee, afterReferral);
  } else if (!referralOnly && input.splitModel === "cap") {
    capRoomBefore = Math.max(0, input.annualCap - input.ytdTowardCap);
    brokerFee = Math.min(nominalBrokerFee, capRoomBefore);
    appliedToCap = brokerFee;
    capRoomAfter = capRoomBefore - brokerFee;
    dealsToFillCap =
      capRoomBefore <= 0 ? 0 : nominalBrokerFee > 0 ? Math.ceil(capRoomBefore / nominalBrokerFee) : null;
  } else if (!referralOnly) {
    brokerFee = nominalBrokerFee;
  }

  const agentAfterSplit = afterReferral - brokerFee;
  const franchiseFee = referralOnly ? 0 : (agentAfterSplit * input.franchiseFeePercent) / 100;
  const transactionFee = referralOnly ? 0 : input.transactionFee;
  const agentNet = agentAfterSplit - franchiseFee - transactionFee;
  const sellerPaidCommission =
    input.buyerPayer === "seller" ? listingCommission + buyerCommission : listingCommission;
  const closingCosts = (input.salePrice * input.closingCostPercent) / 100;
  const sellerNet = input.salePrice - sellerPaidCommission - closingCosts;

  const rows: MoneyRow[] = [
    {
      label: "Listing-side commission",
      detail: `${formatCurrency(input.salePrice)} × ${formatPercent(input.listingRatePercent)} = ${formatCurrency(listingCommission)}`,
      amount: listingCommission,
    },
    {
      label: "Buyer-side commission",
      detail:
        input.buyerPayer === "none"
          ? "No buyer agent, so this side is $0.00."
          : `${formatCurrency(input.salePrice)} × ${formatPercent(input.buyerRatePercent)} = ${formatCurrency(buyerCommission)}`,
      amount: buyerCommission,
    },
    {
      label: "Total commission",
      detail: `${formatCurrency(listingCommission)} + ${formatCurrency(buyerCommission)} = ${formatCurrency(totalCommission)}`,
      amount: totalCommission,
    },
    {
      label: "Your side before deductions",
      detail: sideDetail(input.yourSide, yourGross),
      amount: yourGross,
    },
    {
      label: "Referral fee",
      detail: `${formatCurrency(yourGross)} × ${formatPercent(input.referralFeePercent)} = ${formatCurrency(referralFee)}`,
      amount: referralFee,
    },
    {
      label: "Broker fee",
      detail:
        input.role === "referral"
          ? "Referral only: this is your fee, and the broker split is not taken out of it."
          : brokerDetail(input, afterReferral, brokerFee, capRoomBefore),
      amount: brokerFee,
    },
    {
      label: "Franchise fee",
      detail: `${formatCurrency(agentAfterSplit)} × ${formatPercent(input.franchiseFeePercent)} = ${formatCurrency(franchiseFee)}`,
      amount: franchiseFee,
    },
    {
      label: "Transaction fee",
      detail: referralOnly
        ? "A referral-only result does not subtract a transaction fee."
        : `Flat transaction fee of ${formatCurrency(input.transactionFee)}.`,
      amount: transactionFee,
    },
    {
      label: "Agent net before taxes",
      detail: referralOnly
        ? `${formatCurrency(yourGross)} × ${formatPercent(input.referralFeePercent)} = ${formatCurrency(agentNet)}`
        : `${formatCurrency(agentAfterSplit)} − ${formatCurrency(franchiseFee)} − ${formatCurrency(transactionFee)} = ${formatCurrency(agentNet)}`,
      amount: agentNet,
      emphasize: true,
    },
    {
      label: "Commission paid by the seller",
      detail:
        input.buyerPayer === "seller"
          ? `Seller pays both sides: ${formatCurrency(sellerPaidCommission)}.`
          : `Seller pays the listing side: ${formatCurrency(sellerPaidCommission)}.`,
      amount: sellerPaidCommission,
    },
    {
      label: "Estimated closing costs",
      detail: `${formatCurrency(input.salePrice)} × ${formatPercent(input.closingCostPercent)} = ${formatCurrency(closingCosts)}`,
      amount: closingCosts,
    },
    {
      label: "Estimated seller net",
      detail: `${formatCurrency(input.salePrice)} − ${formatCurrency(sellerPaidCommission)} − ${formatCurrency(closingCosts)} = ${formatCurrency(sellerNet)}`,
      amount: sellerNet,
    },
  ];

  return {
    ok: true,
    listingCommission,
    buyerCommission,
    totalCommission,
    yourGross,
    referralFee,
    afterReferral,
    brokerFee,
    capRoomBefore,
    appliedToCap,
    capRoomAfter,
    agentAfterSplit,
    franchiseFee,
    agentNet,
    dealsToFillCap,
    sellerPaidCommission,
    closingCosts,
    sellerNet,
    rows,
  };
}

function sideDetail(side: AgentSide, yourGross: number): string {
  if (side === "both") return `You selected both sides: ${formatCurrency(yourGross)}.`;
  return `You selected the ${side} side: ${formatCurrency(yourGross)}.`;
}

function brokerDetail(
  input: RealEstateInput,
  afterReferral: number,
  brokerFee: number,
  capRoomBefore: number,
): string {
  if (input.splitModel === "flat") {
    return `Flat broker fee of ${formatCurrency(input.flatBrokerFee)}, capped at the commission left after referral: ${formatCurrency(brokerFee)}.`;
  }
  const share = 100 - input.agentSplitPercent;
  if (input.splitModel === "cap") {
    return `${formatCurrency(afterReferral)} × ${formatPercent(share)} would be the broker share. Cap room is ${formatCurrency(capRoomBefore)}, so ${formatCurrency(brokerFee)} counts toward the cap.`;
  }
  return `${formatCurrency(afterReferral)} × ${formatPercent(share)} = ${formatCurrency(brokerFee)}. You keep ${formatPercent(input.agentSplitPercent)}.`;
}
