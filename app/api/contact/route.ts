import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"

import { applyRateLimit, sanitizeText } from "@/lib/api-security"

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(2000),
})

export async function POST(request: NextRequest) {
  const rateLimit = applyRateLimit(request, {
    key: "contact",
    limit: 5,
    windowMs: 10 * 60 * 1000,
  })

  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
  }

  try {
    const body = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid contact form submission" }, { status: 400 })
    }

    const { name, email, subject, message } = parsed.data

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // Use your verified domain
      to: [process.env.CONTACT_EMAIL || "adithyanarayana02@gmail.com"],
      subject: `Portfolio Contact: ${sanitizeText(subject)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FF4500; border-bottom: 2px solid #FF4500; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <div style="background-color: #fff; padding: 15px; border-left: 4px solid #FF4500; border-radius: 4px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This message was sent from your portfolio contact form.</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
    }

    return NextResponse.json({ success: true, messageId: data?.id })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
