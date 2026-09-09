"use client"

import Link from "next/link"
import { X, ArrowUpRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Post } from "@/lib/content"

export function ProjectsModal({
  projects,
  open,
  onOpenChange,
}: {
  projects: Post[]
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90dvh] w-[calc(100vw-2rem)] max-w-2xl flex-col rounded-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border p-5">
          <div>
            <DialogTitle className="text-xl font-bold">The project collection</DialogTitle>
            <DialogDescription className="mt-1 text-sm text-muted-foreground">
              Choose a project to read the full story.
            </DialogDescription>
          </div>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" aria-label="Close projects">
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>
        </div>
        <div className="min-h-0 space-y-2 overflow-y-auto p-5">
          {projects.map((post) => (
            <Link
              key={post.id}
              href={`/projects/${post.id}`}
              className="flex items-center justify-between gap-4 rounded-xl border border-border p-4 hover:bg-secondary"
            >
              <div>
                <h3 className="text-sm font-semibold">{post.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {post.content}
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-brand" />
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
