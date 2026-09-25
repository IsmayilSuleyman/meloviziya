import { describe, expect, it } from "vitest";
import { CLAIMS_OPEN_LABEL, SEASON_LABEL, SEASON_NUMERAL } from "./season-facts";

describe("season facts", () => {
  it("labels season 1 exactly as the brief requires", () => {
    expect(SEASON_LABEL).toBe("Mövsüm 1 · 2026-10");
    expect(SEASON_NUMERAL).toBe("01");
    expect(CLAIMS_OPEN_LABEL).toBe("1 oktyabr 2026, 12:00");
  });
});
