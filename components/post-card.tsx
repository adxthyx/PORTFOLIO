"use client"

import type React from "react"

import { useState } from "react"
import { MessageSquare, Share, Bookmark, Eye, Github } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PostCardProps {
  id?: string
  title: string
  content: string
  upvotes: number
  comments: number
  subreddit: string
  author: string
  timeAgo: string
  type?: string
  tags?: string[]
  github?: string
  demo?: string
  onClick?: () => void
}

export function PostCard({
  title,
  content,
  upvotes,
  comments,
  subreddit,
  author,
  timeAgo,
  type,
  tags = [],
  github,
  demo,
  onClick,
}: PostCardProps) {
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes)
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredVote, setHoveredVote] = useState<"up" | "down" | null>(null)

  const handleVote = (voteType: "up" | "down", e: React.MouseEvent) => {
    e.stopPropagation()
    if (userVote === voteType) {
      setUserVote(null)
      setCurrentUpvotes(voteType === "up" ? currentUpvotes - 1 : currentUpvotes + 1)
    } else {
      const prevVote = userVote
      setUserVote(voteType)

      if (prevVote === null) {
        setCurrentUpvotes(voteType === "up" ? currentUpvotes + 1 : currentUpvotes - 1)
      } else {
        setCurrentUpvotes(voteType === "up" ? currentUpvotes + 2 : currentUpvotes - 2)
      }
    }
  }

  return (
    <Card
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 cursor-pointer ${
        isHovered
          ? "border-[#FF4500] shadow-lg transform translate-y-[-2px] shadow-orange-100"
          : "hover:border-gray-300 hover:shadow-md"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Desktop Vote Buttons - Vertical */}
        <div className="hidden sm:flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 border-r dark:border-gray-600 border-gray-200 min-w-[60px]">
          <Button
            variant="ghost"
            size="sm"
            className={`p-2 h-auto rounded-md transition-all duration-200 ${
              userVote === "up"
                ? "!bg-orange-500 dark:!bg-orange-600"
                : hoveredVote === "up"
                  ? "!bg-orange-500/30 dark:!bg-orange-600/30"
                  : "hover:!bg-orange-500/30 dark:hover:!bg-orange-600/30"
            }`}
            onClick={(e) => handleVote("up", e)}
            onMouseEnter={() => setHoveredVote("up")}
            onMouseLeave={() => setHoveredVote(null)}
          >
            <Image
              src={userVote === "up" || hoveredVote === "up" ? "/white-upvote.svg" : "/black-upvote.svg"}
              alt="Upvote"
              width={28}
              height={28}
              className="w-7 h-7"
            />
          </Button>
          <span
            className={`text-sm font-bold transition-all duration-200 ${
              userVote === "up"
                ? "text-[#FF4500]"
                : userVote === "down"
                  ? "text-[#7193FF]"
                  : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {currentUpvotes}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className={`p-2 h-auto rounded-md transition-all duration-200 ${
              userVote === "down"
                ? "!bg-blue-500 dark:!bg-blue-600"
                : hoveredVote === "down"
                  ? "!bg-blue-500/30 dark:!bg-blue-600/30"
                  : "hover:!bg-blue-500/30 dark:hover:!bg-blue-600/30"
            }`}
            onClick={(e) => handleVote("down", e)}
            onMouseEnter={() => setHoveredVote("down")}
            onMouseLeave={() => setHoveredVote(null)}
          >
            <Image
              src={userVote === "down" || hoveredVote === "down" ? "/white-upvote.svg" : "/black-upvote.svg"}
              alt="Downvote"
              width={28}
              height={28}
              className="w-7 h-7 rotate-180"
            />
          </Button>
        </div>

        {/* Mobile Vote Buttons - Horizontal */}
        <div className="sm:hidden flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600 border-gray-200">
          <Button
            variant="ghost"
            size="sm"
            className={`p-2 h-auto rounded-md transition-all duration-200 ${
              userVote === "up"
                ? "!bg-orange-500 dark:!bg-orange-600"
                : hoveredVote === "up"
                  ? "!bg-orange-500/30 dark:!bg-orange-600/30"
                  : "hover:!bg-orange-500/30 dark:hover:!bg-orange-600/30"
            }`}
            onClick={(e) => handleVote("up", e)}
            onMouseEnter={() => setHoveredVote("up")}
            onMouseLeave={() => setHoveredVote(null)}
          >
            <Image
              src={userVote === "up" || hoveredVote === "up" ? "/white-upvote.svg" : "/black-upvote.svg"}
              alt="Upvote"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </Button>
          <span
            className={`text-sm font-bold transition-all duration-200 min-w-[40px] text-center ${
              userVote === "up"
                ? "text-[#FF4500]"
                : userVote === "down"
                  ? "text-[#7193FF]"
                  : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {currentUpvotes}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className={`p-2 h-auto rounded-md transition-all duration-200 ${
              userVote === "down"
                ? "!bg-blue-500 dark:!bg-blue-600"
                : hoveredVote === "down"
                  ? "!bg-blue-500/30 dark:!bg-blue-600/30"
                  : "hover:!bg-blue-500/30 dark:hover:!bg-blue-600/30"
            }`}
            onClick={(e) => handleVote("down", e)}
            onMouseEnter={() => setHoveredVote("down")}
            onMouseLeave={() => setHoveredVote(null)}
          >
            <Image
              src={userVote === "down" || hoveredVote === "down" ? "/white-upvote.svg" : "/black-upvote.svg"}
              alt="Downvote"
              width={24}
              height={24}
              className="w-6 h-6 rotate-180"
            />
          </Button>
        </div>

        <div className="flex-1 p-3 sm:p-4 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 flex-wrap">
            <span className="font-medium text-[#FF4500] hover:underline cursor-pointer">{subreddit}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hover:underline cursor-pointer">Posted by {author}</span>
            <span className="hidden sm:inline">•</span>
            <span>{timeAgo}</span>
            {timeAgo === "pinned" && (
              <Badge
                variant="secondary"
                className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs w-fit"
              >
                PINNED
              </Badge>
            )}
            {type && (
              <Badge variant="outline" className="text-xs border-[#FF4500] text-[#FF4500] w-fit">
                {type.toUpperCase()}
              </Badge>
            )}
          </div>

          <h2
            className={`text-base sm:text-lg font-semibold text-black dark:text-white mb-2 transition-all duration-200 line-clamp-2 sm:line-clamp-none ${
              isHovered ? "text-[#FF4500]" : "hover:text-[#FF4500]"
            }`}
          >
            {title}
          </h2>

          <div className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-2 sm:line-clamp-3 text-sm">{content}</div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4 text-gray-500 dark:text-gray-400 w-full sm:w-auto flex-wrap">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#FF4500] gap-1 h-auto p-2 transition-all duration-200 hover:scale-105 text-xs sm:text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <MessageSquare className="w-4 h-4" />
                <span>{comments}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#FF4500] gap-1 h-auto p-2 transition-all duration-200 hover:scale-105 text-xs sm:text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <Share className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#FF4500] gap-1 h-auto p-2 transition-all duration-200 hover:scale-105 text-xs sm:text-sm"
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
                    className="gap-1 h-auto p-2 border-gray-300 dark:border-gray-600 hover:border-[#FF4500] hover:text-[#FF4500] transition-all duration-200 bg-transparent text-xs sm:text-sm"
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
                    className="gap-1 h-auto p-2 border-gray-300 dark:border-gray-600 hover:border-[#FF4500] hover:text-[#FF4500] transition-all duration-200 bg-transparent text-xs sm:text-sm"
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
