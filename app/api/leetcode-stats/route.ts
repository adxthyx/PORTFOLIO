import { NextResponse } from "next/server"

const LEETCODE_USERNAME = "adxthyx"

interface LeetCodeResponse {
  data: {
    matchedUser: {
      submitStats: {
        acSubmissionNum: Array<{
          difficulty: string
          count: number
        }>
      }
      languageProblemCount: Array<{
        languageName: string
        problemsSolved: number
      }>
      profile: {
        ranking: number
      }
    }
  }
}

export async function GET() {
  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          languageProblemCount {
            languageName
            problemsSolved
          }
          profile {
            ranking
          }
        }
      }
    `

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Portfolio-App",
      },
      body: JSON.stringify({
        query,
        variables: {
          username: LEETCODE_USERNAME,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`LeetCode API failed: ${response.status}`)
    }

    const data: LeetCodeResponse = await response.json()

    if (!data.data?.matchedUser) {
      throw new Error("User not found or API response invalid")
    }

    const { submitStats, languageProblemCount, profile } = data.data.matchedUser

    // Parse difficulty stats
    let totalSolved = 0
    let easy = 0
    let medium = 0
    let hard = 0

    submitStats.acSubmissionNum.forEach((stat) => {
      totalSolved += stat.count
      switch (stat.difficulty) {
        case "Easy":
          easy = stat.count
          break
        case "Medium":
          medium = stat.count
          break
        case "Hard":
          hard = stat.count
          break
      }
    })

    // Parse language stats
    const languages = languageProblemCount
      .filter((lang) => lang.problemsSolved > 0)
      .sort((a, b) => b.problemsSolved - a.problemsSolved)
      .slice(0, 5)
      .map((lang) => ({
        name: lang.languageName,
        solved: lang.problemsSolved,
      }))

    const stats = {
      totalSolved,
      easy,
      medium,
      hard,
      ranking: profile.ranking || 0,
      languages,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error)
    return NextResponse.json({ error: "Internal server error while fetching LeetCode stats" }, { status: 500 })
  }
}
