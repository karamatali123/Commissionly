import { formatCurrency, formatPercent, type MoneyRow } from "@/lib/format";
import type { CalcResult } from "@/lib/calc/types";

export interface MlmLevel {
  volume: number;
  ratePercent: number;
}

export interface MlmInput {
  personalVolume: number;
  personalRatePercent: number;
  overrides: MlmLevel[];
}

export interface MlmMath {
  personal: number;
  overrideTotal: number;
  total: number;
  rows: MoneyRow[];
}

export function calculateMlm(input: MlmInput): CalcResult<MlmMath> {
  const levels = [{ volume: input.personalVolume, ratePercent: input.personalRatePercent }, ...input.overrides];
  if (levels.some((level) => level.volume < 0 || level.ratePercent < 0)) {
    return { ok: false, error: "Volume and rates cannot be negative." };
  }
  if (levels.some((level) => level.ratePercent > 100)) {
    return { ok: false, error: "Commission rates cannot exceed 100%." };
  }
  const personal = (input.personalVolume * input.personalRatePercent) / 100;
  const rows: MoneyRow[] = [
    {
      label: "Personal commission",
      detail: `${formatCurrency(input.personalVolume)} × ${formatPercent(input.personalRatePercent)} = ${formatCurrency(personal)}`,
      amount: personal,
    },
  ];
  let overrideTotal = 0;
  input.overrides.forEach((level, index) => {
    const amount = (level.volume * level.ratePercent) / 100;
    overrideTotal += amount;
    rows.push({
      label: `Override level ${index + 1}`,
      detail: `${formatCurrency(level.volume)} × ${formatPercent(level.ratePercent)} = ${formatCurrency(amount)}`,
      amount,
    });
  });
  const total = personal + overrideTotal;
  rows.push({
    label: "Total from the levels entered",
    detail: `${formatCurrency(personal)} + ${formatCurrency(overrideTotal)} = ${formatCurrency(total)}`,
    amount: total,
    emphasize: true,
  });
  return { ok: true, personal, overrideTotal, total, rows };
}
