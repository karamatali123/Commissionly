import { describe, expect, it } from "vitest";
import { calculateTravel } from "@/lib/calc/travel";

describe("travel agent commission", () => {
  it("splits supplier commission with the host agency", () => {
    const result = calculateTravel({ bookingAmount: 4000, commissionRatePercent: 10, agentKeepPercent: 70 });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.gross).toBe(400);
    expect(result.agentNet).toBe(280);
    expect(result.hostShare).toBe(120);
  });

  it("keeps the full supplier commission at a 100% split", () => {
    const result = calculateTravel({ bookingAmount: 4000, commissionRatePercent: 10, agentKeepPercent: 100 });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.agentNet).toBe(400);
    expect(result.hostShare).toBe(0);
  });
});
