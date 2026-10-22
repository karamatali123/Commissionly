import { describe, expect, it } from "vitest";
import { calculateSplit } from "@/lib/calc/split";

describe("commission split", () => {
  it("splits by percentage", () => {
    const result = calculateSplit(10000, "percent", [
      { name: "Alex", value: 50 },
      { name: "Jordan", value: 30 },
      { name: "Sam", value: 20 },
    ]);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.shares.map((share) => share.amount)).toEqual([5000, 3000, 2000]);
  });

  it("rejects percentages that do not total 100", () => {
    const result = calculateSplit(10000, "percent", [
      { name: "Alex", value: 50 },
      { name: "Jordan", value: 30 },
    ]);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/100%/);
  });

  it("splits fixed amounts and rejects a total that does not match", () => {
    const ok = calculateSplit(10000, "fixed", [
      { name: "Alex", value: 4000 },
      { name: "Jordan", value: 6000 },
    ]);
    if (ok.ok) expect(ok.shares.map((share) => share.amount)).toEqual([4000, 6000]);
    expect(
      calculateSplit(10000, "fixed", [
        { name: "Alex", value: 4000 },
        { name: "Jordan", value: 5000 },
      ]).ok,
    ).toBe(false);
  });

  it("supports six people, zero, and a large fee", () => {
    const people = Array.from({ length: 6 }, (_, index) => ({
      name: `Person ${index + 1}`,
      value: index === 5 ? 50 : 10,
    }));
    const result = calculateSplit(12000, "percent", people);
    expect(result.ok).toBe(true);
    const zero = calculateSplit(0, "percent", [
      { name: "Alex", value: 50 },
      { name: "Jordan", value: 50 },
    ]);
    if (zero.ok) expect(zero.shares.every((share) => share.amount === 0)).toBe(true);
    const large = calculateSplit(5_000_000, "percent", [{ name: "Alex", value: 100 }]);
    if (large.ok) expect(large.shares[0]?.amount).toBe(5_000_000);
  });
});
