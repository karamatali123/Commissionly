import { describe, expect, it } from "vitest";
import { calculateSales } from "@/lib/calc/sales";

describe("sales commission", () => {
  it("pays the base rate to quota and the accelerator above it", () => {
    const result = calculateSales({
      salesAmount: 80000,
      ratePercent: 8,
      quota: 50000,
      accelerator: 1.5,
      draw: null,
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.commission).toBe(7600);
    expect(result.earningsAboveQuota).toBe(3600);
    expect(result.quotaPercent).toBe(160);
  });

  it("ignores the accelerator when sales stay under quota", () => {
    const result = calculateSales({
      salesAmount: 40000,
      ratePercent: 8,
      quota: 50000,
      accelerator: 1.5,
      draw: null,
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.commission).toBe(3200);
    expect(result.earningsAboveQuota).toBe(0);
    expect(result.quotaPercent).toBe(80);
  });

  it("uses a straight rate when quota is blank", () => {
    const result = calculateSales({
      salesAmount: 80000,
      ratePercent: 8,
      quota: null,
      accelerator: 1.5,
      draw: null,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.commission).toBe(6400);
      expect(result.quotaPercent).toBeNull();
    }
  });

  it("shows what is left after a draw, including a shortfall", () => {
    const covered = calculateSales({
      salesAmount: 80000,
      ratePercent: 8,
      quota: null,
      accelerator: 1,
      draw: 1000,
    });
    const short = calculateSales({
      salesAmount: 10000,
      ratePercent: 5,
      quota: null,
      accelerator: 1,
      draw: 1000,
    });
    if (covered.ok) expect(covered.additionalAfterDraw).toBe(5400);
    if (short.ok) {
      expect(short.commission).toBe(500);
      expect(short.unrecoveredDraw).toBe(500);
      expect(short.additionalAfterDraw).toBe(0);
    }
  });

  it("handles zero and a very large sale", () => {
    const zero = calculateSales({
      salesAmount: 0,
      ratePercent: 10,
      quota: 50000,
      accelerator: 2,
      draw: null,
    });
    if (zero.ok) expect(zero.commission).toBe(0);
    const large = calculateSales({
      salesAmount: 5_000_000,
      ratePercent: 10,
      quota: null,
      accelerator: 1,
      draw: null,
    });
    if (large.ok) expect(large.commission).toBe(500_000);
  });
});
