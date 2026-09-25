import { describe, expect, it } from "vitest";
import { NAV_ITEMS, isActive } from "./nav";

describe("NAV_ITEMS", () => {
  it("lists the eight sections in the order CLAUDE.md gives", () => {
    expect(NAV_ITEMS.map((i) => i.label)).toEqual([
      "Ana səhifə",
      "Qaydalar",
      "Təqvim",
      "Mövsüm",
      "Cədvəl",
      "Reyestr",
      "Ölkələr",
      "Arxiv",
    ]);
  });
});

describe("isActive", () => {
  it("matches the home link only on /", () => {
    expect(isActive("/", "/")).toBe(true);
    expect(isActive("/", "/cedvel")).toBe(false);
  });

  it("matches a section and its subpages", () => {
    expect(isActive("/movsum", "/movsum/2026-10")).toBe(true);
    expect(isActive("/movsum", "/movsumlar")).toBe(false);
  });
});
