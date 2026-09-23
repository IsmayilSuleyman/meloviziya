# Meloviziya site — Claude Code prompt plan

How to use this file: do step 0 yourself, then paste the prompts into Claude Code one at a time, in order, in a fresh session or the same one. Each prompt is self-contained and ends with a check you run before moving on. Do not paste two prompts at once. If a step fails its check, tell Claude Code what failed and let it fix that before you go to the next prompt.

Assumptions baked in (change them in `CLAUDE.md` first if you disagree): Next.js App Router + TypeScript + Tailwind, npm, Vercel, data from the published Google Sheet CSVs, UI in Azerbaijani, no database.

---

## Step 0 — before Claude Code (you, about 40 minutes)

1. Upload `Meloviziya - reyestr və səsvermə - 2026-10.xlsx` to Google Drive and open it as a Google Sheet. From now on the Google Sheet is the ledger; do not edit the Excel copy again.
2. File → Settings → set the locale to **United States** so CSV exports use `.` for decimals. (If you keep an Azerbaijani/Turkish locale the parser still copes, but US is simpler.)
3. File → Share → Publish to web. For each of these tabs choose the tab, choose **Comma-separated values (.csv)**, publish, and copy the link: `Parametrlər`, `Ölkələr`, `İştirakçılar`, `Reyestr`, `Mövsüm`, `Cədvəl`, `Arxiv`. Do **not** publish `Səsvermə` or `Oxu`.
4. Each link looks like `https://docs.google.com/spreadsheets/d/e/2PACX-…/pub?gid=123456&single=true&output=csv`. The long `2PACX-…` part is the same for every tab: that is `SHEET_PUB_ID`. The `gid` differs per tab: those are the `GID_*` values.
5. Create an empty GitHub repository named `meloviziya`. Create a Vercel account if you don't have one and connect GitHub.
6. Make a folder on your computer, put `CLAUDE.md` and the `fixtures/` folder from this kit in it, `git init`, and open Claude Code there.
7. Have ready: the Telegram group invite link, and (optional) the Spotify playlist link for October.

---

## Prompt 1 — scaffold and first deploy

```
Read CLAUDE.md fully before doing anything.

Scaffold this repository as a Next.js App Router project with TypeScript (strict), Tailwind CSS, ESLint and npm, in the current directory (do not create a subfolder). Keep the existing CLAUDE.md and fixtures/ untouched.

Then:
1. Add vitest and @playwright/test as dev dependencies with minimal config, and scripts: "typecheck" (tsc --noEmit), "test" (vitest run), "test:e2e" (playwright test), "check" (lint + typecheck + test + build).
2. Create .env.example listing every variable named in CLAUDE.md with empty values and a one-line comment each. Add .env to .gitignore.
3. Build the app shell: src/app/layout.tsx with <html lang="az">, a header with the wordmark "Meloviziya" and the nav items exactly as listed in CLAUDE.md (Ana səhifə, Qaydalar, Təqvim, Mövsüm, Cədvəl, Reyestr, Ölkələr, Arxiv), a footer with a link to the Telegram group read from NEXT_PUBLIC_TELEGRAM_URL and the line "Meloviziya Avropa Yayım Birliyi ilə əlaqəli deyil." Mobile-first, readable on a phone, system font stack, light and dark via prefers-color-scheme. No component library.
4. Create placeholder pages for every route in CLAUDE.md that render the page title and the empty-state string from CLAUDE.md. /movsum should redirect to /movsum/2026-10 for now (hard-coded; we replace it in Prompt 4).
5. Commit in small steps with one-line imperative messages.

Run npm run check and fix anything it reports. Show me the final file tree.
```

Check: `npm run dev` opens at localhost:3000 with the nav and all eight routes rendering. Push to GitHub, import the repo in Vercel, add the env vars from step 0, deploy. The Vercel URL shows the same shell.

---

## Prompt 2 — CSV data layer against the fixtures

