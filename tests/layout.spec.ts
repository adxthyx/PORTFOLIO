import { expect, test } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

for (const scheme of ["light", "dark"] as const) {
  test(`dialogs and error messages remain accessible in ${scheme} mode`, async ({ page }) => {
    test.setTimeout(90000)
    await page.emulateMedia({ colorScheme: scheme })
    await page.addInitScript((theme) => {
      // Resume embeds and browser PDF frames do not expose the page's storage.
      if (window === window.top && location.origin === "http://127.0.0.1:3000") {
        localStorage.setItem("theme", theme)
      }
    }, scheme)
    const errors: string[] = []
    page.on("pageerror", (error) => errors.push(error.message))
    for (const modal of ["contact", "achievements", "settings", "projects", "resume"]) {
      await page.goto(`/?modal=${modal}`)
      const dialog = page.getByRole("dialog")
      await expect(dialog).toBeVisible()
      const bounds = await dialog.boundingBox()
      const viewport = page.viewportSize()!
      expect(bounds!.x).toBeGreaterThanOrEqual(0)
      expect(bounds!.y).toBeGreaterThanOrEqual(0)
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width + 1)
      expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(viewport.height + 1)
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()
      expect(
        results.violations.map((violation) => ({
          id: violation.id,
          nodes: violation.nodes.map((node) => node.target),
        })),
        modal,
      ).toEqual([])
    }
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 502, json: { error: "Delivery failed. Please try again." } }),
    )
    await page.goto("/?modal=contact")
    await page.getByLabel("Your name").fill("Portfolio test")
    await page.getByLabel("Your email").fill("test@example.com")
    await page.getByLabel("What's on your mind?").fill("A test subject")
    await page.getByLabel("Your message").fill("This message tests the form error presentation.")
    await page.getByRole("button", { name: "Send message", exact: true }).click()
    await expect(page.getByRole("alert")).toContainText("Delivery failed")
    const contactResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze()
    expect(
      contactResults.violations.map((violation) => ({
        id: violation.id,
        nodes: violation.nodes.map((node) => node.target),
      })),
      "Contact error state",
    ).toEqual([])

    await page.route("**/api/ask", (route) =>
      route.fulfill({
        status: 503,
        json: { error: "The assistant is temporarily unavailable. Please try again." },
      }),
    )
    await page.goto("/projects/ai-askaps")
    await page
      .getByRole("textbox", { name: "Ask a question", exact: true })
      .fill("Tell me more about this project.")
    await page.getByRole("button", { name: "Ask a question", exact: true }).click()
    await expect(page.getByRole("log")).toContainText("temporarily unavailable")
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()
    expect(
      results.violations.map((violation) => ({
        id: violation.id,
        nodes: violation.nodes.map((node) => node.target),
      })),
      "Assistant error state",
    ).toEqual([])
    expect(errors).toEqual([])
  })
}

test("phone, tablet, and laptop layouts keep content within the viewport and the first project in view", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Explicit viewports are checked once")
  test.setTimeout(60000)
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 800 })
    for (const path of [
      "/",
      "/about",
      "/projects",
      "/projects/ai-askaps",
      "/blog",
      "/?view=recruiter",
      "/?modal=contact",
    ]) {
      await page.goto(path)
      if (path.includes("modal=")) await expect(page.getByRole("dialog")).toBeVisible()
      else await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1)
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${path} at ${width}px`,
      ).toBe(true)
      if (path === "/") {
        const title = await page.locator("#post-title-ai-askaps").boundingBox()
        expect(title!.y + title!.height, `First project at ${width}px`).toBeLessThan(720)
      }
    }
  }
})

test("appearance changes persist and the command palette opens its chosen action", async ({
  page,
  isMobile,
}) => {
  await page.goto("/")
  await page.getByRole("button", { name: "More options", exact: true }).click()
  await page.getByRole("menuitem", { name: "Dark", exact: true }).click()
  await expect(page.locator("html")).toHaveClass(/dark/)
  await page.reload()
  await expect(page.locator("html")).toHaveClass(/dark/)
  if (isMobile) {
    await page.getByRole("button", { name: "More options", exact: true }).click()
    await page.getByRole("menuitem", { name: "Command palette", exact: true }).click()
  } else await page.keyboard.press("Control+k")
  await expect(page.getByRole("dialog", { name: "Command palette" })).toBeVisible()
  await page.getByRole("combobox").fill("Contact me")
  await page.getByRole("option", { name: "Contact me" }).click()
  await expect(page.getByRole("dialog")).toHaveCount(1)
  await expect(page.getByLabel("Your name")).toBeVisible()
  await expect(page.getByRole("dialog").locator(":focus")).toHaveCount(1)
  await page.keyboard.press("Escape")
  await expect(page.getByRole("dialog")).toBeHidden()
})
