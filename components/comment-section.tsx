"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { MessageCircle, Send, Loader2, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { profile } from "@/lib/content"

interface Comment {
  id: string
  question: string
  answer: string
  status: "pending" | "answered" | "error"
  seeded?: boolean
}
interface CommentSectionProps {
  postId: string
  seed?: { question: string; answer: string }
}
const threads = new Map<string, Comment[]>()

export function CommentSection({ postId, seed }: CommentSectionProps) {
  const [question, setQuestion] = useState("")
  const [comments, setComments] = useState<Comment[]>(
    () => threads.get(postId) ?? (seed ? [{ id: "seed", ...seed, status: "answered", seeded: true }] : []),
  )
  const request = useRef<AbortController | null>(null)
  const mounted = useRef(true)
  const isLoading = comments.some((comment) => comment.status === "pending")
  const updateComments = (update: (previous: Comment[]) => Comment[]) =>
    setComments((previous) => {
      const next = update(previous)
      threads.set(postId, next)
      return next
    })

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      request.current?.abort()
      const saved = threads.get(postId)
      if (saved)
        threads.set(
          postId,
          saved.map((comment) =>
            comment.status === "pending"
              ? { ...comment, status: "error", answer: "The request was interrupted. You can try again." }
              : comment,
          ),
        )
    }
  }, [postId])

  const ask = async (text: string, retryId?: string) => {
    const value = text.trim()
    if (!value || value.length > 500 || request.current) return
    const id = retryId ?? `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const controller = new AbortController()
    request.current = controller
    updateComments((previous) =>
      retryId
        ? previous.map((comment) =>
            comment.id === id ? { ...comment, answer: "", status: "pending" } : comment,
          )
        : [...previous, { id, question: value, answer: "", status: "pending" }],
    )
    setQuestion("")
    const timer = setTimeout(() => controller.abort(), 20000)
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: value, postId }),
        signal: controller.signal,
      })
      const data = await response.json()
      if (!mounted.current) return
      if (!response.ok) throw new Error(data.error || "Couldn't get an answer. Please try again.")
      if (typeof data.answer !== "string" || !data.answer.trim())
        throw new Error("The reply was empty. Please try again.")
      updateComments((previous) =>
        previous.map((comment) =>
          comment.id === id ? { ...comment, answer: data.answer, status: "answered" } : comment,
        ),
      )
    } catch (error) {
      if (!mounted.current) return
      const answer = controller.signal.aborted
        ? "The request was interrupted or took too long. Please try again."
        : error instanceof Error
          ? error.message
          : "Couldn't connect. Please try again."
      updateComments((previous) =>
        previous.map((comment) => (comment.id === id ? { ...comment, answer, status: "error" } : comment)),
      )
    } finally {
      clearTimeout(timer)
      request.current = null
    }
  }

  return (
    <section id="discussion" aria-labelledby={`discussion-title-${postId}`} className="scroll-mt-24 pt-1">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-muted-foreground" />
        <h2 id={`discussion-title-${postId}`} className="text-lg font-bold">
          Let&apos;s talk about it
        </h2>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Ask u/adithya-bot about this post. It&apos;s an AI assistant answering from my portfolio, and it can
        make mistakes. This conversation is private to your visit.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          void ask(question)
        }}
        className="mt-5 rounded-xl border border-input bg-background p-3"
      >
        <label htmlFor={`question-${postId}`} className="sr-only">
          Ask a question
        </label>
        <Textarea
          id={`question-${postId}`}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
              event.preventDefault()
              void ask(question)
            }
          }}
          maxLength={500}
          rows={3}
          placeholder="How does it work? What would you do differently?"
          className="min-h-20 resize-y border-0 bg-transparent p-1 text-base shadow-none focus-visible:ring-0 sm:text-sm"
          disabled={isLoading}
        />
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">{question.length}/500</span>
          <Button
            type="submit"
            disabled={!question.trim() || isLoading}
            className="gap-2 rounded-full bg-brand-solid text-white hover:bg-brand-hover"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}Ask a
            question
          </Button>
        </div>
      </form>
      <div
        role="log"
        aria-label="Your conversation with the portfolio assistant"
        aria-live="polite"
        aria-relevant="additions text"
        className="mt-6 space-y-6"
      >
        {comments.map((comment) => (
          <div key={comment.id}>
            <p className="text-xs font-semibold text-muted-foreground">
              {comment.seeded ? "A question to get started" : "You"}
            </p>
            <p className="mt-1.5 break-words text-sm leading-relaxed">{comment.question}</p>
            <div className="ml-2 mt-3 flex gap-3 border-l-2 border-border pl-4">
              <Image
                src={profile.avatar}
                alt=""
                width={28}
                height={28}
                sizes="28px"
                className="h-7 w-7 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  u/adithya-bot
                  <span className="rounded bg-brand/10 px-1.5 py-0.5 text-[10px] text-brand">AI</span>
                </p>
                {comment.status === "pending" ? (
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Thinking…
                  </p>
                ) : (
                  <p
                    className={`mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed ${comment.status === "error" ? "text-destructive" : "text-foreground/85"}`}
                  >
                    {comment.answer}
                  </p>
                )}
                {comment.status === "error" && (
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => void ask(comment.question, comment.id)}
                    className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-2 text-xs font-semibold disabled:opacity-50"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Try again
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
