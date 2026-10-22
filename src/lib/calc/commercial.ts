import { formatCurrency, formatPercent, type MoneyRow } from "@/lib/format";
import type { CalcResult } from "@/lib/calc/types";

export interface CommercialSaleInput {
  mode: "sale";
  salePrice: number;
  ratePercent: number;
  listingSharePercent: number;
}

export interface CommercialLeaseInput {
  mode: "lease";
  monthlyRent: number;
  termMonths: number;
  ratePercent: number;
  useSplitRates: boolean;
  earlyRatePercent: number;
  laterRatePercent: number;
}

export type CommercialInput = CommercialSaleInput | CommercialLeaseInput;

export interface CommercialMath {
  total: number;
  listingCommission: number;
  cooperatingCommission: number;
  leaseValue: number;
  earlyCommission: number;
  laterCommission: number;
  rows: MoneyRow[];
}

export function calculateCommercial(input: CommercialInput): CalcResult<CommercialMath> {
  if (input.mode === "sale") return calculateSale(input);
  return calculateLease(input);
}

function calculateSale(input: CommercialSaleInput): CalcResult<CommercialMath> {
  if (input.salePrice < 0 || input.ratePercent < 0 || input.listingSharePercent < 0) {
    return { ok: false, error: "Price, rate, and split cannot be negative." };
  }
  if (input.listingSharePercent > 100) {
    return { ok: false, error: "Listing share cannot exceed 100% of the commission." };
  }
  const total = (input.salePrice * input.ratePercent) / 100;
  const listingCommission = (total * input.listingSharePercent) / 100;
  const cooperatingCommission = total - listingCommission;
  return {
    ok: true,
    total,
    listingCommission,
    cooperatingCommission,
    leaseValue: 0,
    earlyCommission: 0,
    laterCommission: 0,
    rows: [
      {
        label: "Total commission",
        detail: `${formatCurrency(input.salePrice)} × ${formatPercent(input.ratePercent)} = ${formatCurrency(total)}`,
        amount: total,
        emphasize: true,
      },
      {
        label: "Listing side",
        detail: `${formatCurrency(total)} × ${formatPercent(input.listingSharePercent)} = ${formatCurrency(listingCommission)}`,
        amount: listingCommission,
      },
      {
        label: "Cooperating side",
        detail: `${formatCurrency(total)} − ${formatCurrency(listingCommission)} = ${formatCurrency(cooperatingCommission)}`,
        amount: cooperatingCommission,
      },
    ],
  };
}

function calculateLease(input: CommercialLeaseInput): CalcResult<CommercialMath> {
  if (
    input.monthlyRent < 0 ||
    input.termMonths < 0 ||
    input.ratePercent < 0 ||
    input.earlyRatePercent < 0 ||
    input.laterRatePercent < 0
  ) {
    return { ok: false, error: "Rent, term, and rates cannot be negative." };
  }
  const leaseValue = input.monthlyRent * input.termMonths;
  if (!input.useSplitRates) {
    const total = (leaseValue * input.ratePercent) / 100;
    return {
      ok: true,
      total,
      listingCommission: total,
      cooperatingCommission: 0,
      leaseValue,
      earlyCommission: total,
      laterCommission: 0,
      rows: [
        {
          label: "Total lease rent",
          detail: `${formatCurrency(input.monthlyRent)} × ${input.termMonths} months = ${formatCurrency(leaseValue)}`,
          amount: leaseValue,
        },
        {
          label: "Lease commission",
          detail: `${formatCurrency(leaseValue)} × ${formatPercent(input.ratePercent)} = ${formatCurrency(total)}`,
          amount: total,
          emphasize: true,
        },
      ],
    };
  }

  const earlyMonths = Math.min(input.termMonths, 60);
  const laterMonths = Math.max(0, input.termMonths - 60);
  const earlyValue = input.monthlyRent * earlyMonths;
  const laterValue = input.monthlyRent * laterMonths;
  const earlyCommission = (earlyValue * input.earlyRatePercent) / 100;
  const laterCommission = (laterValue * input.laterRatePercent) / 100;
  const total = earlyCommission + laterCommission;
  return {
    ok: true,
    total,
    listingCommission: total,
    cooperatingCommission: 0,
    leaseValue,
    earlyCommission,
    laterCommission,
    rows: [
      {
        label: "Years 1–5 rent",
        detail: `${formatCurrency(input.monthlyRent)} × ${earlyMonths} months = ${formatCurrency(earlyValue)}`,
        amount: earlyValue,
      },
      {
        label: "Years 1–5 commission",
        detail: `${formatCurrency(earlyValue)} × ${formatPercent(input.earlyRatePercent)} = ${formatCurrency(earlyCommission)}`,
        amount: earlyCommission,
      },
      {
        label: "Year 6 and after rent",
        detail: `${formatCurrency(input.monthlyRent)} × ${laterMonths} months = ${formatCurrency(laterValue)}`,
        amount: laterValue,
      },
      {
        label: "Year 6 and after commission",
        detail: `${formatCurrency(laterValue)} × ${formatPercent(input.laterRatePercent)} = ${formatCurrency(laterCommission)}`,
        amount: laterCommission,
      },
      {
        label: "Lease commission",
        detail: `${formatCurrency(earlyCommission)} + ${formatCurrency(laterCommission)} = ${formatCurrency(total)}`,
        amount: total,
        emphasize: true,
      },
    ],
  };
}