```
Read CLAUDE.md, especially "Data source" and "Tab layouts". Build the data layer in src/lib/sheets/ exactly as the conventions there describe, and test it against the CSVs in fixtures/.

Requirements:
1. fetchCsv.ts: builds the URL from SHEET_PUB_ID and a GID, fetches with Next.js fetch and { next: { revalidate: 60 } }, returns the raw text. If the fetch throws or returns non-200, throw a typed SheetUnavailableError with the tab name. Add a small in-memory fallback: keep the last successful text per tab in module scope, and if a fetch fails but a previous text exists, return it and set a flag `stale: true` on the result.
2. parse.ts: papaparse-based helpers. `findHeaderRow(rows, headerCell)` returns the index of the first row whose first non-empty cell equals headerCell exactly (trimmed). `tableAfterHeader(rows, headerCell, stopWhenEmpty: columnName)` returns objects keyed by header text, stopping at the first row where that column is empty. `keyValueBlock(rows, firstLabel, count)` returns a Map for label/value rows. `parseNumber(s)` accepts "52 000 000", "52,000,000", "0,86", "0.86", "1 234,5", non-breaking spaces, and returns a number or null. `parseSeasonCode(s)` validates YYYY-MM.
3. One module per tab (parametrler, olkeler, istirakcilar, reyestr, movsum, cedvel, arxiv), each with a zod schema for a row, a typed `getX()` that fetches and parses, and a pure `parseX(csvText)` that the tests call. The tier table in Parametrlər becomes a sorted array of { minListeners, price, label }. Mövsüm returns { kod, istirakciSayi, umumiSes, indeksXam, indeksHududlanmis, indeksDondurulmus, iddialar[] }. Cədvəl returns rows in sheet order without re-sorting.
4. Tests with vitest: for every tab, parse the fixture and assert row counts and a few specific values (e.g. Ölkələr has 195 rows and "Azərbaycan" is present; Mövsüm kod is "2026-10", indeksDondurulmus is 1, the first claim is Robyn at 50 səs; Reyestr has 7 rows and Nümunə B's rows sum to 122; Cədvəl has 3 rows with Yer 1..3; Arxiv is empty). Add parseNumber tests for every format listed above. Add a test that a fixture with a comma decimal locale still parses.
5. Do not add any network call to the tests. Do not add a database. Do not compute prices or balances in code.

Run npm run check. Commit.
```

Check: `npm test` green. Temporarily add `console.log(await getOlkeler())` in a page, run `npm run dev` with a real `.env`, and confirm 195 countries come back from Google. Remove the log.

---

## Prompt 3 — season phase logic

```
Read the "rules the site must encode" section of CLAUDE.md. Implement src/lib/season/ as pure, fully tested code.

1. calendar.ts: `seasonDates(kod: "YYYY-MM")` returns every boundary for that season as Date objects in Asia/Baku: claimsOpen (1st 12:00), claimsClose (15th 23:59:59), playlistDay (18th 00:00), listeningEnd (24th 23:59:59), votingOpen (25th 00:00), votingClose (23:59:59 on the day before the last day), keepWindowOpen (25th 00:00), keepWindowClose (last day 23:59:59), revealStart (last day 20:00), seasonEnd (last day 23:59:59). Use a small, dependency-free zone helper or date-fns-tz; whichever you pick, it must be correct for Asia/Baku (fixed UTC+4, no DST) and must not use the server's local zone.
2. phase.ts: `getPhase(now: Date, kod?: string)` returns { kod, phase, label, nextDeadline: { at: Date, label: string } | null, keepWindowOpen: boolean, songsVisible: boolean }. Phase keys and labels are the table in CLAUDE.md. If kod is omitted, derive it from `now` in Baku time. songsVisible is true from the 16th 00:00. nextDeadline is the next boundary after `now` with a short Azerbaijani label ("İddialar bağlanır", "Pleylist", "Səsvermə başlayır", "Səsvermə bitir", "Açıqlama").
3. currentSeasonCode(now) and previousSeasonCode(kod), nextSeasonCode(kod).
4. format.ts: formatNumber (thousands with a normal space, decimals with a comma), formatAzn, formatDateAz ("31 oktyabr 2026"; month names in Azerbaijani, lowercase: yanvar, fevral, mart, aprel, may, iyun, iyul, avqust, sentyabr, oktyabr, noyabr, dekabr), formatTimeAz ("20:00"), formatDateTimeAz.
5. Tests: October 2026 boundaries (claims open 1 Oct 12:00 Baku = 1 Oct 08:00 UTC; voting closes 30 Oct 23:59:59; reveal 31 Oct 20:00), February 2027 (28 days: voting closes 27 Feb, reveal 28 Feb), a 30-day month, the phase at 15 Oct 23:59 vs 16 Oct 00:00, songsVisible flips at exactly 16th 00:00 Baku, and getPhase at 1 Oct 11:59 = pre / 12:00 = claims. Test formatNumber(52000000) = "52 000 000" and formatNumber(1) with 2 decimals = "1,00".

Run npm run check. Commit.
```

Check: tests green; `getPhase(new Date())` in a scratch page prints a sensible phase for today's date.

---

## Prompt 4 — the pages that read the sheet

