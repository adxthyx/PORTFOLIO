"use client"

import { X, Github, Code, TrendingUp, Loader2, Star, GitFork, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"

interface GitHubStats {
  totalRepos: number
  totalStars: number
  totalForks: number
  followers: number
  following: number
  yearsActive: number
  topLanguages: Array<{
    name: string
    percentage: number
    color: string
  }>
}

interface LeetCodeStats {
  totalSolved: number
  easy: number
  medium: number
  hard: number
  languages: Array<{
    name: string
    solved: number
  }>
}

export function StatsModal({ onClose }: { onClose: () => void }) {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null)
  const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAllStats = async () => {
      setLoading(true)
      setError(null)

      try {
        // Fetch GitHub stats
        const githubResponse = await fetch("/api/github-stats")
        if (!githubResponse.ok) {
          throw new Error(`GitHub API failed: ${githubResponse.status}`)
        }
        const githubData = await githubResponse.json()
        setGithubStats(githubData)

        // Fetch LeetCode stats
        const leetcodeResponse = await fetch("/api/leetcode-stats")
        if (!leetcodeResponse.ok) {
          throw new Error(`LeetCode API failed: ${leetcodeResponse.status}`)
        }
        const leetcodeData = await leetcodeResponse.json()
        setLeetcodeStats(leetcodeData)
      } catch (err) {
        console.error("Stats fetch error:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch stats")
      } finally {
        setLoading(false)
      }
    }

    fetchAllStats()
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-[#FF4500]" />
            <span className="text-black dark:text-white">Loading coding statistics...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Coding Statistics Dashboard</h2>
              <p className="text-white/80 text-sm">Real-time data from GitHub and LeetCode</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] bg-white dark:bg-gray-950">
          {error ? (
            <div className="text-center py-12">
              <div className="text-red-500 dark:text-red-400 text-lg mb-4">{error}</div>
              <Button onClick={() => window.location.reload()} className="bg-[#FF4500] hover:bg-[#FF4500]/90">
                Retry Loading Stats
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* GitHub Stats Card */}
              <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850 border-0 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center">
                    <Github className="w-6 h-6 text-white dark:text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white">GitHub Statistics</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">@adxthyx • Live GitHub API data</p>
                  </div>
                </div>

                {githubStats ? (
                  <div className="space-y-6">
                    {/* Main Stats Grid */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="text-2xl font-bold text-[#FF4500] mb-1">{githubStats.totalRepos}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Total Repos</div>
                      </div>
                      <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-center gap-1 text-2xl font-bold text-[#FF4500] mb-1">
                          <Star className="w-5 h-5" />
                          {githubStats.totalStars}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Total Stars</div>
                      </div>
                      <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-center gap-1 text-2xl font-bold text-[#FF4500] mb-1">
                          <GitFork className="w-5 h-5" />
                          {githubStats.totalForks}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Total Forks</div>
                      </div>
                    </div>

                    {/* Secondary Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-center gap-1 text-xl font-bold text-[#FF4500] mb-1">
                          <Users className="w-4 h-4" />
                          {githubStats.followers}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Followers</div>
                      </div>
                      <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="text-xl font-bold text-[#FF4500] mb-1">{githubStats.following}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Following</div>
                      </div>
                      <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-center gap-1 text-xl font-bold text-[#FF4500] mb-1">
                          <Calendar className="w-4 h-4" />
                          {githubStats.yearsActive}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Years Active</div>
                      </div>
                    </div>

                    {/* Top Languages */}
                    {githubStats.topLanguages && githubStats.topLanguages.length > 0 && (
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium text-black dark:text-white mb-4">Top 5 Languages</h4>
                        <div className="space-y-3">
                          {githubStats.topLanguages.map((lang, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div
                                className="w-4 h-4 rounded-full flex-shrink-0"
                                style={{ backgroundColor: lang.color }}
                              ></div>
                              <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">{lang.name}</span>
                              <span className="text-sm font-medium text-black dark:text-white">{lang.percentage}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Limitations Note */}
                    <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      <strong>Note:</strong> Total Commits, PRs, Profile Views, and Current Streak require GitHub
                      GraphQL API or additional services not available in this demo.
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">GitHub stats unavailable</p>
                  </div>
                )}
              </Card>

              {/* LeetCode Stats Card */}
              <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-0 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white">LeetCode Progress</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">adxthyx • Problem solving stats</p>
                  </div>
                </div>

                {leetcodeStats ? (
                  <div className="space-y-6">
                    {/* Total Problems Solved */}
                    <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="text-4xl font-bold text-[#FF4500] mb-2">{leetcodeStats.totalSolved}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Total Problems Solved</div>
                    </div>

                    {/* Difficulty Breakdown */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <h4 className="font-medium text-black dark:text-white mb-4">Difficulty Breakdown</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">Easy</span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-black dark:text-white">{leetcodeStats.easy}</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">Medium</span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-black dark:text-white">{leetcodeStats.medium}</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">Hard</span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-black dark:text-white">{leetcodeStats.hard}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Languages Used */}
                    {leetcodeStats.languages && leetcodeStats.languages.length > 0 && (
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium text-black dark:text-white mb-4">
                          Languages Used to Solve Problems
                        </h4>
                        <div className="space-y-3">
                          {leetcodeStats.languages.map((lang, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-gray-700 dark:text-gray-300">{lang.name}</span>
                              <span className="text-sm font-medium text-black dark:text-white">
                                {lang.solved} problems
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* LeetCode Limitations Note */}
                    <div className="text-xs text-gray-500 dark:text-gray-400 bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg">
                      <strong>Note:</strong> LeetCode doesn't provide a public API. This data is currently mocked. In
                      production, you'd need a custom scraping solution or unofficial API.
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">LeetCode stats unavailable</p>
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleString()} • Data refreshed every hour
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
