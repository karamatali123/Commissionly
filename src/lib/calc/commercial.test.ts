import { describe, expect, it } from "vitest";
import { calculateCommercial } from "@/lib/calc/commercial";

describe("commercial commission", () => {
  it("splits a sale commission between listing and cooperating brokers", () => {
    const result = calculateCommercial({
      mode: "sale",
      salePrice: 2_000_000,
      ratePercent: 5,
      listingSharePercent: 60,
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.total).toBe(100000);
    expect(result.listingCommission).toBe(60000);
    expect(result.cooperatingCommission).toBe(40000);
  });

  it("uses one rate on the full lease value", () => {
    const result = calculateCommercial({
      mode: "lease",
      monthlyRent: 8000,
      termMonths: 36,
      ratePercent: 6,
      useSplitRates: false,
      earlyRatePercent: 6,
      laterRatePercent: 3,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.leaseValue).toBe(288000);
      expect(result.total).toBe(17280);
    }
  });

  it("uses a lower rate after year five", () => {
    const result = calculateCommercial({
      mode: "lease",
      monthlyRent: 10000,
      termMonths: 84,
      ratePercent: 5,
      useSplitRates: true,
      earlyRatePercent: 6,
      laterRatePercent: 3,
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.earlyCommission).toBe(36000);
    expect(result.laterCommission).toBe(7200);
    expect(result.total).toBe(43200);
  });

  it("keeps a four-year lease entirely in the first rate", () => {
    const result = calculateCommercial({
      mode: "lease",
      monthlyRent: 10000,
      termMonths: 48,
      ratePercent: 5,
      useSplitRates: true,
      earlyRatePercent: 6,
      laterRatePercent: 3,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.earlyCommission).toBe(28800);
      expect(result.laterCommission).toBe(0);
    }
  });

  it("handles zero rent and rejects a listing share over 100", () => {
    const zero = calculateCommercial({
      mode: "lease",
      monthlyRent: 0,
      termMonths: 0,
      ratePercent: 6,
      useSplitRates: false,
      earlyRatePercent: 0,
      laterRatePercent: 0,
    });
    if (zero.ok) expect(zero.total).toBe(0);
    expect(
      calculateCommercial({
        mode: "sale",
        salePrice: 100,
        ratePercent: 5,
        listingSharePercent: 140,
      }).ok,
    ).toBe(false);
  });
});
