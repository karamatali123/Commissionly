import { formatCurrency, formatPercent, type MoneyRow } from "@/lib/format";
import type { CalcResult } from "@/lib/calc/types";

export interface SaasInput {
  amount: number;
  basis: "annual" | "monthly";
  ratePercent: number;
  quota: number | null;
  accelerator: number;
  termMonths: number;
}

export interface SaasMath {
  annualized: number;
  commission: number;
  monthlyPayout: number;
  rows: MoneyRow[];
}

export function calculateSaas(input: SaasInput): CalcResult<SaasMath> {
  if (input.amount < 0 || input.ratePercent < 0 || input.accelerator < 0 || input.termMonths < 0) {
    return { ok: false, error: "Amount, rate, accelerator, and term cannot be negative." };
  }
  if (input.quota !== null && input.quota < 0) return { ok: false, error: "Quota cannot be negative." };
  if (input.ratePercent > 100) return { ok: false, error: "Commission rate cannot exceed 100%." };
  if (input.termMonths < 1) return { ok: false, error: "Enter a term of at least 1 month." };

  const annualized = input.basis === "monthly" ? input.amount * 12 : input.amount;
  const rows: MoneyRow[] = [];
  if (input.basis === "monthly") {
    rows.push({
      label: "Annualized from this month",
      detail: `${formatCurrency(input.amount)} × 12 = ${formatCurrency(annualized)}. This repeats the month you entered. It is not a renewal forecast.`,
      amount: annualized,
    });
  }

  let upTo = annualized;
  let above = 0;
  let baseCommission = 0;
  let aboveCommission = 0;
  if (input.quota !== null && input.quota > 0) {
    upTo = Math.min(annualized, input.quota);
    above = Math.max(0, annualized - input.quota);
    baseCommission = (upTo * input.ratePercent) / 100;
    aboveCommission = (above * input.ratePercent * input.accelerator) / 100;
    rows.push(
      {
        label: "Commission up to quota",
        detail: `${formatCurrency(upTo)} × ${formatPercent(input.ratePercent)} = ${formatCurrency(baseCommission)}`,
        amount: baseCommission,
      },
      {
        label: "Commission above quota",
        detail: `${formatCurrency(above)} × ${formatPercent(input.ratePercent)} × ${input.accelerator} = ${formatCurrency(aboveCommission)}`,
        amount: aboveCommission,
      },
    );
  } else {
    baseCommission = (annualized * input.ratePercent) / 100;
    rows.push({
      label: "Commission",
      detail: `${formatCurrency(annualized)} × ${formatPercent(input.ratePercent)} = ${formatCurrency(baseCommission)}`,
      amount: baseCommission,
    });
  }

  const commission = baseCommission + aboveCommission;
  const monthlyPayout = commission / input.termMonths;
  rows.push(
    {
      label: "Paid upfront",
      detail: `The full commission is ${formatCurrency(commission)}.`,
      amount: commission,
      emphasize: true,
    },
    {
      label: "Paid monthly over the term",
      detail: `${formatCurrency(commission)} ÷ ${input.termMonths} = ${formatCurrency(monthlyPayout)}`,
      amount: monthlyPayout,
    },
  );
  return { ok: true, annualized, commission, monthlyPayout, rows };
}
