import { describe, expect, it } from "vitest";
import { calculateSaas } from "@/lib/calc/saas";

describe("SaaS commission", () => {
  it("pays the same total upfront or spread across the term", () => {
    const result = calculateSaas({
      amount: 120000,
      basis: "annual",
      ratePercent: 10,
      quota: null,
      accelerator: 1,
      termMonths: 12,
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.commission).toBe(12000);
    expect(result.monthlyPayout).toBe(1000);
  });

  it("annualizes a monthly amount and applies an accelerator above quota", () => {
    const result = calculateSaas({
      amount: 10000,
      basis: "monthly",
      ratePercent: 10,
      quota: 100000,
      accelerator: 1.5,
      termMonths: 12,
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.annualized).toBe(120000);
    expect(result.commission).toBe(13000);
  });
});