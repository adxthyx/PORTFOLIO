import { NextResponse } from "next/server"

const GITHUB_USERNAME = "adxthyx"

// Language colors for better visualization
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
    console.error("GITHUB_TOKEN environment variable is not set")
    return NextResponse.json(
      { error: "GitHub token not configured. Please set GITHUB_TOKEN environment variable." },
      { status: 500 },
    )
  }

  try {
    console.log(`Fetching GitHub stats for user: ${GITHUB_USERNAME}`)

    // Fetch user basic info
    const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    })

    if (!userResponse.ok) {
      const errorText = await userResponse.text()
      console.error(`GitHub user API error: ${userResponse.status} - ${errorText}`)
      return NextResponse.json(
        { error: `Failed to fetch user data: ${userResponse.status} ${userResponse.statusText}` },
        { status: userResponse.status },
      )
    }

    const userData = await userResponse.json()
    console.log(`User data fetched successfully. Public repos: ${userData.public_repos}`)

    // Fetch all repositories
    const allRepos = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      console.log(`Fetching repositories page ${page}`)
      const reposResponse = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=updated`,
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        },
      )

      if (!reposResponse.ok) {
        console.error(`Failed to fetch repos page ${page}: ${reposResponse.status}`)
        break
      }

      const repos = await reposResponse.json()
      allRepos.push(...repos)

      if (repos.length < 100) {
        hasMore = false
      } else {
        page++
      }
    }

    console.log(`Total repositories fetched: ${allRepos.length}`)

    // Calculate stats
    let totalStars = 0
    let totalForks = 0
    const languageBytes: Record<string, number> = {}

    // Process each repository
    for (const repo of allRepos) {
      totalStars += repo.stargazers_count || 0
      totalForks += repo.forks_count || 0

      // Fetch languages for this repo
      try {
        const langResponse = await fetch(repo.languages_url, {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        })

        if (langResponse.ok) {
          const languages = await langResponse.json()
          for (const [lang, bytes] of Object.entries(languages)) {
            languageBytes[lang] = (languageBytes[lang] || 0) + (bytes as number)
          }
        }
      } catch (error) {
        console.warn(`Failed to fetch languages for repo ${repo.name}:`, error)
      }
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

    const stats = {
      totalRepos: userData.public_repos,
      totalStars,
      totalForks,
      followers: userData.followers,
      following: userData.following,
      yearsActive,
      topLanguages,
    }

    console.log("GitHub stats calculated successfully:", stats)
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching GitHub stats:", error)
    return NextResponse.json({ error: "Internal server error while fetching GitHub stats" }, { status: 500 })
  }
}
