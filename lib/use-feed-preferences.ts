"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { FilterKey, SortMode } from "@/components/feed"

interface Preferences {
  filter: FilterKey
  query: string
  sort: SortMode
}
const defaults: Preferences = { filter: "all", query: "", sort: "featured" }
const filters: FilterKey[] = ["all", "aiml", "webdev", "mobile", "saved"]
const sorts: SortMode[] = ["featured", "new"]

export function useFeedPreferences() {
  const [preferences, setPreferences] = useState(defaults)
  const current = useRef(preferences)
  useEffect(() => {
    const sync = () => {
      if (window.location.pathname !== "/") return
      const params = new URLSearchParams(window.location.search)
      const filter = params.get("filter") as FilterKey
      const sort = params.get("sort") as SortMode
      const next = {
        filter: filters.includes(filter) ? filter : ("all" as const),
        sort: sorts.includes(sort) ? sort : ("featured" as const),
        query: (params.get("q") || "").slice(0, 500),
      }
      current.current = next
      setPreferences(next)
    }
    sync()
    window.addEventListener("popstate", sync)
    return () => window.removeEventListener("popstate", sync)
  }, [])
  const update = useCallback((patch: Partial<Preferences>) => {
    const next = { ...current.current, ...patch }
    const params = new URLSearchParams(window.location.search)
    for (const [key, value] of [
      ["filter", next.filter === "all" ? "" : next.filter],
      ["sort", next.sort === "featured" ? "" : next.sort],
      ["q", next.query],
    ]) {
      if (value) params.set(key, value)
      else params.delete(key)
    }
    const query = params.toString()
    window.history.replaceState(window.history.state, "", query ? `/?${query}` : "/")
    current.current = next
    setPreferences(next)
  }, [])
  return { ...preferences, update }
}
