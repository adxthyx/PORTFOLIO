import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { applyRateLimit, sanitizeText } from "@/lib/api-security"
import { contactSchema, escapeHtml } from "@/lib/contact"

export async function POST(request: NextRequest) {
  const limit = applyRateLimit(request, { key: "contact", limit: 5, windowMs: 10 * 60 * 1000 })
  if (!limit.allowed)
    return NextResponse.json(
      { error: "You've sent a few messages already. Please try again in a little while." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000))) },
      },
    )
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "The message couldn't be read. Please try again." }, { status: 400 })
  }
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success)
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  if (!process.env.RESEND_API_KEY)
    return NextResponse.json(
      { error: "The contact form is unavailable right now. Please use the email link below." },
      { status: 503 },
    )
  const { name, email, subject, message } = parsed.data
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
      to: [process.env.CONTACT_EMAIL || "adithyanarayana02@gmail.com"],
      replyTo: email,
      subject: `Portfolio Contact: ${sanitizeText(subject)}`,
      text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
      html: `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:auto"><h2>Portfolio message</h2><p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p><strong>Subject:</strong> ${escapeHtml(subject)}</p><div style="border-top:1px solid #ddd;padding-top:16px">${escapeHtml(message).replace(/\n/g, "<br>")}</div></div>`,
    })
    if (error) {
      console.error("Contact delivery failed:", error.name)
      return NextResponse.json(
        { error: "Delivery failed. Your message is still here; try again or use the email link below." },
        { status: 502 },
      )
    }
    return NextResponse.json({ success: true, messageId: data?.id })
  } catch {
    return NextResponse.json(
      { error: "Couldn't confirm delivery. Please try again later or use the email link below." },
      { status: 502 },
    )
  }
}
