import { formatCurrency, formatPercent, type MoneyRow } from "@/lib/format";
import type { CalcResult } from "@/lib/calc/types";

export interface SplitPerson {
  name: string;
  value: number;
}

export interface SplitShare {
  name: string;
  value: number;
  amount: number;
}

export interface SplitMath {
  shares: SplitShare[];
  rows: MoneyRow[];
}

export function calculateSplit(
  total: number,
  mode: "percent" | "fixed",
  people: readonly SplitPerson[],
): CalcResult<SplitMath> {
  if (total < 0) return { ok: false, error: "Total commission cannot be negative." };
  if (people.length === 0) return { ok: false, error: "Add at least one person." };
  if (people.some((person) => person.value < 0)) {
    return { ok: false, error: "Shares cannot be negative." };
  }

  if (mode === "percent") {
    const sum = people.reduce((totalPercent, person) => totalPercent + person.value, 0);
    if (Math.abs(sum - 100) > 0.01) {
      return {
        ok: false,
        error: `Percentages must total 100%. They currently total ${formatPercent(sum)}.`,
      };
    }
    const shares = people.map((person) => ({
      name: person.name.trim() || "Unnamed",
      value: person.value,
      amount: (total * person.value) / 100,
    }));
    return {
      ok: true,
      shares,
      rows: shareRows(total, shares, "percent"),
    };
  }

  const sum = people.reduce((totalAmount, person) => totalAmount + person.value, 0);
  if (Math.abs(sum - total) > 0.009) {
    return {
      ok: false,
      error: `Fixed amounts must add up to ${formatCurrency(total)}. They currently add up to ${formatCurrency(sum)}.`,
    };
  }
  const shares = people.map((person) => ({
    name: person.name.trim() || "Unnamed",
    value: person.value,
    amount: person.value,
  }));
  return { ok: true, shares, rows: shareRows(total, shares, "fixed") };
}

function shareRows(total: number, shares: readonly SplitShare[], mode: "percent" | "fixed"): MoneyRow[] {
  const rows: MoneyRow[] = shares.map((share) => ({
    label: share.name,
    detail:
      mode === "percent"
        ? `${formatCurrency(total)} × ${formatPercent(share.value)} = ${formatCurrency(share.amount)}`
        : `${share.name} receives ${formatCurrency(share.amount)}`,
    amount: share.amount,
  }));
  const paid = shares.reduce((sum, share) => sum + share.amount, 0);
  rows.push({
    label: "Total split",
    detail: `Shares add up to ${formatCurrency(paid)}.`,
    amount: paid,
    emphasize: true,
  });
  return rows;
}
