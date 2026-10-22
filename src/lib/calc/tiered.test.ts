import { describe, expect, it } from "vitest";
import { calculateTiered, DEFAULT_TIERS, decodeTiers, encodeTiers } from "@/lib/calc/tiered";

describe("tiered commission", () => {
  it("applies marginal rates only inside each tier", () => {
    const result = calculateTiered(120000, DEFAULT_TIERS, "marginal");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.total).toBe(8500);
    expect(result.slices.map((slice) => slice.commission)).toEqual([2500, 4000, 2000]);
  });

  it("keeps an exact boundary in the lower tier", () => {
    const atFifty = calculateTiered(50000, DEFAULT_TIERS, "marginal");
    const atHundred = calculateTiered(100000, DEFAULT_TIERS, "retroactive");
    if (atFifty.ok) expect(atFifty.total).toBe(2500);
    if (atHundred.ok) expect(atHundred.appliedRate).toBe(8);
    if (atHundred.ok) expect(atHundred.total).toBe(8000);
  });

  it("applies the reached tier to the full amount when retroactive", () => {
    const result = calculateTiered(120000, DEFAULT_TIERS, "retroactive");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.appliedRate).toBe(10);
      expect(result.total).toBe(12000);
    }
  });

  it("returns zero on a zero sale and handles a large sale", () => {
    const zero = calculateTiered(0, DEFAULT_TIERS, "marginal");
    if (zero.ok) expect(zero.total).toBe(0);
    const large = calculateTiered(10_000_000, DEFAULT_TIERS, "marginal");
    if (large.ok) expect(large.total).toBe(996500);
  });

  it("rejects overlap, gaps, and negatives", () => {
    expect(
      calculateTiered(100, [{ from: 0, to: 50, ratePercent: 5 }, { from: 40, to: null, ratePercent: 8 }], "marginal").ok,
    ).toBe(false);
    const gap = calculateTiered(
      150,
      [
        { from: 0, to: 100, ratePercent: 5 },
        { from: 200, to: null, ratePercent: 8 },
      ],
      "retroactive",
    );
    expect(gap.ok).toBe(false);
    expect(calculateTiered(-1, DEFAULT_TIERS, "marginal").ok).toBe(false);
  });

  it("round-trips the default tier string", () => {
    const encoded = encodeTiers([
      { from: "0", to: "50000", rate: "5" },
      { from: "50000", to: "100000", rate: "8" },
      { from: "100000", to: "", rate: "10" },
    ]);
    expect(encoded).toBe("0:50000:5|50000:100000:8|100000::10");
    expect(decodeTiers(encoded)).toHaveLength(3);
    expect(decodeTiers("bad")).toBeNull();
  });
});
