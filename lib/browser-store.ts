"use client"

import { useSyncExternalStore } from "react"

/** A small shared store for device-local preferences, including blocked storage. */
export function createBrowserStore<T>(key: string, initial: T, validate: (value: unknown) => T) {
  let cached = initial
  let lastRaw: string | null | undefined
  const eventName = `portfolio-storage:${key}`
  const read = () => {
    if (typeof window === "undefined") return initial
    try {
      const raw = localStorage.getItem(key)
      if (raw !== lastRaw) {
        lastRaw = raw
        try {
          cached = raw ? validate(JSON.parse(raw)) : initial
        } catch {
          cached = initial
        }
      }
    } catch {
      /* Keep the in-memory value when browser storage is unavailable. */
    }
    return cached
  }
  const subscribe = (listener: () => void) => {
    const storageChanged = (event: StorageEvent) => {
      if (event.key === key || event.key === null) listener()
    }
    window.addEventListener("storage", storageChanged)
    window.addEventListener(eventName, listener)
    return () => {
      window.removeEventListener("storage", storageChanged)
      window.removeEventListener(eventName, listener)
    }
  }
  const write = (update: (previous: T) => T) => {
    const next = update(read())
    cached = next
    try {
      const raw = JSON.stringify(next)
      localStorage.setItem(key, raw)
      lastRaw = raw
    } catch {
      /* Session state remains usable. */
    }
    window.dispatchEvent(new Event(eventName))
  }
  return { useValue: () => useSyncExternalStore(subscribe, read, () => initial), write }
}