```
Read CLAUDE.md. Replace the placeholder pages with real ones using the data layer (Prompt 2) and the season logic (Prompt 3). All pages are server components with `export const revalidate = 60`. Every page must handle SheetUnavailableError by rendering the page with the notice "Məlumat hazırda yenilənmir" at the top and stale data if available, never a 500.

1. / (Ana səhifə): the current season code as a heading ("Meloviziya 2026-10"), the current phase label, a countdown to nextDeadline (client component, updates every second, shows days/hours/minutes in Azerbaijani: "3 gün 4 saat 12 dəq"), the frozen index ("İndeks 1,00"), the number of delegations with a claim this season, links to /movsum/<kod>, /cedvel, and the Telegram group. During keep-window show the secondary notice "Ölkəni saxlamaq üçün təsdiq pəncərəsi açıqdır (25-i – ayın sonu)". If the Mövsüm tab has no claims, show "Hələ iddia yoxdur".
2. /teqvim: the seven phases of the current season with their exact dates and times, current phase highlighted, plus the same for the next season below it. Explain in one line under the table that all times are Baku time.
3. /movsum/[kod]: a table of claims for that season: №, Ölkə, İştirakçı, İfaçı, Mahnı, Aylıq dinləyici (formatted), Yerli/Xarici, Qiymət (səs). The Mahnı column is rendered ONLY if the season is a past season or songsVisible is true for the current season; otherwise the column header says "Mahnı" and every cell shows "gizli" (hidden). Above the table: the season index and the count. Below it: the Spotify playlist embed if NEXT_PUBLIC_PLAYLIST_URL is set and the season is the current one and the date is on or after the 18th. For a past season, read the rows from Arxiv instead of Mövsüm. /movsum redirects to the current season code computed from the date.
4. /cedvel: the scoreboard from the Cədvəl tab, in sheet order, columns Yer, Ölkə, İştirakçı, İfaçı — Mahnı, Xal, with Ölkə sayı and 12-lər in a smaller secondary style. Before reveal day show the empty-state string from CLAUDE.md above the table (the table may already contain example rows; show them anyway). Live mode is Prompt 5.
5. /reyestr: two sections. "Balanslar": the İştirakçılar tab (Ad, Ölkə, Balans, Bu mövsüm alınan səs, Qalan alış limiti). "Əməliyyatlar": the Reyestr tab newest first, with a season filter (server-side via ?movsum=YYYY-MM, default current). Show the frozen index at the top.
6. /olkeler: all 195 countries in a responsive grid or table with a status badge: "tutulub — <name>" or "boş". A text filter (client component) that matches the AZ and EN names case-insensitively including Azerbaijani letters (İ/i, I/ı). Counts at the top: tutulub / boş.
7. /arxiv: two sections. "Keçmiş mövsümlər": Arxiv rows grouped by season, newest first, top three highlighted. "Karantin": every artist and every song from Arxiv whose Karantin bitir is after the current season, with the season it was entered and the season it becomes free. Empty state strings from CLAUDE.md.

Keep the markup simple and semantic (tables for tables). Everything readable on a 360px-wide phone: horizontal scroll for wide tables, never truncated cells.

Run npm run check. Commit.
```

