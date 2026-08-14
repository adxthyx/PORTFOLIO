"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

export interface Achievement {
  id: string
  emoji: string
  title: string
  description: string
  /** Shown in the trophy case while still locked */
  hint: string
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-vote",
    emoji: "🎯",
    title: "Karma Dealer",
    description: "Cast your first vote",
    hint: "Those arrows aren't decorative",
  },
  {
    id: "saver",
    emoji: "🔖",
    title: "Curator",
    description: "Saved a post for later",
    hint: "Bookmark something worth keeping",
  },
  {
    id: "explorer",
    emoji: "🧭",
    title: "Explorer",
    description: "Opened 3 different posts",
    hint: "Click around a little",
  },
  {
    id: "completionist",
    emoji: "🏆",
    title: "Completionist",
    description: "Read every post on the feed",
    hint: "Leave no post unread",
  },
  {
    id: "shortcut-pro",
    emoji: "⌨️",
    title: "Power User",
    description: "Opened the command palette",
    hint: "Keyboard people know the shortcut",
  },
  {
    id: "night-owl",
    emoji: "🦉",
    title: "Night Owl",
    description: "Browsing after midnight",
    hint: "Some visits happen very late",
  },
  {
    id: "recruiter",
    emoji: "💼",
    title: "Down to Business",
    description: "Switched to recruiter mode",
    hint: "There's a no-nonsense view hidden up top",
  },
]

const STORAGE_KEY = "r-adithya:achievements:v1"

// Visitor achievements persisted in localStorage. Unlocking an already-earned
// achievement is a no-op, so call sites can fire unconditionally.
export function useAchievements() {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([])
  const unlockedRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const ids: string[] = JSON.parse(raw)
        unlockedRef.current = new Set(ids)
        setUnlockedIds(ids)
      }
    } catch {
      // ignore corrupt storage
    }
  }, [])

  const unlock = useCallback((id: string) => {
    const def = ACHIEVEMENTS.find((a) => a.id === id)
    if (!def || unlockedRef.current.has(id)) return
    unlockedRef.current.add(id)
    setUnlockedIds((prev) => {
      const next = [...prev, id]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // storage full/blocked — achievement still shows for the session
      }
      return next
    })
    toast(`${def.emoji} Achievement unlocked — ${def.title}`, {
      description: def.description,
    })
  }, [])

  return { unlockedIds, unlock }
}
