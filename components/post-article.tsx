import { Github, ArrowUpRight, LockKeyhole } from "lucide-react"
import { Flair } from "@/components/flair"
import { PostBody } from "@/components/post-body"
import { PostActions } from "@/components/post-actions"
import { ProjectPreview } from "@/components/project-preview"
import { BenchmarkEvidence } from "@/components/benchmark-evidence"
import { CommentSection } from "@/components/comment-section"
import { formatPostDate, readingTime } from "@/lib/post-utils"
import type { Post } from "@/lib/content"

export function PostArticle({ post, showTitle = true }: { post: Post; showTitle?: boolean }) {
  return (
    <article className="space-y-6">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {post.projectDetails ? <span>{post.projectDetails.context}</span> : <Flair name={post.flair} />}
          <span aria-hidden="true">·</span>
          <span>{readingTime(post.fullContent)} min read</span>
        </div>
        {showTitle && (
          <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
        )}
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{post.content}</p>
      </div>
      {post.type === "project" && <ProjectPreview postId={post.id} />}
      {post.id === "rag-bench" && <BenchmarkEvidence />}
      {(post.github || post.demo) && (
        <div className="flex flex-wrap gap-3">
          {post.github && (
            <a
              href={post.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold"
            >
              <Github className="h-4 w-4" />
              Source code
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {post.demo && (
            <a
              href={post.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-solid px-4 py-2.5 text-sm font-semibold text-white"
            >
              Try the demo
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
      {post.id === "ai-askaps" && (
        <p className="flex items-center gap-2 rounded-lg bg-secondary p-3 text-sm text-muted-foreground">
          <LockKeyhole className="h-4 w-4 shrink-0" />
          Internal HPE project. This write-up describes the work; source code and a public demo aren&apos;t
          available.
        </p>
      )}
      <PostBody content={post.fullContent} />
      {post.tags && (
        <div className="flex flex-wrap items-center gap-2 border-t border-border pt-5">
          <span className="mr-1 text-sm font-medium">Built with</span>
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-secondary px-2.5 py-1 text-sm text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      )}
      <p className="text-sm text-muted-foreground">
        Write-up updated <time dateTime={post.postedAt}>{formatPostDate(post.postedAt)}</time>.
      </p>
      <PostActions post={post} />
      <CommentSection key={post.id} postId={post.id} seed={post.faq} />
    </article>
  )
}
