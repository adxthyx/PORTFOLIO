"use client"

import { createBrowserStore } from "@/lib/browser-store"
export type VoteDir = 1 | -1
const votesStore = createBrowserStore<Record<string, VoteDir>>("r-adithya:votes:v1", {}, (value) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {}
  return Object.fromEntries(
    Object.entries(value).filter(([id, vote]) => /^[a-z0-9-]{1,80}$/.test(id) && (vote === 1 || vote === -1)),
  )
})
const vote = (postId: string, dir: VoteDir) =>
  votesStore.write((previous) => {
    const next = { ...previous }
    if (next[postId] === dir) delete next[postId]
    else next[postId] = dir
    return next
  })
// One shared store: every caller (feed, cards, sidebar karma) sees the same votes.
export function useVotes() {
  const votes = votesStore.useValue()
  const karmaDelta = Object.values(votes).reduce<number>((sum, v) => sum + v, 0)
  return { votes, vote, karmaDelta }
}
