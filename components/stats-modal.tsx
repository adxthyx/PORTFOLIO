"use client"

import {
  X,
  Github,
  Code,
  TrendingUp,
  Loader2,
  Star,
  GitFork,
  Calendar,
  Users,
  GitCommit,
  GitPullRequest,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface GitHubStats {
  totalRepos: number
  totalCommits: number
  totalPRs: number
  totalStars: number
  totalForks: number
  followers: number
  following: number
  yearsActive: number
  currentStreak: number
  profileViews: number
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
  ranking: number
  languages: Array<{
    name: string
    solved: number
  }>
  userAvatar: string
  realName: string
}

interface StatsModalProps {
  onClose: () => void
  githubStats: GitHubStats | null
  leetcodeStats: LeetCodeStats | null
  loading: boolean
}

export function StatsModal({ onClose, githubStats, leetcodeStats, loading }: StatsModalProps) {
  const [activeTab, setActiveTab] = useState<"github" | "leetcode">("github")

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
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
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

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <button
            onClick={() => setActiveTab("github")}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === "github"
                ? "text-[#FF4500] border-b-2 border-[#FF4500] bg-gray-50 dark:bg-gray-800"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Github className="w-4 h-4" />
              GitHub Statistics
            </div>
          </button>
          <button
            onClick={() => setActiveTab("leetcode")}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === "leetcode"
                ? "text-[#FF4500] border-b-2 border-[#FF4500] bg-gray-50 dark:bg-gray-800"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Code className="w-4 h-4" />
              LeetCode Progress
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] bg-white dark:bg-gray-950">
          {activeTab === "github" && (
            <div className="space-y-6">
              {githubStats ? (
                <>
                  {/* Main Stats Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="text-2xl font-bold text-[#FF4500] mb-1">{githubStats.totalRepos}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Total Repos</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-center gap-1 text-2xl font-bold text-[#FF4500] mb-1">
                        <GitCommit className="w-5 h-5" />
                        {githubStats.totalCommits}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Total Commits</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-center gap-1 text-2xl font-bold text-[#FF4500] mb-1">
                        <GitPullRequest className="w-5 h-5" />
                        {githubStats.totalPRs}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Total PRs</div>
                    </div>
                  </div>

                  {/* Secondary Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-center gap-1 text-xl font-bold text-[#FF4500] mb-1">
                        <Star className="w-4 h-4" />
                        {githubStats.totalStars}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Total Stars</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-center gap-1 text-xl font-bold text-[#FF4500] mb-1">
                        <GitFork className="w-4 h-4" />
                        {githubStats.totalForks}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Total Forks</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="text-xl font-bold text-[#FF4500] mb-1">{githubStats.currentStreak}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Current Streak</div>
                    </div>
                  </div>

                  {/* Additional Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-center gap-1 text-xl font-bold text-[#FF4500] mb-1">
                        <Users className="w-4 h-4" />
                        {githubStats.followers}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Followers</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-center gap-1 text-xl font-bold text-[#FF4500] mb-1">
                        <Calendar className="w-4 h-4" />
                        {githubStats.yearsActive}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Years Active</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="text-xl font-bold text-[#FF4500] mb-1">{githubStats.following}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Following</div>
                    </div>
                  </div>

                  {/* Top Languages */}
                  {githubStats.topLanguages && githubStats.topLanguages.length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
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
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">GitHub stats unavailable</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "leetcode" && (
            <div className="space-y-6">
              {leetcodeStats ? (
                <>
                  {/* Total Problems Solved */}
                  <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-4xl font-bold text-[#FF4500] mb-2">{leetcodeStats.totalSolved}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Problems Solved</div>
                  </div>

                  {/* Difficulty Breakdown */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
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

                  {/* Ranking */}
                  <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-2xl font-bold text-[#FF4500] mb-1">
                      #{leetcodeStats.ranking.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Global Ranking</div>
                  </div>

                  {/* Languages Used */}
                  {leetcodeStats.languages && leetcodeStats.languages.length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <h4 className="font-medium text-black dark:text-white mb-4">Languages Used to Solve Problems</h4>
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
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">LeetCode stats unavailable</p>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleString()} • Data refreshed in real-time
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
