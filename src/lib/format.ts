const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const percent = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 4,
});

const number = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 4,
});

export function formatCurrency(value: number): string {
  return currency.format(value);
}

export function formatPercent(value: number): string {
  return `${percent.format(value)}%`;
}

export function formatNumber(value: number): string {
  return number.format(value);
}

export type ParsedNumber =
  | { state: "empty" }
  | { state: "incomplete" }
  | { state: "invalid" }
  | { state: "ok"; value: number };

export function parseUserNumber(raw: string): ParsedNumber {
  const cleaned = raw.trim().replace(/[$,%\s]/g, "");
  if (cleaned === "") return { state: "empty" };
  if (cleaned === "-" || cleaned === "." || cleaned === "-.") {
    return { state: "incomplete" };
  }
  if (/^-?\d+\.$/.test(cleaned)) {
    return { state: "ok", value: Number(cleaned.slice(0, -1)) };
  }
  if (!/^-?(?:\d+(?:\.\d+)?|\.\d+)$/.test(cleaned)) return { state: "invalid" };
  const value = Number(cleaned);
  if (!Number.isFinite(value)) return { state: "invalid" };
  return { state: "ok", value };
}

export interface MoneyRow {
  label: string;
  detail: string;
  amount: number;
  display?: string;
  emphasize?: boolean;
}

export type FieldResult =
  | { ok: true; value: number }
  | { ok: false; error: string };

export function readMoney(raw: string, label: string): FieldResult {
  const parsed = parseUserNumber(raw);
  if (parsed.state === "empty") {
    return {
      ok: false,
      error: `Enter ${label}. You can type 450000 or $450,000.`,
    };
  }
  if (parsed.state === "incomplete") {
    return { ok: false, error: `Finish ${label}. The number looks incomplete.` };
  }
  if (parsed.state === "invalid") {
    return {
      ok: false,
      error: `Use digits for ${label}, such as 450000 or $450,000.`,
    };
  }
  if (parsed.value < 0) {
    return { ok: false, error: `${label} cannot be negative.` };
  }
  return { ok: true, value: parsed.value };
}

export function readOptionalMoney(raw: string, label: string): FieldResult | { ok: true; value: null } {
  if (raw.trim() === "") return { ok: true, value: null };
  return readMoney(raw, label);
}

export function readPercent(raw: string, label: string, max = 100): FieldResult {
  const parsed = readMoney(raw, label);
  if (!parsed.ok) {
    if (parsed.error.startsWith("Enter")) {
      return {
        ok: false,
        error: `Enter ${label} from 0 to ${max}. You can type 6 or 6%.`,
      };
    }
    if (parsed.error.startsWith("Use digits")) {
      return {
        ok: false,
        error: `Use digits for ${label}, such as 6 or 6%.`,
      };
    }
    return parsed;
  }
  if (parsed.value > max) {
    return { ok: false, error: `Enter ${label} from 0 to ${max}.` };
  }
  return parsed;
}

export function readMultiplier(raw: string, label: string): FieldResult {
  const parsed = readMoney(raw, label);
  if (!parsed.ok) return parsed;
  return parsed;
}
