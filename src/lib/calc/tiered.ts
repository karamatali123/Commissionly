import { formatCurrency, formatPercent, type MoneyRow } from "@/lib/format";
import type { CalcResult } from "@/lib/calc/types";

export interface Tier {
  from: number;
  to: number | null;
  ratePercent: number;
}

export interface TierDraft {
  from: string;
  to: string;
  rate: string;
}

export interface TierSlice {
  from: number;
  to: number;
  slice: number;
  ratePercent: number;
  commission: number;
}

export interface TieredMath {
  total: number;
  method: "marginal" | "retroactive";
  rows: MoneyRow[];
  slices: TierSlice[];
  appliedRate: number | null;
}

export const DEFAULT_TIERS: Tier[] = [
  { from: 0, to: 50000, ratePercent: 5 },
  { from: 50000, to: 100000, ratePercent: 8 },
  { from: 100000, to: null, ratePercent: 10 },
];

export function encodeTiers(drafts: readonly TierDraft[]): string {
  return drafts.map((draft) => `${draft.from}:${draft.to}:${draft.rate}`).join("|");
}

export function decodeTiers(raw: string): TierDraft[] | null {
  if (!raw.trim()) return null;
  const drafts: TierDraft[] = [];
  for (const part of raw.split("|")) {
    const bits = part.split(":");
    if (bits.length !== 3) return null;
    drafts.push({ from: bits[0] ?? "", to: bits[1] ?? "", rate: bits[2] ?? "" });
  }
  return drafts.length > 0 ? drafts : null;
}

export function defaultTierField(): string {
  return encodeTiers(
    DEFAULT_TIERS.map((tier) => ({
      from: String(tier.from),
      to: tier.to === null ? "" : String(tier.to),
      rate: String(tier.ratePercent),
    })),
  );
}

export function draftsToTiers(drafts: readonly TierDraft[]): CalcResult<{ tiers: Tier[] }> {
  if (drafts.length === 0) return { ok: false, error: "Add at least one tier." };
  const tiers: Tier[] = [];
  for (const draft of drafts) {
    if (draft.from.trim() === "" || draft.rate.trim() === "") {
      return { ok: false, error: "Each tier needs a start and a rate. Leave the end blank only for the top tier." };
    }
    const from = Number(draft.from);
    const ratePercent = Number(draft.rate);
    const to = draft.to.trim() === "" ? null : Number(draft.to);
    if (!Number.isFinite(from) || !Number.isFinite(ratePercent) || (to !== null && !Number.isFinite(to))) {
      return { ok: false, error: "Tier starts, ends, and rates must be numbers." };
    }
    tiers.push({ from, to, ratePercent });
  }
  const error = validateTiers(tiers);
  if (error) return { ok: false, error };
  return { ok: true, tiers };
}

export function validateTiers(tiers: readonly Tier[]): string | null {
  if (tiers.length === 0) return "Add at least one tier.";
  const sorted = [...tiers].sort((a, b) => a.from - b.from);
  for (let index = 0; index < sorted.length; index += 1) {
    const tier = sorted[index];
    if (!tier) return "Add at least one tier.";
    if (tier.from < 0 || tier.ratePercent < 0) {
      return "Tier starts and rates cannot be negative.";
    }
    if (tier.to !== null && tier.to <= tier.from) {
      return "Each tier end must be higher than its start.";
    }
    if (index > 0) {
      const previous = sorted[index - 1];
      if (!previous) return "Tiers overlap. Raise the next start or lower the previous end.";
      if (previous.to === null) return "Only the last tier can be open-ended.";
      if (tier.from < previous.to) {
        return "Tiers overlap. Raise the next start or lower the previous end.";
      }
    }
  }
  return null;
}

function sortTiers(tiers: readonly Tier[]): Tier[] {
  return [...tiers].sort((a, b) => a.from - b.from);
}

export function calculateTiered(
  amount: number,
  tiers: readonly Tier[],
  method: "marginal" | "retroactive",
): CalcResult<TieredMath> {
  if (amount < 0) return { ok: false, error: "Sales amount cannot be negative." };
  const error = validateTiers(tiers);
  if (error) return { ok: false, error };
  const sorted = sortTiers(tiers);
  if (method === "marginal") return marginal(amount, sorted);
  return retroactive(amount, sorted);
}

function marginal(amount: number, tiers: readonly Tier[]): CalcResult<TieredMath> {
  const slices: TierSlice[] = [];
  let total = 0;
  for (const tier of tiers) {
    const end = tier.to ?? Number.POSITIVE_INFINITY;
    const slice = Math.max(0, Math.min(amount, end) - tier.from);
    if (slice <= 0) continue;
    const commission = (slice * tier.ratePercent) / 100;
    total += commission;
    slices.push({
      from: tier.from,
      to: Math.min(amount, end),
      slice,
      ratePercent: tier.ratePercent,
      commission,
    });
  }
  const rows: MoneyRow[] = slices.map((slice) => ({
    label: `${formatCurrency(slice.from)} to ${formatCurrency(slice.to)}`,
    detail: `${formatCurrency(slice.slice)} × ${formatPercent(slice.ratePercent)} = ${formatCurrency(slice.commission)}`,
    amount: slice.commission,
  }));
  rows.push({
    label: "Marginal commission",
    detail: `Marginal total = ${formatCurrency(total)}`,
    amount: total,
    emphasize: true,
  });
  return { ok: true, total, method: "marginal", rows, slices, appliedRate: null };
}

function retroactive(amount: number, tiers: readonly Tier[]): CalcResult<TieredMath> {
  const matched = tiers.find((tier, index) => {
    const aboveStart = index === 0 ? amount >= tier.from : amount > tier.from;
    const withinEnd = tier.to === null || amount <= tier.to;
    return aboveStart && withinEnd;
  });
  if (!matched) {
    return {
      ok: false,
      error: "This sales amount falls in a gap between tiers. Close the gap or use a different amount.",
    };
  }
  const total = (amount * matched.ratePercent) / 100;
  const slices: TierSlice[] = [
    {
      from: 0,
      to: amount,
      slice: amount,
      ratePercent: matched.ratePercent,
      commission: total,
    },
  ];
  return {
    ok: true,
    total,
    method: "retroactive",
    appliedRate: matched.ratePercent,
    slices,
    rows: [
      {
        label: "Tier reached",
        detail: `${formatCurrency(amount)} is inside ${formatCurrency(matched.from)} to ${matched.to === null ? "no limit" : formatCurrency(matched.to)} at ${formatPercent(matched.ratePercent)}.`,
        amount: matched.ratePercent,
        display: formatPercent(matched.ratePercent),
      },
      {
        label: "Retroactive commission",
        detail: `${formatCurrency(amount)} × ${formatPercent(matched.ratePercent)} = ${formatCurrency(total)}`,
        amount: total,
        emphasize: true,
      },
    ],
  };
}
