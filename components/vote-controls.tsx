"use client"

import { ArrowBigUp, ArrowBigDown } from "lucide-react"
import type { VoteDir } from "@/lib/votes"

export function VoteControls({
  value,
  onVote,
  title,
  count,
}: {
  value?: VoteDir
  onVote: (dir: VoteDir) => void
  title: string
  count: number
}) {
  return (
    <div
      role="group"
      aria-label="Your vote, saved in this browser"
      className="inline-flex shrink-0 items-center rounded-full bg-secondary p-0.5 text-sm"
    >
      <button
        type="button"
        aria-label={`Upvote ${title}`}
        aria-pressed={value === 1}
        onClick={() => onVote(1)}
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-brand/10 ${value === 1 ? "bg-brand/10 text-brand" : "text-muted-foreground"}`}
      >
        <ArrowBigUp className={`h-5 w-5 ${value === 1 ? "fill-current" : ""}`} />
      </button>
      <span
        className={`min-w-8 text-center text-xs font-bold tabular-nums ${value === 1 ? "text-brand" : value === -1 ? "text-downvote" : ""}`}
        aria-live="polite"
      >
        {count + (value ?? 0)}
      </span>
      <button
        type="button"
        aria-label={`Downvote ${title}`}
        aria-pressed={value === -1}
        onClick={() => onVote(-1)}
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-blue-500/10 ${value === -1 ? "bg-blue-500/10 text-blue-600 dark:text-blue-300" : "text-muted-foreground"}`}
      >
        <ArrowBigDown className={`h-5 w-5 ${value === -1 ? "fill-current" : ""}`} />
      </button>
    </div>
  )
}
