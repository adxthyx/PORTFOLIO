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
        totalSubmissionNum: Array<{
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
        userAvatar: string
        realName: string
      }
    }
  }
}

export async function GET() {
  try {
    console.log(`Fetching LeetCode stats for user: ${LEETCODE_USERNAME}`)

    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
            totalSubmissionNum {
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
            userAvatar
            realName
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
    console.log("LeetCode API Response:", JSON.stringify(data, null, 2))

    if (!data.data?.matchedUser) {
      throw new Error("User not found or API response invalid")
    }

    const { submitStats, languageProblemCount, profile } = data.data.matchedUser

    // Parse difficulty stats from acSubmissionNum (accepted submissions)
    let totalSolved = 0
    let easy = 0
    let medium = 0
    let hard = 0

    // Find the "All" difficulty for total solved problems
    const allDifficulty = submitStats.acSubmissionNum.find((stat) => stat.difficulty === "All")
    totalSolved = allDifficulty ? allDifficulty.count : 0

    // Get individual difficulty counts
    submitStats.acSubmissionNum.forEach((stat) => {
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
      totalSolved, // This should now be 192 as per your API response
      easy, // 64
      medium, // 106
      hard, // 18
      ranking: profile.ranking || 0, // 674288
      languages,
      userAvatar: profile.userAvatar,
      realName: profile.realName,
    }

    console.log("LeetCode stats calculated successfully:", stats)
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error)
    return NextResponse.json({ error: "Internal server error while fetching LeetCode stats" }, { status: 500 })
  }
}
