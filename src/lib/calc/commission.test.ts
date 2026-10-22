import { describe, expect, it } from "vitest";
import {
  calculateCommission,
  calculateRate,
  calculateSaleFromCommission,
} from "@/lib/calc/commission";

describe("commission", () => {
  it("multiplies sale by rate", () => {
    const result = calculateCommission(75000, 8);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.commission).toBe(6000);
    expect(result.rows[0]?.detail).toBe("$75,000.00 × 8% = $6,000.00");
  });

  it("handles zero and a large sale", () => {
    expect(calculateCommission(0, 6).ok && calculateCommission(0, 6).ok).toBe(true);
    const zero = calculateCommission(0, 6);
    if (zero.ok) expect(zero.commission).toBe(0);
    const large = calculateCommission(1_000_000_000, 1.25);
    if (large.ok) expect(large.commission).toBe(12_500_000);
  });

  it("rejects negatives", () => {
    expect(calculateCommission(-1, 5).ok).toBe(false);
  });
});

describe("reverse commission", () => {
  it("divides the target commission by the rate", () => {
    const result = calculateSaleFromCommission(6000, 8);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.saleAmount).toBe(75000);
  });

  it("refuses a zero rate", () => {
    const result = calculateSaleFromCommission(6000, 0);
    expect(result.ok).toBe(false);
  });

  it("handles a large target", () => {
    const result = calculateSaleFromCommission(12_500_000, 1.25);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.saleAmount).toBe(1_000_000_000);
  });
});

describe("find rate", () => {
  it("returns the percent", () => {
    const result = calculateRate(6000, 75000);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.ratePercent).toBe(8);
  });

  it("allows a rate over 100 when the commission is larger than the sale", () => {
    const result = calculateRate(500, 400);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.ratePercent).toBe(125);
  });

  it("refuses a zero sale", () => {
    expect(calculateRate(10, 0).ok).toBe(false);
  });
});
