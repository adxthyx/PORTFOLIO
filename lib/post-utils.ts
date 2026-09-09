import type { Post } from "@/lib/content"

export function getPostHref(post: Pick<Post, "id" | "type">) {
  return post.type === "project" ? `/projects/${post.id}` : `/posts/${post.id}`
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(date))
}

export function readingTime(content: string) {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 220))
}

export const featuredPostIds = ["ai-askaps", "reconcile", "rag-bench"]
