import { expect, test } from "@playwright/test";

const routes: [string, string][] = [
  ["/", "Meloviziya"],
  ["/qaydalar", "Qaydalar"],
  ["/teqvim", "Təqvim"],
  ["/movsum/2026-10", "Mövsüm 2026-10"],
  ["/cedvel", "Cədvəl"],
  ["/reyestr", "Reyestr"],
  ["/olkeler", "Ölkələr"],
  ["/arxiv", "Arxiv"],
];

for (const [path, title] of routes) {
  test(`${path} renders its title and the site shell`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    await expect(page.getByRole("navigation", { name: "Əsas menyu" })).toBeVisible();
    await expect(page.getByText("Meloviziya Avropa Yayım Birliyi ilə əlaqəli deyil.")).toBeVisible();
  });
}

test("/movsum redirects to the current season", async ({ page }) => {
  await page.goto("/movsum");
  await expect(page).toHaveURL(/\/movsum\/2026-10$/);
});
