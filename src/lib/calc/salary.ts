import { formatCurrency, formatPercent, type MoneyRow } from "@/lib/format";
import { calculateTiered, type Tier } from "@/lib/calc/tiered";
import type { CalcResult } from "@/lib/calc/types";

export type PayFrequency = "weekly" | "biweekly" | "semimonthly" | "monthly";
export type SalesBasis = "period" | "year";
export type DrawType = "none" | "recoverable" | "nonrecoverable";

export const PERIODS_PER_YEAR: Record<PayFrequency, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
};

export interface SalaryInput {
  annualBase: number;
  frequency: PayFrequency;
  basis: SalesBasis;
  sales: number;
  commissionMode: "flat" | "tiered";
  ratePercent: number;
  tiers: Tier[];
  draw: number;
  drawType: DrawType;
}

export interface SalaryMath {
  periods: number;
  basePerPeriod: number;
  commissionPerPeriod: number;
  annualCommission: number;
  commissionPay: number;
  drawBalance: number;
  grossPerPeriod: number;
  ote: number;
  rows: MoneyRow[];
}

export function calculateSalary(input: SalaryInput): CalcResult<SalaryMath> {
  if (input.annualBase < 0 || input.sales < 0 || input.ratePercent < 0 || input.draw < 0) {
    return { ok: false, error: "Salary, sales, rate, and draw cannot be negative." };
  }
  const periods = PERIODS_PER_YEAR[input.frequency];
  let annualCommission = 0;
  const rows: MoneyRow[] = [];

  if (input.commissionMode === "flat") {
    const salesForRate = input.sales;
    const commissionOnEntered = (salesForRate * input.ratePercent) / 100;
    annualCommission = input.basis === "year" ? commissionOnEntered : commissionOnEntered * periods;
    rows.push({
      label: "Commission on entered sales",
      detail: `${formatCurrency(salesForRate)} × ${formatPercent(input.ratePercent)} = ${formatCurrency(commissionOnEntered)}`,
      amount: commissionOnEntered,
    });
  } else {
    const tiered = calculateTiered(input.sales, input.tiers, "marginal");
    if (!tiered.ok) return tiered;
    annualCommission = input.basis === "year" ? tiered.total : tiered.total * periods;
    rows.push({
      label: "Tiered commission on entered sales",
      detail: `Marginal tiers on ${formatCurrency(input.sales)} = ${formatCurrency(tiered.total)}`,
      amount: tiered.total,
    });
  }

  const commissionPerPeriod = annualCommission / periods;
  const basePerPeriod = input.annualBase / periods;
  const drawApplies = input.drawType !== "none" && input.draw > 0;
  const commissionPay = drawApplies ? Math.max(commissionPerPeriod, input.draw) : commissionPerPeriod;
  const drawBalance =
    drawApplies && input.drawType === "recoverable"
      ? Math.max(0, input.draw - commissionPerPeriod)
      : 0;
  const grossPerPeriod = basePerPeriod + commissionPay;
  const ote = input.annualBase + annualCommission;

  rows.push(
    {
      label: "Paychecks per year",
      detail: `${frequencyLabel(input.frequency)} uses ${periods} paychecks.`,
      amount: periods,
      display: String(periods),
    },
    {
      label: "Base per paycheck",
      detail: `${formatCurrency(input.annualBase)} ÷ ${periods} = ${formatCurrency(basePerPeriod)}`,
      amount: basePerPeriod,
    },
    {
      label: "Commission per paycheck",
      detail: `${formatCurrency(annualCommission)} ÷ ${periods} = ${formatCurrency(commissionPerPeriod)}`,
      amount: commissionPerPeriod,
    },
    {
      label: "Commission cash this paycheck",
      detail: drawApplies
        ? `Draw ${formatCurrency(input.draw)} compared with commission ${formatCurrency(commissionPerPeriod)} pays ${formatCurrency(commissionPay)}.`
        : `No draw. Commission cash is ${formatCurrency(commissionPay)}.`,
      amount: commissionPay,
    },
    {
      label: "Gross this paycheck",
      detail: `${formatCurrency(basePerPeriod)} + ${formatCurrency(commissionPay)} = ${formatCurrency(grossPerPeriod)}`,
      amount: grossPerPeriod,
      emphasize: true,
    },
    {
      label: "On-target earnings",
      detail: `${formatCurrency(input.annualBase)} + ${formatCurrency(annualCommission)} = ${formatCurrency(ote)}`,
      amount: ote,
    },
  );

  if (input.drawType === "recoverable") {
    rows.push({
      label: "Recoverable draw balance",
      detail:
        drawBalance > 0
          ? `This paycheck is short of the draw by ${formatCurrency(drawBalance)}.`
          : "Commission covers the draw. Balance this paycheck is $0.00.",
      amount: drawBalance,
    });
  }

  return {
    ok: true,
    periods,
    basePerPeriod,
    commissionPerPeriod,
    annualCommission,
    commissionPay,
    drawBalance,
    grossPerPeriod,
    ote,
    rows,
  };
}

function frequencyLabel(frequency: PayFrequency): string {
  switch (frequency) {
    case "weekly":
      return "Weekly pay";
    case "biweekly":
      return "Biweekly pay";
    case "semimonthly":
      return "Semi-monthly pay";
    case "monthly":
      return "Monthly pay";
  }
}
