import { describe, expect, it } from "vitest";
import { calculateLoanOfficer } from "@/lib/calc/loan-officer";

describe("loan officer commission", () => {
  it("turns basis points into a split commission", () => {
    const result = calculateLoanOfficer({
      loanAmount: 400000,
      basisPoints: 100,
      keepPercent: 50,
      minimum: null,
      maximum: null,
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.gross).toBe(4000);
    expect(result.agentNet).toBe(2000);
    expect(result.companyShare).toBe(2000);
  });

  it("raises a small file to the minimum and caps a large file", () => {
    const raised = calculateLoanOfficer({
      loanAmount: 100000,
      basisPoints: 50,
      keepPercent: 100,
      minimum: 1000,
      maximum: null,
    });
    const capped = calculateLoanOfficer({
      loanAmount: 1000000,
      basisPoints: 200,
      keepPercent: 100,
      minimum: null,
      maximum: 8000,
    });
    if (raised.ok) expect(raised.agentNet).toBe(1000);
    if (capped.ok) expect(capped.agentNet).toBe(8000);
  });
});
