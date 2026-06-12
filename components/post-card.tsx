"use client"

import type React from "react"

import { useState } from "react"
import { MessageSquare, Share, Bookmark, Eye, Github, Pin, Medal } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flair } from "@/components/flair"
import type { Post } from "@/lib/content"
import type { VoteDir } from "@/lib/votes"

interface PostCardProps {
  post: Post
  userVote?: VoteDir
  onVote: (dir: VoteDir) => void
  onClick?: () => void
}

function VoteButton({
  dir,
  active,
  hovered,
  onHover,
  onVote,
  size,
}: {
  dir: VoteDir
  active: boolean
  hovered: boolean
  onHover: (h: boolean) => void
  onVote: (dir: VoteDir, e: React.MouseEvent) => void
  size: "sm" | "lg"
}) {
  const up = dir === 1
  const activeBg = up ? "!bg-orange-500 dark:!bg-orange-600" : "!bg-blue-500 dark:!bg-blue-600"
  const hoverBg = up ? "!bg-orange-500/30 dark:!bg-orange-600/30" : "!bg-blue-500/30 dark:!bg-blue-600/30"
  const idleHover = up
    ? "hover:!bg-orange-500/30 dark:hover:!bg-orange-600/30"
    : "hover:!bg-blue-500/30 dark:hover:!bg-blue-600/30"
  const sizeClass = size === "lg" ? "w-7 h-7" : "w-6 h-6"

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={up ? "Upvote" : "Downvote"}
      aria-pressed={active}
      className={`p-2 h-auto rounded-md transition-all duration-200 ${
        active ? activeBg : hovered ? hoverBg : idleHover
      }`}
      onClick={(e) => onVote(dir, e)}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <Image
        src={active || hovered ? "/white-upvote.svg" : "/black-upvote.svg"}
        alt=""
        width={size === "lg" ? 28 : 24}
        height={size === "lg" ? 28 : 24}
        className={up ? sizeClass : `${sizeClass} rotate-180`}
      />
    </Button>
  )
}

export function PostCard({ post, userVote, onVote, onClick }: PostCardProps) {
  const {
    title,
    content,
    upvotes,
    comments,
    subreddit,
    author,
    timeAgo,
    tags = [],
    github,
    demo,
    flair,
    pinned,
    awards,
  } = post
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredVote, setHoveredVote] = useState<VoteDir | null>(null)

  const currentUpvotes = upvotes + (userVote ?? 0)

  const handleVote = (dir: VoteDir, e: React.MouseEvent) => {
    e.stopPropagation()
    onVote(dir)
  }

  const voteCountClass =
    userVote === 1 ? "text-brand" : userVote === -1 ? "text-downvote" : "text-muted-foreground"

  return (
    <Card
      className={`bg-card border border-border transition-all duration-300 cursor-pointer ${
        isHovered
          ? "border-brand shadow-lg transform translate-y-[-2px] shadow-orange-100 dark:shadow-none"
          : "hover:border-input hover:shadow-md"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Desktop Vote Buttons - Vertical */}
        <div className="hidden sm:flex flex-col items-center p-3 bg-secondary border-r border-border min-w-[60px]">
          <VoteButton
            dir={1}
            active={userVote === 1}
            hovered={hoveredVote === 1}
            onHover={(h) => setHoveredVote(h ? 1 : null)}
            onVote={handleVote}
            size="lg"
          />
          <span className={`text-sm font-bold transition-all duration-200 ${voteCountClass}`}>{currentUpvotes}</span>
          <VoteButton
            dir={-1}
            active={userVote === -1}
            hovered={hoveredVote === -1}
            onHover={(h) => setHoveredVote(h ? -1 : null)}
            onVote={handleVote}
            size="lg"
          />
        </div>

        {/* Mobile Vote Buttons - Horizontal */}
        <div className="sm:hidden flex items-center gap-2 p-2 bg-secondary border-b border-border">
          <VoteButton
            dir={1}
            active={userVote === 1}
            hovered={hoveredVote === 1}
            onHover={(h) => setHoveredVote(h ? 1 : null)}
            onVote={handleVote}
            size="sm"
          />
          <span className={`text-sm font-bold transition-all duration-200 min-w-[40px] text-center ${voteCountClass}`}>
            {currentUpvotes}
          </span>
          <VoteButton
            dir={-1}
            active={userVote === -1}
            hovered={hoveredVote === -1}
            onHover={(h) => setHoveredVote(h ? -1 : null)}
            onVote={handleVote}
            size="sm"
          />
        </div>

        <div className="flex-1 p-3 sm:p-4 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-2 flex-wrap">
            <span className="font-medium text-brand hover:underline cursor-pointer">{subreddit}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hover:underline cursor-pointer">Posted by {author}</span>
            <span className="hidden sm:inline">•</span>
            <span suppressHydrationWarning>{timeAgo}</span>
            {pinned && (
              <Badge
                variant="secondary"
                className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs w-fit gap-1"
              >
                <Pin className="w-3 h-3" />
                PINNED BY MODERATORS
              </Badge>
            )}
            {flair && <Flair name={flair} className="w-fit" />}
            {awards && awards.length > 0 && (
              <span
                className="flex items-center gap-0.5 text-amber-500"
                title={`${awards.length} award${awards.length > 1 ? "s" : ""}`}
              >
                {awards.map((_, i) => (
                  <Medal key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </span>
            )}
          </div>

          <h2
            className={`text-base sm:text-lg font-semibold text-foreground mb-2 transition-all duration-200 line-clamp-2 sm:line-clamp-none ${
              isHovered ? "text-brand" : "hover:text-brand"
            }`}
          >
            {title}
          </h2>

          <div className="text-foreground/80 mb-3 line-clamp-2 sm:line-clamp-3 text-sm">{content}</div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs bg-secondary text-muted-foreground hover:bg-border transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4 text-muted-foreground w-full sm:w-auto flex-wrap">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:bg-secondary hover:text-brand gap-1 h-auto p-2 transition-all duration-200 hover:scale-105 text-xs sm:text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <MessageSquare className="w-4 h-4" />
                <span>{comments}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:bg-secondary hover:text-brand gap-1 h-auto p-2 transition-all duration-200 hover:scale-105 text-xs sm:text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <Share className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:bg-secondary hover:text-brand gap-1 h-auto p-2 transition-all duration-200 hover:scale-105 text-xs sm:text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <Bookmark className="w-4 h-4" />
                <span className="hidden sm:inline">Save</span>
              </Button>
            </div>

            {(github || demo) && (
              <div className="flex items-center gap-2">
                {github && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 h-auto p-2 border-input hover:border-brand hover:text-brand transition-all duration-200 bg-transparent text-xs sm:text-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(github, "_blank")
                    }}
                  >
                    <Github className="w-4 h-4" />
                    <span className="hidden sm:inline">Code</span>
                  </Button>
                )}
                {demo && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 h-auto p-2 border-input hover:border-brand hover:text-brand transition-all duration-200 bg-transparent text-xs sm:text-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(demo, "_blank")
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Demo</span>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
