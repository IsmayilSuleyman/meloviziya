# Meloviziya — project context for Claude Code

Read this before doing anything in this repo. It is the single source of truth for what the site is, where its data comes from, and what it must never do.

## What Meloviziya is

A monthly online song contest run in a Telegram group by İsmayıl Süleyman (Baku). Each participant is the "delegation" of one country, enters one artist and one song per season, and awards Eurovision-style points (12, 10, 8, 7, 6, 5, 4, 3, 2, 1) to the others. A season is one calendar month, named `YYYY-MM`. Season 1 is `2026-10`. Participants hold an in-game currency called **səs** (plural is the same word) which they spend on artist rights; ballot points are called **xal**. Səs never converts into xal.

This website is the public record and the announcement board. It is read-only. All data lives in one Google Sheet that the organiser edits by hand; the site reads that sheet through its published CSV links. There is no database, no login, no admin UI, no forms, no bot. Do not add any of those.

The Telegram group is where the game happens. The site links to it; it does not replace it.

## Non-negotiables

- Never use the words "Eurovision", "Eurovision Song Contest" or "EBU" as branding, and never use the Eurovision heart logo or any derivative. The rules page may mention, once, that Meloviziya has no connection with the EBU. That is the only allowed mention.
- The site's UI language is Azerbaijani (Latin script, letters ə ı ö ü ç ş ğ İ). The rulebook page is bilingual (Azerbaijani binding, English for information). Do not machine-translate UI strings into English or Russian.
- All times are Baku time, `Asia/Baku`, UTC+4, no daylight saving. Every date computation goes through that zone explicitly. Never rely on the server's or the browser's local zone.
- Songs are secret until the 15th of the month at 23:59. Whatever the sheet contains, the site must not render the `Mahnı` column of the current season before the 16th 00:00 Baku time. Past seasons show songs.
- The ballot matrix (sheet tab `Səsvermə`) is never published and never read by the site. The site reads the sorted scoreboard tab `Cədvəl` only.
- Show data exactly as the sheet says. No client-side recalculation of prices, balances or the index; those are computed in the sheet and the sheet is authoritative. The site may derive presentation-only values (phase of the month, countdowns, free/taken country status, quarantine end dates).
- No localStorage, no cookies, no analytics, no third-party scripts except the Spotify playlist embed on the season page.
- If a CSV fetch fails, render the page with an inline notice ("Məlumat hazırda yenilənmir") and whatever cached data Next.js has. Never throw a 500 because Google was slow.

## Stack

- Next.js (App Router), TypeScript strict, Tailwind CSS. No component library.
- Data fetching in server components with `export const revalidate = 60` (ISR). The live scoreboard page additionally polls on the client every 15 seconds via a route handler.
- CSV parsing with `papaparse`. Runtime validation with `zod`.
- Tests with `vitest` (unit) and `@playwright/test` (smoke). CI = `npm run lint && npm run typecheck && npm test && npm run build`.
- Deployed on Vercel from the `main` branch. Environment variables are set in Vercel; `.env.example` lists them.
- Package manager: npm. Node 20+.

## Data source: the Google Sheet

One spreadsheet. Each tab is published to the web as CSV (File → Share → Publish to web → tab → CSV). The published URL has the form:

```
https://docs.google.com/spreadsheets/d/e/{SHEET_PUB_ID}/pub?gid={GID}&single=true&output=csv
```

Environment variables:

```
SHEET_PUB_ID=            # the long id after /d/e/
GID_PARAMETRLER=
GID_OLKELER=
GID_ISTIRAKCILAR=
GID_REYESTR=
GID_MOVSUM=
GID_CEDVEL=
GID_ARXIV=
NEXT_PUBLIC_TELEGRAM_URL=
NEXT_PUBLIC_PLAYLIST_URL=   # Spotify playlist of the current season, optional
```

Sample CSVs for every tab are in `fixtures/`. They were exported from the organiser's workbook and have the same shape a Google publish-to-web CSV has: title rows above the header, empty trailing columns, formula results as plain values. Write the parsers against these fixtures and test against them. The rows named `Nümunə A/B/C` are example data.

