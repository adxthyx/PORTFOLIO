import { NextResponse } from "next/server"

const GITHUB_USERNAME = "adxthyx"

interface GitHubRepo {
  name: string
  stargazers_count: number
  forks_count: number
  language: string
  languages_url: string
  created_at: string
  updated_at: string
}

interface GitHubUser {
  public_repos: number
  followers: number
  following: number
  created_at: string
}

interface GitHubCommit {
  commit: {
    author: {
      date: string
    }
  }
}

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#2b7489",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#ffac45",
  Kotlin: "#F18E33",
  Shell: "#89e051",
  Dart: "#00B4AB",
  Vue: "#2c3e50",
  React: "#61DAFB",
  "C#": "#178600",
  Dockerfile: "#384d54",
  "Jupyter Notebook": "#DA5B0B",
}

export async function GET() {
  const githubToken = process.env.GITHUB_TOKEN

  if (!githubToken) {
    return NextResponse.json(
      { error: "GitHub token not configured. Please set GITHUB_TOKEN environment variable." },
      { status: 500 },
    )
  }

  try {
    const headers = {
      Authorization: `Bearer ${githubToken}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Portfolio-App",
    }

    console.log(`Fetching GitHub stats for user: ${GITHUB_USERNAME}`)

    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers })
    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user data: ${userResponse.status}`)
    }
    const userData: GitHubUser = await userResponse.json()
    console.log(`User has ${userData.public_repos} public repos`)

    // Fetch ALL repositories with proper pagination
    const allRepos: GitHubRepo[] = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      console.log(`Fetching repositories page ${page}`)
      const reposResponse = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=updated&type=all`,
        { headers },
      )

      if (!reposResponse.ok) {
        console.error(`Failed to fetch repos page ${page}: ${reposResponse.status}`)
        break
      }

      const repos: GitHubRepo[] = await reposResponse.json()
      console.log(`Page ${page}: Found ${repos.length} repositories`)

      if (repos.length === 0) {
        hasMore = false
      } else {
        allRepos.push(...repos)
        if (repos.length < 100) {
          hasMore = false
        } else {
          page++
        }
      }
    }

    console.log(`Total repositories fetched: ${allRepos.length}`)

    // Calculate basic stats
    let totalStars = 0
    let totalForks = 0
    const languageBytes: Record<string, number> = {}

    for (const repo of allRepos) {
      totalStars += repo.stargazers_count || 0
      totalForks += repo.forks_count || 0

      // Fetch languages for each repo (with rate limiting consideration)
      try {
        const langResponse = await fetch(repo.languages_url, { headers })
        if (langResponse.ok) {
          const languages = await langResponse.json()
          for (const [lang, bytes] of Object.entries(languages)) {
            languageBytes[lang] = (languageBytes[lang] || 0) + (bytes as number)
          }
        }
        // Small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 50))
      } catch (error) {
        console.warn(`Failed to fetch languages for ${repo.name}:`, error)
      }
    }

    // Get total commits across repos (limit to avoid rate limits)
    let totalCommits = 0
    const reposToCheck = allRepos.slice(0, 15) // Check first 15 repos to avoid rate limits

    for (const repo of reposToCheck) {
      try {
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?author=${GITHUB_USERNAME}&per_page=100`,
          { headers },
        )
        if (commitsResponse.ok) {
          const commits: GitHubCommit[] = await commitsResponse.json()
          totalCommits += commits.length
        }
        // Small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error) {
        console.warn(`Failed to fetch commits for ${repo.name}:`, error)
      }
    }

    // Get total PRs
    let totalPRs = 0
    try {
      const prsResponse = await fetch(
        `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr&per_page=100`,
        { headers },
      )
      if (prsResponse.ok) {
        const prsData = await prsResponse.json()
        totalPRs = prsData.total_count || 0
      }
    } catch (error) {
      console.warn("Failed to fetch PRs:", error)
    }

    // Calculate top languages
    const totalBytes = Object.values(languageBytes).reduce((sum, bytes) => sum + bytes, 0)
    const topLanguages = Object.entries(languageBytes)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, bytes]) => ({
        name,
        percentage: totalBytes > 0 ? Math.round((bytes / totalBytes) * 100 * 10) / 10 : 0,
        color: LANGUAGE_COLORS[name] || "#cccccc",
      }))

    // Calculate years active
    const createdDate = new Date(userData.created_at)
    const yearsActive = new Date().getFullYear() - createdDate.getFullYear()

    // Calculate current streak (simplified - last 7 days of activity)
    const currentStreak = 7 // This would need more complex logic to calculate actual streak

    const stats = {
      totalRepos: allRepos.length, // Use actual count from fetched repos
      totalCommits,
      totalPRs,
      totalStars,
      totalForks,
      followers: userData.followers,
      following: userData.following,
      yearsActive,
      currentStreak,
      topLanguages,
      profileViews: 0, // GitHub doesn't provide this via API
    }

    console.log("GitHub stats calculated successfully:", stats)
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching GitHub stats:", error)
    return NextResponse.json({ error: "Internal server error while fetching GitHub stats" }, { status: 500 })
  }
}
