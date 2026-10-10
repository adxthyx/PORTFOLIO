"use client"

import { useState, type MouseEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MessageSquare, Share, Bookmark, Eye, Github, Pin, Medal, ArrowUpRight } from "lucide-react"
import { AnimatePresence, m } from "motion/react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Flair } from "@/components/flair"
import { ProjectPreview } from "@/components/project-preview"
import { getPostHref } from "@/lib/post-utils"
import { timeAgo, type Post } from "@/lib/content"
import { useVotes, type VoteDir } from "@/lib/votes"
import { useAchievements } from "@/lib/achievements"

interface PostCardProps {
  post: Post
  onClick?: () => void
  saved?: boolean
  onToggleSave?: () => void
}

function VoteButton({
  dir,
  active,
  title,
  onVote,
  size,
}: {
  dir: VoteDir
  active: boolean
  title: string
  onVote: (dir: VoteDir) => void
  size: "sm" | "lg"
}) {
  const up = dir === 1
  const [hovered, setHovered] = useState(false)
  const [burstId, setBurstId] = useState(0)
  const px = size === "lg" ? 28 : 24
  const tone = up ? "bg-brand-accent" : "bg-downvote"
  const hoverTone = up ? "hover:bg-brand-accent/30" : "hover:bg-downvote/30"

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label={`${up ? "Upvote" : "Downvote"} ${title}`}
        aria-pressed={active}
        className={`rounded-md p-1.5 transition-colors duration-200 ${active ? tone : hoverTone}`}
        onClick={(e) => {
          e.stopPropagation()
          // Burst only when an upvote is being cast (not removed)
          if (up && !active) setBurstId((id) => id + 1)
          onVote(dir)
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <m.span
          whileTap={{ scale: 0.8 }}
          transition={{ type: "spring", stiffness: 500, damping: 22 }}
          className="inline-flex"
        >
          <Image
            src={active || hovered ? "/white-upvote.svg" : "/black-upvote.svg"}
            alt=""
            width={px}
            height={px}
            className={`${size === "lg" ? "h-7 w-7" : "h-6 w-6"} ${up ? "" : "rotate-180"}`}
          />
        </m.span>
      </button>

      {/* Particle burst on upvote */}
      {up && burstId > 0 && (
        <span
          key={burstId}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * Math.PI * 2
            return (
              <m.span
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full bg-brand-accent"
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: Math.cos(angle) * 22, y: Math.sin(angle) * 22, opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />
            )
          })}
        </span>
      )}
    </span>
  )
}

function VoteCount({ count, userVote }: { count: number; userVote?: VoteDir }) {
  const tone = userVote === 1 ? "text-brand" : userVote === -1 ? "text-downvote" : "text-foreground"
  return (
    <span className={`overflow-hidden text-sm font-bold transition-colors ${tone}`} aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={count}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="inline-block tabular-nums"
        >
          {count}
        </m.span>
      </AnimatePresence>
    </span>
  )
}

