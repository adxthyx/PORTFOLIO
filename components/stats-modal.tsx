"use client"

import { useState } from "react"
import { X, Github, Code2, RotateCcw, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { CountUp } from "@/components/count-up"
import type { GitHubStats, LeetCodeStats } from "@/lib/stats"
import { profile } from "@/lib/content"

interface StatsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  githubStats: GitHubStats | null
  leetcodeStats: LeetCodeStats | null
  loading: boolean
  onRetry: () => void
}
export function StatsModal({
  open,
  onOpenChange,
  githubStats,
  leetcodeStats,
  loading,
  onRetry,
}: StatsModalProps) {
  const [tab, setTab] = useState<"github" | "leetcode">("github")
  const current = tab === "github" ? githubStats : leetcodeStats
  const metrics =
    tab === "github" && githubStats
      ? [
          { label: "Public repositories", value: githubStats.totalRepos },
          { label: "Stars received", value: githubStats.totalStars },
          { label: "Public pull requests", value: githubStats.totalPRs },
          { label: "Forks", value: githubStats.totalForks },
          { label: "Followers", value: githubStats.followers },
          { label: "Years on GitHub", value: githubStats.yearsActive },
        ]
      : leetcodeStats
        ? [
            { label: "Problems solved", value: leetcodeStats.totalSolved },
            { label: "Ranking", value: leetcodeStats.ranking || null },
            { label: "Easy", value: leetcodeStats.easy },
            { label: "Medium", value: leetcodeStats.medium },
            { label: "Hard", value: leetcodeStats.hard },
          ]
        : []
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90dvh] w-[calc(100vw-2rem)] max-w-2xl flex-col rounded-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
          <div>
            <DialogTitle className="text-xl font-bold">A little coding activity</DialogTitle>
            <DialogDescription className="mt-1.5 text-sm text-muted-foreground">
              Public profile data, refreshed hourly when available.
            </DialogDescription>
          </div>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" aria-label="Close coding activity">
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>
        </div>
        <div className="min-h-0 overflow-y-auto p-5 sm:p-6">
          <div role="group" aria-label="Activity source" className="mb-6 flex gap-2">
            {(
              [
                { id: "github", label: "GitHub", icon: Github },
                { id: "leetcode", label: "LeetCode", icon: Code2 },
              ] as const
            ).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                aria-pressed={tab === id}
                onClick={() => setTab(id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold ${tab === id ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
          {loading ? (
            <div
              role="status"
              aria-label="Loading coding activity"
              className="grid grid-cols-2 gap-3 sm:grid-cols-3"
            >
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <Skeleton key={value} className="h-24 rounded-xl" />
              ))}
            </div>
          ) : current ? (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {metrics.map(({ label, value }) => (
                  <div key={label} className="rounded-xl border border-border bg-secondary/50 p-4">
                    <div className="text-2xl font-bold tracking-tight">
                      {value === null ? (
                        <span className="text-base font-normal text-muted-foreground">Unavailable</span>
                      ) : (
                        <CountUp value={value} />
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
              {tab === "github" && githubStats && githubStats.topLanguages.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold">Primary languages</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Share of public repositories with a detected primary language.
                  </p>
                  <div className="mt-4 space-y-3">
                    {githubStats.topLanguages.map((language) => (
                      <div key={language.name}>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span>{language.name}</span>
                          <span className="text-muted-foreground">{language.percentage}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-brand"
                            style={{ width: `${language.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {tab === "leetcode" && leetcodeStats && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold">Languages used</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {leetcodeStats.languages.map((language) => (
                      <span key={language.name} className="rounded-full bg-secondary px-3 py-1.5 text-xs">
                        {language.name} · {language.solved} solved
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <p className="mt-6 text-xs text-muted-foreground">
                Last refreshed:{" "}
                <time dateTime={current.updatedAt}>{new Date(current.updatedAt).toLocaleString()}</time>
              </p>
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-border px-5 py-10 text-center">
              <h3 className="font-semibold">Activity is taking a little break</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                The source couldn&apos;t be reached. Try again or visit the profile directly.
              </p>
            </div>
          )}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <a
              href={tab === "github" ? profile.links.github : profile.links.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand"
            >
              View profile
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Button
              variant="ghost"
              onClick={onRetry}
              disabled={loading}
              className="gap-1.5 rounded-full text-xs"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Try again
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
