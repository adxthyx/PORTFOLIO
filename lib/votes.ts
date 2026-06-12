"use client"

import { useCallback, useEffect, useState } from "react"

export type VoteDir = 1 | -1

const STORAGE_KEY = "r-adithya:votes:v1"

// Visitor votes persisted in localStorage. State starts empty and hydrates in
// an effect so the server and first client render always agree.
export function useVotes() {
  const [votes, setVotes] = useState<Record<string, VoteDir>>({})

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setVotes(JSON.parse(raw))
    } catch {
      // ignore corrupt storage
    }
  }, [])

  const vote = useCallback((postId: string, dir: VoteDir) => {
    setVotes((prev) => {
      const next = { ...prev }
      if (next[postId] === dir) {
        delete next[postId] // tapping the same arrow un-votes
      } else {
        next[postId] = dir
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // storage full/blocked — vote still works for the session
      }
      return next
    })
  }, [])

  const karmaDelta = Object.values(votes).reduce<number>((sum, v) => sum + v, 0)

  return { votes, vote, karmaDelta }
}
