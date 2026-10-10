"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Flame, Clock, BarChart3, Search, Bookmark, ArrowRight } from "lucide-react"
import { AnimatePresence, m } from "motion/react"
import { PostCard } from "@/components/post-card"
import { searchPosts, type Post } from "@/lib/content"
import { feedContainer, feedItem } from "@/lib/motion"
import { useKeyboardNav } from "@/lib/use-keyboard-nav"
import { useVotes } from "@/lib/votes"

export type SortMode = "hot" | "new" | "top"
export type FilterKey = "all" | "main" | "aiml" | "webdev" | "mobile" | "saved"

interface FeedProps {
  posts: Post[]
  searchQuery: string
  activeFilter: FilterKey
  onFilterChange: (filter: FilterKey) => void
  sortMode: SortMode
  onSortChange: (sort: SortMode) => void
  onSelectPost: (post: Post) => void
  savedIds: string[]
  onToggleSave: (postId: string) => void
  keyboardEnabled?: boolean
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
  { key: "mobile", label: "Android" },
]

// Reddit-ish hot ranking: vote weight decays with age (half-day units)
function hotScore(post: Post, voteDelta: number): number {
  const votes = post.upvotes + voteDelta
  const ageHours = (Date.now() - new Date(post.postedAt).getTime()) / 3_600_000
  return Math.log10(Math.max(votes, 1)) - ageHours / 12
}

export function Feed({
  posts,
  searchQuery,
  activeFilter,
  onFilterChange,
  sortMode,
  onSortChange,
  onSelectPost,
  savedIds,
  onToggleSave,
  keyboardEnabled = true,
}: FeedProps) {
  const { votes } = useVotes()

  const visiblePosts = useMemo(() => {
    const filtered = searchPosts(
      posts.filter((post) => {
        if (activeFilter === "saved") return savedIds.includes(post.id)
        if (post.archived) return false
        return activeFilter === "all" || post.category === activeFilter
      }),
      searchQuery,
    )

    const sorted = [...filtered].sort((a, b) => {
      switch (sortMode) {
        case "new":
          return Date.parse(b.postedAt) - Date.parse(a.postedAt)
        case "top":
          return b.upvotes + (votes[b.id] ?? 0) - (a.upvotes + (votes[a.id] ?? 0))
        default:
          return hotScore(b, votes[b.id] ?? 0) - hotScore(a, votes[a.id] ?? 0)
      }
    })

    // Pinned posts always lead the feed, Reddit-style
    return [...sorted.filter((p) => p.pinned), ...sorted.filter((p) => !p.pinned)]
  }, [posts, searchQuery, activeFilter, sortMode, votes, savedIds])

  const focusedId = useKeyboardNav(visiblePosts, keyboardEnabled, onSelectPost)
  const chipClass = (active: boolean) =>
    `flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
      active ? "bg-brand-solid text-white" : "bg-secondary text-muted-foreground hover:text-foreground"
    }`

  return (
    <section aria-label="Posts" className="space-y-3 sm:space-y-4">
      {/* Sort + filter bar */}
      <div className="rounded-lg border border-border bg-card p-2 sm:p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1" role="group" aria-label="Sort posts">
            {SORT_TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                aria-pressed={sortMode === key}
                onClick={() => onSortChange(key)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                  sortMode === key
                    ? "bg-secondary text-brand"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          <div role="group" aria-label="Filter posts" className="scrollbar-hide flex items-center gap-1 overflow-x-auto">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                aria-pressed={activeFilter === key && !searchQuery.trim()}
                onClick={() => onFilterChange(key)}
                className={chipClass(activeFilter === key && !searchQuery.trim())}
              >
                {label}
              </button>
            ))}
            {(savedIds.length > 0 || activeFilter === "saved") && (
              <button
                type="button"
                aria-pressed={activeFilter === "saved"}
                onClick={() => onFilterChange("saved")}
                className={chipClass(activeFilter === "saved")}
              >
                <Bookmark className={`h-3 w-3 ${activeFilter === "saved" ? "fill-current" : ""}`} />
                Saved{savedIds.length > 0 ? ` (${savedIds.length})` : ""}
              </button>
            )}
          </div>
        </div>

        {searchQuery.trim() && (
          <p className="mt-2 px-1 text-xs text-muted-foreground sm:text-sm" role="status">
            {visiblePosts.length} results for <span className="font-medium text-brand">“{searchQuery}”</span>
          </p>
        )}
      </div>

      {/* Post list — staggered entrance, FLIP reorder on sort change */}
      {visiblePosts.length > 0 ? (
        <m.div className="space-y-3 sm:space-y-4" variants={feedContainer} initial="hidden" animate="show">
          <AnimatePresence mode="popLayout" initial={false}>
            {visiblePosts.map((post) => (
              <m.div
                key={post.id}
                layout
                variants={feedItem}
                exit="exit"
                data-post-id={post.id}
                className={focusedId === post.id ? "rounded-lg ring-2 ring-brand" : undefined}
              >
                <PostCard
                  post={post}
                  onClick={() => onSelectPost(post)}
                  saved={savedIds.includes(post.id)}
                  onToggleSave={() => onToggleSave(post.id)}
                />
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>
      ) : (
        <m.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-border bg-card p-8 text-center"
        >
          {activeFilter === "saved" && !searchQuery.trim() ? (
            <>
              <Bookmark className="mx-auto mb-4 h-10 w-10 text-muted-foreground/50" />
              <h3 className="mb-2 text-base font-semibold sm:text-lg">Nothing saved yet</h3>
              <p className="text-sm text-muted-foreground">
                Hit Save on any post to bookmark it here. It sticks around between visits.
              </p>
            </>
          ) : (
            <>
              <Search className="mx-auto mb-4 h-10 w-10 text-muted-foreground/50" />
              <h3 className="mb-2 text-base font-semibold sm:text-lg">No results found</h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery.trim()
                  ? `No posts match "${searchQuery}". Try different keywords.`
                  : "No posts in this category yet."}
              </p>
            </>
          )}
          <button
            type="button"
            onClick={() => onFilterChange("all")}
            className="mt-4 rounded-full bg-secondary px-4 py-2 text-sm font-semibold"
          >
            Back to all posts
          </button>
        </m.div>
      )}

      <div className="flex justify-center pt-2">
        <Link
          href="/projects"
          className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-foreground hover:text-brand hover:underline"
        >
          Browse the full project collection <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
