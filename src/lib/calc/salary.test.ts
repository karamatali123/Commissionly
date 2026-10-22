import { describe, expect, it } from "vitest";
import { calculateSalary } from "@/lib/calc/salary";
import { DEFAULT_TIERS } from "@/lib/calc/tiered";

const base = {
  annualBase: 48000,
  frequency: "monthly" as const,
  basis: "period" as const,
  sales: 20000,
  commissionMode: "flat" as const,
  ratePercent: 8,
  tiers: DEFAULT_TIERS,
  draw: 0,
  drawType: "none" as const,
};

describe("salary plus commission", () => {
  it("splits a flat monthly plan into a paycheck and OTE", () => {
    const result = calculateSalary(base);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.periods).toBe(12);
    expect(result.basePerPeriod).toBe(4000);
    expect(result.commissionPerPeriod).toBe(1600);
    expect(result.annualCommission).toBe(19200);
    expect(result.grossPerPeriod).toBe(5600);
    expect(result.ote).toBe(67200);
    expect(result.drawBalance).toBe(0);
  });

  it("uses 52, 26, and 24 pay periods", () => {
    const weekly = calculateSalary({ ...base, frequency: "weekly" });
    const biweekly = calculateSalary({ ...base, frequency: "biweekly" });
    const semi = calculateSalary({ ...base, frequency: "semimonthly" });
    if (weekly.ok) expect(weekly.basePerPeriod).toBeCloseTo(48000 / 52);
    if (biweekly.ok) expect(biweekly.periods).toBe(26);
    if (semi.ok) expect(semi.periods).toBe(24);
  });

  it("annualizes a yearly sales figure instead of treating it as one paycheck", () => {
    const result = calculateSalary({ ...base, basis: "year", sales: 240000 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.annualCommission).toBe(19200);
      expect(result.commissionPerPeriod).toBe(1600);
    }
  });

  it("tracks a recoverable draw balance and ignores it when non-recoverable", () => {
    const recoverable = calculateSalary({ ...base, draw: 2000, drawType: "recoverable" });
    const forgiven = calculateSalary({ ...base, draw: 2000, drawType: "nonrecoverable" });
    if (recoverable.ok) {
      expect(recoverable.commissionPay).toBe(2000);
      expect(recoverable.drawBalance).toBe(400);
      expect(recoverable.grossPerPeriod).toBe(6000);
    }
    if (forgiven.ok) {
      expect(forgiven.commissionPay).toBe(2000);
      expect(forgiven.drawBalance).toBe(0);
    }
  });

  it("applies marginal tiers to annual sales", () => {
    const result = calculateSalary({
      ...base,
      basis: "year",
      sales: 120000,
      commissionMode: "tiered",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.annualCommission).toBe(8500);
      expect(result.ote).toBe(56500);
    }
  });

  it("handles zero sales and rejects negatives", () => {
    const zero = calculateSalary({ ...base, sales: 0, annualBase: 0 });
    if (zero.ok) expect(zero.ote).toBe(0);
    expect(calculateSalary({ ...base, sales: -1 }).ok).toBe(false);
  });
});
