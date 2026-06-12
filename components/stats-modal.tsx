"use client"

import {
  X,
  Github,
  Code,
  TrendingUp,
  Star,
  GitFork,
  Calendar,
  Users,
  GitCommit,
  GitPullRequest,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { CountUp } from "@/components/count-up"
import { useState } from "react"
import type { GitHubStats, LeetCodeStats } from "@/lib/stats"

interface StatsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  githubStats: GitHubStats | null
  leetcodeStats: LeetCodeStats | null
  loading: boolean
}

export function StatsModal({ open, onOpenChange, githubStats, leetcodeStats, loading }: StatsModalProps) {
  const [activeTab, setActiveTab] = useState<"github" | "leetcode">("github")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-gradient-to-r from-blue-600 to-purple-600 text-white flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 pr-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <DialogTitle asChild>
                <h2 className="text-base sm:text-xl font-bold truncate">Coding Statistics Dashboard</h2>
              </DialogTitle>
              <DialogDescription asChild>
                <p className="text-white/80 text-xs sm:text-sm hidden sm:block">Real-time data from GitHub and LeetCode</p>
              </DialogDescription>
            </div>
          </div>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border bg-card flex-shrink-0">
          <button
            onClick={() => setActiveTab("github")}
            className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors ${
              activeTab === "github"
                ? "text-brand border-b-2 border-brand bg-secondary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              <Github className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">GitHub Statistics</span>
              <span className="sm:hidden">GitHub</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("leetcode")}
            className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors ${
              activeTab === "leetcode"
                ? "text-brand border-b-2 border-brand bg-secondary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              <Code className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">LeetCode Progress</span>
              <span className="sm:hidden">LeetCode</span>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto min-h-0 bg-card">
          {loading && (
            <div className="space-y-4 sm:space-y-6" aria-busy="true" aria-label="Loading statistics">
              {[0, 1, 2].map((row) => (
                <div key={row} className="grid grid-cols-3 gap-2 sm:gap-4">
                  {[0, 1, 2].map((col) => (
                    <div key={col} className="text-center p-2 sm:p-4 bg-secondary rounded-lg border border-border">
                      <Skeleton className="h-6 sm:h-8 w-12 mx-auto mb-2" />
                      <Skeleton className="h-3 w-16 mx-auto" />
                    </div>
                  ))}
                </div>
              ))}
              <div className="bg-secondary rounded-lg p-4 border border-border space-y-3">
                <Skeleton className="h-4 w-32" />
                {[0, 1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-3 w-full" />
                ))}
              </div>
            </div>
          )}

          {!loading && activeTab === "github" && (
            <div className="space-y-4 sm:space-y-6">
              {githubStats ? (
                <>
                  {/* Main Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    <div className="text-center p-2 sm:p-4 bg-secondary rounded-lg border border-border">
                      <div className="text-lg sm:text-2xl font-bold text-brand mb-1"><CountUp value={githubStats.totalRepos} /></div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">Total Repos</div>
                    </div>
                    <div className="text-center p-2 sm:p-4 bg-secondary rounded-lg border border-border">
                      <div className="flex items-center justify-center gap-1 text-lg sm:text-2xl font-bold text-brand mb-1">
                        <GitCommit className="w-4 h-4 sm:w-5 sm:h-5" />
                        <CountUp value={githubStats.totalCommits} />
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">Total Commits</div>
                    </div>
                    <div className="text-center p-2 sm:p-4 bg-secondary rounded-lg border border-border">
                      <div className="flex items-center justify-center gap-1 text-lg sm:text-2xl font-bold text-brand mb-1">
                        <GitPullRequest className="w-4 h-4 sm:w-5 sm:h-5" />
                        <CountUp value={githubStats.totalPRs} />
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">Total PRs</div>
                    </div>
                  </div>

                  {/* Secondary Stats */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    <div className="text-center p-2 sm:p-4 bg-secondary rounded-lg border border-border">
                      <div className="flex items-center justify-center gap-1 text-base sm:text-xl font-bold text-brand mb-1">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                        <CountUp value={githubStats.totalStars} />
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">Total Stars</div>
                    </div>
                    <div className="text-center p-2 sm:p-4 bg-secondary rounded-lg border border-border">
                      <div className="flex items-center justify-center gap-1 text-base sm:text-xl font-bold text-brand mb-1">
                        <GitFork className="w-3 h-3 sm:w-4 sm:h-4" />
                        <CountUp value={githubStats.totalForks} />
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">Total Forks</div>
                    </div>
                    <div className="text-center p-2 sm:p-4 bg-secondary rounded-lg border border-border">
                      <div className="text-base sm:text-xl font-bold text-brand mb-1">{githubStats.currentStreak}</div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">Current Streak</div>
                    </div>
                  </div>

                  {/* Additional Stats */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    <div className="text-center p-2 sm:p-4 bg-secondary rounded-lg border border-border">
                      <div className="flex items-center justify-center gap-1 text-base sm:text-xl font-bold text-brand mb-1">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                        <CountUp value={githubStats.followers} />
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">Followers</div>
                    </div>
                    <div className="text-center p-2 sm:p-4 bg-secondary rounded-lg border border-border">
                      <div className="flex items-center justify-center gap-1 text-base sm:text-xl font-bold text-brand mb-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        {githubStats.yearsActive}
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">Years Active</div>
                    </div>
                    <div className="text-center p-2 sm:p-4 bg-secondary rounded-lg border border-border">
                      <div className="text-base sm:text-xl font-bold text-brand mb-1">{githubStats.following}</div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">Following</div>
                    </div>
                  </div>

                  {/* Top Languages */}
                  {githubStats.topLanguages && githubStats.topLanguages.length > 0 && (
                    <div className="bg-secondary rounded-lg p-4 border border-border">
                      <h4 className="font-medium text-foreground mb-4">Top 5 Languages</h4>
                      <div className="space-y-3">
                        {githubStats.topLanguages.map((lang, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div
                              className="w-4 h-4 rounded-full flex-shrink-0"
                              style={{ backgroundColor: lang.color }}
                            ></div>
                            <span className="text-sm text-foreground/80 flex-1">{lang.name}</span>
                            <span className="text-sm font-medium text-foreground">{lang.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">GitHub stats unavailable</p>
                </div>
              )}
            </div>
          )}

          {!loading && activeTab === "leetcode" && (
            <div className="space-y-6">
              {leetcodeStats ? (
                <>
                  {/* Total Problems Solved */}
                  <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-border">
                    <div className="text-3xl sm:text-4xl font-bold text-brand mb-2"><CountUp value={leetcodeStats.totalSolved} /></div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Total Problems Solved</div>
                  </div>

                  {/* Difficulty Breakdown */}
                  <div className="bg-secondary rounded-lg p-4 border border-border">
                    <h4 className="font-medium text-foreground mb-4">Difficulty Breakdown</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-foreground/80">Easy</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-foreground">{leetcodeStats.easy}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm text-foreground/80">Medium</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-foreground">{leetcodeStats.medium}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                          <span className="text-sm text-foreground/80">Hard</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-foreground">{leetcodeStats.hard}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ranking */}
                  <div className="text-center p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-border">
                    <div className="text-xl sm:text-2xl font-bold text-brand mb-1">
                      #<CountUp value={leetcodeStats.ranking} />
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Global Ranking</div>
                  </div>

                  {/* Languages Used */}
                  {leetcodeStats.languages && leetcodeStats.languages.length > 0 && (
                    <div className="bg-secondary rounded-lg p-4 border border-border">
                      <h4 className="font-medium text-foreground mb-4">Languages Used to Solve Problems</h4>
                      <div className="space-y-3">
                        {leetcodeStats.languages.map((lang, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-foreground/80">{lang.name}</span>
                            <span className="text-sm font-medium text-foreground">{lang.solved} problems</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">LeetCode stats unavailable</p>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          {!loading && (
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">Live data, fetched on page load</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
