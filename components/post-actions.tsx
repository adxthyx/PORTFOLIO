"use client"

import { Bookmark, Share2 } from "lucide-react"
import { toast } from "sonner"
import { useSaved } from "@/lib/saved"
import { useVotes } from "@/lib/votes"
import { useAchievements, usePostVisit } from "@/lib/achievements"
import { getPostHref } from "@/lib/post-utils"
import { VoteControls } from "@/components/vote-controls"
import type { Post } from "@/lib/content"

export function PostActions({ post }: { post: Post }) {
  const { votes, vote } = useVotes()
  const { savedIds, toggleSave } = useSaved()
  const { unlock } = useAchievements()
  usePostVisit(post.id)
  const saved = savedIds.includes(post.id)
  const share = async () => {
    const url = new URL(getPostHref(post), window.location.origin).href
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable")
      await navigator.clipboard.writeText(url)
      toast.success("Link copied")
    } catch {
      toast("Copy this address to share the post", { description: url, duration: 10000 })
    }
  }
  return (
    <div className="flex flex-wrap items-center gap-3 border-y border-border py-4">
      <VoteControls
        value={votes[post.id]}
        onVote={(dir) => {
          vote(post.id, dir)
          unlock("first-vote")
        }}
        title={post.title}
      />
      <button
        type="button"
        onClick={() => {
          if (!saved) unlock("saver")
          toggleSave(post.id)
        }}
        aria-pressed={saved}
        className={`inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm hover:bg-secondary ${saved ? "text-brand" : "text-muted-foreground"}`}
      >
        <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
        {saved ? "Saved" : "Save"}
      </button>
      <button
        type="button"
        onClick={share}
        className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm text-muted-foreground hover:bg-secondary"
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>
      <p className="basis-full text-xs text-muted-foreground sm:ml-auto sm:basis-auto">
        Your vote stays in this browser.
      </p>
    </div>
  )
}
