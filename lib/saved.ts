"use client"

import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "r-adithya:saved:v1"

// Saved (bookmarked) post ids persisted in localStorage. State starts empty
// and hydrates in an effect so the server and first client render agree.
export function useSaved() {
  const [savedIds, setSavedIds] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setSavedIds(JSON.parse(raw))
    } catch {
      // ignore corrupt storage
    }
  }, [])

  const toggleSave = useCallback((postId: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // storage full/blocked — save still works for the session
      }
      return next
    })
  }, [])

  return { savedIds, toggleSave }
}
