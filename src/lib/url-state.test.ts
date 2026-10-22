import { describe, expect, it } from "vitest";
import { mergeQuery, readQuery } from "@/lib/url-state";

describe("url state", () => {
  it("replaces managed keys and keeps the rest", () => {
    expect(mergeQuery("?tab=tiered&sale=10&extra=1", ["sale", "rate"], { sale: "75000", rate: "8" })).toBe(
      "?tab=tiered&extra=1&sale=75000&rate=8",
    );
  });

  it("drops empty values", () => {
    expect(mergeQuery("", ["sale"], { sale: "" })).toBe("");
  });

  it("reads only known keys", () => {
    expect(readQuery("?sale=100&other=9", { sale: "1", rate: "8" })).toEqual({
      sale: "100",
      rate: "8",
    });
  });
});