The spreadsheet locale may emit decimals with a comma (`0,86`) instead of a point. Number parsing must accept both, and must strip thousands separators (space, comma, non-breaking space).

### Tab layouts (header row = the first row whose first cell equals the given header cell; everything above it is title text and is ignored)

**Parametrlər** (`fixtures/parametrler.csv`). Two blocks.
Block 1, rows with a label in column A and a value in column B, starting at "Aylıq pay (səs)":

| Label (col A) | Meaning |
|---|---|
| Aylıq pay (səs) | monthly allowance, 100 |
| Alış limiti (səs / iştirakçı / mövsüm) | purchase cap per season, 60 |
| Səs qiyməti (1 AZN = ... səs) | 10 |
| Ölkə saxlama haqqı (səs) | keep fee, 10 |
| 1-ci yer mükafatı (səs) / 2-ci / 3-cü | 30 / 15 / 10 |
| 1-ci yer mükafatı (AZN) | 20 |
| Yerli ifaçı əmsalı / Xarici ifaçı əmsalı | 0.5 / 2 |
| İndeks minimum / İndeks maksimum | 0.5 / 2 |
| Cərimə: bülleten verməmə (səs) | 20 |
| İfaçı karantini (mövsüm sayı) | 12 |
| Minimum nümayəndə heyəti sayı | 8 |

Block 2, header cell "Aylıq dinləyici (bu saydan başlayaraq)": columns `Aylıq dinləyici (bu saydan başlayaraq)` (lower bound, integer), `Baza qiymət (səs)`, `Pillə` (label). Six rows.

**Ölkələr** (`fixtures/olkeler.csv`). Header cell "№". Columns: `№`, `Ölkə (AZ)`, `Country (EN)`, `Status` ("BMT üzvü" | "BMT müşahidəçisi"), `Kim tutub (cari mövsüm)` (participant name or empty). 195 rows.

**İştirakçılar** (`fixtures/istirakcilar.csv`). Header cell "Ad". Columns: `Ad`, `Telegram`, `Ölkə (cari)`, `Qoşulma tarixi`, `Balans (səs)`, `Bu mövsüm alınan səs`, `Qalan alış limiti`, `Bu mövsüm iddia var?` ("Bəli" | "Xeyr"). Stop at the first row with an empty `Ad`.

**Reyestr** (`fixtures/reyestr.csv`). Header cell "Tarix". Columns: `Tarix` (YYYY-MM-DD), `İştirakçı`, `Əməliyyat növü` (one of: Aylıq pay, Alış, İfaçı, Saxlama haqqı, Yer mükafatı, Cərimə, Geri qaytarma, Digər), `Səs (+/-)` (signed integer), `AZN` (number or empty), `Qeyd`, `Mövsüm` (YYYY-MM). Stop at the first row with an empty `Tarix`.

**Mövsüm** (`fixtures/movsum.csv`). Two blocks.
Block 1, key/value rows in columns A/B: `Mövsüm kodu` (YYYY-MM), `İştirakçı sayı`, `Ümumi səs (bütün balanslar)`, `İndeks (xam) …`, `İndeks (hüdudlanmış, 2 onluq)`, `İndeks — DONDURULMUŞ (…)`. The value the site shows as "this season's index" is the DONDURULMUŞ (frozen) one.
Block 2, header cell "№": columns `№`, `İştirakçı`, `Ölkə`, `İfaçı`, `Mahnı`, `Aylıq dinləyici (Spotify)`, `Yerli?` ("Bəli" | "Xeyr"), `Baza (səs)`, `Əmsal`, `İndeks`, `Qiymət (səs)`, `Qeyd / iddia tarixi`. Stop at the first row with an empty `İştirakçı`.

**Cədvəl** (`fixtures/cedvel.csv`). Header cell "Yer". Columns: `Yer`, `Ölkə`, `İştirakçı`, `İfaçı — Mahnı`, `Xal`, `Ölkə sayı`, `12-lər`. Stop at the first row with an empty `Yer`. Row 1 of the tab is a title like "MELOVİZİYA 2026-10 — nəticə lövhəsi"; the season code can be read from it but prefer `Mövsüm kodu` from the Mövsüm tab.

