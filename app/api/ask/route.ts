import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { z } from "zod"

import { applyRateLimit, sanitizeText } from "@/lib/api-security"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "")

const askSchema = z.object({
  question: z.string().trim().min(1).max(500),
  context: z.string().trim().min(1).max(12000),
  postTitle: z.string().trim().min(1).max(200),
})

export async function POST(request: NextRequest) {
  const rateLimit = applyRateLimit(request, {
    key: "ask",
    limit: 20,
    windowMs: 10 * 60 * 1000,
  })

  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
  }

  try {
    const body = await request.json()
    const parsed = askSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid question payload" }, { status: 400 })
    }

    const { question, context, postTitle } = parsed.data

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      )
    }

    const model = genAI.getGenerativeModel({ model: "gemma-3-27b-it" })

    const systemPrompt = `
You are Adithya Narayana, a Software Engineer at HPE India and a graduate from Ramaiah Institute of Technology in AI & ML.
You are responding to a comment on your portfolio website, which is themed like Reddit.
The user is asking a question about a specific post/project titled: "${sanitizeText(postTitle)}".

Context about the post:
${context}

General info about you:
- AI & ML enthusiast, graduated 2025.
- Software Engineering Intern at HPE (Feb-Aug 2025), now full-time SWE-1.
- Expertise: Python, NextJS, FastAPI, Flask, JS, Streamlit, LangChain.
- Interests: Bike riding, trekking, story-mode gaming (RDR2, GTA 5, etc.), movies, reading.
- Personality: Helpful, tech-obsessed, dark mode enthusiast, vegetarian, dog lover (2 Dachshunds).
- Tone: Friendly, professional yet casual (like a Redditor), helpful, and concise.

Instructions:
1. Answer the question based on the context provided.
2. If the question is about you generally, use your general info.
3. Keep the response relatively short (1-3 sentences) as it's a Reddit comment.
4. Don't use too many emojis, but one or two is fine.
5. If you don't know the answer, say so politely.
6. Maintain the Reddit "author" vibe.
`

    const prompt = `User question: ${sanitizeText(question)}`

    const result = await model.generateContent([systemPrompt, prompt])
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ answer: text })
  } catch (error) {
    console.error("Ask API error:", error)
    return NextResponse.json({ error: "Failed to get answer" }, { status: 500 })
  }
}
