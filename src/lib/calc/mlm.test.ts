import { describe, expect, it } from "vitest";
import { calculateMlm } from "@/lib/calc/mlm";

describe("MLM commission", () => {
  it("adds personal commission and the override levels entered", () => {
    const result = calculateMlm({
      personalVolume: 1000,
      personalRatePercent: 20,
      overrides: [
        { volume: 5000, ratePercent: 5 },
        { volume: 0, ratePercent: 0 },
      ],
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.personal).toBe(200);
    expect(result.overrideTotal).toBe(250);
    expect(result.total).toBe(450);
  });
});
