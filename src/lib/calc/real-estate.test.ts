import { describe, expect, it } from "vitest";
import { calculateRealEstate, type RealEstateInput } from "@/lib/calc/real-estate";

const base: RealEstateInput = {
  salePrice: 450000,
  listingRatePercent: 3,
  buyerRatePercent: 3,
  buyerPayer: "seller",
  yourSide: "listing",
  referralFeePercent: 0,
  splitModel: "percent",
  agentSplitPercent: 70,
  annualCap: 20000,
  ytdTowardCap: 18000,
  flatBrokerFee: 500,
  franchiseFeePercent: 0,
  transactionFee: 295,
  closingCostPercent: 2,
};

describe("real estate commission", () => {
  it("walks a 70/30 split down to agent net and seller net", () => {
    const result = calculateRealEstate(base);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.listingCommission).toBe(13500);
    expect(result.buyerCommission).toBe(13500);
    expect(result.totalCommission).toBe(27000);
    expect(result.brokerFee).toBe(4050);
    expect(result.agentAfterSplit).toBe(9450);
    expect(result.agentNet).toBe(9155);
    expect(result.sellerPaidCommission).toBe(27000);
    expect(result.closingCosts).toBe(9000);
    expect(result.sellerNet).toBe(414000);
    expect(result.rows.find((row) => row.emphasize)?.detail).toContain("$9,155.00");
  });

  it("leaves the buyer-side fee out of seller net when the buyer pays it", () => {
    const result = calculateRealEstate({ ...base, buyerPayer: "buyer", yourSide: "buyer" });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.sellerPaidCommission).toBe(13500);
    expect(result.sellerNet).toBe(427500);
    expect(result.yourGross).toBe(13500);
    expect(result.agentNet).toBe(9155);
  });

  it("zeroes the buyer side when there is no buyer agent", () => {
    const result = calculateRealEstate({ ...base, buyerPayer: "none", yourSide: "buyer" });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.buyerCommission).toBe(0);
    expect(result.totalCommission).toBe(13500);
    expect(result.agentNet).toBe(-295);
  });

  it("takes referral before the broker split", () => {
    const result = calculateRealEstate({ ...base, referralFeePercent: 25, transactionFee: 295 });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.referralFee).toBe(3375);
    expect(result.afterReferral).toBe(10125);
    expect(result.brokerFee).toBe(3037.5);
    expect(result.agentNet).toBe(6792.5);
  });

  it("stops broker fees once the annual cap is full", () => {
    const result = calculateRealEstate({ ...base, splitModel: "cap" });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.capRoomBefore).toBe(2000);
    expect(result.brokerFee).toBe(2000);
    expect(result.appliedToCap).toBe(2000);
    expect(result.capRoomAfter).toBe(0);
    expect(result.agentNet).toBe(11205);
  });

  it("uses a flat broker fee and a franchise percent", () => {
    const flat = calculateRealEstate({ ...base, splitModel: "flat" });
    const franchise = calculateRealEstate({ ...base, franchiseFeePercent: 8 });
    if (flat.ok) expect(flat.agentNet).toBe(12705);
    if (franchise.ok) expect(franchise.agentNet).toBe(8399);
  });

  it("handles a zero price and a large price", () => {
    const zero = calculateRealEstate({ ...base, salePrice: 0, closingCostPercent: 0 });
    if (zero.ok) {
      expect(zero.totalCommission).toBe(0);
      expect(zero.agentNet).toBe(-295);
    }
    const large = calculateRealEstate({
      ...base,
      salePrice: 50_000_000,
      transactionFee: 0,
      closingCostPercent: 0,
    });
    if (large.ok) expect(large.listingCommission).toBe(1_500_000);
  });

  it("keeps both sides before the broker split", () => {
    const result = calculateRealEstate({ ...base, yourSide: "both" });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.yourGross).toBe(27000);
    expect(result.brokerFee).toBe(8100);
    expect(result.agentNet).toBe(18605);
  });

  it("pays a referring agent the referral percent and skips the split", () => {
    const result = calculateRealEstate({ ...base, role: "referral", referralFeePercent: 20 });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.referralFee).toBe(2700);
    expect(result.brokerFee).toBe(0);
    expect(result.agentNet).toBe(2700);
  });

  it("counts how many deals at this size fill the remaining cap", () => {
    const almost = calculateRealEstate({ ...base, splitModel: "cap" });
    const fresh = calculateRealEstate({ ...base, splitModel: "cap", ytdTowardCap: 0 });
    if (almost.ok) expect(almost.dealsToFillCap).toBe(1);
    if (fresh.ok) expect(fresh.dealsToFillCap).toBe(5);
  });
});
