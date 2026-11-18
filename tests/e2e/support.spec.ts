import { test, expect } from "@playwright/test";

// The Support page (the carrier phone app's store step, plan Task 7.2 — Armen 11-18 "ok"): Apple and Google both need a
// web address where people can reach us. The one address people write to is the site's own support@versysinc.com.

test.describe("Support page", () => {
  test("says how to reach us: the support email as plain text and as a link", async ({ page }) => {
    await page.goto("/support");
    await expect(page).toHaveTitle(/Support/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Support/);
    const email = page.locator("main").getByRole("link", { name: "support@versysinc.com" }).first();
    await expect(email).toBeVisible();
    await expect(email).toHaveAttribute("href", "mailto:support@versysinc.com");
  });

  test("links to the Privacy Policy and the Terms of Service", async ({ page }) => {
    await page.goto("/support");
    const main = page.locator("main");
    await expect(main.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "https://app.versysinc.com/privacy",
    );
    await expect(main.getByRole("link", { name: "Terms of Service" })).toHaveAttribute(
      "href",
      "https://app.versysinc.com/terms",
    );
  });

  test("the menu and the footer still reach the home page's sections from here", async ({ page }) => {
    await page.goto("/support");
    for (const href of ["/#tms", "/#fuel", "/#faq"]) {
      expect(await page.locator(`a[href="${href}"]`).count(), href).toBeGreaterThan(0);
    }
    // A bare "#tms" link only works on the home page — none may be left on another page.
    await expect(page.locator("a[href^='#']")).toHaveCount(0);
  });

  test("a section link still scrolls the home page to its section — and from /support it opens the home page there", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    const inView = async (id: string) =>
      page.evaluate((target) => {
        const box = document.getElementById(target)?.getBoundingClientRect();
        return box ? box.top < window.innerHeight && box.bottom > 0 : false;
      }, id);
    await page.goto("/");
    expect(await inView("faq")).toBe(false);
    await page.locator("nav").getByRole("link", { name: "FAQ", exact: true }).first().click();
    await expect(page).toHaveURL(/\/#faq$/);
    await expect.poll(() => inView("faq")).toBe(true);

    await page.goto("/support");
    await page.locator("nav").getByRole("link", { name: "TMS", exact: true }).first().click();
    await expect(page).toHaveURL(/\/#tms$/);
    await expect.poll(() => inView("tms")).toBe(true);
  });

  test("the footer links to the Support page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("footer").getByRole("link", { name: "Support" })).toHaveAttribute("href", "/support");
  });

  test("fits a phone: no sideways scrolling at 375 px", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/support");
    const widths = await page.evaluate(() => ({
      page: document.documentElement.scrollWidth,
      screen: window.innerWidth,
    }));
    expect(widths.page).toBeLessThanOrEqual(widths.screen);
  });
});
