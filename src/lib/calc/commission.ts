import { formatCurrency, formatPercent, type MoneyRow } from "@/lib/format";
import type { CalcResult } from "@/lib/calc/types";

export interface CommissionMath {
  commission: number;
  rows: MoneyRow[];
}

export interface ReverseMath {
  saleAmount: number;
  rows: MoneyRow[];
}

export interface RateMath {
  ratePercent: number;
  rows: MoneyRow[];
}

export function calculateCommission(
  saleAmount: number,
  ratePercent: number,
): CalcResult<CommissionMath> {
  if (saleAmount < 0 || ratePercent < 0) {
    return { ok: false, error: "Sale amount and rate cannot be negative." };
  }
  const commission = (saleAmount * ratePercent) / 100;
  return {
    ok: true,
    commission,
    rows: [
      {
        label: "Commission",
        detail: `${formatCurrency(saleAmount)} × ${formatPercent(ratePercent)} = ${formatCurrency(commission)}`,
        amount: commission,
        emphasize: true,
      },
    ],
  };
}

export function calculateSaleFromCommission(
  commission: number,
  ratePercent: number,
): CalcResult<ReverseMath> {
  if (commission < 0 || ratePercent < 0) {
    return { ok: false, error: "Commission and rate cannot be negative." };
  }
  if (ratePercent === 0) {
    return { ok: false, error: "Enter a rate above 0% to find the sale amount." };
  }
  const saleAmount = (commission * 100) / ratePercent;
  return {
    ok: true,
    saleAmount,
    rows: [
      {
        label: "Sale amount",
        detail: `${formatCurrency(commission)} ÷ ${formatPercent(ratePercent)} = ${formatCurrency(saleAmount)}`,
        amount: saleAmount,
        emphasize: true,
      },
    ],
  };
}

export function calculateRate(commission: number, saleAmount: number): CalcResult<RateMath> {
  if (commission < 0 || saleAmount < 0) {
    return { ok: false, error: "Commission and sale amount cannot be negative." };
  }
  if (saleAmount === 0) {
    return { ok: false, error: "Enter a sale amount above $0 to find the rate." };
  }
  const ratePercent = (commission / saleAmount) * 100;
  return {
    ok: true,
    ratePercent,
    rows: [
      {
        label: "Commission rate",
        detail: `${formatCurrency(commission)} ÷ ${formatCurrency(saleAmount)} × 100 = ${formatPercent(ratePercent)}`,
        amount: ratePercent,
        display: formatPercent(ratePercent),
        emphasize: true,
      },
    ],
  };
}
