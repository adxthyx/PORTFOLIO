"use client"

import { useMemo } from "react"
import Link from "next/link"
import { ArrowRight, Search, Bookmark, SlidersHorizontal, Check } from "lucide-react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { PostCard } from "@/components/post-card"
import { searchPosts, type Post } from "@/lib/content"
import { featuredPostIds } from "@/lib/post-utils"
import { useKeyboardNav } from "@/lib/use-keyboard-nav"

export type SortMode = "featured" | "new"
export type FilterKey = "all" | "aiml" | "webdev" | "mobile" | "saved"
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
const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Featured" },
  { key: "aiml", label: "AI / ML" },
  { key: "webdev", label: "Web" },
  { key: "mobile", label: "Android" },
]

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
  const visiblePosts = useMemo(() => {
    const filtered = searchPosts(
      posts.filter((post) => {
        if (activeFilter === "saved") return savedIds.includes(post.id)
        if (post.type !== "project" || post.archived) return false
        if (activeFilter !== "all") return post.category === activeFilter
        return searchQuery.trim() || featuredPostIds.includes(post.id)
      }),
      searchQuery,
    )
    return [...filtered].sort((a, b) => {
      if (sortMode === "new") return Date.parse(b.postedAt) - Date.parse(a.postedAt)
      const rank = (post: Post) => (featuredPostIds.includes(post.id) ? featuredPostIds.indexOf(post.id) : 10)
      return rank(a) - rank(b)
    })
  }, [posts, searchQuery, activeFilter, savedIds, sortMode])
  const focusedId = useKeyboardNav(visiblePosts, keyboardEnabled, onSelectPost)
  const heading = searchQuery.trim()
    ? "Search results"
    : activeFilter === "all"
      ? "Selected work"
      : activeFilter === "saved"
        ? "Saved projects"
        : `${filters.find((filter) => filter.key === activeFilter)?.label} projects`
  const menuClass =
    "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2.5 text-sm outline-none focus:bg-secondary data-[highlighted]:bg-secondary"

  return (
    <section aria-label="Portfolio projects" className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight">{heading}</h2>
        {(searchQuery.trim() || activeFilter !== "all") && (
          <span className="text-sm text-muted-foreground" role="status">
            {visiblePosts.length} results
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-2">
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-1.5">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              aria-pressed={activeFilter === key && !searchQuery.trim()}
              onClick={() => onFilterChange(key)}
              className={`inline-flex min-h-9 items-center rounded-full border px-3 text-sm font-medium transition-colors ${activeFilter === key && !searchQuery.trim() ? "border-brand-accent/50 bg-brand-accent/10 text-brand" : "border-border text-muted-foreground hover:bg-card hover:text-foreground"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              aria-label="Project options"
              className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-card ${activeFilter === "saved" ? "text-brand" : "text-muted-foreground"}`}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={6}
              className="z-50 min-w-52 rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-lg"
            >
              <DropdownMenu.CheckboxItem
                checked={activeFilter === "saved"}
                onCheckedChange={(checked) => onFilterChange(checked ? "saved" : "all")}
                className={menuClass}
              >
                <Bookmark className="h-4 w-4" /> Saved projects
                <DropdownMenu.ItemIndicator>
                  <Check className="ml-auto h-4 w-4" />
                </DropdownMenu.ItemIndicator>
              </DropdownMenu.CheckboxItem>
              <DropdownMenu.Separator className="my-1 h-px bg-border" />
              <DropdownMenu.Label className="px-3 py-1.5 text-xs text-muted-foreground">
                Order
              </DropdownMenu.Label>
              <DropdownMenu.RadioGroup
                value={sortMode}
                onValueChange={(value) => onSortChange(value as SortMode)}
              >
                {[
                  { key: "featured", label: "Selected order" },
                  { key: "new", label: "Recently updated" },
                ].map(({ key, label }) => (
                  <DropdownMenu.RadioItem key={key} value={key} className={menuClass}>
                    {label}
                    <DropdownMenu.ItemIndicator>
                      <Check className="ml-auto h-4 w-4" />
                    </DropdownMenu.ItemIndicator>
                  </DropdownMenu.RadioItem>
                ))}
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
      {searchQuery.trim() && <p className="text-sm text-muted-foreground">Results for “{searchQuery}”</p>}
      {visiblePosts.length ? (
        <div className="space-y-4">
          {visiblePosts.map((post) => (
            <div
              key={post.id}
              data-post-id={post.id}
              className={
                focusedId === post.id
                  ? "rounded-2xl ring-2 ring-brand ring-offset-4 ring-offset-canvas"
                  : undefined
              }
            >
              <PostCard
                post={post}
                onClick={() => onSelectPost(post)}
                saved={savedIds.includes(post.id)}
                onToggleSave={() => onToggleSave(post.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-10 text-center">
          {activeFilter === "saved" ? (
            <Bookmark className="mx-auto mb-3 h-6 w-6 text-muted-foreground" />
          ) : (
            <Search className="mx-auto mb-3 h-6 w-6 text-muted-foreground" />
          )}
          <h3 className="text-lg font-semibold">
            {activeFilter === "saved" ? "Your reading list starts here" : "Nothing here just yet"}
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {activeFilter === "saved"
              ? "Save a project to find it here on your next visit from this browser."
              : "Try another keyword or choose a different category."}
          </p>
          <button
            type="button"
            onClick={() => onFilterChange("all")}
            className="mt-4 rounded-full bg-secondary px-4 py-2.5 text-sm font-semibold"
          >
            Back to featured projects
          </button>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
        <Link
          href="/projects"
          className="inline-flex min-h-10 items-center gap-2 text-base font-semibold text-brand hover:underline"
        >
          View all projects <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/about"
          className="inline-flex min-h-10 items-center text-sm text-muted-foreground hover:text-foreground"
        >
          Experience, education & skills →
        </Link>
      </div>
    </section>
  )
}
