import { NextResponse } from "next/server"
import type { GitHubStats } from "@/lib/stats"

export const revalidate = 3600
const username = "adxthyx"
interface GitHubRepo {
  private: boolean
  stargazers_count: number
  forks_count: number
  language: string | null
}
const languageColors: Record<string, string> = {
  Python: "#3572a5",
  TypeScript: "#3178c6",
  JavaScript: "#b58b00",
  "Jupyter Notebook": "#bc5b0b",
  "C++": "#cc5187",
  HTML: "#d44c2d",
  CSS: "#7656ad",
  C: "#777777",
  Java: "#9c641b",
}

export async function GET() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "Adithya-Portfolio",
  }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const read = async (path: string) => {
    const response = await fetch(`https://api.github.com${path}`, {
      headers,
      next: { revalidate },
      signal: AbortSignal.timeout(7000),
    })
    if (!response.ok) throw new Error("GitHub unavailable")
    return response.json()
  }
  try {
    const user = await read(`/users/${username}`)
    const repos: GitHubRepo[] = []
    // Pagination is bounded; an incomplete result is never presented as a total.
    for (let page = 1; page <= 10; page++) {
      const result: GitHubRepo[] = await read(`/users/${username}/repos?type=owner&per_page=100&page=${page}`)
      if (!Array.isArray(result)) throw new Error("Invalid repositories")
      repos.push(...result.filter((repo) => repo.private === false))
      if (result.length < 100) break
      if (page === 10) throw new Error("Repository list exceeds supported size")
    }
    let totalPRs: number | null = null
    try {
      const prs = await read(`/search/issues?q=author:${username}+type:pr+is:public&per_page=1`)
      if (!prs.incomplete_results && typeof prs.total_count === "number") totalPRs = prs.total_count
    } catch {
      /* Other public stats remain useful. */
    }
    const languages: Record<string, number> = {}
    for (const repo of repos)
      if (repo.language) languages[repo.language] = (languages[repo.language] || 0) + 1
    const languageTotal = Object.values(languages).reduce((total, count) => total + count, 0)
    const createdAt = new Date(user.created_at)
    const now = new Date()
    const anniversaryPassed =
      now.getUTCMonth() > createdAt.getUTCMonth() ||
      (now.getUTCMonth() === createdAt.getUTCMonth() && now.getUTCDate() >= createdAt.getUTCDate())
    const stats: GitHubStats = {
      totalRepos: repos.length,
      totalPRs,
      totalStars: repos.reduce((total, repo) => total + repo.stargazers_count, 0),
      totalForks: repos.reduce((total, repo) => total + repo.forks_count, 0),
      followers: user.followers,
      following: user.following,
      yearsActive: Math.max(
        0,
        now.getUTCFullYear() - createdAt.getUTCFullYear() - (anniversaryPassed ? 0 : 1),
      ),
      topLanguages: Object.entries(languages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, count]) => ({
          name,
          percentage: Math.round((count / languageTotal) * 1000) / 10,
          color: languageColors[name] || "#788b85",
        })),
      updatedAt: now.toISOString(),
    }
    return NextResponse.json(stats)
  } catch {
    return NextResponse.json({ error: "GitHub activity is temporarily unavailable." }, { status: 503 })
  }
}