Check: with the real `.env`, every page shows the three Nümunə rows correctly; `/movsum/2026-10` hides songs today (it's before 16 October); `/olkeler` shows 3 taken, 192 free; `/reyestr` balances 50 / 122 / 85. Deploy and check the same on the Vercel URL.

---

## Prompt 5 — live scoreboard for the reveal

```
Read CLAUDE.md. Add live mode to /cedvel for the reveal evening, when the organiser types points into the sheet while sharing the page on screen in a Telegram voice chat.

1. Add a route handler GET /api/cedvel that returns the parsed Cədvəl tab as JSON with `Cache-Control: no-store`, fetching the CSV fresh (bypass the 60 s revalidate for this handler only). Include `{ fetchedAt, stale }`.
2. When /cedvel is opened with ?canli=1, render a client component that polls /api/cedvel every 15 seconds and renders a large-type scoreboard suited to screen sharing: dark background, one row per entry, flag emoji derived from the country if you can map the Azerbaijani country name to an ISO code via a small lookup table (fixtures/olkeler.csv has the English names; add an iso column to a static JSON you generate once, and leave a country with no match flagless), country, participant, points in a big numeral. Rows animate to their new position when the order changes (CSS transitions on transform, no library). Show "Son yenilənmə: HH:MM:SS" and a small pulsing dot while polling.
3. A "Tam ekran" button that requests browser fullscreen. Keyboard: F toggles fullscreen, R forces a refresh.
4. Do not change the normal (non-live) rendering.
5. Add a vitest test for the ISO lookup covering ten countries including Azərbaycan, Türkiyə, Birləşmiş Krallıq, Amerika Birləşmiş Ştatları, Çexiya, Kot-d'İvuar. Add a Playwright smoke test that opens /cedvel?canli=1 against a mocked /api/cedvel and checks that three rows render and reorder when the mock changes.

Run npm run check. Commit.
```

Check: open `/cedvel?canli=1` on the Vercel URL, change a Xal value in the Google Sheet, watch the row move within 15–20 seconds.

---

## Prompt 6 — the rulebook and static content

```
Read CLAUDE.md. Build /qaydalar.

1. I will paste the rulebook text into src/content/qaydalar.az.md and src/content/qaydalar.en.md myself. Create both files now with a placeholder heading only, and render them with a Markdown renderer (remark/rehype or next-mdx-remote, whichever is lighter) with sensible typography: numbered clauses as paragraphs (they are numbered in the text like "3.4." — do not convert them to <ol>), tables rendered as tables, no emoji, no icons.
2. The page shows the Azerbaijani text first and a language toggle (AZ | EN) as two anchor links at the top, not a client-side switch; both texts live on the same page, English below a heading "Rules (English, for information)".
3. Add a "Versiya" line at the top read from the first line of the AZ file if it starts with "Versiya".
4. Add /qaydalar to the sitemap and a robots.txt that allows everything. Add metadata: title "Meloviziya", description "Aylıq onlayn mahnı müsabiqəsi", Open Graph image generated with next/og showing the wordmark and the current season code.
5. Favicon: a simple generated SVG with the letter M; no heart shapes, nothing resembling the Eurovision logo.

Run npm run check. Commit.
```

Check: paste the two rulebook texts (from `Meloviziya - Qaydalar v1 - 2026-10.docx`, Azerbaijani part into the .az.md, English into the .en.md, tables converted to Markdown tables), reload `/qaydalar`, and read it on your phone.

---

## Prompt 7 — hardening and the monthly checklist

```
Read CLAUDE.md. Finish the site for launch.

1. Error handling audit: grep every getX() call site and confirm each page catches SheetUnavailableError and renders the stale notice. Add a test that renders the home page with a mocked failing fetch and asserts the notice text is present and the status is 200.
2. Performance: every page must be ISR (revalidate = 60) except /api/cedvel and the live client. Confirm no page is forced dynamic by accident (searchParams usage on /reyestr must not disable caching for the default view; use generateStaticParams or accept dynamic for that page only, and say which you chose and why).
3. Accessibility: tables have <caption>, badges have text not just colour, the countdown has aria-live="polite", focus states visible. Run a Lighthouse pass via the Playwright test or the CLI and fix anything below 90 on accessibility.
4. Write README.md with: what the site is (two sentences), how the data flows (sheet → published CSV → ISR), the env vars, how to run locally, and a section "Aylıq iş qaydası" in Azerbaijani listing what the organiser does in the sheet each month and when the site picks it up (1st: allowance rows + freeze the index; 1st–15th: claims; 16th: type the songs in; 18th: set NEXT_PUBLIC_PLAYLIST_URL and redeploy or make it a sheet cell; last day: type points into Səsvermə during the reveal, then paste Cədvəl into Arxiv as values). If you moved the playlist URL into the sheet (a "Pleylist" key/value row on the Mövsüm tab would be a reasonable change), document that and update the parser and CLAUDE.md accordingly.
5. Add a GitHub Actions workflow that runs npm run check on every push and pull request.

Run npm run check. Commit. Then list every TODO or assumption you had to make so I can review them.
```

Check: CI green on GitHub; Vercel production deploy green; open every route on a phone over mobile data.

---

## Prompt 8 — optional, after season 1 has run

Only after the October reveal, when you know what annoyed you. Candidates, each a separate prompt:

- A `/statistika` page: per participant, seasons entered, wins, average place, total səs spent, best-value pick (place divided by price).
- A per-season "postcard" gallery if you start collecting the delegations' one-paragraph pitches in a new sheet column.
- A JSON feed at `/api/season/current` so a future Telegram bot (if you ever want one) can read the same data.
- Year table (`/il/2027`) once there are three or more seasons in Arxiv.

Do not build any of these before October. The site's job in season 1 is to be correct and boring.

---

## What to tell Claude Code if it drifts

Paste one of these when needed:

- "Re-read CLAUDE.md. Songs of the current season must be hidden before the 16th regardless of what the sheet contains."
- "No database, no forms, no login. The sheet is the only write path."
- "Do not recompute prices, balances or the index. Display the sheet's values."
- "All date logic in Asia/Baku, never the server zone."
- "UI strings in Azerbaijani only, exactly as listed in CLAUDE.md."
