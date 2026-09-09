"use client"

import type { MouseEvent } from "react"
import Link from "next/link"
import { Bookmark, ArrowUpRight } from "lucide-react"
import { toast } from "sonner"
import { ProjectPreview } from "@/components/project-preview"
import { getPostHref } from "@/lib/post-utils"
import type { Post } from "@/lib/content"

interface PostCardProps {
  post: Post
  onClick?: () => void
  saved?: boolean
  onToggleSave?: () => void
}

export function PostCard({ post, onClick, saved = false, onToggleSave }: PostCardProps) {
  const href = getPostHref(post)
  const open = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      onClick &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey &&
      window.matchMedia("(min-width: 768px)").matches
    ) {
      event.preventDefault()
      onClick()
    }
  }
  return (
    <article
      aria-labelledby={`post-title-${post.id}`}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-4 transition-colors hover:border-foreground/25 sm:p-5"
    >
      <p className="mb-2 text-xs font-medium leading-relaxed text-muted-foreground sm:text-sm">
        {post.projectDetails?.context ?? post.flair}
      </p>
      <h3 id={`post-title-${post.id}`} className="text-lg font-bold leading-snug tracking-tight sm:text-xl">
        <Link
          href={href}
          onClick={open}
          className="rounded-sm decoration-brand/50 underline-offset-4 hover:underline"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.content}</p>
      {post.type === "project" && (
        <Link href={href} onClick={open} className="mt-4 block rounded-xl" aria-label={`Read ${post.title}`}>
          <ProjectPreview postId={post.id} compact />
        </Link>
      )}
      {post.projectDetails && (
        <dl className="mt-4 space-y-2 text-sm leading-relaxed">
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
          className="mt-1 inline-flex min-h-10 w-fit items-center gap-1 text-sm font-semibold text-brand hover:underline"
        >
          Inspect benchmark evidence <ArrowUpRight className="h-4 w-4" />
        </Link>
      )}
      <div className="mt-auto flex items-center justify-between gap-3 pt-3">
        <Link
          href={href}
          onClick={open}
          className="inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-brand hover:underline"
          aria-label={`Read case study: ${post.title}`}
        >
          {post.id === "multicity-routing"
            ? "Project overview"
            : post.type === "project"
              ? "Read case study"
              : "Read post"}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
        {onToggleSave && (
          <button
            type="button"
            onClick={() => {
              onToggleSave()
              toast(saved ? "Removed from saved" : "Saved for later", {
                description: saved ? undefined : "Find it under Project options → Saved projects.",
              })
            }}
            aria-pressed={saved}
            aria-label={saved ? `Unsave ${post.title}` : `Save ${post.title}`}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary ${saved ? "text-brand" : "text-muted-foreground"}`}
          >
            <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
          </button>
        )}
      </div>
    </article>
  )
}
