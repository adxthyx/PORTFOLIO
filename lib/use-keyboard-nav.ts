"use client"

import { useEffect, useState } from "react"

// Old-Reddit homage: j/k walks the feed, Enter opens the focused post.
// Inert while `enabled` is false (dialog open) or focus is in a text field.
export function useKeyboardNav<T extends { id: string }>(
  items: T[],
  enabled: boolean,
  onOpen: (item: T) => void,
): string | null {
  const [focusedId, setFocusedId] = useState<string | null>(null)

  useEffect(() => {
    if (focusedId && !items.some((i) => i.id === focusedId)) {
      setFocusedId(null)
    }
  }, [items, focusedId])

  useEffect(() => {
    if (!enabled) return

    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return
      if (e.key !== "j" && e.key !== "k" && e.key !== "Enter") return

      const idx = items.findIndex((i) => i.id === focusedId)

      if (e.key === "Enter") {
        if (idx >= 0) {
          e.preventDefault()
          onOpen(items[idx])
        }
        return
      }

      e.preventDefault()
      const next =
        e.key === "j" ? (idx < 0 ? 0 : Math.min(idx + 1, items.length - 1)) : idx <= 0 ? 0 : idx - 1
      const id = items[next]?.id ?? null
      setFocusedId(id)
      if (id) {
        document
          .querySelector(`[data-post-id="${id}"]`)
          ?.scrollIntoView({ block: "nearest", behavior: "smooth" })
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [items, enabled, focusedId, onOpen])

  return enabled ? focusedId : null
}
