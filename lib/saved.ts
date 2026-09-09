"use client"

import { createBrowserStore } from "@/lib/browser-store"
const savedStore = createBrowserStore<string[]>("r-adithya:saved:v1", [], (value) =>
  Array.isArray(value)
    ? [...new Set(value.filter((id): id is string => typeof id === "string" && /^[a-z0-9-]{1,80}$/.test(id)))]
    : [],
)
const toggleSave = (id: string) =>
  savedStore.write((previous) =>
    previous.includes(id) ? previous.filter((value) => value !== id) : [...previous, id],
  )
export function useSaved() {
  return { savedIds: savedStore.useValue(), toggleSave }
}