**Arxiv** (`fixtures/arxiv.csv`). Header cell "Mövsüm". Columns: `Mövsüm`, `Yer`, `Ölkə`, `İştirakçı`, `İfaçı`, `Mahnı`, `Xal`, `Ölkə sayı`, `12-lər`, `Ödənilən qiymət (səs)`, `Karantin bitir` (YYYY-MM, the first season in which the artist and song may be entered again). Empty until the first season has been revealed.

## The rules the site must encode (from the rulebook v1; the sheet holds the numbers)

Season calendar, all Baku time, `L` = last day of the month:

| Window | Phase key | Azerbaijani label |
|---|---|---|
| 1st 00:00 – 1st 11:59 | `pre` | Mövsüm başlayır |
| 1st 12:00 – 15th 23:59 | `claims` | İddia dövrü |
| 16th 00:00 – 17th 23:59 | `prep` | Pleylist hazırlanır |
| 18th 00:00 – 24th 23:59 | `listening` | Dinləmə |
| 25th 00:00 – (L−1) 23:59 | `voting` | Səsvermə |
| L 00:00 – L 19:59 | `reveal-day` | Açıqlama günü |
| L 20:00 – L 23:59 | `reveal` | Nəticələr açıqlanır |

Also, 25th 00:00 – L 23:59 is the country-confirmation window (`keep-window`), which overlaps `voting` and `reveal-day`; show it as a secondary notice, not as a phase.

Song visibility: `Mahnı` for the current season is shown only from the 16th 00:00.

Quarantine: an artist or song entered in season S is blocked until the season given in `Karantin bitir` (S + 12 months). The site lists blocked artists and songs with their release season.

Country status: a country is "tutulub" (taken) if `Kim tutub` is non-empty, otherwise "boş" (free).

Tie-break order for the scoreboard is already applied in the sheet (the `Yer` column is authoritative). Do not re-sort.

Fees: seasons 1–5 (2026-10 to 2027-02) free; from season 6 a seat fee of 2, 5 or 10 AZN announced a season ahead; founder rate 2 AZN through 2027 for anyone who entered at least 3 of the first 5 seasons. The site states this on the rules page only; it does not compute it.

## UI vocabulary (use exactly these strings)

Nav: `Ana səhifə`, `Qaydalar`, `Təqvim`, `Mövsüm`, `Cədvəl`, `Reyestr`, `Ölkələr`, `Arxiv`.
Routes: `/`, `/qaydalar`, `/teqvim`, `/movsum/[kod]` (`/movsum` redirects to the current season), `/cedvel` (`/cedvel?canli=1` = live mode), `/reyestr`, `/olkeler`, `/arxiv`.
Common words: səs, xal, nümayəndə heyəti, ifaçı, mahnı, iddia, indeks, balans, mövsüm, açıqlama, müşahidəçi (scrutineer), karantin, tutulub / boş, yerli / xarici.
Numbers: thousands with a space (`52 000 000`), decimals with a comma (`1,00`), currency as `20 AZN`, dates as `31 oktyabr 2026`, times as `20:00`.
Empty states: `Mövsüm hələ başlamayıb`, `Hələ iddia yoxdur`, `Nəticələr açıqlama günü burada görünəcək`, `Arxiv boşdur`.

## Repo conventions

- `src/lib/sheets/` — one file per tab: `fetchCsv.ts` (network + cache), `parse.ts` (header-row finder, number parser), `parametrler.ts`, `olkeler.ts`, `istirakcilar.ts`, `reyestr.ts`, `movsum.ts`, `cedvel.ts`, `arxiv.ts`, each exporting a zod schema and a `getX()` function.
- `src/lib/season/` — `phase.ts` (pure, tested), `calendar.ts` (dates for a given season code), `format.ts` (number/date formatting for az-AZ).
- `src/content/qaydalar.az.md` and `qaydalar.en.md` — the rulebook text, rendered as Markdown. Do not paraphrase the rulebook; paste the text the organiser provides.
- Tests next to code as `*.test.ts`. Fixtures under `fixtures/` at repo root.
- Commit messages in English, imperative, one line.
- Never commit `.env`. Never hard-code a Google URL; always build it from env.
