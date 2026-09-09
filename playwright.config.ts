import { defineConfig, devices } from "@playwright/test"
import { existsSync } from "node:fs"

// Use installed Chrome on macOS; CI can install Playwright's bundled Chromium.
const channel =
  process.env.PLAYWRIGHT_CHANNEL ||
  (!process.env.CI && existsSync("/Applications/Google Chrome.app") ? "chrome" : undefined)

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  timeout: 45000,
  expect: { timeout: 10000 },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3000",
    reducedMotion: "reduce",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    channel,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } } },
    { name: "mobile", use: { ...devices["iPhone 13"], defaultBrowserType: "chromium", channel } },
  ],
  webServer: {
    command: "pnpm start --hostname 127.0.0.1 --port 3000",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
})
