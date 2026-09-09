import { expect, test, type Page } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

const projectTitle = "AskAPS — AI Assistant for HPE Supply Chain Planning"
const projectPath = "/projects/ai-askaps"

async function showSaved(page: Page) {
  await page.getByRole("button", { name: "Project options", exact: true }).click()
  await page.getByRole("menuitemcheckbox", { name: "Saved projects", exact: true }).click()
}

test("the featured path leads to three projects, with the rest in the collection", async ({
  page,
  request,
}) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Adithya Narayana Holla")
  await expect(page.locator("[data-post-id]")).toHaveCount(3)
  expect(
    await page
      .locator("[data-post-id]")
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-post-id"))),
  ).toEqual(["ai-askaps", "reconcile", "rag-bench"])
  await expect(page.getByRole("button", { name: `Upvote ${projectTitle}` })).toHaveCount(0)
  await page.getByRole("button", { name: "Android", exact: true }).click()
  await expect(page.locator("[data-post-id]")).toHaveCount(1)
  await expect(page.locator('[data-post-id="reconcile"]')).toBeVisible()
  await page.getByRole("link", { name: "View all projects", exact: true }).click()
  await expect(page).toHaveURL("/projects")
  await expect(page.getByRole("article")).toHaveCount(10)
  await expect(page.getByRole("link", { name: /Kannada|Attendance Tracker/ })).toHaveCount(0)
  for (const slug of [
    "reconcile",
    "rag-bench",
    "chart-climber",
    "github-quiz",
    "repo-watch",
    "multicity-routing",
  ]) {
    expect((await request.get(`/projects/${slug}`)).status()).toBe(200)
  }
})

