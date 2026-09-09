"use client"

import { useEffect } from "react"
import { createBrowserStore } from "@/lib/browser-store"
import { allPosts, projects } from "@/lib/content"
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
    description: "Opened every current project",
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

const achievementsStore = createBrowserStore<string[]>("r-adithya:achievements:v1", [], (value) =>
  Array.isArray(value)
    ? [
        ...new Set(
          value.filter(
            (id): id is string =>
              typeof id === "string" && ACHIEVEMENTS.some((achievement) => achievement.id === id),
          ),
        ),
      ]
    : [],
)
const openedPostsStore = createBrowserStore<string[]>("r-adithya:openedPosts:v1", [], (value) =>
  Array.isArray(value)
    ? [
        ...new Set(
          value.filter(
            (id): id is string => typeof id === "string" && allPosts.some((post) => post.id === id),
          ),
        ),
      ]
    : [],
)

const unlock = (id: string) => {
  const definition = ACHIEVEMENTS.find((achievement) => achievement.id === id)
  if (!definition) return
  let earned = false
  achievementsStore.write((previous) => {
    if (previous.includes(id)) return previous
    earned = true
    return [...previous, id]
  })
  if (earned)
    toast(`${definition.emoji} Achievement unlocked — ${definition.title}`, {
      description: definition.description,
    })
}

export function useAchievements() {
  return { unlockedIds: achievementsStore.useValue(), unlock }
}

// Full pages and the inline reader share visit tracking, including on mobile.
export function usePostVisit(postId: string) {
  useEffect(() => {
    if (!allPosts.some((post) => post.id === postId)) return
    let count = 0
    let complete = false
    openedPostsStore.write((previous) => {
      const next = previous.includes(postId) ? previous : [...previous, postId]
      count = next.length
      complete = projects.every((project) => next.includes(project.id))
      return next
    })
    if (count >= 3) unlock("explorer")
    if (complete) unlock("completionist")
  }, [postId])
}
