import { formatCurrency, formatPercent, type MoneyRow } from "@/lib/format";
import type { CalcResult } from "@/lib/calc/types";

export interface SalesInput {
  salesAmount: number;
  ratePercent: number;
  quota: number | null;
  accelerator: number;
  draw: number | null;
}

export interface SalesMath {
  commission: number;
  quotaPercent: number | null;
  earningsAboveQuota: number;
  additionalAfterDraw: number;
  unrecoveredDraw: number;
  rows: MoneyRow[];
}

export function calculateSales(input: SalesInput): CalcResult<SalesMath> {
  if (input.salesAmount < 0 || input.ratePercent < 0 || input.accelerator < 0) {
    return { ok: false, error: "Sales, rate, and accelerator cannot be negative." };
  }
  if (input.quota !== null && input.quota < 0) {
    return { ok: false, error: "Quota cannot be negative." };
  }
  if (input.draw !== null && input.draw < 0) {
    return { ok: false, error: "Draw cannot be negative." };
  }

  let baseCommission = 0;
  let earningsAboveQuota = 0;
  const rows: MoneyRow[] = [];

  if (input.quota === null || input.quota === 0) {
    baseCommission = (input.salesAmount * input.ratePercent) / 100;
    rows.push({
      label: "Commission",
      detail: `${formatCurrency(input.salesAmount)} × ${formatPercent(input.ratePercent)} = ${formatCurrency(baseCommission)}`,
      amount: baseCommission,
    });
  } else {
    const upToQuota = Math.min(input.salesAmount, input.quota);
    const above = Math.max(0, input.salesAmount - input.quota);
    baseCommission = (upToQuota * input.ratePercent) / 100;
    earningsAboveQuota = (above * input.ratePercent * input.accelerator) / 100;
    rows.push(
      {
        label: "Commission up to quota",
        detail: `${formatCurrency(upToQuota)} × ${formatPercent(input.ratePercent)} = ${formatCurrency(baseCommission)}`,
        amount: baseCommission,
      },
      {
        label: "Commission above quota",
        detail: `${formatCurrency(above)} × ${formatPercent(input.ratePercent)} × ${input.accelerator} = ${formatCurrency(earningsAboveQuota)}`,
        amount: earningsAboveQuota,
      },
    );
  }

  const commission = baseCommission + earningsAboveQuota;
  const quotaPercent =
    input.quota !== null && input.quota > 0 ? (input.salesAmount / input.quota) * 100 : null;
  const draw = input.draw ?? 0;
  const additionalAfterDraw = Math.max(0, commission - draw);
  const unrecoveredDraw = Math.max(0, draw - commission);

  rows.push({
    label: "Commission earned",
    detail: `${formatCurrency(baseCommission)} + ${formatCurrency(earningsAboveQuota)} = ${formatCurrency(commission)}`,
    amount: commission,
    emphasize: true,
  });

  if (quotaPercent !== null) {
    rows.push({
      label: "Quota attained",
      detail: `${formatCurrency(input.salesAmount)} ÷ ${formatCurrency(input.quota ?? 0)} × 100 = ${formatPercent(quotaPercent)}`,
      amount: quotaPercent,
      display: formatPercent(quotaPercent),
    });
  }

  if (draw > 0) {
    rows.push({
      label: "Additional pay after draw",
      detail: `${formatCurrency(commission)} − ${formatCurrency(draw)} leaves ${formatCurrency(additionalAfterDraw)} still to pay, with ${formatCurrency(unrecoveredDraw)} of draw unrecovered.`,
      amount: additionalAfterDraw,
    });
  }

  return {
    ok: true,
    commission,
    quotaPercent,
    earningsAboveQuota,
    additionalAfterDraw,
    unrecoveredDraw,
    rows,
  };
}
