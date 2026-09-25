/**
 * Hard-coded facts about the current season, used by the shell while no data
 * layer exists. Prompt 3/4 replaces every value here with figures computed from
 * the Mövsüm tab and the Baku-time calendar in src/lib/season/.
 */
export const CURRENT_SEASON_CODE = "2026-10";
export const CURRENT_SEASON_NUMBER = 1;

/** Eyebrow shown above page titles and in the home hero. */
export const SEASON_LABEL = `Mövsüm ${CURRENT_SEASON_NUMBER} · ${CURRENT_SEASON_CODE}`;

/** Season number as a two-digit poster numeral ("01"). */
export const SEASON_NUMERAL = String(CURRENT_SEASON_NUMBER).padStart(2, "0");

/** When the claims window of the current season opens, Baku time. */
export const CLAIMS_OPEN_LABEL = "1 oktyabr 2026, 12:00";
