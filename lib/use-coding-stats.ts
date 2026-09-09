"use client"

import { useEffect, useRef, useState } from "react"
import type { GitHubStats, LeetCodeStats } from "@/lib/stats"

export function useCodingStats(enabled: boolean) {
  const [githubStats, setGitHubStats] = useState<GitHubStats | null>(null)
  const [leetcodeStats, setLeetCodeStats] = useState<LeetCodeStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const loaded = useRef(false)
  useEffect(() => {
    if (!enabled || loaded.current) return
    const controller = new AbortController()
    let active = true
    const timer = setTimeout(() => controller.abort(), 12000)
    setLoading(true)
    const read = async (url: string) => {
      const response = await fetch(url, { signal: controller.signal })
      if (!response.ok) throw new Error("Statistics unavailable")
      return response.json()
    }
    Promise.allSettled([read("/api/github-stats"), read("/api/leetcode-stats")]).then(
      ([github, leetcode]) => {
        if (!active) return
        setGitHubStats(github.status === "fulfilled" ? github.value : null)
        setLeetCodeStats(leetcode.status === "fulfilled" ? leetcode.value : null)
        loaded.current = true
        setLoading(false)
        clearTimeout(timer)
      },
    )
    return () => {
      active = false
      clearTimeout(timer)
      controller.abort()
    }
  }, [enabled, attempt])
  return {
    githubStats,
    leetcodeStats,
    loading,
    retry: () => {
      loaded.current = false
      setAttempt((value) => value + 1)
    },
  }
}
