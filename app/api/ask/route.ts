import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "")

export async function POST(request: NextRequest) {
  try {
    const { question, context, postTitle } = await request.json()

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
The user is asking a question about a specific post/project titled: "${postTitle}".

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

    const prompt = `User question: ${question}`

    const result = await model.generateContent([systemPrompt, prompt])
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ answer: text })
  } catch (error) {
    console.error("Ask API error:", error)
    return NextResponse.json({ error: "Failed to get answer" }, { status: 500 })
  }
}
