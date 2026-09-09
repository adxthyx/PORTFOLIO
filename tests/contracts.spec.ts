import { expect, test } from "@playwright/test"
import { contactSchema, escapeHtml } from "../lib/contact"

test("contact validation trims input and enforces server limits", () => {
  const valid = {
    name: "  Adithya  ",
    email: "test@example.com",
    subject: "Hello",
    message: "A useful message.",
  }
  expect(contactSchema.parse(valid).name).toBe("Adithya")
  expect(contactSchema.safeParse({ ...valid, message: "short" }).success).toBe(false)
  expect(contactSchema.safeParse({ ...valid, subject: " " }).success).toBe(false)
  expect(contactSchema.safeParse({ ...valid, message: "x".repeat(2001) }).success).toBe(false)
})

test("email HTML treats user markup as text", () => {
  expect(escapeHtml('<a href="https://example.com">Tom & Jane\'s message</a>')).toBe(
    "&lt;a href=&quot;https://example.com&quot;&gt;Tom &amp; Jane&#39;s message&lt;/a&gt;",
  )
})

test("API validation rejects malformed payloads before any provider call", async ({ request }) => {
  expect(
    (
      await request.post("/api/contact", {
        data: { name: "A", email: "bad", subject: "x", message: "short" },
      })
    ).status(),
  ).toBe(400)
  expect(
    (await request.post("/api/ask", { data: { postId: "ai-askaps", question: "x".repeat(501) } })).status(),
  ).toBe(400)
  expect(
    (await request.post("/api/ask", { data: { postId: "not-a-real-post", question: "Hello" } })).status(),
  ).toBe(404)
})
