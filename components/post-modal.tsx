"use client"

import Link from "next/link"
import { useRef } from "react"
import { X, ArrowUpRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PostArticle } from "@/components/post-article"
import { getPostHref } from "@/lib/post-utils"
import type { Post } from "@/lib/content"

interface PostModalProps {
  post: Post | null
  open: boolean
  onOpenChange: (open: boolean) => void
}
export function PostModal({ post: selectedPost, open, onOpenChange }: PostModalProps) {
  const lastPost = useRef(selectedPost)
  if (selectedPost) lastPost.current = selectedPost
  const post = selectedPost ?? lastPost.current
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[92dvh] w-[calc(100vw-2rem)] max-w-3xl flex-col rounded-2xl">
        {post && (
          <>
            <div className="flex shrink-0 items-center gap-4 border-b border-border px-5 py-4 sm:px-7">
              <div className="min-w-0 flex-1">
                <DialogTitle className="line-clamp-2 text-base font-bold leading-snug">
                  {post.title}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Read the post and ask questions about it.
                </DialogDescription>
              </div>
              <Link
                href={getPostHref(post)}
                className="inline-flex min-h-10 shrink-0 items-center gap-1 text-sm font-medium text-brand"
                aria-label="Open full page"
              >
                <span className="hidden sm:inline">Full page</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="shrink-0 rounded-full" aria-label="Close post">
                  <X className="h-5 w-5" />
                </Button>
              </DialogClose>
            </div>
            <div className="min-h-0 overflow-y-auto overscroll-contain px-5 py-6 sm:px-7 sm:py-7">
              <PostArticle post={post} showTitle={false} />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
