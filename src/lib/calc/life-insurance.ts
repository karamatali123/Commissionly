import { formatCurrency, formatNumber, formatPercent, type MoneyRow } from "@/lib/format";
import type { CalcResult } from "@/lib/calc/types";

export interface LifeInsuranceInput {
  premium: number;
  firstYearRatePercent: number;
  renewalRatePercent: number;
  years: number;
}

export interface LifeInsuranceMath {
  firstYear: number;
  renewalPerYear: number;
  renewalYears: number;
  renewalTotal: number;
  total: number;
  rows: MoneyRow[];
}

export function calculateLifeInsurance(input: LifeInsuranceInput): CalcResult<LifeInsuranceMath> {
  if (input.premium < 0 || input.firstYearRatePercent < 0 || input.renewalRatePercent < 0 || input.years < 0) {
    return { ok: false, error: "Premium, rates, and years cannot be negative." };
  }
  if (input.firstYearRatePercent > 100 || input.renewalRatePercent > 100) {
    return { ok: false, error: "Commission rates cannot exceed 100%." };
  }
  if (input.years < 1) return { ok: false, error: "Enter at least 1 year." };

  const firstYear = (input.premium * input.firstYearRatePercent) / 100;
  const renewalPerYear = (input.premium * input.renewalRatePercent) / 100;
  const renewalYears = input.years - 1;
  const renewalTotal = renewalPerYear * renewalYears;
  const total = firstYear + renewalTotal;
  const rows: MoneyRow[] = [
    {
      label: "First-year commission",
      detail: `${formatCurrency(input.premium)} × ${formatPercent(input.firstYearRatePercent)} = ${formatCurrency(firstYear)}`,
      amount: firstYear,
    },
    {
      label: "Renewal commission per year",
      detail: `${formatCurrency(input.premium)} × ${formatPercent(input.renewalRatePercent)} = ${formatCurrency(renewalPerYear)}`,
      amount: renewalPerYear,
    },
    {
      label: "Renewal years",
      detail: `${formatNumber(input.years)} − 1 = ${formatNumber(renewalYears)}`,
      amount: renewalYears,
      display: formatNumber(renewalYears),
    },
    {
      label: "Renewal commission total",
      detail: `${formatCurrency(renewalPerYear)} × ${formatNumber(renewalYears)} = ${formatCurrency(renewalTotal)}`,
      amount: renewalTotal,
    },
    {
      label: "Total commission",
      detail: `${formatCurrency(firstYear)} + ${formatCurrency(renewalTotal)} = ${formatCurrency(total)}`,
      amount: total,
      emphasize: true,
    },
  ];
  return { ok: true, firstYear, renewalPerYear, renewalYears, renewalTotal, total, rows };
}
