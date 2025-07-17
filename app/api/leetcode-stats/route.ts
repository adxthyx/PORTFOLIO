import { NextResponse } from "next/server"

const LEETCODE_USERNAME = "adxthyx"

export async function GET() {
  try {
    console.log(`Fetching LeetCode stats for user: ${LEETCODE_USERNAME}`)

    // Since LeetCode doesn't have a public API, we'll use mock data
    // In a real application, you would need to:
    // 1. Use an unofficial LeetCode API (with caution about rate limits and ToS)
    // 2. Implement web scraping (complex and may violate ToS)
    // 3. Use a third-party service that provides LeetCode data

    // Mock realistic data - you can update these numbers to match your actual stats
    const mockStats = {
      totalSolved: 287,
      easy: 142,
      medium: 118,
      hard: 27,
      languages: [
        { name: "Python3", solved: 156 },
        { name: "Java", solved: 78 },
        { name: "JavaScript", solved: 34 },
        { name: "C++", solved: 19 },
      ],
    }

    console.log("LeetCode mock stats returned:", mockStats)
    return NextResponse.json(mockStats)
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error)
    return NextResponse.json({ error: "Internal server error while fetching LeetCode stats" }, { status: 500 })
  }
}
