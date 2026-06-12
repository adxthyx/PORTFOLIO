"use client"

import { useMemo, useState } from "react"
import { Flame, Clock, BarChart3, Search } from "lucide-react"
import { AnimatePresence, m } from "motion/react"
import { PostCard } from "@/components/post-card"
import { searchPosts, type Post } from "@/lib/content"
import { feedContainer, feedItem } from "@/lib/motion"
import type { VoteDir } from "@/lib/votes"

export type SortMode = "hot" | "new" | "top"
export type FilterKey = "all" | "main" | "aiml" | "webdev"

interface FeedProps {
  posts: Post[]
  searchQuery: string
  activeFilter: FilterKey
  onFilterChange: (filter: FilterKey) => void
  votes: Record<string, VoteDir>
  onVote: (postId: string, dir: VoteDir) => void
  onSelectPost: (post: Post) => void
}

const SORT_TABS: Array<{ key: SortMode; label: string; icon: typeof Flame }> = [
  { key: "hot", label: "Hot", icon: Flame },
  { key: "new", label: "New", icon: Clock },
  { key: "top", label: "Top", icon: BarChart3 },
]

const FILTERS: Array<{ key: FilterKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "main", label: "About & Skills" },
  { key: "aiml", label: "AI/ML" },
  { key: "webdev", label: "Web Dev" },
]

// Reddit-ish hot ranking: vote weight decays with age (half-day units)
function hotScore(post: Post, voteDelta: number): number {
  const votes = post.upvotes + voteDelta
  const ageHours = (Date.now() - new Date(post.postedAt).getTime()) / 3_600_000
  return Math.log10(Math.max(votes, 1)) - ageHours / 12
}

export function Feed({ posts, searchQuery, activeFilter, onFilterChange, votes, onVote, onSelectPost }: FeedProps) {
  const [sortMode, setSortMode] = useState<SortMode>("hot")

  const visiblePosts = useMemo(() => {
    let filtered: Post[]
    switch (activeFilter) {
      case "aiml":
      case "webdev":
        filtered = posts.filter((p) => p.category === activeFilter)
        break
      case "main":
        filtered = posts.filter((p) => p.category === "main")
        break
      default:
        filtered = posts
    }
    filtered = searchPosts(filtered, searchQuery)

    const sorted = [...filtered].sort((a, b) => {
      switch (sortMode) {
        case "new":
          return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
        case "top":
          return b.upvotes + (votes[b.id] ?? 0) - (a.upvotes + (votes[a.id] ?? 0))
        default:
          return hotScore(b, votes[b.id] ?? 0) - hotScore(a, votes[a.id] ?? 0)
      }
    })

    // Pinned posts always lead the feed, Reddit-style
    return [...sorted.filter((p) => p.pinned), ...sorted.filter((p) => !p.pinned)]
  }, [posts, searchQuery, activeFilter, sortMode, votes])

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Sort + filter bar */}
      <div className="bg-card rounded-lg border border-border p-2 sm:p-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1" role="tablist" aria-label="Sort posts">
            {SORT_TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                role="tab"
                aria-selected={sortMode === key}
                onClick={() => setSortMode(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  sortMode === key
                    ? "bg-secondary text-brand"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {FILTERS.map((filter) => (
              <button
                key={filter.key}
                onClick={() => onFilterChange(filter.key)}
                className={`px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  activeFilter === filter.key
                    ? "bg-brand text-white"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {searchQuery && (
          <div className="mt-2 px-1 text-xs sm:text-sm text-muted-foreground">
            Showing results for: <span className="font-medium text-brand">"{searchQuery}"</span>
          </div>
        )}
      </div>

      {/* Post list — staggered entrance, FLIP reorder on sort change */}
      {visiblePosts.length > 0 ? (
        <m.div
          className="space-y-3 sm:space-y-4"
          variants={feedContainer}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visiblePosts.map((post) => (
              <m.div key={post.id} layout variants={feedItem} exit="exit" whileHover={{ y: -2 }}>
                <PostCard
                  post={post}
                  userVote={votes[post.id]}
                  onVote={(dir) => onVote(post.id, dir)}
                  onClick={() => onSelectPost(post)}
                />
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>
      ) : (
        <m.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg border border-border p-8 text-center"
        >
          <Search className="w-10 h-10 sm:w-14 sm:h-14 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">No results found</h3>
          <p className="text-sm sm:text-base text-muted-foreground">
            {searchQuery
              ? `No posts found matching "${searchQuery}". Try different keywords.`
              : "No posts available in this category."}
          </p>
        </m.div>
      )}
    </div>
  )
}