test("feed filters, search, sort and saved posts survive reloads", async ({ page }) => {
  await page.goto("/")
  const featured = page.locator('[data-post-id="ai-askaps"]')
  await featured.getByRole("button", { name: `Save ${projectTitle}`, exact: true }).click()
  await showSaved(page)
  await expect(page.locator("[data-post-id]")).toHaveCount(1)
  await page.reload()
  await expect(page.locator("[data-post-id]")).toHaveCount(1)
  await expect(featured.getByRole("button", { name: `Unsave ${projectTitle}`, exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  )
  const search = page.getByRole("searchbox", { name: "Search projects", exact: true })
  if (!(await search.isVisible()))
    await page.getByRole("button", { name: "Search projects", exact: true }).click()
  await search.fill("no-such-project-xyz")
  await expect(page.getByText("Nothing here just yet", { exact: true })).toBeVisible()
  await page.getByRole("button", { name: "Back to featured projects" }).click()
  await expect(page.locator("[data-post-id]")).toHaveCount(3)
  await page.getByRole("button", { name: "Web", exact: true }).click()
  await expect(page.locator("[data-post-id]")).toHaveCount(5)
  await page.getByRole("button", { name: "Project options", exact: true }).click()
  await page.getByRole("menuitemradio", { name: "Recently updated", exact: true }).click()
  await page.reload()
  await expect(page.getByRole("button", { name: "Web", exact: true })).toHaveAttribute("aria-pressed", "true")
  await page.getByRole("button", { name: "Project options", exact: true }).click()
  await expect(page.getByRole("menuitemradio", { name: "Recently updated", exact: true })).toHaveAttribute(
    "aria-checked",
    "true",
  )
})

test("desktop reader preserves votes, synchronizes saves, and supports history and focus", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Mobile opens the canonical page")
  await page.goto("/")
  const featured = page.locator('[data-post-id="ai-askaps"]')
  const title = featured.getByRole("link", { name: projectTitle, exact: true })
  await title.click()
  const dialog = page.getByRole("dialog")
  await expect(dialog).toBeVisible()
  await expect(page).toHaveURL(/post=ai-askaps/)
  await dialog.getByRole("button", { name: `Upvote ${projectTitle}`, exact: true }).click()
  await dialog.getByRole("button", { name: "Save", exact: true }).click()
  await page.goBack()
  await expect(dialog).toBeHidden()
  await expect(featured.getByRole("button", { name: `Unsave ${projectTitle}`, exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  )
  await expect(title).toBeFocused()
  await page.goForward()
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole("button", { name: `Upvote ${projectTitle}`, exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  )
  await page.keyboard.press("Escape")
  await expect(dialog).toBeHidden()
  await expect(page).not.toHaveURL(/post=/)
})

test("mobile cards navigate to a complete article and preserve feed filters on Back", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Desktop uses an inline reader")
  await page.goto("/")
  await page.getByRole("button", { name: "AI / ML", exact: true }).click()
  await page
    .locator('[data-post-id="ai-askaps"]')
    .getByRole("link", { name: projectTitle, exact: true })
    .click()
  await expect(page).toHaveURL(projectPath)
  await expect(page.getByRole("heading", { name: projectTitle, level: 1 })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Let's talk about it" })).toBeVisible()
  await page.goBack()
  await expect(page.getByRole("button", { name: "AI / ML", exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  )
  await expect(page.locator("[data-post-id]")).toHaveCount(3)
})

test("Enter on a focused save button is not hijacked by feed shortcuts", async ({ page, isMobile }) => {
  test.skip(isMobile, "Keyboard-specific behavior")
  await page.goto("/")
  await page.keyboard.press("j")
  const save = page
    .locator('[data-post-id="ai-askaps"]')
    .getByRole("button", { name: `Save ${projectTitle}`, exact: true })
  await save.focus()
  await page.keyboard.press("Enter")
  await expect(
    page
      .locator('[data-post-id="ai-askaps"]')
      .getByRole("button", { name: `Unsave ${projectTitle}`, exact: true }),
  ).toHaveAttribute("aria-pressed", "true")
  await expect(page.getByRole("dialog")).toBeHidden()
})

test("invalid persisted data cannot crash the feed", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("r-adithya:votes:v1", "null")
    localStorage.setItem("r-adithya:saved:v1", '{"not":"an array"}')
    localStorage.setItem("r-adithya:achievements:v1", "42")
    localStorage.setItem("r-adithya:openedPosts:v1", '"bad shape"')
  })
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  await page.goto("/")
  await expect(page.locator("[data-post-id]")).toHaveCount(3)
  await page
    .locator('[data-post-id="ai-askaps"]')
    .getByRole("button", { name: `Save ${projectTitle}`, exact: true })
    .click()
  await expect(
    page
      .locator('[data-post-id="ai-askaps"]')
      .getByRole("button", { name: `Unsave ${projectTitle}`, exact: true }),
  ).toHaveAttribute("aria-pressed", "true")
  expect(errors).toEqual([])
})

test("blocked browser storage still allows votes and saves for the session", async ({ page }) => {
  await page.addInitScript(() =>
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Storage blocked", "SecurityError")
      },
    }),
  )
  await page.goto(projectPath)
  await page.getByRole("button", { name: `Upvote ${projectTitle}`, exact: true }).click()
  await expect(page.getByRole("button", { name: `Upvote ${projectTitle}`, exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  )
  await page.getByRole("button", { name: "Save", exact: true }).click()
  await page.getByRole("link", { name: "r/adithya home", exact: true }).click()
  await showSaved(page)
  await expect(page.locator("[data-post-id]")).toHaveCount(1)
})

test("contact retains a failed draft and only clears it after confirmed delivery", async ({ page }) => {
  let submissions = 0
  await page.route("**/api/contact", async (route) => {
    submissions++
    await route.fulfill({
      status: submissions === 1 ? 502 : 200,
      json: submissions === 1 ? { error: "Delivery failed. Please try again." } : { success: true },
    })
  })
  await page.goto("/?modal=contact")
  const dialog = page.getByRole("dialog")
  await dialog.getByLabel("Your name").fill("Portfolio test")
  await dialog.getByLabel("Your email").fill("test@example.com")
  await dialog.getByLabel("What's on your mind?").fill("A test subject")
  await dialog.getByLabel("Your message").fill("This draft should survive a failed delivery.")
  await dialog.getByRole("button", { name: "Send message", exact: true }).click()
  await expect(dialog.getByRole("alert")).toContainText("Delivery failed")
  await expect(dialog.getByLabel("Your message")).toHaveValue("This draft should survive a failed delivery.")
  await dialog.getByRole("button", { name: "Send message", exact: true }).click()
  await expect(dialog).toBeHidden()
  await page.getByRole("link", { name: "Say hello" }).click()
  await expect(dialog.getByLabel("Your message")).toHaveValue("")
  expect(submissions).toBe(2)
})

test("assistant sends only a post id and question, and supports retry", async ({ page }) => {
  let attempts = 0
  await page.route("**/api/ask", async (route) => {
    attempts++
    expect(route.request().postDataJSON()).toEqual({ postId: "ai-askaps", question: "How does this work?" })
    await route.fulfill({
      status: attempts === 1 ? 503 : 200,
      json:
        attempts === 1
          ? { error: "Temporarily unavailable. Try again." }
          : { answer: "It combines document retrieval, ticket search, and SQL in Teams." },
    })
  })
  await page.goto(projectPath)
  await page.getByRole("textbox", { name: "Ask a question", exact: true }).fill("How does this work?")
  await page.getByRole("button", { name: "Ask a question", exact: true }).click()
  await expect(page.getByRole("log")).toContainText("Temporarily unavailable")
  await page.getByRole("button", { name: "Try again", exact: true }).click()
  await expect(page.getByRole("log")).toContainText("It combines document retrieval")
  await expect(page.getByRole("log").getByText("How does this work?", { exact: true })).toHaveCount(1)
  await page.locator('a[href="/projects/reconcile"]').click()
  await expect(page).toHaveURL("/projects/reconcile")
  await expect(page.getByRole("log")).not.toContainText("How does this work?")
  await page.goBack()
  await expect(page.getByRole("log")).toContainText("How does this work?")
  await expect(page.getByRole("log")).toContainText("It combines document retrieval")
})

test("full article visits, votes, and saves earn the same visitor trophies as the feed", async ({ page }) => {
  await page.goto("/projects/ai-askaps")
  await page.getByRole("button", { name: `Upvote ${projectTitle}`, exact: true }).click()
  await page.getByRole("button", { name: "Save", exact: true }).click()
  await page.locator('a[href="/projects/reconcile"]').click()
  await page.locator('a[href="/projects/rag-bench"]').click()
  await page.getByRole("link", { name: "r/adithya home", exact: true }).click()
  const trophies = page.getByRole("complementary", { name: "About Adithya and useful links" })
  await expect(trophies.getByText("Karma Dealer", { exact: true })).toBeHidden()
  await trophies.getByText("Just for fun: visitor trophies", { exact: true }).click()
  await expect(trophies.getByText("Karma Dealer", { exact: true })).toBeVisible()
  await expect(trophies.getByText("Curator", { exact: true })).toBeVisible()
  await expect(trophies.getByText("Explorer", { exact: true })).toBeVisible()
})

test("one unavailable statistics source does not hide the other", async ({ page }) => {
  await page.route("**/api/github-stats", (route) =>
    route.fulfill({ status: 503, json: { error: "Unavailable" } }),
  )
  await page.route("**/api/leetcode-stats", (route) =>
    route.fulfill({
      json: {
        totalSolved: 221,
        easy: 74,
        medium: 121,
        hard: 26,
        ranking: 698700,
        languages: [{ name: "Python3", solved: 209 }],
        updatedAt: "2026-09-06T00:00:00Z",
      },
    }),
  )
  await page.goto("/?modal=stats")
  const dialog = page.getByRole("dialog")
  await expect(dialog.getByText("Activity is taking a little break")).toBeVisible()
  await dialog.getByRole("button", { name: "LeetCode", exact: true }).click()
  await expect(dialog.getByText("Problems solved", { exact: true })).toBeVisible()
  await expect(dialog.getByText("221", { exact: true })).toBeVisible()
})

test("legacy post links still open and unknown pages return 404", async ({ page, request }) => {
  await page.goto("/?post=ai-askaps")
  await expect(page.getByRole("dialog")).toBeVisible()
  await page.getByRole("button", { name: "Close post" }).click()
  await expect(page.getByRole("dialog")).toBeHidden()
  expect((await request.get("/projects/no-such-project")).status()).toBe(404)
  expect((await request.get("/posts/no-such-post")).status()).toBe(404)
  expect((await request.get("/resume.pdf")).status()).toBe(200)
  expect((await request.get("/projects/ai-kannada")).status()).toBe(200)
  expect((await request.get("/projects/ai-attendance")).status()).toBe(200)
})

for (const scheme of ["light", "dark"] as const) {
  test(`pages have accessible structure, readable contrast, and no overflow in ${scheme} mode`, async ({
    page,
  }) => {
    test.setTimeout(150000)
    await page.emulateMedia({ colorScheme: scheme })
    await page.addInitScript((theme) => {
      if (window === window.top && location.origin === "http://127.0.0.1:3000") {
        localStorage.setItem("theme", theme)
      }
    }, scheme)
    const errors: string[] = []
    page.on("pageerror", (error) => errors.push(error.message))
    for (const path of [
      "/",
      "/about",
      "/projects",
      projectPath,
      "/projects/reconcile",
      "/projects/rag-bench",
      "/posts/about",
      "/blog",
    ]) {
      await page.goto(path)
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1)
      await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible()
      expect((await page.title()).split("Adithya Narayana Holla").length - 1).toBe(1)
      await expect
        .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
        .toBe(true)
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()
      expect(
        results.violations.map((violation) => ({
          id: violation.id,
          nodes: violation.nodes.map((node) => node.target),
        })),
        `${path} (${scheme})`,
      ).toEqual([])
    }
    expect(errors).toEqual([])
  })
}
