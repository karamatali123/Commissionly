import { describe, expect, it } from "vitest";
import { calculateLifeInsurance } from "@/lib/calc/life-insurance";

describe("life insurance commission", () => {
  it("adds first-year commission to later renewal years", () => {
    const result = calculateLifeInsurance({
      premium: 2000,
      firstYearRatePercent: 50,
      renewalRatePercent: 5,
      years: 5,
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.firstYear).toBe(1000);
    expect(result.renewalPerYear).toBe(100);
    expect(result.renewalYears).toBe(4);
    expect(result.renewalTotal).toBe(400);
    expect(result.total).toBe(1400);
  });

  it("skips renewal commission on a one-year term", () => {
    const result = calculateLifeInsurance({
      premium: 2000,
      firstYearRatePercent: 50,
      renewalRatePercent: 5,
      years: 1,
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.renewalTotal).toBe(0);
    expect(result.total).toBe(1000);
  });

  it("rejects a term under one year", () => {
    expect(calculateLifeInsurance({ premium: 2000, firstYearRatePercent: 50, renewalRatePercent: 5, years: 0 }).ok).toBe(false);
  });
});
