import { describe, expect, it } from "vitest";
import { formatCurrency, formatPercent, parseUserNumber, readMoney, readPercent } from "@/lib/format";

describe("format", () => {
  it("formats US currency to cents", () => {
    expect(formatCurrency(75000)).toBe("$75,000.00");
    expect(formatCurrency(6792.5)).toBe("$6,792.50");
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("formats percents without forcing trailing zeros", () => {
    expect(formatPercent(8)).toBe("8%");
    expect(formatPercent(2.5)).toBe("2.5%");
    expect(formatPercent(8.125)).toBe("8.125%");
  });
});

describe("parseUserNumber", () => {
  it("accepts currency and percent typing", () => {
    expect(parseUserNumber("$1,250,000")).toEqual({ state: "ok", value: 1250000 });
    expect(parseUserNumber("6%")).toEqual({ state: "ok", value: 6 });
    expect(parseUserNumber(" 6 % ")).toEqual({ state: "ok", value: 6 });
    expect(parseUserNumber(".5")).toEqual({ state: "ok", value: 0.5 });
  });

  it("treats unfinished numbers as incomplete", () => {
    expect(parseUserNumber("")).toEqual({ state: "empty" });
    expect(parseUserNumber("-")).toEqual({ state: "incomplete" });
    expect(parseUserNumber("5.")).toEqual({ state: "ok", value: 5 });
  });

  it("rejects letters", () => {
    expect(parseUserNumber("12abc")).toEqual({ state: "invalid" });
  });
});

describe("field readers", () => {
  it("explains how to fix a bad money entry", () => {
    const result = readMoney("abc", "a sale price");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/sale price/);
  });

  it("blocks percentages above the max", () => {
    const result = readPercent("140", "a commission rate", 100);
    expect(result.ok).toBe(false);
  });
});