export function PostCard({ post, onClick, saved = false, onToggleSave }: PostCardProps) {
  const router = useRouter()
  const { votes, vote } = useVotes()
  const { unlock } = useAchievements()
  const href = getPostHref(post)
  const userVote = votes[post.id]
  const count = post.upvotes + (userVote ?? 0)

  const handleVote = (dir: VoteDir) => {
    vote(post.id, dir)
    unlock("first-vote")
  }

  // Desktop opens the inline reader; mobile and modified clicks follow the real URL.
  const opensInline = (event: MouseEvent) =>
    onClick &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey &&
    window.matchMedia("(min-width: 768px)").matches

  const openLink = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
    if (opensInline(event)) {
      event.preventDefault()
      onClick?.()
    }
  }

  const openCard = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("a, button")) return
    if (opensInline(event)) onClick?.()
    else router.push(href)
  }

  const handleShare = async (event: MouseEvent) => {
    event.stopPropagation()
    const url = new URL(href, window.location.origin).href
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable")
      await navigator.clipboard.writeText(url)
      toast.success("Link copied to clipboard")
    } catch {
      toast("Copy this address to share the post", { description: url, duration: 10000 })
    }
  }

  const voteProps = { title: post.title, onVote: handleVote }
  const actionClass =
    "inline-flex h-9 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-brand sm:text-sm"
  const linkButtonClass =
    "inline-flex h-9 items-center gap-1.5 rounded-full border border-input px-3 text-xs font-semibold transition-colors hover:border-brand hover:text-brand sm:text-sm"

  return (
    <article
      aria-labelledby={`post-title-${post.id}`}
      onClick={openCard}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-border bg-card transition-[border-color,box-shadow] duration-300 hover:border-brand hover:shadow-md sm:flex-row"
    >
      {/* Desktop vote column */}
      <div className="hidden min-w-[60px] flex-col items-center gap-1 border-r border-border bg-secondary p-3 sm:flex">
        <VoteButton dir={1} active={userVote === 1} size="lg" {...voteProps} />
        <VoteCount count={count} userVote={userVote} />
        <VoteButton dir={-1} active={userVote === -1} size="lg" {...voteProps} />
      </div>

      {/* Mobile vote bar */}
      <div className="flex items-center gap-2 border-b border-border bg-secondary p-2 sm:hidden">
        <VoteButton dir={1} active={userVote === 1} size="sm" {...voteProps} />
        <span className="min-w-[40px] text-center">
          <VoteCount count={count} userVote={userVote} />
        </span>
        <VoteButton dir={-1} active={userVote === -1} size="sm" {...voteProps} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
        <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground sm:text-sm">
          <span className="font-semibold text-foreground">{post.subreddit}</span>
          <span aria-hidden>•</span>
          <span>Posted by {post.author}</span>
          <span aria-hidden>•</span>
          <time dateTime={post.postedAt} suppressHydrationWarning>
            {timeAgo(post.postedAt)}
          </time>
          {post.pinned && (
            <Badge
              variant="secondary"
              className="w-fit gap-1 bg-green-100 text-xs text-green-800 dark:bg-green-900/30 dark:text-green-300"
            >
              <Pin className="h-3 w-3" />
              PINNED BY MODERATORS
            </Badge>
          )}
          <Flair name={post.flair} className="w-fit" />
          {post.awards && post.awards.length > 0 && (
            <span className="flex items-center gap-0.5 text-amber-500" title={post.awards.join(", ")}>
              <span className="sr-only">Awards: {post.awards.join(", ")}</span>
              {post.awards.map((award) => (
                <Medal key={award} aria-hidden className="h-3.5 w-3.5 fill-amber-400" />
              ))}
            </span>
          )}
        </div>

        {post.projectDetails && (
          <p className="mb-1 text-xs font-medium text-muted-foreground">{post.projectDetails.context}</p>
        )}
        <h3
          id={`post-title-${post.id}`}
          className="mb-2 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-brand sm:text-lg"
        >
          <Link href={href} onClick={openLink} className="rounded-sm">
            {post.title}
          </Link>
        </h3>

        <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-foreground/80">{post.content}</p>

        {post.type === "project" && (
          <Link href={href} onClick={openLink} className="mb-3 block rounded-lg" aria-label={`Read ${post.title}`}>
            <ProjectPreview postId={post.id} compact />
          </Link>
        )}

        {post.projectDetails && (
          <dl className="mb-3 space-y-1.5 text-sm leading-relaxed">
            <div>
              <dt className="inline font-semibold">My work. </dt>
              <dd className="inline text-foreground/85">{post.projectDetails.contribution}</dd>
            </div>
            <div>
              <dt className="inline font-semibold">Delivered. </dt>
              <dd className="inline text-foreground/85">{post.projectDetails.outcome}</dd>
            </div>
          </dl>
        )}

        {post.id === "rag-bench" && (
          <Link
            href="/projects/rag-bench#benchmark-evidence"
            onClick={(e) => e.stopPropagation()}
            className="mb-3 inline-flex w-fit items-center gap-1 text-sm font-semibold text-brand hover:underline"
          >
            Inspect benchmark evidence <ArrowUpRight className="h-4 w-4" />
          </Link>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-secondary text-xs text-muted-foreground">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1">
            <Link
              href={href}
              onClick={openLink}
              className={actionClass}
              aria-label={`Open comments on ${post.title} (${post.comments})`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>{post.comments} Comments</span>
            </Link>
            <button
              type="button"
              aria-label={`Copy link to ${post.title}`}
              className={actionClass}
              onClick={handleShare}
            >
              <Share className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
            {onToggleSave && (
              <button
                type="button"
                aria-pressed={saved}
                aria-label={saved ? `Unsave ${post.title}` : `Save ${post.title}`}
                className={`${actionClass} ${saved ? "text-brand" : ""}`}
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleSave()
                  toast(saved ? "Removed from saved" : "Post saved", {
                    description: saved ? undefined : "Find it under the Saved filter",
                  })
                }}
              >
                <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
                <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
              </button>
            )}
          </div>

          {(post.github || post.demo) && (
            <div className="flex items-center gap-2">
              {post.github && (
                <a
                  href={post.github}
                  aria-label={`Source code for ${post.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={linkButtonClass}
                >
                  <Github className="h-4 w-4" />
                  <span className="hidden sm:inline">Code</span>
                </a>
              )}
              {post.demo && (
                <a
                  href={post.demo}
                  aria-label={`Live demo of ${post.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={linkButtonClass}
                >
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">Demo</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
